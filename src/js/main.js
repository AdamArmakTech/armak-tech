/* ========================================================================
   ARMAK DYNAMIC FEATURES — refined edition
   1) Parallax  2) Stats circuit  3) Marquee (CSS)  4) Particles  6) Progress
   ======================================================================== */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== 1. PARALLAX HERO — smooth, eased, rAF-driven ===== */
(function() {
  const bg = document.getElementById('heroParallaxBg');
  if (!bg || reduceMotion) return;
  let target = 0, current = 0, ticking = false;

  function update() {
    current += (target - current) * 0.12;          // lerp toward target
    bg.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0) scale(1.05)`;
    if (Math.abs(target - current) > 0.1) {
      requestAnimationFrame(update);
    } else {
      ticking = false;
    }
  }
  window.addEventListener('scroll', () => {
    target = window.scrollY * 0.35;
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
})();

/* ===== 4. PARTICLE NETWORK — covers full hero, mouse-reactive ===== */
(function() {
  const canvas = document.getElementById('heroParticles');
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let W, H, particles;
  const COUNT = 130, CONNECT = 190;
  const mouse = { x: -9999, y: -9999, active: false };

  function size() {
    const parent = canvas.parentElement;
    W = parent.offsetWidth || window.innerWidth;
    H = parent.offsetHeight || window.innerHeight;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function spawn() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.8 + 0.9,
      depth: Math.random() * 0.6 + 0.4,
      driftPhase: Math.random() * Math.PI * 2
    };
  }
  function init() {
    size();
    particles = Array.from({ length: COUNT }, spawn);
  }

  let frameCount = 0;
  function frame() {
    frameCount++;
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      // Mouse repulsion
      if (mouse.active) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14400) {
          const f = (1 - Math.sqrt(d2) / 120) * 0.6;
          p.vx += (dx / Math.sqrt(d2 + 1)) * f;
          p.vy += (dy / Math.sqrt(d2 + 1)) * f;
        }
      }
      // Subtle auto-drift so the network breathes on its own
      const drift = Math.sin((frameCount * 0.005) + p.driftPhase) * 0.04;
      p.vx += drift * 0.3;
      p.vy += drift * 0.2;
      // Gentle damping
      p.vx *= 0.985; p.vy *= 0.985;
      p.x += p.vx * p.depth; p.y += p.vy * p.depth;
      // Wrap edges
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(80,150,255,${0.55 + p.depth * 0.45})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.hypot(dx, dy);
        if (dist < CONNECT) {
          const a = (1 - dist / CONNECT) * 0.5 * Math.min(p.depth, q.depth);
          ctx.strokeStyle = `rgba(140,180,255,${a})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }

  init();
  // Re-init after layout settles (fonts, images, reveals)
  setTimeout(init, 300);
  setTimeout(init, 1200);
  frame();
  window.addEventListener('resize', init, { passive: true });
  canvas.parentElement.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true;
  });
  canvas.parentElement.addEventListener('mouseleave', () => { mouse.active = false; });
})();

