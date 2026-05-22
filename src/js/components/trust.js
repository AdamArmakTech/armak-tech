import { reduceMotion } from '../utils/motion.js';

/**
 * Initializes the Trust Signal canvas animation.
 * This effect creates a series of horizontal waveforms (signals) with 
 * moving pulses that activate nodes upon collision.
 */
export function initTrust() {
  if (reduceMotion) return;
  const canvas = document.getElementById('trustSignal');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  
  let canvasWidth, canvasHeight;
  let lines = [];
  let nodes = [];
  let pulses = [];
  let tick = 0;

  function resize() {
    const parentRect = canvas.parentElement.getBoundingClientRect();
    canvas.width = canvasWidth = parentRect.width * dpr;
    canvas.height = canvasHeight = parentRect.height * dpr;
    canvas.style.width = parentRect.width + 'px';
    canvas.style.height = parentRect.height + 'px';
    initializeScene();
  }

  function initializeScene() {
    lines = []; nodes = []; pulses = [];
    const numLines = 5;
    
    for (let i = 0; i < numLines; i++) {
      const yOffset = canvasHeight * (0.15 + 0.7 * i / (numLines - 1));
      const amplitude = (3 + Math.random() * 6) * dpr;
      const frequency = 0.004 + Math.random() * 0.006;
      const speed = 0.3 + Math.random() * 0.6;
      const phase = Math.random() * Math.PI * 2;
      
      lines.push({ y: yOffset, amp: amplitude, freq: frequency, speed: speed, phase: phase });
      
      const numNodes = 6 + Math.floor(Math.random() * 5);
      for (let j = 0; j < numNodes; j++) {
        nodes.push({
          x: canvasWidth * (0.05 + 0.9 * j / (numNodes - 1)),
          lineIdx: i,
          glow: 0,
          radius: (1.5 + Math.random() * 1.5) * dpr
        });
      }
    }
    for (let i = 0; i < 8; i++) spawnPulse();
  }

  function spawnPulse() {
    const lineIdx = Math.floor(Math.random() * lines.length);
    const direction = Math.random() > 0.5 ? 1 : -1;
    
    pulses.push({
      x: direction > 0 ? -20 : canvasWidth + 20,
      lineIdx: lineIdx,
      speed: (1.5 + Math.random() * 2) * dpr * direction,
      life: 1,
      length: (40 + Math.random() * 80) * dpr,
      hue: Math.random() > 0.3 ? 200 : 0 // 200 = cyan, 0 = red
    });
  }

  /**
   * Calculates the Y-position of a waveform at a given X-coordinate based on time.
   */
  function getWaveformY(line, x) {
    return line.y + Math.sin(x * line.freq + line.phase + tick * line.speed * 0.01) * line.amp;
  }

  function draw() {
    tick++;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw static waveforms
    for (const line of lines) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1 * dpr;
      for (let x = 0; x < canvasWidth; x += 3) {
        const y = getWaveformY(line, x);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Draw and update pulses
    for (let i = pulses.length - 1; i >= 0; i--) {
      const pulse = pulses[i];
      const line = lines[pulse.lineIdx];
      pulse.x += pulse.speed;

      // Draw trailing fade
      ctx.beginPath();
      const startX = pulse.x - pulse.length * Math.sign(pulse.speed);
      const step = 3 * Math.sign(pulse.speed);
      let isFirst = true;
      for (let x = startX; Math.sign(pulse.speed) > 0 ? x <= pulse.x : x >= pulse.x; x += step) {
        const cx = Math.max(0, Math.min(canvasWidth, x));
        const y = getWaveformY(line, cx);
        if (isFirst) { ctx.moveTo(cx, y); isFirst = false; }
        else ctx.lineTo(cx, y);
      }
      
      const alpha = pulse.hue === 0 ? '0.7' : '0.6';
      const color = pulse.hue === 0 ? '220,20,60' : '120,200,255';
      const gradient = ctx.createLinearGradient(startX, 0, pulse.x, 0);
      gradient.addColorStop(0, `rgba(${color},0)`);
      gradient.addColorStop(1, `rgba(${color},${alpha})`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2 * dpr;
      ctx.stroke();

      // Draw pulse glow head
      const pulseY = getWaveformY(line, pulse.x);
      ctx.beginPath();
      ctx.arc(pulse.x, pulseY, 3 * dpr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color},0.8)`;
      ctx.fill();

      // Activate nearby nodes
      for (const node of nodes) {
        if (node.lineIdx === pulse.lineIdx && Math.abs(node.x - pulse.x) < 20 * dpr) {
          node.glow = 1;
        }
      }

      // Cleanup offscreen pulses
      if ((pulse.speed > 0 && pulse.x > canvasWidth + 40) || (pulse.speed < 0 && pulse.x < -40)) {
        pulses.splice(i, 1);
        spawnPulse();
      }
    }

    // Draw and fade nodes
    for (const node of nodes) {
      const line = lines[node.lineIdx];
      const y = getWaveformY(line, node.x);
      node.glow *= 0.94; // Fade factor

      // Core dot
      ctx.beginPath();
      ctx.arc(node.x, y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${0.15 + node.glow * 0.7})`;
      ctx.fill();

      // Glow ring
      if (node.glow > 0.05) {
        ctx.beginPath();
        ctx.arc(node.x, y, node.radius + 4 * dpr * node.glow, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${node.glow * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    if (Math.random() < 0.015) spawnPulse();
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  draw();
}
