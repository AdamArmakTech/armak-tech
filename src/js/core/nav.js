/**
 * Initializes navbar scroll behavior, mobile toggle, and services dropdown expansion.
 */
export function initNav() {
  const navEl = document.getElementById('armakNav');
  const navToggle = document.getElementById('armakNavToggle');
  
  if (navEl) {
    window.addEventListener('scroll', () => {
      navEl.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive: true });
  }
  
  if (navToggle && navEl) {
    navToggle.addEventListener('click', () => navEl.classList.toggle('open'));
    navEl.querySelectorAll('.armak-nav-links a').forEach(link => {
      link.addEventListener('click', () => navEl.classList.remove('open'));
    });
  }

  // Services "See All" expandable logic
  const servicesToggle = document.getElementById('armakServicesToggle');
  const servicesExtra = document.getElementById('armakServicesExtra');
  
  function openServicesDropdown() {
    if (!servicesToggle || !servicesExtra) return;
    if (servicesToggle.getAttribute('aria-expanded') === 'true') return;
    
    servicesExtra.hidden = false;
    servicesExtra.classList.remove('opening');
    void servicesExtra.offsetWidth; // Force reflow for animation
    servicesExtra.classList.add('opening');
    servicesToggle.setAttribute('aria-expanded', 'true');
  }

  if (servicesToggle && servicesExtra) {
    servicesToggle.addEventListener('click', () => {
      const isExpanded = servicesToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        servicesExtra.hidden = true;
        servicesExtra.classList.remove('opening');
        servicesToggle.setAttribute('aria-expanded', 'false');
      } else {
        openServicesDropdown();
      }
    });
  }

  // Smooth scroll trigger for Services
  document.querySelectorAll('a[href="#services"]').forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(openServicesDropdown, 250);
    });
  });
}