/* ===== 2. CIRCUIT BACKGROUND — flowing data pulses ===== */
(function() {
  const canvas = document.getElementById('statsCircuit');
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let W, H, traces, pulses, nodes;

  function size() {
    const parent = canvas.parentElement;
    W = parent.offsetWidth; H = parent.offsetHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  function build() {
    traces = [];
    nodes = [];
    const HSTEP = 55;  // tighter horizontal density
    const VSTEP = 110; // vertical trace columns

    // Horizontal traces with right-angle steps — like PCB routing
    for (let y = HSTEP / 2; y < H; y += HSTEP) {
      let x = -20 + Math.random() * 30;
      while (x < W) {
        const len = Math.random() * 220 + 60;
        const xEnd = Math.min(x + len, W);
        const r = Math.random();
        // 30% drop down, 15% rise up, 10% double-step, rest plain
        let path;
        if (r < 0.3 && y + 35 < H) {
          path = [{ x, y }, { x: xEnd, y }, { x: xEnd, y: y + 35 }];
        } else if (r < 0.45 && y - 35 > 0) {
          path = [{ x, y }, { x: xEnd, y }, { x: xEnd, y: y - 35 }];
        } else if (r < 0.55 && y + 35 < H && xEnd + 40 < W) {
          path = [{ x, y }, { x: xEnd, y }, { x: xEnd, y: y + 35 }, { x: xEnd + 40, y: y + 35 }];
        } else {
          path = [{ x, y }, { x: xEnd, y }];
        }
        traces.push({ path });
        // Junction node where line ends
        if (Math.random() > 0.55) {
          nodes.push({ x: xEnd, y: path[path.length - 1].y, type: Math.random() > 0.7 ? 'transistor' : 'pad' });
        }
        x = xEnd + 18 + Math.random() * 30;
      }
    }

    // Vertical traces — extra weave
    for (let x = VSTEP / 2; x < W; x += VSTEP) {
      const y0 = Math.random() * 40;
      const y1 = Math.min(y0 + 80 + Math.random() * 180, H);
      traces.push({ path: [{ x, y: y0 }, { x, y: y1 }] });
      if (Math.random() > 0.5) {
        nodes.push({ x, y: y1, type: Math.random() > 0.6 ? 'transistor' : 'pad' });
      }
    }

    // Pulses — varied speeds, alternating colors, more of them
    pulses = Array.from({ length: 32 }, () => spawnPulse());
  }

  function spawnPulse() {
    const t = traces[(Math.random() * traces.length) | 0];
    // Speed bands: slow / medium / fast — alternating feel
    const band = Math.random();
    let speed;
    if (band < 0.35) speed = 0.0012 + Math.random() * 0.0015;       // slow
    else if (band < 0.75) speed = 0.0035 + Math.random() * 0.0028;  // medium
    else speed = 0.008 + Math.random() * 0.006;                      // fast
    return {
      trace: t,
      progress: Math.random(),
      speed,
      color: Math.random() > 0.6 ? 'red' : 'blue'
    };
  }

  function pointAt(trace, t) {
    const segs = [];
    let total = 0;
    for (let i = 0; i < trace.path.length - 1; i++) {
      const a = trace.path[i], b = trace.path[i + 1];
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      segs.push({ a, b, len }); total += len;
    }
    let target = t * total;
    for (const s of segs) {
      if (target <= s.len) {
        const r = target / s.len;
        return { x: s.a.x + (s.b.x - s.a.x) * r, y: s.a.y + (s.b.y - s.a.y) * r };
      }
      target -= s.len;
    }
    return trace.path[trace.path.length - 1];
  }

  let tick = 0;
  function frame() {
    ctx.clearRect(0, 0, W, H);
    tick++;

    // Static traces — faint blue
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0,102,204,0.18)';
    for (const t of traces) {
      ctx.beginPath();
      ctx.moveTo(t.path[0].x, t.path[0].y);
      for (let i = 1; i < t.path.length; i++) ctx.lineTo(t.path[i].x, t.path[i].y);
      ctx.stroke();
    }

    // Nodes — transistors and solder pads at junctions
    for (const n of nodes) {
      if (n.type === 'transistor') {
        // Small rectangle with 3 legs — IC/transistor look
        ctx.strokeStyle = 'rgba(0,140,255,0.32)';
        ctx.fillStyle = 'rgba(0,102,204,0.18)';
        ctx.lineWidth = 1;
        ctx.fillRect(n.x - 4, n.y - 3, 8, 6);
        ctx.strokeRect(n.x - 4, n.y - 3, 8, 6);
        // Subtle pulse highlight on alternating ticks
        const phase = (tick * 0.02 + n.x * 0.01) % (Math.PI * 2);
        const pulse = (Math.sin(phase) + 1) * 0.5;
        if (pulse > 0.85) {
          ctx.fillStyle = 'rgba(220,20,60,' + ((pulse - 0.85) * 4) + ')';
          ctx.fillRect(n.x - 4, n.y - 3, 8, 6);
        }
      } else {
        // Solder pad — small filled circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,140,255,0.35)';
        ctx.fill();
      }
    }

    // Pulses — bright dots with glow
    for (const p of pulses) {
      p.progress += p.speed;
      if (p.progress > 1) {
        Object.assign(p, spawnPulse(), { progress: 0 });
      }
      const pt = pointAt(p.trace, p.progress);
      const isRed = p.color === 'red';
      const c1 = isRed ? '220,20,60' : '0,140,255';

      const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 12);
      g.addColorStop(0, `rgba(${c1},0.9)`);
      g.addColorStop(1, `rgba(${c1},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(pt.x - 12, pt.y - 12, 24, 24);

      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${c1},1)`;
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  size();
  frame();
  window.addEventListener('resize', size, { passive: true });
})();



/* =========================================================================
   SHARED INTERACTION HELPERS — used by both services & about backgrounds
   Modes: A=card hover, B=scroll reveal, C=click ripple, D=breathing, E=trail
   ========================================================================= */

/* ===== SERVICES CIRCUIT — PCB traces with all 5 interactions ===== */
(function() {
  const canvas = document.getElementById('servicesCircuit');
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const section = canvas.parentElement;

  let W, H, traces, pulses;

  // Interaction state
  let trail = [];                 // E: cursor breadcrumbs {x, y, life}
  let ripples = [];               // C: click waves {x, y, r, alpha}
  let cardAnchors = [];           // A: active card centers with smoothed strength
  let revealT = 0;                // B: 0→1 reveal progress
  let inView = false;
  let breatheT = 0;               // D: continuous phase

  // ---- Trace utilities ----
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

  // ---- A: Card hover wiring ----
  section.querySelectorAll('.svc-card').forEach(card => {
    const enter = () => {
      const r = card.getBoundingClientRect();
      const sr = section.getBoundingClientRect();
      cardAnchors = [{
        x: r.left - sr.left + r.width / 2,
        y: r.top - sr.top + r.height / 2,
        strength: 0,           // smoothed 0→1
        target: 1
      }];
    };
    const leave = () => {
      cardAnchors.forEach(a => a.target = 0);
    };
    card.addEventListener('mouseenter', enter);
    card.addEventListener('mouseleave', leave);
  });

  // ---- B: Scroll reveal ----
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => { inView = es[0].isIntersecting; }, { threshold: 0.05 });
    io.observe(section);
  } else {
    inView = true;
  }

  // ---- C: Click ripple ----
  section.addEventListener('click', e => {
    const r = section.getBoundingClientRect();
    if (ripples.length >= 4) ripples.shift();
    ripples.push({
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      radius: 0,
      maxRadius: Math.max(W, H),
      speed: 5.5,
      alpha: 0.8
    });
  });

  // ---- E: Cursor trail ----
  section.addEventListener('mousemove', e => {
    const r = section.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const last = trail[trail.length - 1];
    if (!last || Math.hypot(x - last.x, y - last.y) > 28) {
      trail.push({ x, y, life: 1 });
      if (trail.length > 40) trail.shift();
    }
  });

  // ---- Build / Resize ----
  function size() {
    W = section.offsetWidth; H = section.offsetHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  function build() {
    traces = [];
    const HSTEP = 90, VSTEP = 160;
    for (let y = HSTEP / 2; y < H; y += HSTEP) {
      let x = -20 + Math.random() * 50;
      while (x < W) {
        const len = Math.random() * 280 + 100;
        const xEnd = Math.min(x + len, W);
        const r = Math.random();
        let path;
        if (r < 0.25 && y + 50 < H)      path = [{x, y}, {x: xEnd, y}, {x: xEnd, y: y + 50}];
        else if (r < 0.4 && y - 50 > 0)  path = [{x, y}, {x: xEnd, y}, {x: xEnd, y: y - 50}];
        else                              path = [{x, y}, {x: xEnd, y}];
        traces.push({ path, top: 0 });
        x = xEnd + 30 + Math.random() * 50;
      }
    }
    for (let x = VSTEP / 2; x < W; x += VSTEP) {
      const y0 = Math.random() * 60;
      const y1 = Math.min(y0 + 120 + Math.random() * 240, H);
      traces.push({ path: [{x, y: y0}, {x, y: y1}], top: 0 });
    }
    traces.forEach(t => t.top = traceTopY(t));
    pulses = Array.from({ length: 22 }, spawnPulse);
  }

  function spawnPulse() {
    const t = traces[(Math.random() * traces.length) | 0];
    const band = Math.random();
    let speed;
    if (band < 0.4)      speed = 0.0010 + Math.random() * 0.0015;
    else if (band < 0.8) speed = 0.0030 + Math.random() * 0.0028;
    else                  speed = 0.0070 + Math.random() * 0.005;
    return { trace: t, progress: Math.random(), speed, color: Math.random() > 0.65 ? 'red' : 'blue' };
  }

  function pointAt(trace, t) {
    let total = 0;
    const segs = [];
    for (let i = 0; i < trace.path.length - 1; i++) {
      const a = trace.path[i], b = trace.path[i + 1];
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      segs.push({ a, b, len }); total += len;
    }
    let target = t * total;
    for (const s of segs) {
      if (target <= s.len) {
        const u = target / s.len;
        return { x: s.a.x + (s.b.x - s.a.x) * u, y: s.a.y + (s.b.y - s.a.y) * u };
      }
      target -= s.len;
    }
    return trace.path[trace.path.length - 1];
  }

  // ---- Frame loop ----
  function frame() {
    ctx.clearRect(0, 0, W, H);

    // B: scroll reveal — ease-out cubic
    if (inView && revealT < 1) revealT = Math.min(1, revealT + 0.012);
    const reveal = 1 - Math.pow(1 - revealT, 3);
    const revealY = reveal * H * 1.15;

    // D: breathing
    breatheT += 0.009;                      // ~7s cycle
    const breathe = (Math.sin(breatheT) + 1) * 0.5;

    // E: decay trail
    for (let i = trail.length - 1; i >= 0; i--) {
      trail[i].life -= 0.008;
      if (trail[i].life <= 0) trail.splice(i, 1);
    }

    // A: smooth card anchor strengths
    for (const a of cardAnchors) {
      a.strength += (a.target - a.strength) * 0.08;
    }
    cardAnchors = cardAnchors.filter(a => a.strength > 0.01 || a.target > 0);

    // ---- Draw traces ----
    ctx.lineWidth = 1;
    for (const t of traces) {
      if (t.top > revealY) continue;          // B: gate by reveal

      // Base: ambient + breathing
      let alpha = 0.13 + breathe * 0.05;

      // E: trail proximity boost
      for (const tp of trail) {
        const d = distToTrace(t, tp.x, tp.y);
        if (d < 70) alpha = Math.max(alpha, 0.13 + tp.life * (1 - d / 70) * 0.40);
      }

      // A: card anchor wiring boost
      for (const a of cardAnchors) {
        const d = distToTrace(t, a.x, a.y);
        if (d < 180) alpha = Math.max(alpha, 0.13 + a.strength * (1 - d / 180) * 0.55);
      }

      // C: ripple wavefront boost
      for (const rp of ripples) {
        for (const p of t.path) {
          const d = Math.hypot(p.x - rp.x, p.y - rp.y);
          if (Math.abs(d - rp.radius) < 35) {
            alpha = Math.max(alpha, 0.13 + rp.alpha * 0.55);
            break;
          }
        }
      }

      ctx.beginPath();
      ctx.moveTo(t.path[0].x, t.path[0].y);
      for (let i = 1; i < t.path.length; i++) ctx.lineTo(t.path[i].x, t.path[i].y);
      ctx.strokeStyle = `rgba(0,140,255,${Math.min(alpha, 0.7)})`;
      ctx.stroke();
    }

    // ---- Draw pulses ----
    for (const p of pulses) {
      p.progress += p.speed;
      if (p.progress > 1) Object.assign(p, spawnPulse(), { progress: 0 });
      const pt = pointAt(p.trace, p.progress);
      if (pt.y > revealY) continue;
      const c = p.color === 'red' ? '220,20,60' : '0,140,255';
      const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 14);
      g.addColorStop(0, `rgba(${c},0.85)`);
      g.addColorStop(1, `rgba(${c},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(pt.x - 14, pt.y - 14, 28, 28);
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${c},1)`;
      ctx.fill();
    }

    // ---- A: red card-wiring threads ----
    for (const a of cardAnchors) {
      if (a.strength < 0.02) continue;
      // Find 6 nearest "interesting points" — pulse positions act as natural anchors
      const candidates = pulses
        .map(p => ({ pt: pointAt(p.trace, p.progress), p }))
        .filter(c => c.pt.y < revealY)
        .map(c => ({ ...c, d: Math.hypot(c.pt.x - a.x, c.pt.y - a.y) }))
        .filter(c => c.d > 40 && c.d < 280)
        .sort((x, y) => x.d - y.d)
        .slice(0, 5);
      for (const c of candidates) {
        const fade = (1 - c.d / 280) * a.strength * 0.45;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(c.pt.x, c.pt.y);
        ctx.strokeStyle = `rgba(220,20,60,${fade})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }

    // ---- C: ripple rings ----
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.radius += rp.speed;
      rp.alpha *= 0.978;
      if (rp.radius > rp.maxRadius || rp.alpha < 0.01) { ripples.splice(i, 1); continue; }
      // Outer wide blue ring
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,180,255,${rp.alpha * 0.45})`;
      ctx.lineWidth = 2.2;
      ctx.stroke();
      // Inner red accent
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.radius - 4, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(220,20,60,${rp.alpha * 0.30})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // ---- E: faint trail dots ----
    for (const tp of trail) {
      ctx.beginPath();
      ctx.arc(tp.x, tp.y, 1.5 + tp.life * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,180,255,${tp.life * 0.18})`;
      ctx.fill();
    }

    requestAnimationFrame(frame);
  }

  size(); frame();
  window.addEventListener('resize', size, { passive: true });
})();


/* ===== ABOUT BACKGROUND — topo + fiber + constellation, with all 5 interactions ===== */
(function() {
  const canvas = document.getElementById('aboutParticles');
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const section = canvas.parentElement;

  let W, H, nodes, streaks;
  let trail = [], ripples = [], cardAnchors = [];
  let revealT = 0, inView = false, breatheT = 0;

  // Static topo ring centers
  const TOPO = [
    { cx: 0.18, cy: 0.30, radii: [70, 130, 200, 275], speed: 0.0004, phase: 0 },
    { cx: 0.78, cy: 0.62, radii: [60, 115, 175, 245], speed: 0.0006, phase: 1.2 },
    { cx: 0.50, cy: 0.12, radii: [80, 145, 210],       speed: 0.0005, phase: 2.4 },
    { cx: 0.32, cy: 0.82, radii: [55, 105, 165],       speed: 0.00045, phase: 3.6 },
  ];

  const NODE_COUNT = 50;
  const LINK_DIST = 165;

  function spawnNode() {
    return {
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      r: Math.random() * 1.6 + 0.7,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.012 + Math.random() * 0.018,
      activated: 0
    };
  }
  function spawnStreak() {
    return {
      x: Math.random() * W * 1.4 - W * 0.2, y: -30,
      len: 70 + Math.random() * 130,
      speed: 0.4 + Math.random() * 0.7,
      alpha: 0.10 + Math.random() * 0.13,
      width: 0.7 + Math.random() * 1.0
    };
  }

  // ---- A: Card hover ----
  section.querySelectorAll('.deck-card, .armak-value').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const r = card.getBoundingClientRect();
      const sr = section.getBoundingClientRect();
      cardAnchors = [{
        x: r.left - sr.left + r.width / 2,
        y: r.top - sr.top + r.height / 2,
        strength: 0, target: 1
      }];
    });
    card.addEventListener('mouseleave', () => {
      cardAnchors.forEach(a => a.target = 0);
    });
  });

  // ---- B: Scroll reveal ----
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(es => { inView = es[0].isIntersecting; }, { threshold: 0.05 }).observe(section);
  } else { inView = true; }

  // ---- C: Click ripple ----
  section.addEventListener('click', e => {
    const r = section.getBoundingClientRect();
    if (ripples.length >= 4) ripples.shift();
    ripples.push({
      x: e.clientX - r.left, y: e.clientY - r.top,
      radius: 0, maxRadius: Math.max(W, H),
      speed: 5, alpha: 0.7
    });
  });

  // ---- E: Cursor trail ----
  section.addEventListener('mousemove', e => {
    const r = section.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const last = trail[trail.length - 1];
    if (!last || Math.hypot(x - last.x, y - last.y) > 24) {
      trail.push({ x, y, life: 1 });
      if (trail.length > 50) trail.shift();
    }
  });

  // ---- Build / Resize ----
  function size() {
    W = section.offsetWidth; H = section.offsetHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    nodes = Array.from({ length: NODE_COUNT }, spawnNode);
    streaks = Array.from({ length: 18 }, () => {
      const s = spawnStreak(); s.y = Math.random() * H; return s;
    });
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);

    // B: reveal
    if (inView && revealT < 1) revealT = Math.min(1, revealT + 0.011);
    const reveal = 1 - Math.pow(1 - revealT, 3);
    const revealY = reveal * H * 1.15;

    // D: breathing
    breatheT += 0.009;
    const breathe = (Math.sin(breatheT) + 1) * 0.5;

    // E: decay trail
    for (let i = trail.length - 1; i >= 0; i--) {
      trail[i].life -= 0.007;
      if (trail[i].life <= 0) trail.splice(i, 1);
    }

    // A: smooth card anchor strengths
    for (const a of cardAnchors) a.strength += (a.target - a.strength) * 0.08;
    cardAnchors = cardAnchors.filter(a => a.strength > 0.01 || a.target > 0);

    // ---- Topo contour rings ----
    for (const t of TOPO) {
      const cx = t.cx * W, cy = t.cy * H;
      // B: rings reveal outward as scroll progresses
      const visible = Math.ceil(reveal * t.radii.length);
      for (let i = 0; i < visible; i++) {
        const baseR = t.radii[i];
        const ringPhase = t.phase + i * 0.6;
        const r = baseR + Math.sin(breatheT * 0.7 + ringPhase) * 14 + breathe * 12;
        let alpha = 0.11 - i * 0.014;
        // A: brighten if card is nearby
        for (const a of cardAnchors) {
          const d = Math.hypot(cx - a.x, cy - a.y);
          if (d < r + 80) alpha += a.strength * 0.10;
        }
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.55, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,80,180,${Math.min(alpha, 0.4)})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }
    }

    // ---- Fiber streaks ----
    for (const s of streaks) {
      s.y += s.speed;
      s.x += s.speed * 0.45;
      if (s.y > H + 50) Object.assign(s, spawnStreak());
      if (s.y > revealY) continue;
      const grad = ctx.createLinearGradient(s.x, s.y, s.x + s.len * 0.5, s.y + s.len);
      grad.addColorStop(0, 'rgba(0,140,255,0)');
      grad.addColorStop(0.4, `rgba(0,100,220,${s.alpha + breathe * 0.04})`);
      grad.addColorStop(1, 'rgba(0,140,255,0)');
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x + s.len * 0.5, s.y + s.len);
      ctx.strokeStyle = grad;
      ctx.lineWidth = s.width;
      ctx.stroke();
    }

    // ---- Update nodes (movement + activations) ----
    for (const n of nodes) {
      n.pulse += n.pulseSpeed;
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;

      // E: trail wake
      let wake = 0;
      for (const tp of trail) {
        const d = Math.hypot(n.x - tp.x, n.y - tp.y);
        if (d < 90) wake = Math.max(wake, tp.life * (1 - d / 90));
      }

      // C: ripple wavefront activation
      let waveAct = 0;
      for (const rp of ripples) {
        const d = Math.hypot(n.x - rp.x, n.y - rp.y);
        if (Math.abs(d - rp.radius) < 25) {
          waveAct = Math.max(waveAct, rp.alpha);
        }
      }

      // A: card pull + activation
      let cardAct = 0;
      for (const a of cardAnchors) {
        const dx = a.x - n.x, dy = a.y - n.y;
        const d = Math.hypot(dx, dy);
        if (d < 260 && d > 1 && a.strength > 0.05) {
          const pull = (1 - d / 260) * 0.18 * a.strength;
          n.x += (dx / d) * pull;
          n.y += (dy / d) * pull;
          cardAct = Math.max(cardAct, (1 - d / 260) * a.strength * 0.85);
        }
      }

      // Activation merges all sources, decays smoothly
      const newAct = Math.max(wake, waveAct, cardAct);
      if (newAct > n.activated) n.activated = newAct;
      else n.activated *= 0.965;
    }

    // ---- Draw connection lines ----
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      if (a.y > revealY) continue;
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        if (b.y > revealY) continue;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK_DIST) {
          let lineAlpha = (1 - d / LINK_DIST) * 0.18;
          lineAlpha += breathe * 0.04;
          lineAlpha += (a.activated + b.activated) * 0.20;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,80,180,${Math.min(lineAlpha, 0.6)})`;
          ctx.lineWidth = 0.7 + (a.activated + b.activated) * 0.4;
          ctx.stroke();
        }
      }
    }

    // ---- Draw nodes ----
    for (const n of nodes) {
      if (n.y > revealY) continue;
      const glow = (Math.sin(n.pulse) + 1) * 0.5;
      let alpha = 0.30 + glow * 0.22 + breathe * 0.08 + n.activated * 0.45;
      let r = n.r + glow * 0.7 + breathe * 0.4 + n.activated * 1.8;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,80,180,${Math.min(alpha, 0.95)})`;
      ctx.fill();
    }

    // ---- A: red wires from card anchors to nearest nodes ----
    for (const a of cardAnchors) {
      if (a.strength < 0.05) continue;
      const candidates = nodes
        .map(n => ({ n, d: Math.hypot(n.x - a.x, n.y - a.y) }))
        .filter(c => c.d > 30 && c.d < 240 && c.n.y < revealY)
        .sort((x, y) => x.d - y.d)
        .slice(0, 6);
      for (const c of candidates) {
        const fade = (1 - c.d / 240) * a.strength * 0.45;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(c.n.x, c.n.y);
        ctx.strokeStyle = `rgba(220,20,60,${fade})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }

    // ---- C: ripple rings ----
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.radius += rp.speed;
      rp.alpha *= 0.978;
      if (rp.radius > rp.maxRadius || rp.alpha < 0.01) { ripples.splice(i, 1); continue; }
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,140,255,${rp.alpha * 0.40})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.radius - 4, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(220,20,60,${rp.alpha * 0.25})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // ---- E: faint trail markers ----
    for (const tp of trail) {
      ctx.beginPath();
      ctx.arc(tp.x, tp.y, 1.4 + tp.life * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,140,255,${tp.life * 0.16})`;
      ctx.fill();
    }

    requestAnimationFrame(frame);
  }

  size(); frame();
  window.addEventListener('resize', size, { passive: true });
})();



/* ===== 6. PROGRESS BARS — staggered fill on view ===== */
(function() {
  const bars = document.querySelectorAll('.armak-stat-bar-fill');
  const section = document.querySelector('.armak-stats');
  if (!bars.length || !section) return;
  let fired = false;
  function fire() {
    if (fired) return; fired = true;
    bars.forEach((bar, i) => {
      setTimeout(() => { bar.style.width = bar.dataset.pct + '%'; }, i * 180);
    });
  }
  const obs = new IntersectionObserver(es => {
    if (es[0].isIntersecting) { fire(); obs.disconnect(); }
  }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
  obs.observe(section);
  requestAnimationFrame(() => {
    if (section.getBoundingClientRect().top < window.innerHeight) { fire(); obs.disconnect(); }
  });
})();

/* =========================================================================
   UTILITY OVERLAY SYSTEM — every module reacts to a real signal
   ========================================================================= */

/* ===== INTRO LOADER — fires once per session, tied to real load events ===== */
(function() {
  const loader = document.getElementById('armakLoader');
  const bar = document.getElementById('loaderBar');
  const label = document.getElementById('loaderLabel');
  const pct = document.getElementById('loaderPct');
  if (!loader) return;

  // Skip on subsequent visits within session
  if (sessionStorage.getItem('armakLoaded')) {
    loader.classList.add('is-skip');
    return;
  }

  let progress = 0;
  function set(p, text) {
    progress = Math.max(progress, p);
    bar.style.width = progress + '%';
    pct.textContent = Math.round(progress) + '%';
    if (text) label.textContent = text;
  }

  set(8, 'INITIALIZING');

  // Phase 1 — DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => set(28, 'PARSING DOM'));
  } else { set(28, 'PARSING DOM'); }

  // Phase 2 — Fonts ready
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => set(58, 'LOADING ASSETS'));
  } else { setTimeout(() => set(58, 'LOADING ASSETS'), 300); }

  // Phase 3 — Window load (images, scripts done)
  window.addEventListener('load', () => {
    set(88, 'COMPILING');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        set(100, 'READY');
        setTimeout(() => {
          loader.classList.add('is-done');
          sessionStorage.setItem('armakLoaded', '1');
        }, 380);
      });
    });
  });

  // Failsafe — if window load never fires within 4s
  setTimeout(() => {
    if (progress < 100) {
      set(100, 'READY');
      setTimeout(() => loader.classList.add('is-done'), 300);
    }
  }, 4000);
})();

/* ===== SCROLL PROGRESS BAR ===== */
(function() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  let ticking = false;
  function update() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = pct + '%';
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();

/* ===== SECTION DOTS + BREADCRUMB + DARK/LIGHT ADAPTATION ===== */
(function() {
  const dots = document.querySelectorAll('.section-dot');
  const dotsNav = document.getElementById('sectionDots');
  const bcCurrent = document.getElementById('bcCurrent');
  if (!dots.length) return;

  const sections = ['home','services','about','contact'].map(id => {
    return document.getElementById(id) || document.querySelector(`#${id}, .armak-${id}, section[id="${id}"]`);
  }).filter(Boolean);

  // Map section ids to readable labels
  const labels = { home: 'Home', services: 'Services', about: 'About', contact: 'Contact' };

  // Sections with dark backgrounds that affect dot colors
  const darkSections = ['stats','services'];

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
})();

