"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
}

export function CursorThreads() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<Node[]>([]);
  const animFrameRef = useRef<number>(0);
  const reducedMotion = useRef(false);
  const sizeRef = useRef({ w: 0, h: 0 });
  const [ready, setReady] = useState(false);

  const initNodes = useCallback((w: number, h: number) => {
    if (w === 0 || h === 0) return;
    const spacing = 80;
    const nodes: Node[] = [];
    for (let x = spacing / 2; x < w; x += spacing) {
      for (let y = spacing / 2; y < h; y += spacing) {
        nodes.push({
          x,
          y,
          vx: 0,
          vy: 0,
          originX: x,
          originY: y,
        });
      }
    }
    nodesRef.current = nodes;
  }, []);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);

    if (w === 0 || h === 0) return false;

    sizeRef.current = { w, h };
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    initNodes(w, h);
    return true;
  }, [initNodes]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w, h } = sizeRef.current;
    if (w === 0 || h === 0) {
      // Canvas not sized yet, try again next frame
      animFrameRef.current = requestAnimationFrame(draw);
      return;
    }

    ctx.clearRect(0, 0, w, h);

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const influenceRadius = 200;
    const connectionRadius = 120;
    const nodes = nodesRef.current;

    if (nodes.length === 0) {
      animFrameRef.current = requestAnimationFrame(draw);
      return;
    }

    // Get the CSS variable for accent color
    const accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-accent")
      .trim() || "#F5A623";

    // Helper to create rgba from hex + alpha
    const hexToRgba = (hex: string, alpha: number): string => {
      if (!hex.startsWith("#")) return `rgba(245, 166, 35, ${alpha})`;
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // Update nodes — pulled toward mouse, spring back to origin
    for (const node of nodes) {
      const dxMouse = mx - node.x;
      const dyMouse = my - node.y;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

      if (distMouse < influenceRadius && distMouse > 0) {
        const force = (1 - distMouse / influenceRadius) * 0.08;
        node.vx += dxMouse * force;
        node.vy += dyMouse * force;
      }

      // Spring back to origin
      const dxOrigin = node.originX - node.x;
      const dyOrigin = node.originY - node.y;
      node.vx += dxOrigin * 0.03;
      node.vy += dyOrigin * 0.03;

      // Damping
      node.vx *= 0.85;
      node.vy *= 0.85;

      node.x += node.vx;
      node.y += node.vy;
    }

    // Draw threads (connections between nearby nodes)
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
          ctx.strokeStyle = hexToRgba(accentColor, alpha);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (const node of nodes) {
      const dxMouse = node.x - mx;
      const dyMouse = node.y - my;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      const influence = Math.max(0, 1 - distMouse / influenceRadius);

      const radius = 1.5 + influence * 3;
      const alpha = 0.12 + influence * 0.6;

      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(accentColor, alpha);
      ctx.fill();

      // Glow on close nodes
      if (influence > 0.5) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(accentColor, influence * 0.1);
        ctx.fill();
      }
    }

    // Draw threads from mouse to nearest nodes
    if (mx > 0 && my > 0) {
      const sortedByDist = nodes
        .map((n) => ({
          node: n,
          dist: Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2),
        }))
        .filter((n) => n.dist < influenceRadius)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 6);

      for (const { node, dist } of sortedByDist) {
        const alpha = (1 - dist / influenceRadius) * 0.35;
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = hexToRgba(accentColor, alpha);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Mouse cursor glow
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 30);
      gradient.addColorStop(0, hexToRgba(accentColor, 0.12));
      gradient.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(mx, my, 30, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    if (!reducedMotion.current) {
      animFrameRef.current = requestAnimationFrame(draw);
    }
  }, [initNodes]);

  /* ── Use ResizeObserver for reliable canvas sizing ─────── */
  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // ResizeObserver reliably fires once the element has a real layout size,
    // which fixes the production SSR hydration timing issue where
    // clientWidth/clientHeight are 0 on first useEffect run.
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setupCanvas();
          if (!ready) setReady(true);
        }
      }
    });
    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
    };
  }, [setupCanvas, ready]);

  /* ── Start draw loop + attach event listeners once ready ── */
  useEffect(() => {
    if (!ready) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd);

    if (reducedMotion.current) {
      draw();
    } else {
      animFrameRef.current = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [ready, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
