import { reduceMotion } from '../utils/motion.js';

export function initServices() {
  initCircuit();
  initDecks();
  initFlipCards();
}

function initCircuit() {
  const canvas = document.getElementById('servicesCircuit');
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const section = canvas.parentElement;

  let W, H, traces, pulses;
  let trail = []; let ripples = []; let cardAnchors = [];
  let revealT = 0; let inView = false; let breatheT = 0;

  function distToTrace(t, mx, my) {
    let min = Infinity;
    for (let i = 0; i < t.path.length - 1; i++) {
      const a = t.path[i], b = t.path[i + 1];
      const dx = b.x - a.x, dy = b.y - a.y;
      const len2 = dx * dx + dy * dy || 1;
      let u = ((mx - a.x) * dx + (my - a.y) * dy) / len2;
      u = Math.max(0, Math.min(1, u));
      const px = a.x + dx * u, py = a.y + dy * u;
      const d = Math.hypot(mx - px, my - py);
      if (d < min) min = d;
    }
    return min;
  }
  function traceTopY(t) {
    let m = Infinity;
    for (const p of t.path) if (p.y < m) m = p.y;
    return m;
  }

  section.querySelectorAll('.svc-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const r = card.getBoundingClientRect(); const sr = section.getBoundingClientRect();
      cardAnchors = [{ x: r.left - sr.left + r.width / 2, y: r.top - sr.top + r.height / 2, strength: 0, target: 1 }];
    });
    card.addEventListener('mouseleave', () => { cardAnchors.forEach(a => a.target = 0); });
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => { inView = es[0].isIntersecting; }, { threshold: 0.05 });
    io.observe(section);
  } else { inView = true; }

  section.addEventListener('click', e => {
    const r = section.getBoundingClientRect();
    if (ripples.length >= 4) ripples.shift();
    ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, radius: 0, maxRadius: Math.max(W, H), speed: 5.5, alpha: 0.8 });
  });

  section.addEventListener('mousemove', e => {
    const r = section.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top;
    const last = trail[trail.length - 1];
    if (!last || Math.hypot(x - last.x, y - last.y) > 28) {
      trail.push({ x, y, life: 1 }); if (trail.length > 40) trail.shift();
    }
  });

  function size() {
    W = section.offsetWidth; H = section.offsetHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); build();
  }

  function build() {
    traces = []; const HSTEP = 90, VSTEP = 160;
    for (let y = HSTEP / 2; y < H; y += HSTEP) {
      let x = -20 + Math.random() * 50;
      while (x < W) {
        const len = Math.random() * 280 + 100; const xEnd = Math.min(x + len, W);
        const r = Math.random(); let path;
        if (r < 0.25 && y + 50 < H) path = [{x, y}, {x: xEnd, y}, {x: xEnd, y: y + 50}];
        else if (r < 0.4 && y - 50 > 0) path = [{x, y}, {x: xEnd, y}, {x: xEnd, y: y - 50}];
        else path = [{x, y}, {x: xEnd, y}];
        traces.push({ path, top: 0 }); x = xEnd + 30 + Math.random() * 50;
      }
    }
    for (let x = VSTEP / 2; x < W; x += VSTEP) {
      const y0 = Math.random() * 60; const y1 = Math.min(y0 + 120 + Math.random() * 240, H);
      traces.push({ path: [{x, y: y0}, {x, y: y1}], top: 0 });
    }
    traces.forEach(t => t.top = traceTopY(t));
    pulses = Array.from({ length: 22 }, spawnPulse);
  }

  function spawnPulse() {
    const t = traces[(Math.random() * traces.length) | 0]; const band = Math.random(); let speed;
    if (band < 0.4) speed = 0.0010 + Math.random() * 0.0015;
    else if (band < 0.8) speed = 0.0030 + Math.random() * 0.0028;
    else speed = 0.0070 + Math.random() * 0.005;
    return { trace: t, progress: Math.random(), speed, color: Math.random() > 0.65 ? 'red' : 'blue' };
  }

  function pointAt(trace, t) {
    let total = 0; const segs = [];
    for (let i = 0; i < trace.path.length - 1; i++) {
      const a = trace.path[i], b = trace.path[i + 1]; const len = Math.hypot(b.x - a.x, b.y - a.y);
      segs.push({ a, b, len }); total += len;
    }
    let target = t * total;
    for (const s of segs) {
      if (target <= s.len) { const u = target / s.len; return { x: s.a.x + (s.b.x - s.a.x) * u, y: s.a.y + (s.b.y - s.a.y) * u }; }
      target -= s.len;
    }
    return trace.path[trace.path.length - 1];
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    if (inView && revealT < 1) revealT = Math.min(1, revealT + 0.012);
    const reveal = 1 - Math.pow(1 - revealT, 3); const revealY = reveal * H * 1.15;
    breatheT += 0.009; const breathe = (Math.sin(breatheT) + 1) * 0.5;
    for (let i = trail.length - 1; i >= 0; i--) { trail[i].life -= 0.008; if (trail[i].life <= 0) trail.splice(i, 1); }
    for (const a of cardAnchors) a.strength += (a.target - a.strength) * 0.08;
    cardAnchors = cardAnchors.filter(a => a.strength > 0.01 || a.target > 0);

    ctx.lineWidth = 1;
    for (const t of traces) {
      if (t.top > revealY) continue;
      let alpha = 0.13 + breathe * 0.05;
      for (const tp of trail) { const d = distToTrace(t, tp.x, tp.y); if (d < 70) alpha = Math.max(alpha, 0.13 + tp.life * (1 - d / 70) * 0.40); }
      for (const a of cardAnchors) { const d = distToTrace(t, a.x, a.y); if (d < 180) alpha = Math.max(alpha, 0.13 + a.strength * (1 - d / 180) * 0.55); }
      for (const rp of ripples) { for (const p of t.path) { const d = Math.hypot(p.x - rp.x, p.y - rp.y); if (Math.abs(d - rp.radius) < 35) { alpha = Math.max(alpha, 0.13 + rp.alpha * 0.55); break; } } }
      ctx.beginPath(); ctx.moveTo(t.path[0].x, t.path[0].y);
      for (let i = 1; i < t.path.length; i++) ctx.lineTo(t.path[i].x, t.path[i].y);
      ctx.strokeStyle = `rgba(0,140,255,${Math.min(alpha, 0.7)})`; ctx.stroke();
    }

    for (const p of pulses) {
      p.progress += p.speed; if (p.progress > 1) Object.assign(p, spawnPulse(), { progress: 0 });
      const pt = pointAt(p.trace, p.progress); if (pt.y > revealY) continue;
      const c = p.color === 'red' ? '220,20,60' : '0,140,255';
      const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 14); g.addColorStop(0, `rgba(${c},0.85)`); g.addColorStop(1, `rgba(${c},0)`);
      ctx.fillStyle = g; ctx.fillRect(pt.x - 14, pt.y - 14, 28, 28);
      ctx.beginPath(); ctx.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2); ctx.fillStyle = `rgba(${c},1)`; ctx.fill();
    }

    for (const a of cardAnchors) {
      if (a.strength < 0.02) continue;
      const candidates = pulses.map(p => ({ pt: pointAt(p.trace, p.progress), p })).filter(c => c.pt.y < revealY).map(c => ({ ...c, d: Math.hypot(c.pt.x - a.x, c.pt.y - a.y) })).filter(c => c.d > 40 && c.d < 280).sort((x, y) => x.d - y.d).slice(0, 5);
      for (const c of candidates) {
        const fade = (1 - c.d / 280) * a.strength * 0.45; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(c.pt.x, c.pt.y);
        ctx.strokeStyle = `rgba(220,20,60,${fade})`; ctx.lineWidth = 0.7; ctx.stroke();
      }
    }

    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i]; rp.radius += rp.speed; rp.alpha *= 0.978;
      if (rp.radius > rp.maxRadius || rp.alpha < 0.01) { ripples.splice(i, 1); continue; }
      ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2); ctx.strokeStyle = `rgba(0,180,255,${rp.alpha * 0.45})`; ctx.lineWidth = 2.2; ctx.stroke();
      ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.radius - 4, 0, Math.PI * 2); ctx.strokeStyle = `rgba(220,20,60,${rp.alpha * 0.30})`; ctx.lineWidth = 1; ctx.stroke();
    }

    for (const tp of trail) { ctx.beginPath(); ctx.arc(tp.x, tp.y, 1.5 + tp.life * 1.5, 0, Math.PI * 2); ctx.fillStyle = `rgba(0,180,255,${tp.life * 0.18})`; ctx.fill(); }

    requestAnimationFrame(frame);
  }

  size(); frame();
  window.addEventListener('resize', size, { passive: true });
}