/* ===== SOCAL MAP SIGNAL TRACES — HQ broadcasts to a city every few seconds ===== */
(function() {
  const signalLayer = document.getElementById('mapSignals');
  if (!signalLayer) return;
  const cities = Array.from(document.querySelectorAll('.map-city:not(.is-hq) .city-dot'));
  if (!cities.length) return;
  const HQ = { x: 597.2, y: 286.4 };

  function fire() {
    const target = cities[Math.floor(Math.random() * cities.length)];
    const x = parseFloat(target.getAttribute('cx'));
    const y = parseFloat(target.getAttribute('cy'));
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', HQ.x);
    line.setAttribute('y1', HQ.y);
    line.setAttribute('x2', x);
    line.setAttribute('y2', y);
    signalLayer.appendChild(line);
    // Brief flash on the target city
    target.animate(
      [{ r: target.getAttribute('r'), fill: '#fff' }, { r: '6', fill: '#fff' }, { r: target.getAttribute('r'), fill: 'rgb(220,20,60)' }],
      { duration: 900, easing: 'cubic-bezier(0.4,0,0.6,1)' }
    );
    setTimeout(() => line.remove(), 1200);
  }

  // Fire on a slow rhythm, but only when map is in viewport
  const map = document.getElementById('heroMap');
  let interval;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      fire();
      interval = setInterval(fire, 1800);
    } else {
      clearInterval(interval);
    }
  }, { threshold: 0.3 });
  if (map) obs.observe(map);
})();

