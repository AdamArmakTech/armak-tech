/**
 * Generates the share image, favicons and schema logo from the brand assets.
 *
 *   node scripts/make-brand-images.mjs
 *
 * Writes to public/:
 *   og-image.png          1200×630 social share card (default og:image / twitter:image)
 *   favicon.ico           16 + 32 + 48 px (PNG-in-ICO, for browsers that ask for /favicon.ico)
 *   favicon-32.png        32 px tab icon
 *   apple-touch-icon.png  180 px, paper background (iOS ignores transparency)
 *   icon-192.png, icon-512.png   web-manifest icons
 *   logo.png              trimmed wordmark used as the JSON-LD `logo`
 *
 * Colors are read from src/styles/tokens.css and business facts from src/data/site.ts
 * (Node ≥ 22.18 strips the TypeScript types on import), so the card never drifts from the site.
 *
 * Type is the site's own Geist / Geist Mono, drawn as SVG paths from the @fontsource woff2 files
 * so the output doesn't depend on fonts installed on this machine. If that ever fails (it pokes at
 * fontkitten internals to get the variable weights), it falls back to system fonts via <text>.
 */
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { site, FOUNDED } from '../src/data/site.ts';

const LOGO = 'src/assets/brand/armak-logo-hd.png';
const OUT = 'public';

