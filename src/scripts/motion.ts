/**
 * ARMAK — site-wide motion.
 *
 *  [data-reveal]          reveals once when scrolled into view. The value picks the motion:
 *                           rise (default)  fade in while lifting --reveal-y (24px, 16px on phones)
 *                           fade            opacity only (breadcrumbs, logos, quiet lines)
 *                           clip            a masked wipe upward (photos, figures)
 *                           scale           settles from 0.98 to 1 (sheets, cards, panels)
 *                           draw            rise, and the strokes of any inline SVG inside draw themselves
 *  [data-reveal-group]    on a parent: its direct children reveal one after another, top to bottom,
 *                         --reveal-step apart (70 ms, 50 ms on phones), never more than 8 steps. The value
 *                         is the variant the children use; data-reveal-step="60" changes the gap for that
 *                         group. Children are hidden by CSS before this script runs, so nothing flashes.
 *  [data-split]           heading reveals line-by-line (GSAP SplitText, loaded on demand)
 *  [data-count]           number counts up once when scrolled into view
 *
 * Everything is skipped under prefers-reduced-motion; content is always present in HTML, and a CSS
 * failsafe shows it after 2.5 s if this script never runs. The matching CSS is in src/styles/global.css.
 */
import Lenis from 'lenis';
import { prefersReducedMotion } from './demo';
import 'lenis/dist/lenis.css';

declare global {
  interface Window {
    /** Shared smooth-scroll instance so other scripts (e.g. the mobile menu) can stop/start it */
    armakLenis?: Lenis;
  }
}

const root = document.documentElement;

/** Everything waiting to reveal: marked elements plus the children of a group */
const REVEAL_SELECTOR = '[data-reveal], [data-reveal-group] > *';

/* Phones get a quicker cascade and reveal almost as soon as an edge enters, so a fast scroll never
   leaves a blank screen. The lift, the duration and the gap between items are CSS tokens
   (--reveal-y, --reveal-dur, --reveal-step in global.css); only the cap on the cascade lives here. */
const phone = matchMedia('(max-width: 640px)').matches;
const CAP = phone ? 6 : 8; // a long list never waits more than this many steps
const STROKE_STEP = 90; // ms between strokes inside one "draw" element

function showEverything() {
  document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => el.classList.add('is-revealed'));
  document.querySelectorAll('[data-split]').forEach((el) => el.classList.add('is-split'));
}

/** A time token from the stylesheet (--reveal-dur, --reveal-step) in ms, so script and CSS never drift apart */
function cssMs(name: string, fallback: number): number {
  const raw = getComputedStyle(root).getPropertyValue(name).trim();
  const n = parseFloat(raw);
  if (!n) return fallback;
  return raw.endsWith('ms') ? n : n * 1000;
}

/**
 * "draw": measure every stroked shape inside the element and hide it along its own length. The gap in
 * the dash pattern is longer than the shape, and the offset leaves one stroke-width of margin, so a
 * round line cap cannot show as a dot at the start. Returns how many strokes were prepared.
 */
function prepareStrokes(el: HTMLElement): number {
  let n = 0;
  el.querySelectorAll<SVGGeometryElement>('svg :is(path, line, polyline, polygon, circle, ellipse, rect)').forEach((shape) => {
    if (typeof shape.getTotalLength !== 'function') return;
    const cs = getComputedStyle(shape);
    if (cs.stroke === 'none' || cs.strokeDasharray !== 'none') return; // filled, or already dashed on purpose
    let len = 0;
    try {
      len = shape.getTotalLength();
    } catch {
      return;
    }
    if (!len) return;
    const w = parseFloat(cs.strokeWidth) || 2;
    shape.classList.add('reveal-stroke');
    shape.style.strokeDasharray = `${len} ${len + 2 * w}`;
    shape.style.strokeDashoffset = `${len + w}`;
    shape.style.setProperty('--stroke-i', String(n++));
  });
  return n;
}

function drawStrokes(el: HTMLElement) {
  el.querySelectorAll<SVGElement>('.reveal-stroke').forEach((shape) => {
    shape.style.strokeDashoffset = '0';
  });
}

/** Once drawn, the shapes go back to plain SVG so nothing else about them is affected */
function cleanStrokes(el: HTMLElement) {
  el.querySelectorAll<SVGElement>('.reveal-stroke').forEach((shape) => {
    shape.classList.remove('reveal-stroke');
    shape.style.removeProperty('stroke-dasharray');
    shape.style.removeProperty('stroke-dashoffset');
    shape.style.removeProperty('--stroke-i');
  });
}