/* ===== RADAR-SYNCED CITY PULSES — pulse a city when the sweep passes over it ===== */
(function() {
  const radar = document.querySelector('.map-radar');
  const map = document.getElementById('heroMap');
  if (!radar || !map) return;

  const HQ = { x: 597.2, y: 286.4 };
  const RADAR_PERIOD_MS = 9000; // matches CSS radar animation
  const SWEEP_TOLERANCE_DEG = 6; // how wide the "active" beam is

  // Build city list with their angles relative to HQ
  const cityNodes = Array.from(document.querySelectorAll('.map-city:not(.is-hq)'));
  const cities = cityNodes.map(node => {
    const dot = node.querySelector('.city-dot');
    const x = parseFloat(dot.getAttribute('cx'));
    const y = parseFloat(dot.getAttribute('cy'));
    let angle = Math.atan2(y - HQ.y, x - HQ.x) * 180 / Math.PI; // -180..180, 0=right
    if (angle < 0) angle += 360; // 0..360
    return { node, dot, angle, ringEls: node.querySelectorAll('.pulse-ring'), lastFired: 0 };
  });

  let startTime = performance.now();
  function tick(now) {
    const elapsed = (now - startTime) % RADAR_PERIOD_MS;
    const sweepAngle = (elapsed / RADAR_PERIOD_MS) * 360; // 0..360

    cities.forEach(c => {
      let diff = ((sweepAngle - c.angle) + 540) % 360 - 180;
      if (Math.abs(diff) < SWEEP_TOLERANCE_DEG && (now - c.lastFired) > RADAR_PERIOD_MS - 500) {
        c.lastFired = now;
        c.ringEls.forEach(ring => {
          ring.classList.remove('is-pulsing');
          // force reflow then re-add to restart animation
          void ring.getBoundingClientRect();
          ring.classList.add('is-pulsing');
        });
      }
    });
    requestAnimationFrame(tick);
  }
  // Only run when map is visible
  const visObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      startTime = performance.now();
      requestAnimationFrame(tick);
    }
  }, { threshold: 0.2 });
  visObs.observe(map);
})();

