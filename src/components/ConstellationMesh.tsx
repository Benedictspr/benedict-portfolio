'use client';

import { useEffect, useRef } from 'react';

interface ConstellationMeshProps {
  className?: string;
  speed?: number;
  pointsCount?: number;
}

export default function ConstellationMesh({
  className = '',
  speed = 1.0,
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

    const count = pointsCount || (window.innerWidth < 768 ? 18 : 32);
    const reach = 0.26;
    const lineOpacity = 0.35;

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

      for (let i = 0; i < pts.length; i++) {
        const p1 = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const p2 = pts[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < linkDist) {
            const alpha = lineOpacity * (1 - dist / linkDist);
            context.strokeStyle = `rgba(148, 163, 184, ${alpha.toFixed(3)})`;
            context.lineWidth = 0.85;
            context.beginPath();
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.stroke();
          }
        }

        // Alternating nodes: Cyan / Violet / Amber
        if (i % 3 === 0) {
          context.fillStyle = 'rgba(6, 182, 212, 0.7)'; // Cyan
        } else if (i % 3 === 1) {
          context.fillStyle = 'rgba(124, 58, 237, 0.7)'; // Violet
        } else {
          context.fillStyle = 'rgba(255, 74, 43, 0.7)'; // Coral
        }

        context.beginPath();
        context.arc(p1.x, p1.y, 2.2, 0, Math.PI * 2);
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

    resize();
    step();

    const handleResize = () => {
      resize();
      draw();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed, pointsCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
    />
  );
}