/* ── Brand tokens ─────────────────────────────────────────── */
const tokensCss = await readFile('src/styles/tokens.css', 'utf8');
const token = (name) => {
  const m = tokensCss.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{3,8})`));
  if (!m) throw new Error(`Token --${name} not found in tokens.css`);
  return m[1];
};
const C = {
  paper: token('paper'),
  ink: token('ink'),
  steel: token('steel'),
  hairline: token('hairline'),
  white: token('white'),
  signal: token('signal'),
  orange: token('t568-orange'),
  green: token('t568-green'),
  blue: token('t568-blue'),
  brown: token('t568-brown'),
};

/* ── Type: Geist outlines at any weight ───────────────────── */
const FONT_FILES = {
  sans: 'node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2',
  mono: 'node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2',
};
const SYSTEM_FALLBACK = {
  sans: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  mono: "Consolas, Menlo, 'DejaVu Sans Mono', monospace",
};

let fontkitten = null;
try {
  fontkitten = await import('fontkitten'); // ships with Astro (font metrics); not a direct dependency
} catch {
  console.warn('fontkitten not found — falling back to system fonts');
}

const fontCache = new Map();
/**
 * fontkitten can't apply variable-font weights to WOFF2 files on its own, so: decode the default
 * glyph outlines, run each simple glyph through the gvar processor of an instance built with the
 * requested weight, and hand the moved points back. Advance widths follow via HVAR.
 */
async function geist(family, wght) {
  const key = `${family}@${wght}`;
  if (fontCache.has(key)) return fontCache.get(key);
  const buf = await readFile(FONT_FILES[family]);
  const base = fontkitten.create(buf);
  const coords = base.fvar.axis.map((a) => (a.axisTag.trim() === 'wght' ? wght : a.defaultValue));
  const font = new base.constructor(new base.stream.constructor(buf), coords);
  const vary = font._variationProcessor;
  base._transformGlyfTable();
  font._transformedGlyphs = base._transformedGlyphs.map((g, gid) => {
    if (!(g.numberOfContours > 0)) return g; // composites reuse the varied component outlines
    const Point = g.points[0].constructor;
    const pts = g.points.map((p) => p.copy());
    const advance = base.getGlyph(gid).advanceWidth;
    // gvar deltas also cover the four phantom (metrics) points
    pts.push(new Point(false, true, 0, 0), new Point(false, true, advance, 0), new Point(false, true, 0, 0), new Point(false, true, 0, 0));
    vary.transformPoints(gid, pts);
    return { ...g, points: pts.slice(0, -4) };
  });
  fontCache.set(key, font);
  return font;
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Returns an SVG fragment for one line of text.
 * `tracking` is in em (like CSS letter-spacing); `anchor` is 'start' or 'end'.
 */
async function text(str, { x, y, size, family = 'sans', weight = 400, fill = C.ink, tracking = 0, anchor = 'start' }) {
  if (fontkitten) {
    try {
      const font = await geist(family, weight);
      const scale = size / font.unitsPerEm;
      const glyphs = font.glyphsForString(str);
      const advances = glyphs.map((g) => g.advanceWidth * scale + tracking * size);
      const width = advances.reduce((a, b) => a + b, 0) - tracking * size;
      let pen = anchor === 'end' ? x - width : x;
      let d = '';
      glyphs.forEach((g, i) => {
        d += g.path.scale(scale, -scale).translate(pen, y).toSVG();
        pen += advances[i];
      });
      return `<path fill="${fill}" d="${d}"/>`;
    } catch (err) {
      console.warn(`Geist outline rendering failed (${err.message}) — using system fonts`);
      fontkitten = null;
    }
  }
  return `<text x="${x}" y="${y}" font-family="${SYSTEM_FALLBACK[family]}" font-size="${size}" font-weight="${weight}" letter-spacing="${tracking * size}" text-anchor="${anchor}" fill="${fill}">${esc(str)}</text>`;
}

/* ── T568B stripe (pin 1 → 8), same pattern as src/components/ui/Stripe.astro ── */
function stripe(x, y, width, height) {
  const pins = [
    ['tracer', C.orange],
    ['solid', C.orange],
    ['tracer', C.green],
    ['solid', C.blue],
    ['tracer', C.blue],
    ['solid', C.green],
    ['tracer', C.brown],
    ['solid', C.brown],
  ];
  const w = width / 8;
  let defs = '';
  let body = '';
  pins.forEach(([kind, color], i) => {
    const px = x + i * w;
    if (kind === 'solid') {
      body += `<rect x="${px}" y="${y}" width="${w}" height="${height}" fill="${color}"/>`;
    } else {
      const id = `tracer-${i}`;
      // 6px white, 3px color at -45° (matches the CSS repeating-linear-gradient)
      defs += `<pattern id="${id}" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="9" height="9" fill="${C.white}"/><rect x="6" width="3" height="9" fill="${color}"/></pattern>`;
      body += `<rect x="${px}" y="${y}" width="${w}" height="${height}" fill="url(#${id})"/>`;
    }
  });
  return { defs, body };
}

/* ── Share card ───────────────────────────────────────────── */
async function ogImage() {
  const W = 1200;
  const H = 630;
  const M = 72; // outer margin
  const logoH = 80;
  const logo = await sharp(LOGO).trim().resize({ height: logoH }).png().toBuffer();
  const { width: logoW } = await sharp(logo).metadata();
  const logoTop = 52;
  const hairY = logoTop + logoH + 30;

  const headSize = 112;
  const headTrack = -0.045;
  const headX = M - 5; // optical alignment of the "I"/"d" stems with the margin
  const line1Y = hairY + 142;
  const line2Y = line1Y + Math.round(headSize * 0.98);
  const stripeH = 12;
  const s = stripe(0, H - stripeH, W, stripeH);
  const footY = H - stripeH - 38;
  const head = { size: headSize, weight: 600, tracking: headTrack };

  // Second line ends in a signal-red full stop (the site's .t-accent), placed after the measured line
  const line2 = 'the future';
  const line2W = await geistWidth(line2, headSize, 600, headTrack);

  const parts = await Promise.all([
    text(`EST. ${FOUNDED} · ${site.hq.city.toUpperCase()}, ${site.hq.region}`, {
      x: W - M, y: logoTop + logoH / 2 + 7, size: 19, family: 'mono', weight: 500, fill: C.steel, tracking: 0.08, anchor: 'end',
    }),
    text('Built for', { x: headX, y: line1Y, ...head }),
    line2W == null
      ? text(`${line2}.`, { x: headX, y: line2Y, ...head })
      : text(line2, { x: headX, y: line2Y, ...head }),
    line2W == null
      ? ''
      : text('.', { x: headX + line2W + headTrack * headSize, y: line2Y, ...head, fill: C.signal }),
    text('LOW-VOLTAGE · NETWORKING · SECURITY · SOUTHERN CALIFORNIA', {
      x: M, y: line2Y + 74, size: 21, family: 'mono', weight: 500, fill: C.steel, tracking: 0.08,
    }),
    text(new URL(site.url).host, { x: M, y: footY, size: 25, weight: 500 }),
    text(site.phone, { x: W - M, y: footY, size: 23, family: 'mono', weight: 500, tracking: 0.02, anchor: 'end' }),
  ]);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>${s.defs}</defs>
  <rect width="${W}" height="${H}" fill="${C.paper}"/>
  <rect x="${M}" y="${hairY}" width="${W - 2 * M}" height="1" fill="${C.hairline}"/>
  ${parts.filter(Boolean).join('\n  ')}
  ${s.body}
</svg>`;

  await sharp(Buffer.from(svg))
    .composite([{ input: logo, left: M, top: logoTop }])
    .png({ compressionLevel: 9 })
    .toFile(`${OUT}/og-image.png`);
  console.log(`og-image.png         ${W}x${H} (logo ${logoW}x${logoH})`);
}