/* ===== CONTEXTUAL CUSTOM CURSOR (DISABLED — using native cursor) ===== */
(function() {
  return; // disabled
  // Bail on touch / coarse pointer devices
  if (!matchMedia('(pointer: fine)').matches) return;
  const cursor = document.getElementById('armakCursor');
  const cLabel = document.getElementById('armakCursorLabel');
  if (!cursor) return;

  document.body.classList.add('has-custom-cursor');

  let tx = 0, ty = 0, cx = 0, cy = 0;
  let mode = null, label = '';

  function setMode(newMode, newLabel) {
    if (mode !== newMode) {
      mode = newMode;
      if (mode) cursor.setAttribute('data-mode', mode);
      else cursor.removeAttribute('data-mode');
      cursor.classList.toggle('is-active', !!mode);
    }
    if (label !== newLabel) {
      label = newLabel;
      cLabel.textContent = label;
      cLabel.classList.toggle('is-active', !!label);
    }
  }

  document.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;

    // Determine mode by element under cursor — every mode has a real reason
    const el = e.target;
    if (el.closest('.armak-hero')) {
      setMode('scope', 'SCOPE');
    } else if (el.closest('.armak-service-card')) {
      const card = el.closest('.armak-service-card');
      const numEl = card.querySelector('.armak-service-num');
      const num = numEl ? numEl.textContent.match(/\d+/)?.[0] : '';
      setMode('card', num ? 'FLIP · ' + num : 'FLIP');
    } else if (el.closest('.armak-marquee')) {
      setMode('pause', 'PAUSED');
    } else if (el.closest('.map-city')) {
      const cityName = el.closest('.map-city').getAttribute('data-city') || '';
      setMode('scope', cityName.toUpperCase());
    } else if (el.closest('a, button')) {
      setMode('link', '');
    } else {
      setMode(null, '');
    }
  });

  document.addEventListener('mouseleave', () => setMode(null, ''));

  function tick() {
    cx += (tx - cx) * 0.25;
    cy += (ty - cy) * 0.25;
    cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    cLabel.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    requestAnimationFrame(tick);
  }
  tick();
})();

