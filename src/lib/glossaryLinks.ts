/**
 * Turns plain text into HTML where the first mention of each glossary term opens that
 * term in the glossary. Input is plain text (never HTML); output is escaped HTML.
 *
 * Rules:
 *  - Matches `term`, each `aka`, `stands_for`, and the pieces of terms written as
 *    "A / B" or "A (B)". Variants under 3 characters are skipped.
 *  - Whole words, longest match first. A trailing "s"/"es" is allowed on words.
 *  - All-caps acronyms (NEC, NEXT, POS, LAN, MAC...) match case-sensitively so ordinary
 *    words like "next" or "pos" never link. Everything else is case-insensitive.
 *  - Only the first mention of each term is linked, and at most `max` links per text
 *    (default 4). Everyday words that are also terms (drop, port, rack...) are lowest
 *    priority: they only get a link if the cap has room after the specific terms.
 */
import { glossary, bySlug } from '../data/glossary';

/** First sentence of a definition, at most 160 characters, cut at a sentence end (or at a word if one sentence is longer). */
function shortDef(raw: string): string {
  const t = raw.replace(/\s+/g, ' ').trim();
  const m = t.match(/^.*?[.!?](?=\s|$)/);
  const first = m ? m[0] : t;
  if (first.length <= 160) return first;
  const cut = first.slice(0, 159).replace(/\s+\S*$/, '').replace(/[,;:\s]+$/, '');
  return cut + '…';
}

export interface LinkOptions {
  max?: number;
  /** Names that must not link (e.g. the page's own service name). */
  exclude?: string[];
}

interface Variant {
  text: string;
  slug: string;
  caseSensitive: boolean;
  common: boolean;
  primary: boolean;
  order: number;
  re: RegExp;
}

/** Glossary terms that are also everyday words; linked only if there is room left. */
const COMMON = new Set(['drop', 'port', 'rack', 'pathway', 'termination', 'redundancy', 'splice', 'paging', 'egress', 'uplink', 'router', 'ethernet', 'jitter', 'latency', 'firewall', 'gbps', 'channel']);

/** Verbs/nouns that appear as an `aka` but are too ambiguous to link. They still match as a primary `term`. */
const AMBIGUOUS_AKA = new Set(['run', 'link', 'switch', 'channel']);

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');

function pieces(raw: string): string[] {
  const out = new Set<string>();
  const add = (s: string) => {
    const t = s.trim();
    if (t.length >= 3) out.add(t);
  };
  add(raw);
  for (const part of raw.split(/\s+\/\s+/)) {
    add(part);
    add(part.replace(/\s*\([^)]*\)/g, ''));
    for (const m of part.matchAll(/\(([^)]*)\)/g)) if (/^[A-Z0-9]{3,}$/.test(m[1])) add(m[1]);
  }
  return [...out];
}

let cache: Variant[] | null = null;
function variants(): Variant[] {
  if (cache) return cache;
  const all: Variant[] = [];
  let order = 0;
  glossary.forEach((e) => {
    const raws: { raw: string; primary: boolean }[] = [
      { raw: e.term, primary: true },
      ...(e.aka ?? []).map((raw) => ({ raw, primary: false })),
      ...(e.stands_for ? [{ raw: e.stands_for, primary: false }] : []),
    ];
    for (const { raw, primary } of raws) {
      for (const text of pieces(raw)) {
        const key = text.toLowerCase();
        if (!primary && AMBIGUOUS_AKA.has(key)) continue;
        const caseSensitive = /^[A-Z0-9][A-Z0-9.\-]*$/.test(text) && /[A-Z]/.test(text);
        const endsWord = /[A-Za-z]$/.test(text);
        const body = escapeRe(text);
        // A hyphen counts as a word character on both sides, so "Smart-card" or "push-to-exit" are never split.
        const suffix = endsWord ? (caseSensitive ? 's?' : '(?:e?s)?') : '';
        const re = new RegExp(`(?<![A-Za-z0-9-])${body}${suffix}(?![A-Za-z0-9-])`, caseSensitive ? '' : 'i');
        all.push({ text, slug: e.slug, caseSensitive, common: COMMON.has(key), primary, order: order++, re });
      }
    }
  });
  // Longer text first; on equal length a primary term beats an aka; then glossary order.
  all.sort((a, b) => b.text.length - a.text.length || Number(b.primary) - Number(a.primary) || a.order - b.order);
  const seen = new Set<string>();
  const list: Variant[] = [];
  for (const v of all) {
    const key = v.text.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    list.push(v);
  }
  cache = list;
  return list;
}

function linkWith(text: string, opts: LinkOptions, seenSlugs: Set<string>): string {
  const max = opts.max ?? 4;
  const blocked = new Set((opts.exclude ?? []).map(norm).filter(Boolean));
  type Hit = { start: number; end: number; slug: string; common: boolean };
  const hits: Hit[] = [];
  const usedSlugs = new Set<string>();

  for (const v of variants()) {
    if (usedSlugs.has(v.slug) || seenSlugs.has(v.slug)) continue;
    if (blocked.has(norm(v.text)) || blocked.has(norm(v.slug))) continue;
    const m = v.re.exec(text);
    if (!m) continue;
    const start = m.index;
    const end = start + m[0].length;
    if (hits.some((h) => start < h.end && end > h.start)) continue; // longest match already took this span
    hits.push({ start, end, slug: v.slug, common: v.common });
    usedSlugs.add(v.slug);
  }

  // Keep at most `max`: specific terms first, everyday words only if room remains.
  const byPos = (a: Hit, b: Hit) => a.start - b.start;
  const kept = [...hits.filter((h) => !h.common).sort(byPos), ...hits.filter((h) => h.common).sort(byPos)].slice(0, max).sort((a, b) => a.start - b.start);

  let out = '';
  let pos = 0;
  for (const h of kept) {
    out += escapeHtml(text.slice(pos, h.start));
    const entry = bySlug.get(h.slug);
    const attrs = entry ? ` data-slug="${h.slug}" data-term="${escapeHtml(entry.term)}" data-def="${escapeHtml(shortDef(entry.definition))}"` : '';
    out += `<a class="gl" href="/glossary/#${h.slug}"${attrs}>${escapeHtml(text.slice(h.start, h.end))}</a>`;
    pos = h.end;
    seenSlugs.add(h.slug);
  }
  return out + escapeHtml(text.slice(pos));
}

/** One linker per page: a term is linked only on its first mention across everything rendered through it. */
export function createPageLinker() {
  const seen = new Set<string>();
  return { link: (text: string, opts: LinkOptions = {}) => linkWith(text, opts, seen) };
}

/** Single-text version (no memory between calls). Kept for backwards compatibility. */
export function linkGlossaryTerms(text: string, opts: LinkOptions = {}): string {
  return linkWith(text, opts, new Set());
}

export default linkGlossaryTerms;
