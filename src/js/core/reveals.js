import { reduceMotion } from '../utils/motion.js';

export function initReveals() {
  const reveals = document.querySelectorAll('.armak-reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('in-view'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Handle nested counters if any (fallback)
        const counter = entry.target.querySelector('.armak-count');
        if (counter && !counter.dataset.animated) {
          counter.dataset.animated = '1';
          if (window.armakAnimateCount) window.armakAnimateCount(counter);
        }
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

  reveals.forEach(el => io.observe(el));

  // Immediate hero reveal
  requestAnimationFrame(() => {
    document.querySelectorAll('.armak-hero .armak-reveal').forEach(el => {
      el.classList.add('in-view');
    });
  });
}