/* ===== MAGNETIC BUTTONS ===== */
(function() {
  if (!matchMedia('(pointer: fine)').matches) return;
  const buttons = document.querySelectorAll('.armak-btn-primary, .armak-form-submit, .armak-cta-btn, .armak-nav-cta');
  buttons.forEach(btn => {
    let raf, tx = 0, ty = 0, cx = 0, cy = 0;
    function follow() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      btn.style.transform = `translate(${cx}px, ${cy}px)`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(follow);
      } else { raf = null; }
    }
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      // Magnetic strength — capped, scaled by distance
      tx = dx * 0.18;
      ty = dy * 0.28;
      if (!raf) raf = requestAnimationFrame(follow);
    });
    btn.addEventListener('mouseleave', () => {
      tx = 0; ty = 0;
      if (!raf) raf = requestAnimationFrame(follow);
    });
  });
})();

/* ===== FORM ERROR PULSE — submit button pulses red on validation fail ===== */
(function() {
  const form = document.querySelector('.armak-form');
  const submit = form ? form.querySelector('.armak-form-submit') : null;
  if (!form || !submit) return;
  form.addEventListener('submit', e => {
    if (!form.checkValidity()) {
      e.preventDefault();
      submit.animate(
        [{ boxShadow: '0 0 0 1px rgba(220,20,60,.55), 0 0 44px rgba(220,20,60,.7)' },
         { boxShadow: '0 0 0 3px rgba(220,20,60,.9),  0 0 64px rgba(220,20,60,1)' },
         { boxShadow: '0 0 0 1px rgba(220,20,60,.55), 0 0 44px rgba(220,20,60,.7)' }],
        { duration: 600, iterations: 2 }
      );
    }
  });
})();
  // Service decks — 3 stacked decks, auto-shuffle 4.5s, pauses ALL on any hover, click advances
  (function() {
    const decks = document.querySelectorAll('.svc-deck[data-deck]');
    if (!decks.length) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let anyHovered = false; // shared across all decks

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
        state.busy = true;
        state.topIndex = (state.topIndex + 1) % state.cards.length;
        reposition();
        setTimeout(() => { state.busy = false; }, 700);
      }
      state.advance = advance;

      function startTimer() {
        if (reduceMotion) return;
        stopTimer();
        state.timer = setInterval(() => {
          if (!anyHovered && state.inView) advance();
        }, 4500);
      }
      function stopTimer() {
        if (state.timer) { clearInterval(state.timer); state.timer = null; }
      }
      state.startTimer = startTimer;
      state.stopTimer = stopTimer;

      deck.addEventListener('mouseenter', () => { anyHovered = true; });
      deck.addEventListener('mouseleave', () => { anyHovered = false; });

      deck.addEventListener('click', e => {
        const card = e.target.closest('.svc-card');
        if (!card) return;
        if (card.dataset.pos === '0') advance();
      });

      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            state.inView = entry.isIntersecting;
            if (state.inView) startTimer();
            else stopTimer();
          });
        }, { threshold: 0.15 });
        io.observe(deck);
      } else {
        state.inView = true;
        startTimer();
      }
    });
  })();
  // About section — stacked card deck cycling
  (function() {
    const deck = document.getElementById('aboutDeck');
    if (!deck) return;
    const cards = Array.from(deck.querySelectorAll('.deck-card'));
    if (!cards.length) return;
    let topIndex = 0;
    let busy = false;

    function advance() {
      if (busy) return;
      busy = true;
      topIndex = (topIndex + 1) % cards.length;
      cards.forEach((card, i) => {
        const pos = (i - topIndex + cards.length) % cards.length;
        card.dataset.pos = String(pos);
      });
      setTimeout(() => { busy = false; }, 350);
    }

    // Listen on the deck container (event delegation) — catches clicks on cards or arrows
    deck.addEventListener('click', function(e) {
      const card = e.target.closest('.deck-card');
      if (!card) return;
      // Only the front (top) card advances
      if (card.dataset.pos === '0') {
        e.stopPropagation();
        advance();
      }
    });

    // Make arrows behave like buttons + add tabindex to top card
    deck.querySelectorAll('.deck-card-arrow').forEach(arrow => {
      arrow.style.cursor = 'pointer';
    });
  })();
  (function() {
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

    // Services "See All" expandable
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
  })();
  // Tap-to-flip for touch devices
  (function() {
    const isTouch = () => window.matchMedia('(hover: none)').matches;
    document.querySelectorAll('.armak-service-card').forEach(card => {
      card.addEventListener('click', () => {
        if (!isTouch()) return;
        const wasFlipped = card.classList.contains('is-flipped');
        // Close any other open cards first
        document.querySelectorAll('.armak-service-card.is-flipped').forEach(c => {
          c.classList.remove('is-flipped');
          c.setAttribute('aria-pressed', 'false');
        });
        if (!wasFlipped) {
          card.classList.add('is-flipped');
          card.setAttribute('aria-pressed', 'true');
        }
      });
    });
  })();
  // Reveal-on-scroll + staggered count-up
  (function() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveals = document.querySelectorAll('.armak-reveal');

    function animateCount(el) {
      const target = parseInt(el.dataset.target, 10);
      const useComma = el.dataset.format === 'comma';
      const duration = 1800;
      const start = performance.now();
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(eased * target);
        el.textContent = useComma ? value.toLocaleString() : value;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = useComma ? target.toLocaleString() : target;
      }
      requestAnimationFrame(step);
    }

    if (reduceMotion || !('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.add('in-view'));
      document.querySelectorAll('.armak-count').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        el.textContent = el.dataset.format === 'comma' ? target.toLocaleString() : target;
      });
      return;
    }

    // Count-up: fires the instant stats section enters view (or immediately if already visible)
    const statsSection = document.querySelector('.armak-stats');
    if (statsSection) {
      let fired = false;
      function fireCountUp() {
        if (fired) return;
        fired = true;
        const counters = statsSection.querySelectorAll('.armak-count');
        counters.forEach((el, i) => setTimeout(() => animateCount(el), i * 140));
      }
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { fireCountUp(); statsObserver.disconnect(); }
        });
      }, { threshold: 0, rootMargin: '0px 0px 60px 0px' });
      statsObserver.observe(statsSection);
      // Also fire immediately if already in viewport on load
      requestAnimationFrame(() => {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight) { fireCountUp(); statsObserver.disconnect(); }
      });
    }

    // General reveal observer — also triggers count-up on individual stat items
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Fallback: if this reveal contains a counter and wasn't caught by statsObserver
          const counter = entry.target.querySelector('.armak-count');
          if (counter && !counter.dataset.animated) {
            counter.dataset.animated = '1';
            animateCount(counter);
          }
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

    reveals.forEach(el => io.observe(el));

    requestAnimationFrame(() => {
      document.querySelectorAll('.armak-hero .armak-reveal').forEach(el => {
        el.classList.add('in-view');
      });
    });
  })();
