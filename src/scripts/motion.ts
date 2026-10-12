/**
 * ARMAK — site-wide motion.
 *
 *  [data-reveal]          fade/rise in once when scrolled into view
 *  [data-reveal-stagger]  on a parent: children with [data-reveal] get staggered delays
 *  [data-split]           heading reveals line-by-line (GSAP SplitText, loaded on demand)
 *  [data-count]           number counts up once when scrolled into view
 *
 * Everything is skipped under prefers-reduced-motion; content is always present in HTML.
 */
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

declare global {
  interface Window {
    /** Shared smooth-scroll instance so other scripts (e.g. the mobile menu) can stop/start it */
    armakLenis?: Lenis;
  }
}

const root = document.documentElement;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function showEverything() {
  document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-revealed'));
  document.querySelectorAll('[data-split]').forEach((el) => el.classList.add('is-split'));
}

function initReveals() {
  document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((group) => {
    const step = Number(group.dataset.revealStagger) || 80;
    group.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
      el.style.setProperty('--reveal-delay', `${i * step}ms`);
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
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

async function initSplitHeadings(lenis: Lenis) {
  const headings = document.querySelectorAll<HTMLElement>('[data-split]');
  if (!headings.length) return;

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

  if (reduceMotion) {
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
