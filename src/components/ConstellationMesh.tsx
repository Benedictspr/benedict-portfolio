'use client';

import { useEffect, useRef } from 'react';

interface ConstellationMeshProps {
  className?: string;
  speed?: number;
  pointsCount?: number;
}

export default function ConstellationMesh({
  className = '',
  speed = 1.5,
  pointsCount,
}: ConstellationMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const context: CanvasRenderingContext2D = ctx;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let pts: Array<{ x: number; y: number; dx: number; dy: number }> = [];
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf: number | null = null;

    const count = pointsCount || (window.innerWidth < 768 ? 16 : 28);
    const reach = 0.25;
    const maxLineOpacity = 0.55;

    function seedPoints() {
      pts = [];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        pts.push({
          x: Math.random() * width,
          y: Math.random() * height,
          dx: Math.cos(angle),
          dy: Math.sin(angle),
        });
      }
    }

    function resize() {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedPoints();
    }

    function draw() {
      context.clearRect(0, 0, width, height);
      const linkDist = Math.max(width, height) * reach;

      // Connecting Lines (Warm paper tint)
      for (let i = 0; i < pts.length; i++) {
        const p1 = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const p2 = pts[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < linkDist) {
            const alpha = maxLineOpacity * (1 - dist / linkDist);
            context.strokeStyle = `rgba(246, 244, 241, ${alpha.toFixed(3)})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.stroke();
          }
        }

        // Drifting Point Nodes: Signature Coral Red (#FF4A2B)
        context.fillStyle = 'rgba(255, 74, 43, 0.65)';
        context.beginPath();
        context.arc(p1.x, p1.y, 1.8, 0, Math.PI * 2);
        context.fill();
      }
    }

    function step() {
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.dx * speed;
        p.y += p.dy * speed;
        if (p.x < -30 || p.x > width + 30) p.dx *= -1;
        if (p.y < -30 || p.y > height + 30) p.dy *= -1;
      }
      draw();
      raf = requestAnimationFrame(step);
    }

    function start() {
      if (!raf && !reduceMotion) raf = requestAnimationFrame(step);
    }

    function stop() {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    }

    resize();
    draw();
    start();

    const handleResize = () => {
      resize();
      draw();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', () => {
      document.hidden ? stop() : start();
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      stop();
    };
  }, [speed, pointsCount]);

  return (
    <canvas
      id="mesh"
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
    />
  );
}
