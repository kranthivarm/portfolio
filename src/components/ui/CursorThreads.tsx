"use client";

import { useEffect, useRef, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
}

/* Parse any CSS color to [r, g, b]. Handles #hex and rgb()/rgba(). */
function parseColor(color: string): [number, number, number] {
  color = color.trim();

  // Handle hex
  if (color.startsWith("#")) {
    const hex = color.length === 4
      ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
      : color;
    return [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16),
    ];
  }

  // Handle rgb(r, g, b) or rgba(r, g, b, a)
  const match = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (match) {
    return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
  }

  // Fallback: amber
  return [245, 166, 35];
}

function rgbaStr(rgb: [number, number, number], alpha: number): string {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
}

export function CursorThreads() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<Node[]>([]);
  const animFrameRef = useRef<number>(0);

  const initNodes = useCallback((w: number, h: number) => {
    const spacing = 80;
    const nodes: Node[] = [];
    for (let x = spacing / 2; x < w; x += spacing) {
      for (let y = spacing / 2; y < h; y += spacing) {
        nodes.push({ x, y, vx: 0, vy: 0, originX: x, originY: y });
      }
    }
    nodesRef.current = nodes;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      initNodes(w, h);
    }

    ctx.clearRect(0, 0, w, h);

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const influenceRadius = 200;
    const connectionRadius = 120;
    const nodes = nodesRef.current;

    // Read accent color — prefer the inline style (set by ThemeProvider) over
    // the CSS rule value (which may be stale due to Tailwind @theme specificity)
    const root = document.documentElement;
    const inlineAccent = root.style.getPropertyValue("--color-accent");
    const accentRaw = inlineAccent
      || getComputedStyle(root).getPropertyValue("--color-accent").trim()
      || "#F5A623";
    const accent = parseColor(accentRaw);

    // Update node physics
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
      node.vx += (node.originX - node.x) * 0.03;
      node.vy += (node.originY - node.y) * 0.03;

      // Damping
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
          const alpha = (1 - dist / connectionRadius) * 0.25;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = rgbaStr(accent, alpha);
          ctx.stroke();
        }
      }
    }

    // Draw node dots
    for (const node of nodes) {
      const dxMouse = node.x - mx;
      const dyMouse = node.y - my;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      const influence = Math.max(0, 1 - distMouse / influenceRadius);

      const radius = 2 + influence * 3;
      const alpha = 0.3 + influence * 0.5;

      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = rgbaStr(accent, alpha);
      ctx.fill();

      // Glow on close nodes
      if (influence > 0.5) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = rgbaStr(accent, influence * 0.1);
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

      ctx.lineWidth = 1.2;
      for (const { node, dist } of sortedByDist) {
        const alpha = (1 - dist / influenceRadius) * 0.35;
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = rgbaStr(accent, alpha);
        ctx.stroke();
      }

      // Mouse cursor glow
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 30);
      gradient.addColorStop(0, rgbaStr(accent, 0.15));
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(mx, my, 30, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    animFrameRef.current = requestAnimationFrame(draw);
  }, [initNodes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /*
     * Listen on DOCUMENT for mouse events — not on the canvas.
     * The hero content sits at z-10 above the canvas, so canvas-level
     * listeners never fire. Document-level listeners always work.
     */
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current = { x, y };
      } else {
        mouseRef.current = { x: -1000, y: -1000 };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          mouseRef.current = { x, y };
        }
      }
    };

    const handleMouseLeaveOrTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleMouseLeaveOrTouchEnd);

    // Start continuous draw loop
    animFrameRef.current = requestAnimationFrame(draw);

    // Handle window resize
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      initNodes(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseLeaveOrTouchEnd);
      window.removeEventListener("resize", handleResize);
    };
  }, [draw, initNodes]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      aria-hidden="true"
    />
  );
}
