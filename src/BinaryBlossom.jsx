import { useEffect, useRef } from 'react';

const COLORS = ['#ff4d6d', '#c9184a', '#ff85a1', '#a4133c', '#ff4d6d'];
const MAX_PETALS = 4;
const CHAR_SPACING = 11;
const FONT_SIZE = 10;

// Pre-compute which grid offsets fall inside the petal shape at a given size.
// Returns array of {dx, dy, char, color} — computed once per petal spawn.
function buildPetalChars(size) {
  const w = size * 0.6;
  const h = size;
  const pad = size * 0.1;
  const bw = (w + pad) * 2;
  const bh = h + pad * 2;

  const offscreen = document.createElement('canvas');
  offscreen.width = Math.ceil(bw);
  offscreen.height = Math.ceil(bh);
  const octx = offscreen.getContext('2d');

  const cx = bw / 2;
  const cy = bh / 2;

  const path = new Path2D();
  path.moveTo(cx, cy - h * 0.08);
  path.bezierCurveTo(cx - w * 0.15, cy - h * 0.55, cx - w, cy - h * 0.35, cx - w * 0.9, cy);
  path.bezierCurveTo(cx - w * 0.7, cy + h * 0.55, cx, cy + h * 0.5, cx, cy + h * 0.5);
  path.bezierCurveTo(cx, cy + h * 0.5, cx + w * 0.7, cy + h * 0.55, cx + w * 0.9, cy);
  path.bezierCurveTo(cx + w, cy - h * 0.35, cx + w * 0.15, cy - h * 0.55, cx, cy - h * 0.08);
  path.closePath();

  const chars = [];
  for (let px = 0; px < bw; px += CHAR_SPACING) {
    for (let py = 0; py < bh; py += CHAR_SPACING) {
      if (octx.isPointInPath(path, px, py)) {
        chars.push({
          dx: px - cx,
          dy: py - cy,
          char: Math.random() > 0.5 ? '0' : '1',
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    }
  }
  return chars;
}

function newPetal(width) {
  const size = 70 + Math.random() * 40;
  return {
    x: 40 + Math.random() * (width - 80),
    y: -size,
    size,
    chars: buildPetalChars(size),
    speed: 0.45 + Math.random() * 0.4,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.008,
    swayFreq: 0.007 + Math.random() * 0.005,
    swayAmp: 0.5 + Math.random() * 0.4,
    swayOffset: Math.random() * Math.PI * 2,
    opacity: 0.75 + Math.random() * 0.2,
    age: 0,
  };
}

export default function BinaryBlossom() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const petals = [
      { ...newPetal(window.innerWidth), y: window.innerHeight * 0.15 },
      { ...newPetal(window.innerWidth), y: window.innerHeight * 0.5 },
    ];

    ctx.font = `${FONT_SIZE}px "Courier New", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let animId;
    function draw() {
      ctx.clearRect(0, 0, width, height);

      if (petals.length < MAX_PETALS && Math.random() < 0.004) {
        petals.push(newPetal(width));
      }

      ctx.font = `${FONT_SIZE}px "Courier New", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        p.age++;
        p.y += p.speed;
        p.x += Math.sin(p.swayOffset + p.age * p.swayFreq) * p.swayAmp;
        p.rotation += p.rotationSpeed;

        const fadeIn = Math.min(1, p.age / 50);
        const fadeOut = p.y > height - 100 ? Math.max(0, 1 - (p.y - (height - 100)) / 100) : 1;
        const alpha = p.opacity * fadeIn * fadeOut;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = alpha;

        for (const c of p.chars) {
          ctx.fillStyle = c.color;
          ctx.fillText(c.char, c.dx, c.dy);
        }

        ctx.restore();

        if (p.y > height + p.size) petals.splice(i, 1);
      }

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
