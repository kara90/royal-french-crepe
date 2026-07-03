"use client";

import { useEffect, useRef } from "react";

export default function Particles({ className = "", count = 42 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let running = false;
    let W = 0;
    let H = 0;
    let parts = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = canvas.width = Math.max(1, r.width * dpr);
      H = canvas.height = Math.max(1, r.height * dpr);
    };
    const init = () => {
      // Fewer particles on small screens — same atmosphere, lighter on batteries.
      const n = window.innerWidth < 640 ? Math.ceil(count * 0.5) : count;
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: (Math.random() * 1.6 + 0.4) * dpr,
        vy: -(Math.random() * 0.28 + 0.05) * dpr,
        vx: (Math.random() - 0.5) * 0.14 * dpr,
        a: Math.random() * 0.5 + 0.18,
        tw: Math.random() * Math.PI * 2,
      }));
    };
    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.y += p.vy;
        p.x += p.vx;
        p.tw += 0.02;
        if (p.y < -12) {
          p.y = H + 12;
          p.x = Math.random() * W;
        }
        const a = p.a * (0.55 + 0.45 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(214, 178, 110, ${a})`;
        ctx.fill();
      }
      if (running) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    init();

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);

    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [count]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
}
