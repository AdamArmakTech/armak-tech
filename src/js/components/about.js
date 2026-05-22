import { reduceMotion } from '../utils/motion.js';

export function initAbout() {
  initBackground();
  initDeckCycling();
  initFloatingShuffle();
  initPartners();
}

function initBackground() {
  const canvas = document.getElementById('aboutParticles');
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const section = canvas.parentElement;

  let W, H, nodes, streaks;
  let trail = [], ripples = [], cardAnchors = [];
  let revealT = 0, inView = false, breatheT = 0;

  const TOPO = [
    { cx: 0.18, cy: 0.30, radii: [70, 130, 200, 275], speed: 0.0004, phase: 0 },
    { cx: 0.78, cy: 0.62, radii: [60, 115, 175, 245], speed: 0.0006, phase: 1.2 },
    { cx: 0.50, cy: 0.12, radii: [80, 145, 210],       speed: 0.0005, phase: 2.4 },
    { cx: 0.32, cy: 0.82, radii: [55, 105, 165],       speed: 0.00045, phase: 3.6 },
  ];
  const NODE_COUNT = 50; const LINK_DIST = 165;

  function spawnNode() {
    return { x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32, r: Math.random() * 1.6 + 0.7, pulse: Math.random() * Math.PI * 2, pulseSpeed: 0.012 + Math.random() * 0.018, activated: 0 };
  }
  function spawnStreak() {
    return { x: Math.random() * W * 1.4 - W * 0.2, y: -30, len: 70 + Math.random() * 130, speed: 0.4 + Math.random() * 0.7, alpha: 0.10 + Math.random() * 0.13, width: 0.7 + Math.random() * 1.0 };
  }

  section.querySelectorAll('.deck-card, .armak-value').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const r = card.getBoundingClientRect(); const sr = section.getBoundingClientRect();
      cardAnchors = [{ x: r.left - sr.left + r.width / 2, y: r.top - sr.top + r.height / 2, strength: 0, target: 1 }];
    });
    card.addEventListener('mouseleave', () => { cardAnchors.forEach(a => a.target = 0); });
  });

  if ('IntersectionObserver' in window) { new IntersectionObserver(es => { inView = es[0].isIntersecting; }, { threshold: 0.05 }).observe(section); } else { inView = true; }

  section.addEventListener('click', e => {
    const r = section.getBoundingClientRect(); if (ripples.length >= 4) ripples.shift();
    ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, radius: 0, maxRadius: Math.max(W, H), speed: 5, alpha: 0.7 });
  });

  section.addEventListener('mousemove', e => {
    const r = section.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top;
    const last = trail[trail.length - 1]; if (!last || Math.hypot(x - last.x, y - last.y) > 24) { trail.push({ x, y, life: 1 }); if (trail.length > 50) trail.shift(); }
  });

  function size() {
    W = section.offsetWidth; H = section.offsetHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    nodes = Array.from({ length: NODE_COUNT }, spawnNode);
    streaks = Array.from({ length: 18 }, () => { const s = spawnStreak(); s.y = Math.random() * H; return s; });
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    if (inView && revealT < 1) revealT = Math.min(1, revealT + 0.011);
    const reveal = 1 - Math.pow(1 - revealT, 3); const revealY = reveal * H * 1.15;
    breatheT += 0.009; const breathe = (Math.sin(breatheT) + 1) * 0.5;
    for (let i = trail.length - 1; i >= 0; i--) { trail[i].life -= 0.007; if (trail[i].life <= 0) trail.splice(i, 1); }
    for (const a of cardAnchors) a.strength += (a.target - a.strength) * 0.08;
    cardAnchors = cardAnchors.filter(a => a.strength > 0.01 || a.target > 0);

    for (const t of TOPO) {
      const cx = t.cx * W, cy = t.cy * H; const visible = Math.ceil(reveal * t.radii.length);
      for (let i = 0; i < visible; i++) {
        const baseR = t.radii[i]; const ringPhase = t.phase + i * 0.6;
        const r = baseR + Math.sin(breatheT * 0.7 + ringPhase) * 14 + breathe * 12;
        let alpha = 0.11 - i * 0.014;
        for (const a of cardAnchors) { const d = Math.hypot(cx - a.x, cy - a.y); if (d < r + 80) alpha += a.strength * 0.10; }
        ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.55, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,80,180,${Math.min(alpha, 0.4)})`; ctx.lineWidth = 0.9; ctx.stroke();
      }
    }

    for (const s of streaks) {
      s.y += s.speed; s.x += s.speed * 0.45; if (s.y > H + 50) Object.assign(s, spawnStreak());
      if (s.y > revealY) continue;
      const grad = ctx.createLinearGradient(s.x, s.y, s.x + s.len * 0.5, s.y + s.len); grad.addColorStop(0, 'rgba(0,140,255,0)'); grad.addColorStop(0.4, `rgba(0,100,220,${s.alpha + breathe * 0.04})`); grad.addColorStop(1, 'rgba(0,140,255,0)');
      ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x + s.len * 0.5, s.y + s.len); ctx.strokeStyle = grad; ctx.lineWidth = s.width; ctx.stroke();
    }

    for (const n of nodes) {
      n.pulse += n.pulseSpeed; n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H) n.vy *= -1;
      let wake = 0; for (const tp of trail) { const d = Math.hypot(n.x - tp.x, n.y - tp.y); if (d < 90) wake = Math.max(wake, tp.life * (1 - d / 90)); }
      let waveAct = 0; for (const rp of ripples) { const d = Math.hypot(n.x - rp.x, n.y - rp.y); if (Math.abs(d - rp.radius) < 25) waveAct = Math.max(waveAct, rp.alpha); }
      let cardAct = 0; for (const a of cardAnchors) {
        const dx = a.x - n.x, dy = a.y - n.y; const d = Math.hypot(dx, dy);
        if (d < 260 && d > 1 && a.strength > 0.05) { const pull = (1 - d / 260) * 0.18 * a.strength; n.x += (dx / d) * pull; n.y += (dy / d) * pull; cardAct = Math.max(cardAct, (1 - d / 260) * a.strength * 0.85); }
      }
      const newAct = Math.max(wake, waveAct, cardAct); if (newAct > n.activated) n.activated = newAct; else n.activated *= 0.965;
    }

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i]; if (a.y > revealY) continue;
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j]; if (b.y > revealY) continue;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK_DIST) {
          let lineAlpha = (1 - d / LINK_DIST) * 0.18; lineAlpha += breathe * 0.04; lineAlpha += (a.activated + b.activated) * 0.20;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,80,180,${Math.min(lineAlpha, 0.6)})`; ctx.lineWidth = 0.7 + (a.activated + b.activated) * 0.4; ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      if (n.y > revealY) continue; const glow = (Math.sin(n.pulse) + 1) * 0.5;
      let alpha = 0.30 + glow * 0.22 + breathe * 0.08 + n.activated * 0.45; let r = n.r + glow * 0.7 + breathe * 0.4 + n.activated * 1.8;
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.fillStyle = `rgba(0,80,180,${Math.min(alpha, 0.95)})`; ctx.fill();
    }

    for (const a of cardAnchors) {
      if (a.strength < 0.05) continue;
      const candidates = nodes.map(n => ({ n, d: Math.hypot(n.x - a.x, n.y - a.y) })).filter(c => c.d > 30 && c.d < 240 && c.n.y < revealY).sort((x, y) => x.d - y.d).slice(0, 6);
      for (const c of candidates) { const fade = (1 - c.d / 240) * a.strength * 0.45; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(c.n.x, c.n.y); ctx.strokeStyle = `rgba(220,20,60,${fade})`; ctx.lineWidth = 0.7; ctx.stroke(); }
    }

    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i]; rp.radius += rp.speed; rp.alpha *= 0.978; if (rp.radius > rp.maxRadius || rp.alpha < 0.01) { ripples.splice(i, 1); continue; }
      ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2); ctx.strokeStyle = `rgba(0,140,255,${rp.alpha * 0.40})`; ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.radius - 4, 0, Math.PI * 2); ctx.strokeStyle = `rgba(220,20,60,${rp.alpha * 0.25})`; ctx.lineWidth = 1; ctx.stroke();
    }

    for (const tp of trail) { ctx.beginPath(); ctx.arc(tp.x, tp.y, 1.4 + tp.life * 1.4, 0, Math.PI * 2); ctx.fillStyle = `rgba(0,140,255,${tp.life * 0.16})`; ctx.fill(); }
    requestAnimationFrame(frame);
  }

  size(); frame();
  window.addEventListener('resize', size, { passive: true });
}

