/**
 * Shared helpers for the animated "process" demos (Assess, Design, Install, Support) and the cable test.
 *
 *   const run = createRun(async (alive) => { …; await sleep(300); if (!alive()) return; … });
 *   onFirstView(root, run);          // play once when ~35% visible
 *   bindReplay(root, run);           // [data-demo-replay] buttons replay
 *   fitSvgText(root);                // keep labels in svg[data-fit-text] readable when scaled down
 *
 * Timing helpers for richer sequences (added 2026-11-06, see ai/notes/2026-11-06-demo-motion.md):
 *
 *   frames(ms, (t) => …, alive)      // one requestAnimationFrame loop, t from 0 to 1
 *   countTo(el, 47.2, 600, (v) => `${v.toFixed(1)} m`, alive)   // a readout counting up
 *   moveAlong(el, points, times)     // one Web Animation moving an SVG element along a polyline
 *   bezierPoints(p0, p1, p2, p3)     // points along a curved cable, for moveAlong
 *
 * The site's rule for anything with several states (owner, 2026-11-06 night):
 *
 *   const auto = autoPlay(root, { start, stop });   // runs by itself on screen; a press stops it; back on
 *                                                   // screen it starts again; the mouse pointer changes nothing
 *
 * Under prefers-reduced-motion, demos should skip animation and show their finished state.
 */

/** True when the visitor's device asks for less motion. A function, so each caller reads the current setting at the moment it decides. */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
 * Tells the page that a demo has played to its end. The Process stepper (src/components/home/Process.astro)
 * listens for this on the active step and moves on to the next step after a short hold.
 */
export function finished(root: Element) {
  root.dispatchEvent(new CustomEvent('armak:demo-done', { bubbles: true }));
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

/* ── Timing helpers ─────────────────────────────────────────────────────────────────────── */

/** Easing for values driven from script. Same shapes as the CSS tokens --ease-out and --ease-in-out. */
export const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);
export const easeOutExpo = (t: number): number => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
export const easeInOut = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Sets a timer that only fires while the run it belongs to is still the current one. */
export function at(ms: number, alive: () => boolean, fn: () => void) {
  setTimeout(() => {
    if (alive()) fn();
  }, ms);
}

/**
 * Calls `frame(t)` on every animation frame for `ms`, with t going from 0 to 1 (the last call is
 * exactly 1). Resolves at the end, or at once when `alive()` turns false. One loop per call: keep
 * the work in `frame` tiny (one text node, one attribute), so it never competes with scrolling.
 */
export function frames(ms: number, frame: (t: number) => void, alive: () => boolean = () => true): Promise<void> {
  return new Promise<void>((resolve) => {
    const start = performance.now();
    const tick = (now: number) => {
      if (!alive()) return resolve();
      const t = Math.min(1, (now - start) / ms);
      frame(t);
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });
}

/**
 * Counts a readout from `from` to `to` over `ms`, writing `format(value)` into `el`. Eases out, so the
 * last digits settle slowly, the way a meter comes to rest. Use tabular or mono figures so the text
 * does not jitter. Resolves when done; stops quietly if `alive()` turns false.
 */
export function countTo(
  el: Element,
  to: number,
  ms: number,
  format: (v: number) => string = (v) => String(Math.round(v)),
  alive: () => boolean = () => true,
  from = 0,
): Promise<void> {
  return frames(ms, (t) => (el.textContent = format(from + (to - from) * easeOutExpo(t))), alive);
}

/**
 * Moves an SVG element along straight segments between `points` (viewBox units) with ONE Web Animation
 * on `transform`, so the browser moves it without any script running per frame. `times[i]` is when, in
 * ms from the start, the element reaches `points[i]`; repeat a point with a later time to pause there.
 * The element must be drawn at the origin (cx="0" cy="0" or x/y 0), because the transform places it.
 * Cancel the returned Animation on reset; call `commitFinal` when it should stay where it ended.
 */
export function moveAlong(el: Element, points: [number, number][], times: number[], easing = 'linear'): Animation {
  const total = times[times.length - 1] || 1;
  const keyframes = points.map(([x, y], i) => ({
    transform: `translate(${x}px, ${y}px)`,
    offset: Math.min(1, Math.max(0, times[i] / total)),
    easing,
  }));
  return el.animate(keyframes, { duration: total, fill: 'both' });
}

/** Times for moveAlong: a walk along `points` at `speed` viewBox units per second, pausing `pause` ms at every inner point and `lastPause` ms at the end. Returns pairs [arrive, leave] per point. */
export function walkSchedule(points: [number, number][], speed: number, pause: number, start = 0): { arrive: number; leave: number }[] {
  const out: { arrive: number; leave: number }[] = [{ arrive: start, leave: start }];
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const arrive = out[i - 1].leave + (Math.hypot(x1 - x0, y1 - y0) / speed) * 1000;
    out.push({ arrive, leave: arrive + pause });
  }
  return out;
}

