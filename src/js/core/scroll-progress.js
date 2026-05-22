/**
 * Initializes the scroll progress bar at the top of the viewport.
 */
export function initScrollProgress() {
  const barEl = document.getElementById('scrollProgress');
  if (!barEl) return;
  
  let isTicking = false;
  
  function update() {
    const docEl = document.documentElement;
    const scrollTotal = docEl.scrollHeight - docEl.clientHeight;
    const scrollPercent = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
    
    barEl.style.width = scrollPercent + '%';
    isTicking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      requestAnimationFrame(update);
      isTicking = true;
    }
  }, { passive: true });
  
  update();
}