/** Width of a Geist line in px, or null when falling back to system fonts. */
async function geistWidth(str, size, weight, tracking) {
  if (!fontkitten) return null;
  try {
    const font = await geist('sans', weight);
    const scale = size / font.unitsPerEm;
    const glyphs = font.glyphsForString(str);
    return glyphs.reduce((w, g) => w + g.advanceWidth * scale + tracking * size, 0) - tracking * size;
  } catch {
    return null;
  }
}

/* ── Icon mark: the logo's red "A" + globe, without the swoosh or the rest of the wordmark ── */
async function mark() {
  // Measured on armak-logo-hd.png (1154×384): the "A" spans x 171–410, the globe is centered
  // at (267, 230) with r ≈ 47. Everything else in that box (swoosh, the "r") is dropped.
  const box = { left: 165, top: 0, width: 250, height: 300 };
  const globe = { cx: 267 - box.left, cy: 230.5 - box.top, r: 49 };
  const { data, info } = await sharp(LOGO).extract(box).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4;
      const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
      const red = r - Math.max(g, b); // >0 on the red "A", ~0 or negative on the blue/grey swoosh
      const dist = Math.hypot(x - globe.cx, y - globe.cy);
      const inGlobe = dist <= globe.r ? 1 : dist <= globe.r + 1.5 ? (globe.r + 1.5 - dist) / 1.5 : 0;
      const keep = Math.max(Math.min(1, Math.max(0, (red - 40) / 80)), inGlobe);
      data[i + 3] = Math.round(data[i + 3] * keep);
    }
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 1 })
    .png()
    .toBuffer();
}

/** Square icon: the mark centered at `fill` of the height, on transparent or paper. */
async function icon(markPng, size, { fill = 0.9, background = null } = {}) {
  const inner = Math.round(size * fill);
  const resized = await sharp(markPng)
    .resize({ width: inner, height: inner, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' })
    .png()
    .toBuffer();
  const offset = Math.round((size - inner) / 2);
  return sharp({
    create: { width: size, height: size, channels: 4, background: background ?? { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: resized, left: offset, top: offset }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** PNG-compressed .ico (supported by every browser since IE Vista-era). */
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, png } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4); // planes
    e.writeUInt16LE(32, 6); // bpp
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += png.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.png)]);
}

async function icons() {
  const m = await mark();
  const paper = C.paper;

  const small = await Promise.all([16, 32, 48].map(async (size) => ({ size, png: await icon(m, size, { fill: 0.94 }) })));
  await writeFile(`${OUT}/favicon.ico`, ico(small));
  await writeFile(`${OUT}/favicon-32.png`, small.find((s) => s.size === 32).png);
  await writeFile(`${OUT}/apple-touch-icon.png`, await icon(m, 180, { fill: 0.7, background: paper }));
  // 192 doubles as the rel="icon" Google Search picks up (it wants a multiple of 48 px)
  await writeFile(`${OUT}/icon-192.png`, await icon(m, 192, { fill: 0.78, background: paper }));
  await writeFile(`${OUT}/icon-512.png`, await icon(m, 512, { fill: 0.78, background: paper }));
  console.log('favicon.ico          16/32/48');
  console.log('favicon-32.png, apple-touch-icon.png (180), icon-192.png, icon-512.png');
}

async function schemaLogo() {
  await sharp(LOGO)
    .trim()
    .extend({ top: 24, bottom: 24, left: 24, right: 24, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(`${OUT}/logo.png`);
  const meta = await sharp(`${OUT}/logo.png`).metadata();
  console.log(`logo.png             ${meta.width}x${meta.height}`);
}

await ogImage();
await icons();
await schemaLogo();
