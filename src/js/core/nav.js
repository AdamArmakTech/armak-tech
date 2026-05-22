export function initNav() {
  const nav = document.getElementById('armakNav');
  const toggle = document.getElementById('armakNavToggle');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 8) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }, { passive: true });
  }
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('.armak-nav-links a').forEach(a => {
      a.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // Services "See All" expandable — technically nav-related as it affects global scroll/nav
  const servicesToggle = document.getElementById('armakServicesToggle');
  const servicesExtra = document.getElementById('armakServicesExtra');
  function openServicesDropdown() {
    if (!servicesToggle || !servicesExtra) return;
    if (servicesToggle.getAttribute('aria-expanded') === 'true') return;
    servicesExtra.hidden = false;
    servicesExtra.classList.remove('opening');
    void servicesExtra.offsetWidth;
    servicesExtra.classList.add('opening');
    servicesToggle.setAttribute('aria-expanded', 'true');
  }
  if (servicesToggle && servicesExtra) {
    servicesToggle.addEventListener('click', () => {
      const expanded = servicesToggle.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        servicesExtra.hidden = true;
        servicesExtra.classList.remove('opening');
        servicesToggle.setAttribute('aria-expanded', 'false');
      } else {
        openServicesDropdown();
      }
    });
  }

  document.querySelectorAll('a[href="#services"]').forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(openServicesDropdown, 250);
    });
  });
}
