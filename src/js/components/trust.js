import { reduceMotion } from '../utils/motion.js';

export function initTrust() {
  initSignalCanvas();
}

function initSignalCanvas() {
  if (reduceMotion) return;
  const c = document.getElementById('trustSignal');
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H, lines, nodes, pulses, t = 0;

  function size() {
    const r = c.parentElement.getBoundingClientRect();
    c.width = W = r.width * devicePixelRatio;
    c.height = H = r.height * devicePixelRatio;
    c.style.width = r.width + 'px';
    c.style.height = r.height + 'px';
    init();
  }

  function init() {
    lines = []; nodes = []; pulses = [];
    const numLines = 5;
    for (let i = 0; i < numLines; i++) {
      const y = H * (0.15 + 0.7 * i / (numLines - 1));
      const amp = 3 + Math.random() * 6; const freq = 0.004 + Math.random() * 0.006;
      const speed = 0.3 + Math.random() * 0.6; const phase = Math.random() * Math.PI * 2;
      lines.push({ y: y, amp: amp * devicePixelRatio, freq: freq, speed: speed, phase: phase });
      const nn = 6 + Math.floor(Math.random() * 5);
      for (let j = 0; j < nn; j++) { nodes.push({ x: W * (0.05 + 0.9 * j / (nn - 1)), lineIdx: i, glow: 0, r: (1.5 + Math.random() * 1.5) * devicePixelRatio }); }
    }
    for (let i = 0; i < 8; i++) spawnPulse();
  }

  function spawnPulse() {
    const li = Math.floor(Math.random() * lines.length); const dir = Math.random() > 0.5 ? 1 : -1;
    pulses.push({ x: dir > 0 ? -20 : W + 20, lineIdx: li, speed: (1.5 + Math.random() * 2) * devicePixelRatio * dir, life: 1, len: (40 + Math.random() * 80) * devicePixelRatio, hue: Math.random() > 0.3 ? 200 : 0 });
  }

  function getLineY(line, x) { return line.y + Math.sin(x * line.freq + line.phase + t * line.speed * 0.01) * line.amp; }

  function draw() {
    t++; ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i]; ctx.beginPath(); ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1 * devicePixelRatio;
      for (let x = 0; x < W; x += 3) { const y = getLineY(l, x); if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
      ctx.stroke();
    }
    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i]; const l = lines[p.lineIdx]; p.x += p.speed;
      ctx.beginPath(); const sx = p.x - p.len * Math.sign(p.speed); const step = 3 * Math.sign(p.speed); let first = true;
      for (let x = sx; Math.sign(p.speed) > 0 ? x <= p.x : x >= p.x; x += step) { const cx = Math.max(0, Math.min(W, x)); const y = getLineY(l, cx); if (first) { ctx.moveTo(cx, y); first = false; } else ctx.lineTo(cx, y); }
      const alpha = p.hue === 0 ? '0.7' : '0.6'; const color = p.hue === 0 ? '220,20,60' : '120,200,255';
      const grad = ctx.createLinearGradient(sx, 0, p.x, 0); grad.addColorStop(0, 'rgba(' + color + ',0)'); grad.addColorStop(1, 'rgba(' + color + ',' + alpha + ')'); ctx.strokeStyle = grad; ctx.lineWidth = 2 * devicePixelRatio; ctx.stroke();
      const hy = getLineY(l, p.x); ctx.beginPath(); ctx.arc(p.x, hy, 3 * devicePixelRatio, 0, Math.PI * 2); ctx.fillStyle = 'rgba(' + color + ',0.8)'; ctx.fill();
      for (let j = 0; j < nodes.length; j++) { const n = nodes[j]; if (n.lineIdx === p.lineIdx && Math.abs(n.x - p.x) < 20 * devicePixelRatio) n.glow = 1; }
      if ((p.speed > 0 && p.x > W + 40) || (p.speed < 0 && p.x < -40)) { pulses.splice(i, 1); spawnPulse(); }
    }
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i]; const l = lines[n.lineIdx]; const y = getLineY(l, n.x); n.glow *= 0.94;
      ctx.beginPath(); ctx.arc(n.x, y, n.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,' + (0.15 + n.glow * 0.7) + ')'; ctx.fill();
      if (n.glow > 0.05) { ctx.beginPath(); ctx.arc(n.x, y, n.r + 4 * devicePixelRatio * n.glow, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(255,255,255,' + (n.glow * 0.4) + ')'; ctx.lineWidth = 1; ctx.stroke(); }
    }
    if (Math.random() < 0.015) spawnPulse();
    requestAnimationFrame(draw);
  }

  size(); window.addEventListener('resize', size, { passive: true }); draw();
}
