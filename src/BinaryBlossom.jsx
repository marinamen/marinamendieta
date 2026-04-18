import { useEffect, useRef } from 'react';

const CHARS = '01';
const FONT_SIZE = 14;
const COLORS = ['#ffc2d1', '#ff85a1', '#ffb3c6', '#ffd6e0', '#ff85a1'];
const SPEED_MIN = 0.4;
const SPEED_MAX = 1.1;
const SPAWN_RATE = 0.015; // probability per column per frame

export default function BinaryBlossom() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width, height, cols;
    const drops = []; // { x, y, speed, opacity, char, color, size }

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cols = Math.floor(width / (FONT_SIZE * 1.4));
    }

    function spawnDrop(col) {
      const x = col * FONT_SIZE * 1.4 + Math.random() * 8;
      drops.push({
        x,
        y: -FONT_SIZE,
        speed: SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN),
        opacity: 0.15 + Math.random() * 0.35,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: FONT_SIZE - 2 + Math.floor(Math.random() * 4),
        wobble: (Math.random() - 0.5) * 0.3,
        wobbleOffset: Math.random() * Math.PI * 2,
        age: 0,
      });
    }

    let animId;
    function draw() {
      ctx.clearRect(0, 0, width, height);

      // spawn new drops
      for (let c = 0; c < cols; c++) {
        if (Math.random() < SPAWN_RATE) spawnDrop(c);
      }

      // draw and update
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.age++;
        d.y += d.speed;
        d.x += Math.sin(d.wobbleOffset + d.age * 0.04) * d.wobble;

        // fade in/out
        const fadeIn = Math.min(1, d.age / 30);
        const fadeOut = d.y > height - 80 ? Math.max(0, 1 - (d.y - (height - 80)) / 80) : 1;
        const alpha = d.opacity * fadeIn * fadeOut;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = d.color;
        ctx.font = `${d.size}px "Courier New", monospace`;
        ctx.fillText(d.char, d.x, d.y);

        if (d.y > height + FONT_SIZE) drops.splice(i, 1);
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);

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
