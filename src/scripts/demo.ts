/**
 * Shared helpers for the animated "process" demos (Assess, Design, Install, Support).
 *
 *   const run = createRun(async (alive) => { …; await sleep(300); if (!alive()) return; … });
 *   onFirstView(root, run);          // play once when ~35% visible
 *   bindReplay(root, run);           // [data-demo-replay] buttons replay
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
