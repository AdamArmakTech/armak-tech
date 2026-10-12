/**
 * Merges the five alphabet-range files into one validated glossary.
 *  - Duplicate slugs fail the build (two entries can't share a URL anchor).
 *  - `related` links to terms that don't exist are dropped (and logged) rather than shipped broken.
 */
import type { GlossaryCategory, GlossaryEntry } from './types';
import { entries as ac } from './a-c';
import { entries as dh } from './d-h';
import { entries as in_ } from './i-n';
import { entries as or } from './o-r';
import { entries as sz } from './s-z';

export type { GlossaryEntry, GlossaryCategory } from './types';

const sortKey = (term: string) => term.toLowerCase().replace(/[^a-z0-9]/g, '');

const all = [...ac, ...dh, ...in_, ...or, ...sz].sort((a, b) => sortKey(a.term).localeCompare(sortKey(b.term), 'en', { numeric: true }));

const seen = new Set<string>();
for (const e of all) {
  if (seen.has(e.slug)) throw new Error(`[glossary] duplicate slug "${e.slug}" (${e.term})`);
  seen.add(e.slug);
}

const dangling: string[] = [];
export const glossary: GlossaryEntry[] = all.map((e) => {
  const related = (e.related ?? []).filter((s) => {
    const ok = seen.has(s) && s !== e.slug;
    if (!ok) dangling.push(`${e.slug} → ${s}`);
    return ok;
  });
  return { ...e, related };
});

if (dangling.length) console.warn(`[glossary] dropped ${dangling.length} related link(s) to missing terms: ${dangling.join(', ')}`);

export const bySlug = new Map(glossary.map((e) => [e.slug, e]));

/** "#" for terms starting with a digit, otherwise the uppercase first letter */
export const letterOf = (term: string) => {
  const c = term.trim()[0]?.toUpperCase() ?? '#';
  return /[A-Z]/.test(c) ? c : '#';
};

export const alphabet = ['#', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

export const groups = alphabet
  .map((letter) => ({ letter, entries: glossary.filter((e) => letterOf(e.term) === letter) }))
  .filter((g) => g.entries.length > 0);

export const categoryLabels: Record<GlossaryCategory, string> = {
  cabling: 'Cabling',
  networking: 'Networking',
  security: 'Video & security',
  access: 'Access control',
  voice: 'Voice',
  av: 'Audio & video',
  power: 'Power',
  standards: 'Standards',
  general: 'General',
};
