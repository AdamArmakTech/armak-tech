/**
 * Initializes the page preloader and handles session-based skipping.
 */
export function initLoader() {
  const loaderEl = document.getElementById('armakLoader');
  const barEl = document.getElementById('loaderBar');
  const labelEl = document.getElementById('loaderLabel');
  const pctEl = document.getElementById('loaderPct');
  if (!loaderEl) return;

  // Skip on subsequent visits within the same session
  if (sessionStorage.getItem('armakLoaded')) {
    loaderEl.classList.add('is-skip');
    return;
  }

  let progress = 0;
  function updateProgress(p, text) {
    progress = Math.max(progress, p);
    barEl.style.width = progress + '%';
    pctEl.textContent = Math.round(progress) + '%';
    if (text) labelEl.textContent = text;
  }

  updateProgress(8, 'INITIALIZING');

  // DOM ready check
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => updateProgress(28, 'PARSING DOM'));
  } else { updateProgress(28, 'PARSING DOM'); }

  // Font ready check
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => updateProgress(58, 'LOADING ASSETS'));
  } else { setTimeout(() => updateProgress(58, 'LOADING ASSETS'), 300); }

  // Window load (images/scripts ready)
  window.addEventListener('load', () => {
    updateProgress(88, 'COMPILING');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        updateProgress(100, 'READY');
        setTimeout(() => {
          loaderEl.classList.add('is-done');
          sessionStorage.setItem('armakLoaded', '1');
        }, 380);
      });
    });
  });

  // Failsafe: hide loader after 4s
  setTimeout(() => {
    if (progress < 100) {
      updateProgress(100, 'READY');
      setTimeout(() => loaderEl.classList.add('is-done'), 300);
    }
  }, 4000);
}