function initDecks() {
  const decks = document.querySelectorAll('.svc-deck[data-deck]');
  if (!decks.length) return;
  let anyHovered = false;
  const deckStates = [];

  decks.forEach(deck => {
    const cards = Array.from(deck.querySelectorAll('.svc-card'));
    if (cards.length < 2) return;
    const state = { deck, cards, topIndex: 0, busy: false, timer: null, inView: false };
    deckStates.push(state);

    function reposition() {
      state.cards.forEach((card, i) => {
        const pos = (i - state.topIndex + state.cards.length) % state.cards.length;
        card.dataset.pos = String(pos);
      });
    }
    function advance() {
      if (state.busy) return;
      state.busy = true; state.topIndex = (state.topIndex + 1) % state.cards.length;
      reposition();
      setTimeout(() => { state.busy = false; }, 700);
    }

    function startTimer() {
      if (reduceMotion) return;
      stopTimer();
      state.timer = setInterval(() => { if (!anyHovered && state.inView) advance(); }, 4500);
    }
    function stopTimer() { if (state.timer) { clearInterval(state.timer); state.timer = null; } }

    deck.addEventListener('mouseenter', () => { anyHovered = true; });
    deck.addEventListener('mouseleave', () => { anyHovered = false; });
    deck.addEventListener('click', e => {
      const card = e.target.closest('.svc-card');
      if (card && card.dataset.pos === '0') advance();
    });

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          state.inView = entry.isIntersecting;
          if (state.inView) startTimer(); else stopTimer();
        });
      }, { threshold: 0.15 });
      io.observe(deck);
    } else { state.inView = true; startTimer(); }
  });
}

function initFlipCards() {
  const isTouch = () => window.matchMedia('(hover: none)').matches;
  document.querySelectorAll('.armak-service-card').forEach(card => {
    card.addEventListener('click', () => {
      if (!isTouch()) return;
      const wasFlipped = card.classList.contains('is-flipped');
      document.querySelectorAll('.armak-service-card.is-flipped').forEach(c => {
        c.classList.remove('is-flipped'); c.setAttribute('aria-pressed', 'false');
      });
      if (!wasFlipped) { card.classList.add('is-flipped'); card.setAttribute('aria-pressed', 'true'); }
    });
  });
}
