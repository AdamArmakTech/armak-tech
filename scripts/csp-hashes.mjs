// Keeps the Content-Security-Policy in vercel.json in step with the built site.
// The policy allows inline <script> blocks by sha256 hash, so any change to an inline
// script (or an Astro/dependency update that changes the bundled output) changes its hash.
//
//   node scripts/csp-hashes.mjs          verify: exit 1 if dist/ has an inline script whose
//                                        hash is missing from vercel.json (runs after every build)
//   node scripts/csp-hashes.mjs --write  rewrite the script-src hash list in vercel.json from dist/
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const configPath = path.join(root, 'vercel.json');

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)],
  );

// Inline, executable scripts only: skip <script src> and JSON-LD data blocks.
const INLINE = /<script(?![^>]*\bsrc=)(?![^>]*ld\+json)[^>]*>([\s\S]*?)<\/script>/g;
const found = new Map(); // hash -> first page it appears on
const handlers = [];
for (const file of walk(dist).filter((f) => f.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(INLINE)) {
    const h = `'sha256-${crypto.createHash('sha256').update(m[1]).digest('base64')}'`;
    if (!found.has(h)) found.set(h, path.relative(dist, file));
  }
  if (/<[^>]+\son[a-z]+\s*=/i.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) {
    handlers.push(path.relative(dist, file));
  }
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const cspHeader = config.headers
  ?.flatMap((rule) => rule.headers)
  .find((h) => h.key === 'Content-Security-Policy');
if (!cspHeader) {
  console.error('csp-hashes: no Content-Security-Policy header in vercel.json');
  process.exit(1);
}

const directives = cspHeader.value.split(';').map((d) => d.trim());
const i = directives.findIndex((d) => d.startsWith('script-src '));
const sources = directives[i].split(/\s+/).slice(1);
const keep = sources.filter((s) => !s.startsWith("'sha256-"));
const listed = new Set(sources.filter((s) => s.startsWith("'sha256-")));

if (process.argv.includes('--write')) {
  directives[i] = ['script-src', ...keep, ...[...found.keys()].sort()].join(' ');
  cspHeader.value = directives.join('; ');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
  console.log(`csp-hashes: wrote ${found.size} script hashes to vercel.json`);
  process.exit(0);
}

const missing = [...found].filter(([h]) => !listed.has(h));
if (handlers.length) {
  console.error(`csp-hashes: inline event handlers (on*=) are blocked by the CSP: ${handlers.join(', ')}`);
}
if (missing.length) {
  console.error('csp-hashes: inline scripts not allowed by the CSP in vercel.json:');
  for (const [h, page] of missing) console.error(`  ${h}  (${page})`);
  console.error('Run `npm run csp:update` and commit vercel.json.');
}
if (missing.length || handlers.length) process.exit(1);
const stale = [...listed].filter((h) => !found.has(h)).length;
console.log(`csp-hashes: ${found.size} inline script hashes allowed${stale ? ` (${stale} unused)` : ''}`);
