"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
}

const COLORS = ["#3B82F6", "#06B6D4", "#22C55E", "#A855F7", "#EAB308", "#EC4899"];

export default function PixelParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);

  const spawnParticle = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particle: Particle = {
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      size: Math.random() < 0.6 ? 4 : 8,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: -(Math.random() * 0.8 + 0.3),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: Math.random() * 0.5 + 0.3,
      life: 0,
      maxLife: Math.random() * 200 + 150,
    };

    particlesRef.current.push(particle);

    // Limit particle count
    if (particlesRef.current.length > 30) {
      particlesRef.current.shift();
    }
  }, []);

  const animate = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn particles at intervals
      if (timestamp - lastSpawnRef.current > 300) {
        spawnParticle();
        lastSpawnRef.current = timestamp;
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        p.x += p.speedX;
        p.y += p.speedY;

        const lifeRatio = p.life / p.maxLife;
        const currentOpacity = p.opacity * (1 - lifeRatio);

        if (currentOpacity <= 0 || p.y < -20) return false;

        // Draw pixel square
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentOpacity;
        ctx.fillRect(
          Math.round(p.x / p.size) * p.size,
          Math.round(p.y / p.size) * p.size,
          p.size,
          p.size
        );

        return true;
      });

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    },
    [spawnParticle]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-60"
      aria-hidden="true"
    />
  );
}
