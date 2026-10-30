/**
 * "Sheets lift as they reach the top" (Direction A, rule 10 extended).
 * A sheet is any element marked [data-sheet], plus the home page's white sheet panels listed below
 * (found by class name so the home components need no edits). When a sheet's top edge passes ~30% from
 * the top of the viewport it gets .is-lifted (2px up, slightly deeper shadow, 300 ms; styles in
 * global.css, motion-allowed only); it relaxes when it scrolls back below. No scroll listeners.
 */
const HOME_SHEETS = ['.home .steps', '.home .industries__grid', '.home .coupon'];

if (typeof IntersectionObserver !== 'undefined' && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const sheets = new Set<Element>(document.querySelectorAll('[data-sheet]'));
  document.querySelectorAll(HOME_SHEETS.join(',')).forEach((el) => {
    el.setAttribute('data-sheet', '');
    sheets.add(el);
  });

  // The observed area is the top 30% of the viewport. A sheet that touches it has its top edge above
  // the 30% line and is still on screen: that is the lifted state.
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) e.target.classList.toggle('is-lifted', e.isIntersecting);
    },
    { rootMargin: '0px 0px -70% 0px', threshold: 0 },
  );
  sheets.forEach((el) => io.observe(el));
}