/** `n + 1` points along a cubic Bézier (the shape every curved cable in the demos is drawn with), for moveAlong. */
export function bezierPoints(
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  n = 12,
): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const u = 1 - t;
    const a = u * u * u;
    const b = 3 * u * u * t;
    const c = 3 * u * t * t;
    const d = t * t * t;
    pts.push([a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]]);
  }
  return pts;
}

/** Evenly spaced times (ms) for `n` points over `ms`, starting at `start`: pairs with bezierPoints / straight runs. */
export function evenTimes(n: number, ms: number, start = 0): number[] {
  return Array.from({ length: n }, (_, i) => start + (ms * i) / (n - 1 || 1));
}


/* ── The site's rule for anything with several states ──────────────────────────────────────────────────────
 * Owner, 2026-11-06 night, about the five steps: "these should load in a sequence and if someone presses on
 * any of the buttons the sequence should stop but when you scroll on it, it should naturally start animating
 * and when the animation ends it moves onto the next one naturally. the whole site needs to be like this."
 *
 * So a piece with several states (the step strip, the building explorer) runs by itself as it scrolls into
 * view and moves on when each state's motion ends; a press on a control inside it stops that, because the
 * visitor is now in charge; once it scrolls out of view and comes back, it starts again from where it is;
 * hovering never stops it. Under reduced motion it never runs by itself.
 */

/** The controls whose press hands a piece over to the visitor. A scroll, or a tap on a drawing, does not. */
export const CONTROLS = 'button, a, input, select, textarea, summary, [role="slider"], [role="button"], [role="tab"]';

export interface AutoPlay {
  /** True while the piece should run by itself: on screen, not handed over, motion allowed */
  readonly on: boolean;
  /** Hand the piece over to the visitor: it stops until it has left the screen and come back */
  takeOver(): void;
}

/**
 * `start()` is called when the piece should run by itself (it has just come on screen, or come back after a
 * hand-over); `stop()` when it should not (it left the screen, or a control was pressed). "On screen" means
 * overlapping the middle 60% of the viewport, so a piece taller than the screen (a stacked phone row) still
 * counts, and a piece just peeking in at the bottom edge does not.
 */
export function autoPlay(
  root: HTMLElement,
  {
    start,
    stop,
    controls = CONTROLS,
    rootMargin = '-20% 0px -20% 0px',
  }: { start: () => void; stop: () => void; controls?: string; rootMargin?: string },
): AutoPlay {
  let inView = false;
  let manual = false;
  const on = () => inView && !manual && !prefersReducedMotion();

  const takeOver = () => {
    if (manual) return;
    manual = true;
    root.classList.add('is-manual');
    stop();
  };

  // A press on a control inside the piece. Keys count too, except the ones that only move focus through it.
  root.addEventListener('pointerdown', (e) => {
    if ((e.target as Element).closest?.(controls)) takeOver();
  });
  root.addEventListener('keydown', (e) => {
    if (['Tab', 'Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return;
    takeOver();
  });

  if (typeof IntersectionObserver !== 'undefined') {
    new IntersectionObserver(
      ([entry]) => {
        const was = inView;
        inView = entry.isIntersecting;
        if (inView && !was) {
          if (on()) start();
        } else if (!inView && was) {
          // Gone from the screen: forget the hand-over, so the next arrival starts it again
          manual = false;
          root.classList.remove('is-manual');
          stop();
        }
      },
      { threshold: 0, rootMargin },
    ).observe(root);
  }

  return {
    get on() {
      return on();
    },
    takeOver,
  };
}
