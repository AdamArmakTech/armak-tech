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
  const form = document.getElementById('contactForm');
  if (!form) return;
  const btn = document.getElementById('formSubmitBtn');
  const btnText = btn ? btn.querySelector('.form-btn-text') : null;
  const btnLoading = btn ? btn.querySelector('.form-btn-loading') : null;
  const feedback = document.getElementById('formFeedback');

  function showFeedback(msg, isError) {
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.className = 'armak-form-feedback ' + (isError ? 'is-error' : 'is-success');
    feedback.style.display = 'block';
  }

  function shakeButton() {
    if (!btn) return;
    btn.animate([
      { boxShadow: '0 0 0 1px rgba(220,20,60,.55), 0 0 44px rgba(220,20,60,.7)' },
      { boxShadow: '0 0 0 3px rgba(220,20,60,.9),  0 0 64px rgba(220,20,60,1)' },
      { boxShadow: '0 0 0 1px rgba(220,20,60,.55), 0 0 44px rgba(220,20,60,.7)' }
    ], { duration: 600, iterations: 2 });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate email + phone both present
    const email = form.querySelector('[name="email"]');
    const phone = form.querySelector('[name="phone"]');
    if (!email.value.trim() || !phone.value.trim()) {
      showFeedback('Both email and phone number are required.', true);
      shakeButton();
      return;
    }

    // Native validation check (name, project type, message)
    if (!form.checkValidity()) {
      form.reportValidity();
      shakeButton();
      return;
    }

    // Show loading state
    if (btnText) btnText.style.display = 'none';
    if (btnLoading) btnLoading.style.display = 'inline';
    if (btn) btn.disabled = true;
    if (feedback) feedback.style.display = 'none';

    try {
      const data = new FormData(form);
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();

      if (json.success) {
        showFeedback('Inquiry sent. We\'ll be in touch shortly.', false);
        form.reset();
      } else {
        showFeedback('Something went wrong. Please try again or call us directly.', true);
      }
    } catch (err) {
      showFeedback('Network error. Please try again or call (818) 858-4615.', true);
    }

    // Restore button
    if (btnText) btnText.style.display = 'inline';
    if (btnLoading) btnLoading.style.display = 'none';
    if (btn) btn.disabled = false;
  });
}
