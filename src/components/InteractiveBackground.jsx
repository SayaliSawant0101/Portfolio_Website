import React, { useEffect, useRef } from "react";

/**
 * Constellation particles + cursor spotlight
 * - Lightweight (no extra libraries)
 * - Canvas for dots & linking lines
 * - CSS radial gradient for spotlight
 */
export default function InteractiveBackground({
  particleCount = 90,
  linkDistance = 110,
  speed = 0.25,
}) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    window.addEventListener("resize", onResize);

    // Particles
    const parts = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * (w / devicePixelRatio),
      y: Math.random() * (h / devicePixelRatio),
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      r: 1 + Math.random() * 1.8,
    }));

    let raf;
    const render = () => {
      ctx.clearRect(0, 0, w / devicePixelRatio, h / devicePixelRatio);

      // draw links
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDistance) {
            const alpha = 1 - d / linkDistance;
            ctx.strokeStyle = `rgba(120, 144, 255, ${0.15 * alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // draw particles
      for (const p of parts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(180, 200, 255, 0.85)";
        ctx.fill();

        // movement
        p.x += p.vx;
        p.y += p.vy;

        // gentle attraction to mouse (subtle)
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const md = Math.hypot(dx, dy);
        if (md < 140) {
          p.vx -= (dx / md) * 0.005;
          p.vy -= (dy / md) * 0.005;
        }

        // wrap around edges
        if (p.x < -10) p.x = (w / devicePixelRatio) + 10;
        if (p.x > (w / devicePixelRatio) + 10) p.x = -10;
        if (p.y < -10) p.y = (h / devicePixelRatio) + 10;
        if (p.y > (h / devicePixelRatio) + 10) p.y = -10;
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    // spotlight follow
    const onMove = (e) => {
      const rect = wrapRef.current.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      // update CSS vars for gradient
      wrapRef.current.style.setProperty("--mx", `${mouse.current.x}px`);
      wrapRef.current.style.setProperty("--my", `${mouse.current.y}px`);
    };
    const onLeave = () => {
      mouse.current.x = -9999; mouse.current.y = -9999;
      wrapRef.current.style.setProperty("--mx", `-9999px`);
      wrapRef.current.style.setProperty("--my", `-9999px`);
    };

    wrapRef.current.addEventListener("mousemove", onMove);
    wrapRef.current.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      wrapRef.current?.removeEventListener("mousemove", onMove);
      wrapRef.current?.removeEventListener("mouseleave", onLeave);
    };
  }, [particleCount, linkDistance, speed]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-auto fixed inset-0 -z-10"
      style={{
        // Base dark gradient + cursor spotlight
        background:
          "radial-gradient(800px 800px at var(--mx, -9999px) var(--my, -9999px), rgba(80,120,255,0.25), transparent 60%)," +
          "radial-gradient(1200px 600px at 50% -10%, rgba(37,99,235,0.12), transparent 60%)," +
          "radial-gradient(900px 500px at 90% 20%, rgba(147,51,234,0.10), transparent 60%)," +
          "radial-gradient(700px 400px at 10% 40%, rgba(16,185,129,0.10), transparent 60%)," +
          "rgb(10,10,12)",
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />
    </div>
  );
}
