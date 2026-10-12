/**
 * ARMAK TECHNOLOGIES — Component-Centric JS Orchestrator
 * Uses IntersectionObserver to lazy-load heavy component logic only when needed.
 */

import { initLoader } from './core/loader.js';
import { initScrollProgress } from './core/scroll-progress.js';
import { initSectionDots } from './core/section-dots.js';
import { initNav } from './core/nav.js';
import { initReveals } from './core/reveals.js';

// 1. Initialize Critical Core UI
initLoader();
initScrollProgress();
initSectionDots();
initNav();
initReveals();

// 2. Component Lazy-Loading Configuration
const componentConfig = [
  { selector: '.armak-hero',     module: () => import('./components/hero.js'),     init: m => m.initHero() },
  { selector: '.armak-stats',    module: () => import('./components/stats.js'),    init: m => m.initStats() },
  { selector: '.armak-trust',    module: () => import('./components/trust.js'),    init: m => m.initTrust() },
  { selector: '.armak-services', module: () => import('./components/services.js'), init: m => m.initServices() },
  { selector: '.armak-about',    module: () => import('./components/about.js'),    init: m => m.initAbout() },
  { selector: '.armak-cta',      module: () => import('./components/cta.js'),      init: m => m.initCTA() }
];

// 3. Orchestration
function initComponentLoader() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: Load everything if observer is unsupported
    componentConfig.forEach(c => c.module().then(m => c.init(m)));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '150px 0px', // Load slightly before they enter the viewport
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const config = componentConfig.find(c => c.el === entry.target);
        if (config && !config.loaded) {
          config.loaded = true;
          config.module().then(m => {
            config.init(m);
            console.log(`[Armak] Loaded module for: ${config.selector}`);
          }).catch(err => console.error(`[Armak] Failed to load module ${config.selector}:`, err));
          observer.unobserve(entry.target);
        }
      }
    });
  }, observerOptions);

  componentConfig.forEach(config => {
    const el = document.querySelector(config.selector);
    if (el) {
      config.el = el;
      observer.observe(el);
    }
  });
}

// Boot the loader
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComponentLoader);
} else {
  initComponentLoader();
}
