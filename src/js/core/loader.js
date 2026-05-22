export function initLoader() {
  const loader = document.getElementById('armakLoader');
  const bar = document.getElementById('loaderBar');
  const label = document.getElementById('loaderLabel');
  const pct = document.getElementById('loaderPct');
  if (!loader) return;

  // Skip on subsequent visits within session
  if (sessionStorage.getItem('armakLoaded')) {
    loader.classList.add('is-skip');
    return;
  }

  let progress = 0;
  function set(p, text) {
    progress = Math.max(progress, p);
    bar.style.width = progress + '%';
    pct.textContent = Math.round(progress) + '%';
    if (text) label.textContent = text;
  }

  set(8, 'INITIALIZING');

  // Phase 1 — DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => set(28, 'PARSING DOM'));
  } else { set(28, 'PARSING DOM'); }

  // Phase 2 — Fonts ready
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => set(58, 'LOADING ASSETS'));
  } else { setTimeout(() => set(58, 'LOADING ASSETS'), 300); }

  // Phase 3 — Window load (images, scripts done)
  window.addEventListener('load', () => {
    set(88, 'COMPILING');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        set(100, 'READY');
        setTimeout(() => {
          loader.classList.add('is-done');
          sessionStorage.setItem('armakLoaded', '1');
        }, 380);
      });
    });
  });

  // Failsafe — if window load never fires within 4s
  setTimeout(() => {
    if (progress < 100) {
      set(100, 'READY');
      setTimeout(() => loader.classList.add('is-done'), 300);
    }
  }, 4000);
}