/* ============ FLOATING DECK SHUFFLE ============ */
(function(){
  var cards = Array.from(document.querySelectorAll('.armak-value'));
  if (!cards.length) return;

  // order[0] = index of front card, order[last] = back
  var order = cards.map(function(_, i){ return i; });
  var shuffling = false;
  var hoverTimer = null;

  function applyPositions() {
    order.forEach(function(cardIdx, deckPos) {
      cards[cardIdx].setAttribute('data-deck', deckPos);
      cards[cardIdx].style.zIndex = cards.length - deckPos;
    });
  }

  function shuffle() {
    if (shuffling) return;
    shuffling = true;

    var frontIdx = order[0];
    var frontCard = cards[frontIdx];

    // Pause float animation, lift card up
    frontCard.classList.add('deck-shuffling');
    frontCard.style.transform = 'translate(0, -40px) rotate(3deg) scale(0.95)';
    frontCard.style.opacity = '0.5';

    setTimeout(function() {
      // Move front to back in order
      order.push(order.shift());
      applyPositions();

      // Reset inline styles so CSS takes over
      frontCard.style.transform = '';
      frontCard.style.opacity = '';

      setTimeout(function() {
        frontCard.classList.remove('deck-shuffling');
        shuffling = false;
      }, 700);
    }, 350);
  }

  // Init positions
  applyPositions();

  // Hover: start 3s timer on front card
  var valuesContainer = document.querySelector('.armak-values');
  valuesContainer.addEventListener('mouseenter', function() {
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(function() {
      shuffle();
      // Keep cycling while hovering
      hoverTimer = setInterval(shuffle, 3500);
    }, 3000);
  });
  valuesContainer.addEventListener('mouseleave', function() {
    clearTimeout(hoverTimer);
    clearInterval(hoverTimer);
    hoverTimer = null;
  });

  // Click: immediate shuffle
  valuesContainer.addEventListener('click', function(e) {
    // Reset hover timer on click
    clearTimeout(hoverTimer);
    clearInterval(hoverTimer);
    shuffle();
    // Restart hover timer if still hovering
    hoverTimer = setTimeout(function() {
      shuffle();
      hoverTimer = setInterval(shuffle, 3500);
    }, 3000);
  });
})();
/* ============ TRUST SIGNAL CANVAS ============ */
(function(){
  if (window.reduceMotion) return;
  var c = document.getElementById('trustSignal');
  if (!c) return;
  var ctx = c.getContext('2d');
  var W, H, lines, nodes, pulses, t = 0;

  function size() {
    var r = c.parentElement.getBoundingClientRect();
    c.width = W = r.width * devicePixelRatio;
    c.height = H = r.height * devicePixelRatio;
    c.style.width = r.width + 'px';
    c.style.height = r.height + 'px';
    init();
  }

  function init() {
    lines = [];
    nodes = [];
    pulses = [];
    var numLines = 5;
    for (var i = 0; i < numLines; i++) {
      var y = H * (0.15 + 0.7 * i / (numLines - 1));
      var amp = 3 + Math.random() * 6;
      var freq = 0.004 + Math.random() * 0.006;
      var speed = 0.3 + Math.random() * 0.6;
      var phase = Math.random() * Math.PI * 2;
      lines.push({ y: y, amp: amp * devicePixelRatio, freq: freq, speed: speed, phase: phase });
      // nodes along each line
      var nn = 6 + Math.floor(Math.random() * 5);
      for (var j = 0; j < nn; j++) {
        nodes.push({
          x: W * (0.05 + 0.9 * j / (nn - 1)),
          lineIdx: i,
          glow: 0,
          r: (1.5 + Math.random() * 1.5) * devicePixelRatio
        });
      }
    }
    // seed pulses
    for (var i = 0; i < 8; i++) spawnPulse();
  }

  function spawnPulse() {
    var li = Math.floor(Math.random() * lines.length);
    var dir = Math.random() > 0.5 ? 1 : -1;
    pulses.push({
      x: dir > 0 ? -20 : W + 20,
      lineIdx: li,
      speed: (1.5 + Math.random() * 2) * devicePixelRatio * dir,
      life: 1,
      len: (40 + Math.random() * 80) * devicePixelRatio,
      hue: Math.random() > 0.3 ? 200 : 0 // mostly cyan, some red
    });
  }

  function getLineY(line, x) {
    return line.y + Math.sin(x * line.freq + line.phase + t * line.speed * 0.01) * line.amp;
  }

  function draw() {
    t++;
    ctx.clearRect(0, 0, W, H);

    // draw lines as faint waveforms
    for (var i = 0; i < lines.length; i++) {
      var l = lines[i];
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1 * devicePixelRatio;
      for (var x = 0; x < W; x += 3) {
        var y = getLineY(l, x);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // draw & update pulses
    for (var i = pulses.length - 1; i >= 0; i--) {
      var p = pulses[i];
      var l = lines[p.lineIdx];
      p.x += p.speed;

      // draw pulse trail
      ctx.beginPath();
      var sx = p.x - p.len * Math.sign(p.speed);
      var step = 3 * Math.sign(p.speed);
      var first = true;
      for (var x = sx; Math.sign(p.speed) > 0 ? x <= p.x : x >= p.x; x += step) {
        var cx = Math.max(0, Math.min(W, x));
        var y = getLineY(l, cx);
        if (first) { ctx.moveTo(cx, y); first = false; }
        else ctx.lineTo(cx, y);
      }
      var alpha = p.hue === 0 ? '0.7' : '0.6';
      var color = p.hue === 0 ? '220,20,60' : '120,200,255';
      var grad = ctx.createLinearGradient(sx, 0, p.x, 0);
      grad.addColorStop(0, 'rgba(' + color + ',0)');
      grad.addColorStop(1, 'rgba(' + color + ',' + alpha + ')');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2 * devicePixelRatio;
      ctx.stroke();

      // glow at head
      var hy = getLineY(l, p.x);
      ctx.beginPath();
      ctx.arc(p.x, hy, 3 * devicePixelRatio, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + color + ',0.8)';
      ctx.fill();

      // activate nearby nodes
      for (var j = 0; j < nodes.length; j++) {
        var n = nodes[j];
        if (n.lineIdx === p.lineIdx && Math.abs(n.x - p.x) < 20 * devicePixelRatio) {
          n.glow = 1;
        }
      }

      // remove if offscreen
      if ((p.speed > 0 && p.x > W + 40) || (p.speed < 0 && p.x < -40)) {
        pulses.splice(i, 1);
        spawnPulse();
      }
    }

    // draw nodes
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      var l = lines[n.lineIdx];
      var y = getLineY(l, n.x);
      n.glow *= 0.94;

      // base dot
      ctx.beginPath();
      ctx.arc(n.x, y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + (0.15 + n.glow * 0.7) + ')';
      ctx.fill();

      // glow ring
      if (n.glow > 0.05) {
        ctx.beginPath();
        ctx.arc(n.x, y, n.r + 4 * devicePixelRatio * n.glow, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,' + (n.glow * 0.4) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // occasional new pulse
    if (Math.random() < 0.015) spawnPulse();

    requestAnimationFrame(draw);
  }

  size();
  window.addEventListener('resize', size, { passive: true });
  draw();
})();
/* ============ PARTNER HOVER-EXPAND ============ */
(function(){
  document.querySelectorAll('[data-expand-row]').forEach(function(row){
    var strips = row.querySelectorAll('[data-partner]');
    strips.forEach(function(s){
      s.addEventListener('mouseenter', function(){
        strips.forEach(function(el){ el.classList.remove('active'); });
        s.classList.add('active');
      });
      s.addEventListener('click', function(){
        strips.forEach(function(el){ el.classList.remove('active'); });
        s.classList.add('active');
      });
    });
    row.addEventListener('mouseleave', function(){
      // keep last active on leave — no reset
    });
  });
})();
