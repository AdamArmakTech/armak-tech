import { reduceMotion } from '../utils/motion.js';

export function initHero() {
  initParallax();
  initParticles();
  initMapSignals();
  initRadarPulses();
}

function initParallax() {
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
}

function initParticles() {
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
      if (mouse.active) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14400) {
          const f = (1 - Math.sqrt(d2) / 120) * 0.6;
          p.vx += (dx / Math.sqrt(d2 + 1)) * f;
          p.vy += (dy / Math.sqrt(d2 + 1)) * f;
        }
      }
      const drift = Math.sin((frameCount * 0.005) + p.driftPhase) * 0.04;
      p.vx += drift * 0.3; p.vy += drift * 0.2;
      p.vx *= 0.985; p.vy *= 0.985;
      p.x += p.vx * p.depth; p.y += p.vy * p.depth;
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
  setTimeout(init, 300);
  setTimeout(init, 1200);
  frame();
  window.addEventListener('resize', init, { passive: true });
  canvas.parentElement.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true;
  });
  canvas.parentElement.addEventListener('mouseleave', () => { mouse.active = false; });
}

function initMapSignals() {
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
    line.setAttribute('x1', HQ.x); line.setAttribute('y1', HQ.y);
    line.setAttribute('x2', x); line.setAttribute('y2', y);
    signalLayer.appendChild(line);
    target.animate(
      [{ r: target.getAttribute('r'), fill: '#fff' }, { r: '6', fill: '#fff' }, { r: target.getAttribute('r'), fill: 'rgb(220,20,60)' }],
      { duration: 900, easing: 'cubic-bezier(0.4,0,0.6,1)' }
    );
    setTimeout(() => line.remove(), 1200);
  }

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
}

function initRadarPulses() {
  const radar = document.querySelector('.map-radar');
  const map = document.getElementById('heroMap');
  if (!radar || !map) return;

  const HQ = { x: 597.2, y: 286.4 };
  const RADAR_PERIOD_MS = 9000;
  const SWEEP_TOLERANCE_DEG = 6;

  const cityNodes = Array.from(document.querySelectorAll('.map-city:not(.is-hq)'));
  const cities = cityNodes.map(node => {
    const dot = node.querySelector('.city-dot');
    const x = parseFloat(dot.getAttribute('cx'));
    const y = parseFloat(dot.getAttribute('cy'));
    let angle = Math.atan2(y - HQ.y, x - HQ.x) * 180 / Math.PI;
    if (angle < 0) angle += 360;
    return { node, dot, angle, ringEls: node.querySelectorAll('.pulse-ring'), lastFired: 0 };
  });

  let startTime = performance.now();
  function tick(now) {
    const elapsed = (now - startTime) % RADAR_PERIOD_MS;
    const sweepAngle = (elapsed / RADAR_PERIOD_MS) * 360;

    cities.forEach(c => {
      let diff = ((sweepAngle - c.angle) + 540) % 360 - 180;
      if (Math.abs(diff) < SWEEP_TOLERANCE_DEG && (now - c.lastFired) > RADAR_PERIOD_MS - 500) {
        c.lastFired = now;
        c.ringEls.forEach(ring => {
          ring.classList.remove('is-pulsing');
          void ring.getBoundingClientRect();
          ring.classList.add('is-pulsing');
        });
      }
    });
    requestAnimationFrame(tick);
  }
  const visObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      startTime = performance.now();
      requestAnimationFrame(tick);
    }
  }, { threshold: 0.2 });
  visObs.observe(map);
}
