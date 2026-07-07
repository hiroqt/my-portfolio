'use client';

import React, { useEffect, useRef } from 'react';

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const dots: { x: number, y: number, baseX: number, baseY: number, size: number, opacity: number }[] = [];
    const spacing = 32; // Distance between dots in the grid
    const mouse = { x: -1000, y: -1000 };
    const interactionRadius = 500; // Increased range of the magnetic effect

    const initDots = () => {
      dots.length = 0;
      // Add padding to cover entire screen even when repulsed
      for (let x = -spacing; x < width + spacing; x += spacing) {
        for (let y = -spacing; y < height + spacing; y += spacing) {
          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            size: 1.5,
            opacity: 0.2
          });
        }
      }
    };

    initDots();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initDots();
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        
        const dx = mouse.x - dot.baseX;
        const dy = mouse.y - dot.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetX = dot.baseX;
        let targetY = dot.baseY;
        let targetOpacity = 0.2;
        let targetSize = 1.5;

        // Antigravity repulsion effect
        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          const angle = Math.atan2(dy, dx);
          
          // Push away from mouse - increased distance for wider collapse
          const pushDistance = force * 80;
          targetX -= Math.cos(angle) * pushDistance;
          targetY -= Math.sin(angle) * pushDistance;
          
          // Increase opacity and size slightly near the mouse
          targetOpacity = 0.2 + force * 0.8;
          targetSize = 1.5 + force * 2.0;
        }

        // Ease to target positions
        dot.x += (targetX - dot.x) * 0.15;
        dot.y += (targetY - dot.y) * 0.15;
        dot.opacity += (targetOpacity - dot.opacity) * 0.1;
        dot.size += (targetSize - dot.size) * 0.1;

        ctx.beginPath();
        // Terminal theme: white/gray dots
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity * 0.5})`;
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-30"
    />
  );
}
