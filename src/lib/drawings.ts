/**
 * The generic product drawings in src/assets/products/ (owner, 2026-11-06: generic devices, no brand or logo,
 * one drawing style), as text ready to inline into a page. Inlined, they stay crisp at any size and keep their
 * own role="img" and <title>. Used by the service pages' product sheet (ProductBand.astro) and the About page's
 * "What we install" band.
 *
 * A glob rather than static imports, so a drawing that is not there yet leaves a gap (callers warn) instead of
 * breaking the whole site.
 */
const drawings = import.meta.glob<string>('../assets/products/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/** Prefix every id (and each url(#…) / href="#…" that uses it): several inline drawings share one page. */
function scopeIds(svg: string, prefix: string): string {
  const ids = [...svg.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  let out = svg;
  for (const id of ids) {
    const esc = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    out = out
      .replace(new RegExp(`\\sid="${esc}"`, 'g'), ` id="${prefix}-${id}"`)
      .replace(new RegExp(`url\\(#${esc}\\)`, 'g'), `url(#${prefix}-${id})`)
      .replace(new RegExp(`href="#${esc}"`, 'g'), `href="#${prefix}-${id}"`);
  }
  return out;
}

/** Drop the XML prolog and comments (not valid inside an HTML page), then scope the ids. */
function inlineSvg(raw: string, prefix: string): string {
  const clean = raw
    .replace(/<\?xml[^>]*\?>/g, '')
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim();
  return scopeIds(clean, prefix);
}

/**
 * The drawing for a product file name (without .svg), ready for set:html; its ids carry `prefix` so several
 * drawings can share a page. Undefined when there is no such file.
 */
export function productDrawing(file: string, prefix = file): string | undefined {
  const key = Object.keys(drawings).find((k) => k.endsWith(`/${file}.svg`));
  return key ? inlineSvg(drawings[key], prefix) : undefined;
}
