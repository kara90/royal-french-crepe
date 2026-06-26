"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

export default function Tilt({ children, className = "", max = 7 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sy = useSpring(ry, { stiffness: 200, damping: 18 });
  const mx = useMotionValue("50%");
  const my = useMotionValue("50%");
  const op = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });
  const sheen = useMotionTemplate`radial-gradient(circle at ${mx} ${my}, oklch(1 0 0 / 0.16), transparent 45%)`;

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    ry.set((x - 0.5) * max * 2);
    rx.set(-(y - 0.5) * max * 2);
    mx.set(`${x * 100}%`);
    my.set(`${y * 100}%`);
    op.set(1);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
    op.set(0);
  };

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: sx, rotateY: sy, transformPerspective: 900 }}
      className={`relative ${className}`}
    >
      {children}
      <motion.span
        aria-hidden
        style={{ background: sheen, opacity: op }}
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
      />
    </motion.div>
  );
}
