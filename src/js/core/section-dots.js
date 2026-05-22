export function initSectionDots() {
  const dots = document.querySelectorAll('.section-dot');
  const dotsNav = document.getElementById('sectionDots');
  const bcCurrent = document.getElementById('bcCurrent');
  if (!dots.length) return;

  const sections = ['home','services','about','contact'].map(id => {
    return document.getElementById(id) || document.querySelector(`#${id}, .armak-${id}, section[id="${id}"]`);
  }).filter(Boolean);

  // Map section ids to readable labels
  const labels = { home: 'Home', services: 'Services', about: 'About', contact: 'Contact' };

  function update() {
    const y = window.scrollY + window.innerHeight * 0.3;
    let active = sections[0];
    for (const s of sections) {
      if (s.offsetTop <= y) active = s;
    }
    const activeId = active.id || (active.className.match(/armak-(\w+)/) || [])[1] || 'home';

    dots.forEach(d => {
      const target = d.getAttribute('href').replace('#','');
      d.classList.toggle('is-active', target === activeId);
    });
    if (bcCurrent) bcCurrent.textContent = labels[activeId] || activeId;

    // Show dots after scrolling past hero
    if (window.scrollY > 200) dotsNav.classList.add('is-visible');
    else dotsNav.classList.remove('is-visible');

    // Dark section detection by scanning what's at viewport center
    const midEl = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
    if (midEl) {
      const dark = midEl.closest('.armak-stats, .armak-services, .armak-footer, .armak-loader');
      document.body.classList.toggle('on-dark', !!dark);
    }
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(() => { update(); ticking = false; }); ticking = true; }
  }, { passive: true });
  update();

  // Smooth scroll on dot click
  dots.forEach(d => d.addEventListener('click', e => {
    e.preventDefault();
    const href = d.getAttribute('href');
    if (href === '#home' || href === '#' || href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    else { window.scrollTo({ top: 0, behavior: 'smooth' }); }
  }));
}