function initDeckCycling() {
  const deck = document.getElementById('aboutDeck');
  if (!deck) return;
  const cards = Array.from(deck.querySelectorAll('.deck-card'));
  if (!cards.length) return;
  let topIndex = 0; let busy = false;

  function advance() {
    if (busy) return; busy = true; topIndex = (topIndex + 1) % cards.length;
    cards.forEach((card, i) => { const pos = (i - topIndex + cards.length) % cards.length; card.dataset.pos = String(pos); });
    setTimeout(() => { busy = false; }, 350);
  }

  deck.addEventListener('click', function(e) {
    const card = e.target.closest('.deck-card');
    if (card && card.dataset.pos === '0') { e.stopPropagation(); advance(); }
  });

  deck.querySelectorAll('.deck-card-arrow').forEach(arrow => { arrow.style.cursor = 'pointer'; });
}

function initFloatingShuffle() {
  const cards = Array.from(document.querySelectorAll('.armak-value'));
  if (!cards.length) return;
  let order = cards.map((_, i) => i);
  let shuffling = false; let hoverTimer = null;

  function applyPositions() { order.forEach((cardIdx, deckPos) => { cards[cardIdx].setAttribute('data-deck', deckPos); cards[cardIdx].style.zIndex = cards.length - deckPos; }); }

  function shuffle() {
    if (shuffling) return; shuffling = true;
    const frontIdx = order[0]; const frontCard = cards[frontIdx];
    frontCard.classList.add('deck-shuffling'); frontCard.style.transform = 'translate(0, -40px) rotate(3deg) scale(0.95)'; frontCard.style.opacity = '0.5';
    setTimeout(() => {
      order.push(order.shift()); applyPositions();
      frontCard.style.transform = ''; frontCard.style.opacity = '';
      setTimeout(() => { frontCard.classList.remove('deck-shuffling'); shuffling = false; }, 700);
    }, 350);
  }

  applyPositions();
  const valuesContainer = document.querySelector('.armak-values');
  if (!valuesContainer) return;
  valuesContainer.addEventListener('mouseenter', () => { clearTimeout(hoverTimer); hoverTimer = setTimeout(() => { shuffle(); hoverTimer = setInterval(shuffle, 3500); }, 3000); });
  valuesContainer.addEventListener('mouseleave', () => { clearTimeout(hoverTimer); clearInterval(hoverTimer); hoverTimer = null; });
  valuesContainer.addEventListener('click', () => { clearTimeout(hoverTimer); clearInterval(hoverTimer); shuffle(); hoverTimer = setTimeout(() => { shuffle(); hoverTimer = setInterval(shuffle, 3500); }, 3000); });
}

function initPartners() {
  document.querySelectorAll('[data-expand-row]').forEach(row => {
    const strips = row.querySelectorAll('[data-partner]');
    strips.forEach(s => {
      const activate = () => { strips.forEach(el => el.classList.remove('active')); s.classList.add('active'); };
      s.addEventListener('mouseenter', activate);
      s.addEventListener('click', activate);
    });
  });
}
