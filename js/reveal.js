/* ============================================================
   Abstract Entity Atlas — scroll & entrance animations
   ============================================================ */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Hero logo: one smooth appear on load ── */
  const hero = document.querySelector('.hero-logo');
  if (hero) hero.classList.add('revealed');

  /* ── Side decorations: draw in from their anchored edge on scroll ── */
  const decos = Array.prototype.slice.call(document.querySelectorAll('.deco-l, .deco-r'));
  const arch  = document.querySelector('.archetipi');

  if (reduce) {
    decos.forEach((el) => el.classList.add('in'));
    if (arch) arch.classList.add('in');
    return;
  }

  function inView(el, ratio) {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top < vh * (ratio || 0.85) && r.bottom > 0;
  }

  /* toggle so the draw-in replays every time an element re-enters view
     (works scrolling up as well as down) */
  function check() {
    decos.forEach((el) => {
      if (inView(el)) el.classList.add('in');
      else el.classList.remove('in');
    });
    if (arch) {
      if (inView(arch, 0.75)) arch.classList.add('in');
      else arch.classList.remove('in');
    }
  }

  check();                                            // reveal what's already on screen
  window.addEventListener('scroll', check, { passive: true });
  window.addEventListener('resize', check);
})();
