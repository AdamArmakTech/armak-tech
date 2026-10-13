/**
 * Shared helpers for the animated "process" demos (Assess, Design, Install, Support) and the cable test.
 *
 *   const run = createRun(async (alive) => { …; await sleep(300); if (!alive()) return; … });
 *   onFirstView(root, run);          // play once when ~35% visible
 *   bindReplay(root, run);           // [data-demo-replay] buttons replay
 *   fitSvgText(root);                // keep labels in svg[data-fit-text] readable when scaled down
 *
 * Under prefers-reduced-motion, demos should skip animation and show their finished state.
 */

export const reduceMotion =
  typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Wraps an async animation so starting it again cancels the previous run (check `alive()` after every await). */
export function createRun(play: (alive: () => boolean) => Promise<void> | void) {
  let id = 0;
  return () => {
    const mine = ++id;
    return play(() => mine === id);
  };
}

/**
 * Calls `cb` once, the first time `el` is at least `threshold` visible.
 * Inside the Process stepper ([data-steps]) the stepper starts demos itself, so this does nothing
 * there — otherwise a demo would start twice and visibly restart.
 */
export function onFirstView(el: Element, cb: () => void, threshold = 0.35) {
  if (el.closest('[data-steps]')) return;
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      cb();
    },
    { threshold },
  );
  io.observe(el);
}

/** Wires every [data-demo-replay] button inside `root` to `cb`. */
export function bindReplay(root: Element, cb: () => void) {
  root.querySelectorAll('[data-demo-replay]').forEach((b) => b.addEventListener('click', cb));
}

/** Writes a short status line into the frame's polite live region (for screen readers). */
export function announce(root: Element, text: string) {
  const live = root.querySelector('[data-demo-live]');
  if (live) live.textContent = text;
}

/**
 * Keeps SVG labels readable when a drawing is scaled down (phones) or up (wide screens).
 * Sets `--u` on every `svg[data-fit-text]` inside `root` to the number of viewBox units per CSS
 * pixel, so CSS can size text in screen pixels, within limits that fit the drawing:
 *
 *   font-size: clamp(8px, calc(var(--u, 1) * 9.5px), 12px);   // ≈ 9.5 px on screen
 *
 * Without JS `--u` falls back to the value in CSS (1, or a phone value set by a container query).
 */
export function fitSvgText(root: ParentNode) {
  const svgs = [...root.querySelectorAll<SVGSVGElement>('svg[data-fit-text]')];
  if (!svgs.length || typeof ResizeObserver === 'undefined') return;
  const units = new Map(svgs.map((svg) => [svg as Element, svg.viewBox.baseVal?.width || 0]));
  const ro = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const vb = units.get(entry.target);
      const w = entry.contentRect.width;
      if (vb && w > 0) (entry.target as SVGSVGElement).style.setProperty('--u', (vb / w).toFixed(3));
    }
  });
  svgs.forEach((svg) => ro.observe(svg));
}
