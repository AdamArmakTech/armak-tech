export function initCTA() {
  initMagneticButtons();
  initFormValidation();
}

function initMagneticButtons() {
  if (!matchMedia('(pointer: fine)').matches) return;
  const buttons = document.querySelectorAll('.armak-btn-primary, .armak-form-submit, .armak-cta-btn, .armak-nav-cta');
  buttons.forEach(btn => {
    let raf, tx = 0, ty = 0, cx = 0, cy = 0;
    function follow() {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      btn.style.transform = `translate(${cx}px, ${cy}px)`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) raf = requestAnimationFrame(follow); else raf = null;
    }
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect(); tx = (e.clientX - (r.left + r.width / 2)) * 0.18; ty = (e.clientY - (r.top + r.height / 2)) * 0.28;
      if (!raf) raf = requestAnimationFrame(follow);
    });
    btn.addEventListener('mouseleave', () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(follow); });
  });
}

function initFormValidation() {
  const form = document.querySelector('.armak-form');
  const submit = form ? form.querySelector('.armak-form-submit') : null;
  if (!form || !submit) return;
  form.addEventListener('submit', e => {
    if (!form.checkValidity()) {
      e.preventDefault();
      submit.animate([
        { boxShadow: '0 0 0 1px rgba(220,20,60,.55), 0 0 44px rgba(220,20,60,.7)' },
        { boxShadow: '0 0 0 3px rgba(220,20,60,.9),  0 0 64px rgba(220,20,60,1)' },
        { boxShadow: '0 0 0 1px rgba(220,20,60,.55), 0 0 44px rgba(220,20,60,.7)' }
      ], { duration: 600, iterations: 2 });
    }
  });
}