function initReveals() {
  // Children of a group inherit its variant unless they carry their own data-reveal
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const variant = group.dataset.revealGroup || 'rise';
    for (const child of Array.from(group.children)) {
      if (!child.hasAttribute('data-reveal')) child.setAttribute('data-reveal', variant);
    }
  });

  const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!targets.length) return;

  const dur = cssMs('--reveal-dur', 900);
  const step = cssMs('--reveal-step', phone ? 50 : 70);
  const strokes = new Map<HTMLElement, number>();
  for (const el of targets) {
    if (el.dataset.reveal === 'draw') strokes.set(el, prepareStrokes(el));
  }

  const stepFor = (el: HTMLElement) => {
    const parent = el.parentElement;
    const own = parent?.hasAttribute('data-reveal-group') ? Number(parent.dataset.revealStep) : 0;
    return own > 0 ? own : step;
  };

  /* The transition rule lives on .is-revealing only while the reveal plays, so a component's own
     hover or press transition (buttons, cards, logos) comes back untouched afterwards. */
  const reveal = (el: HTMLElement, delay: number) => {
    const n = strokes.get(el) ?? 0;
    if (delay > 0) el.style.setProperty('--reveal-delay', `${delay}ms`);
    el.classList.add('is-revealing', 'is-revealed');
    if (n) drawStrokes(el);
    window.setTimeout(
      () => {
        el.classList.remove('is-revealing');
        el.style.removeProperty('--reveal-delay');
        if (n) cleanStrokes(el);
      },
      delay + dur + Math.max(0, n - 1) * STROKE_STEP + 80,
    );
  };

  /* Already scrolled past (a reload mid-page, a #section link): shown at once, without motion */
  const showNow = (el: HTMLElement) => {
    el.classList.add('is-revealed');
    if (strokes.get(el)) cleanStrokes(el);
  };

  /* Two observers, one answer. "line": the top edge has passed a line a little above the bottom of the
     screen, so a block starts as it enters and never has to be fully visible. "full": the whole block
     is inside the real viewport, which catches what the line can never reach, such as the last rows of
     the footer at the end of a page, and short pages that cannot scroll. Entries from both are pooled
     until the current task ends (a zero timer, which also runs in a hidden tab, unlike an animation
     frame), so each pass makes one cascade, top to bottom, left to right. */
  const pending = new Set<HTMLElement>(targets);
  const pool: IntersectionObserverEntry[] = [];
  let flushQueued = false;

  const release = (el: HTMLElement) => {
    pending.delete(el);
    line.unobserve(el);
    full.unobserve(el);
  };

  const flush = () => {
    flushQueued = false;
    const batch: { el: HTMLElement; row: number; left: number }[] = [];
    for (const entry of pool.splice(0)) {
      const el = entry.target as HTMLElement;
      if (!pending.has(el)) continue;
      const r = entry.boundingClientRect;
      if (entry.isIntersecting) {
        release(el);
        batch.push({ el, row: Math.round(r.top / 24), left: r.left });
      } else if (r.bottom <= 0 && r.height > 0) {
        release(el);
        showNow(el);
      }
    }
    if (!batch.length) return;
    batch.sort((a, b) => a.row - b.row || a.left - b.left);
    batch.forEach(({ el }, i) => reveal(el, Math.min(i, CAP) * stepFor(el)));
  };

  const collect = (entries: IntersectionObserverEntry[]) => {
    pool.push(...entries);
    if (flushQueued) return;
    flushQueued = true;
    window.setTimeout(flush, 0);
  };

  const line = new IntersectionObserver(collect, {
    rootMargin: phone ? '0px 0px -5% 0px' : '0px 0px -10% 0px',
    threshold: 0,
  });
  // 0.99, not 1: sub-pixel layouts can keep the ratio a hair under 1 for a block that is in fact all on screen
  const full = new IntersectionObserver(collect, { threshold: 0.99 });

  targets.forEach((el) => {
    line.observe(el);
    full.observe(el);
  });
}

function initCounters() {
  const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        const el = entry.target as HTMLElement;
        const target = Number(el.dataset.count);
        const duration = 1600;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          el.textContent = Math.round(target * easeOutExpo(p)).toLocaleString('en-US');
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    },
    { threshold: 0.6 },
  );

  document.querySelectorAll('[data-count]').forEach((el) => io.observe(el));
}

/**
 * Resolves once GSAP is worth downloading: a split heading is within one screen of the
 * viewport, or the page has finished loading and the browser is idle. Keeps ~50 KB of GSAP
 * off the critical path when every split heading starts below the fold (e.g. the homepage),
 * while headings near the top still load it straight away.
 */
function whenSplitNeeded(headings: NodeListOf<HTMLElement>) {
  return new Promise<void>((resolve) => {
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) go();
      },
      { rootMargin: '0px 0px 100% 0px' },
    );
    function go() {
      if (done) return;
      done = true;
      io.disconnect();
      resolve();
    }
    headings.forEach((el) => io.observe(el));

    const onIdle = () =>
      'requestIdleCallback' in window ? requestIdleCallback(go, { timeout: 2000 }) : setTimeout(go, 200);
    if (document.readyState === 'complete') onIdle();
    else addEventListener('load', onIdle, { once: true });
  });
}

async function initSplitHeadings(lenis: Lenis) {
  const headings = document.querySelectorAll<HTMLElement>('[data-split]');
  if (!headings.length) return;

  await whenSplitNeeded(headings);

  try {
    const [{ gsap }, { SplitText }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/SplitText'),
      import('gsap/ScrollTrigger'),
    ]);
    gsap.registerPlugin(SplitText, ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);

    // Split only after webfonts load, otherwise line breaks are measured with fallback metrics
    await document.fonts.ready;

    headings.forEach((el) => {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        linesClass: 'split-line',
        onSplit(self) {
          el.classList.add('is-split');
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        },
      });
    });
  } catch (err) {
    console.error('[armak] split headings failed', err);
    headings.forEach((el) => el.classList.add('is-split'));
  }
}

function boot() {
  root.classList.add('motion-ready');

  if (prefersReducedMotion()) {
    showEverything();
    return;
  }

  const lenis = new Lenis({ autoRaf: true, anchors: { offset: -80 }, lerp: 0.11 });
  window.armakLenis = lenis;
  initReveals();
  initCounters();
  initSplitHeadings(lenis);
}

boot();
