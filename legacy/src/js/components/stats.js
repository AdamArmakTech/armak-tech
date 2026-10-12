import { reduceMotion } from '../utils/motion.js';

export function initStats() {
  initCircuit();
  initCounters();
  initProgressBars();
}

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
// Export for global reveal observer fallback
window.armakAnimateCount = animateCount;

function initCircuit() {
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
    traces = []; nodes = [];
    const HSTEP = 55; const VSTEP = 110;
    for (let y = HSTEP / 2; y < H; y += HSTEP) {
      let x = -20 + Math.random() * 30;
      while (x < W) {
        const len = Math.random() * 220 + 60;
        const xEnd = Math.min(x + len, W);
        const r = Math.random();
        let path;
        if (r < 0.3 && y + 35 < H) path = [{ x, y }, { x: xEnd, y }, { x: xEnd, y: y + 35 }];
        else if (r < 0.45 && y - 35 > 0) path = [{ x, y }, { x: xEnd, y }, { x: xEnd, y: y - 35 }];
        else if (r < 0.55 && y + 35 < H && xEnd + 40 < W) path = [{ x, y }, { x: xEnd, y }, { x: xEnd, y: y + 35 }, { x: xEnd + 40, y: y + 35 }];
        else path = [{ x, y }, { x: xEnd, y }];
        traces.push({ path });
        if (Math.random() > 0.55) nodes.push({ x: xEnd, y: path[path.length - 1].y, type: Math.random() > 0.7 ? 'transistor' : 'pad' });
        x = xEnd + 18 + Math.random() * 30;
      }
    }
    for (let x = VSTEP / 2; x < W; x += VSTEP) {
      const y0 = Math.random() * 40; const y1 = Math.min(y0 + 80 + Math.random() * 180, H);
      traces.push({ path: [{ x, y: y0 }, { x, y: y1 }] });
      if (Math.random() > 0.5) nodes.push({ x: y1, y: y1, type: Math.random() > 0.6 ? 'transistor' : 'pad' });
    }
    pulses = Array.from({ length: 32 }, () => spawnPulse());
  }

  function spawnPulse() {
    const t = traces[(Math.random() * traces.length) | 0];
    const band = Math.random();
    let speed;
    if (band < 0.35) speed = 0.0012 + Math.random() * 0.0015;
    else if (band < 0.75) speed = 0.0035 + Math.random() * 0.0028;
    else speed = 0.008 + Math.random() * 0.006;
    return { trace: t, progress: Math.random(), speed, color: Math.random() > 0.6 ? 'red' : 'blue' };
  }

  function pointAt(trace, t) {
    const segs = []; let total = 0;
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
    ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(0,102,204,0.18)';
    for (const t of traces) {
      ctx.beginPath(); ctx.moveTo(t.path[0].x, t.path[0].y);
      for (let i = 1; i < t.path.length; i++) ctx.lineTo(t.path[i].x, t.path[i].y);
      ctx.stroke();
    }
    for (const n of nodes) {
      if (n.type === 'transistor') {
        ctx.strokeStyle = 'rgba(0,140,255,0.32)'; ctx.fillStyle = 'rgba(0,102,204,0.18)';
        ctx.fillRect(n.x - 4, n.y - 3, 8, 6); ctx.strokeRect(n.x - 4, n.y - 3, 8, 6);
        const phase = (tick * 0.02 + n.x * 0.01) % (Math.PI * 2);
        const pulse = (Math.sin(phase) + 1) * 0.5;
        if (pulse > 0.85) { ctx.fillStyle = 'rgba(220,20,60,' + ((pulse - 0.85) * 4) + ')'; ctx.fillRect(n.x - 4, n.y - 3, 8, 6); }
      } else {
        ctx.beginPath(); ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,140,255,0.35)'; ctx.fill();
      }
    }
    for (const p of pulses) {
      p.progress += p.speed;
      if (p.progress > 1) Object.assign(p, spawnPulse(), { progress: 0 });
      const pt = pointAt(p.trace, p.progress);
      const isRed = p.color === 'red'; const c1 = isRed ? '220,20,60' : '0,140,255';
      const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 12);
      g.addColorStop(0, `rgba(${c1},0.9)`); g.addColorStop(1, `rgba(${c1},0)`);
      ctx.fillStyle = g; ctx.fillRect(pt.x - 12, pt.y - 12, 24, 24);
      ctx.beginPath(); ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2); ctx.fillStyle = `rgba(${c1},1)`; ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  size(); frame();
  window.addEventListener('resize', size, { passive: true });
}

function initCounters() {
  const statsSection = document.querySelector('.armak-stats');
  if (!statsSection || reduceMotion || !('IntersectionObserver' in window)) {
    if (statsSection) {
      statsSection.querySelectorAll('.armak-count').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        el.textContent = el.dataset.format === 'comma' ? target.toLocaleString() : target;
      });
    }
    return;
  }

  let fired = false;
  function fireCountUp() {
    if (fired) return; fired = true;
    const counters = statsSection.querySelectorAll('.armak-count');
    counters.forEach((el, i) => setTimeout(() => animateCount(el), i * 140));
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { fireCountUp(); statsObserver.disconnect(); }
    });
  }, { threshold: 0, rootMargin: '0px 0px 60px 0px' });

  statsObserver.observe(statsSection);
  requestAnimationFrame(() => {
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight) { fireCountUp(); statsObserver.disconnect(); }
  });
}

function initProgressBars() {
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
}
