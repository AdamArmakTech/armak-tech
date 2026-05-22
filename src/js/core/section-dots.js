/**
 * Initializes section navigation dots and updates active states based on scroll position.
 */
export function initSectionDots() {
  const dotElements = document.querySelectorAll('.section-dot');
  const dotsNav = document.getElementById('sectionDots');
  const bcCurrent = document.getElementById('bcCurrent');
  
  if (!dotElements.length) return;

  const sections = ['home', 'services', 'about', 'contact'].map(id => {
    return document.getElementById(id) || document.querySelector(`#${id}, .armak-${id}, section[id="${id}"]`);
  }).filter(Boolean);

  const sectionLabels = { home: 'Home', services: 'Services', about: 'About', contact: 'Contact' };

  function updateActiveState() {
    const scrollPosition = window.scrollY + window.innerHeight * 0.3;
    let activeSection = sections[0];
    
    for (const section of sections) {
      if (section.offsetTop <= scrollPosition) activeSection = section;
    }
    
    const activeSectionId = activeSection.id || (activeSection.className.match(/armak-(\w+)/) || [])[1] || 'home';

    dotElements.forEach(dot => {
      const targetId = dot.getAttribute('href').replace('#', '');
      dot.classList.toggle('is-active', targetId === activeSectionId);
    });
    
    if (bcCurrent) bcCurrent.textContent = sectionLabels[activeSectionId] || activeSectionId;

    // Show navigation after scrolling past the hero
    if (window.scrollY > 200) dotsNav.classList.add('is-visible');
    else dotsNav.classList.remove('is-visible');

    // Update global dark/light theme
    const elementUnderCursor = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
    if (elementUnderCursor) {
      const isDarkSection = !!elementUnderCursor.closest('.armak-stats, .armak-services, .armak-footer, .armak-loader');
      document.body.classList.toggle('on-dark', isDarkSection);
    }
  }

  let isTicking = false;
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      requestAnimationFrame(() => { updateActiveState(); isTicking = false; });
      isTicking = true;
    }
  }, { passive: true });
  
  updateActiveState();

  // Smooth scroll behavior
  dotElements.forEach(dot => dot.addEventListener('click', e => {
    e.preventDefault();
    const href = dot.getAttribute('href');
    
    if (href === '#home' || href === '#' || href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }));
}
