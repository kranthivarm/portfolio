"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
}

function hexToRgba(hex: string, alpha: number): string {
  if (!hex || !hex.startsWith("#") || hex.length < 7)
    return `rgba(245, 166, 35, ${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function createNodes(w: number, h: number): Node[] {
  const spacing = 80;
  const nodes: Node[] = [];
  for (let x = spacing / 2; x < w; x += spacing) {
    for (let y = spacing / 2; y < h; y += spacing) {
      nodes.push({ x, y, vx: 0, vy: 0, originX: x, originY: y });
    }
  }
  return nodes;
}

export function CursorThreads() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Bail on reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animId = 0;
    let nodes: Node[] = [];
    let currentW = 0;
    let currentH = 0;
    const mouse = { x: -1000, y: -1000 };

    /* ── Sizing ────────────────────────────────────────────── */
    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w === 0 || h === 0) return;

      currentW = w;
      currentH = h;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;

      const ctx = canvas!.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      nodes = createNodes(w, h);
    }

    /* ── Draw Loop ─────────────────────────────────────────── */
    function draw() {
      const ctx = canvas!.getContext("2d");
      if (!ctx || currentW === 0) {
        animId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, currentW, currentH);

      const mx = mouse.x;
      const my = mouse.y;
      const influenceRadius = 200;
      const connectionRadius = 120;

      // Read accent color from CSS
      const accent =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--color-accent")
          .trim() || "#F5A623";

      // Update node positions
      for (const node of nodes) {
        const dx = mx - node.x;
        const dy = my - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < influenceRadius && dist > 0) {
          const force = (1 - dist / influenceRadius) * 0.08;
          node.vx += dx * force;
          node.vy += dy * force;
        }

        node.vx += (node.originX - node.x) * 0.03;
        node.vy += (node.originY - node.y) * 0.03;
        node.vx *= 0.85;
        node.vy *= 0.85;
        node.x += node.vx;
        node.y += node.vy;
      }

      // Draw connections between nearby nodes
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionRadius) {
            const alpha = (1 - dist / connectionRadius) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = hexToRgba(accent, alpha);
            ctx.stroke();
          }
        }
      }

      // Draw node dots
      for (const node of nodes) {
        const dx = node.x - mx;
        const dy = node.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / influenceRadius);

        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5 + influence * 3, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(accent, 0.12 + influence * 0.6);
        ctx.fill();

        if (influence > 0.5) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, (1.5 + influence * 3) * 3, 0, Math.PI * 2);
          ctx.fillStyle = hexToRgba(accent, influence * 0.1);
          ctx.fill();
        }
      }

      // Draw threads from cursor to nearest nodes
      if (mx > 0 && my > 0) {
        const nearest = nodes
          .map((n) => ({
            node: n,
            dist: Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2),
          }))
          .filter((n) => n.dist < influenceRadius)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 6);

        ctx.lineWidth = 1.2;
        for (const { node, dist } of nearest) {
          const alpha = (1 - dist / influenceRadius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(mx, my);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = hexToRgba(accent, alpha);
          ctx.stroke();
        }

        // Cursor glow
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 30);
        gradient.addColorStop(0, hexToRgba(accent, 0.12));
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(mx, my, 30, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    /* ── Events ────────────────────────────────────────────── */
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas!.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };
    const onTouchEnd = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd);

    /* ── Init with ResizeObserver for reliable first paint ── */
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    resize(); // also try immediately

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
