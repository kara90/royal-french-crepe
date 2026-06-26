"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ring = { stiffness: 240, damping: 24, mass: 0.5 };
  const rx = useSpring(x, ring);
  const ry = useSpring(y, ring);

  useEffect(() => {
    const fine =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;
    setEnabled(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target;
      const interactive =
        t && t.closest
          ? t.closest("a, button, [data-cursor], input, textarea, select")
          : null;
      setHovering(!!interactive);
      setLabel(interactive?.getAttribute?.("data-cursor") || "");
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 72 : hovering ? 50 : 32;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
        style={{ x: rx, y: ry }}
      >
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
          animate={{
            width: size,
            height: size,
            backgroundColor: label
              ? "oklch(0.74 0.105 78 / 0.95)"
              : "oklch(0.74 0.105 78 / 0)",
            borderColor: "oklch(0.74 0.105 78 / 0.6)",
            borderWidth: label ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <AnimatePresence mode="wait">
            {label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="font-sans text-[0.7rem] font-semibold uppercase tracking-widest text-noir"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
        style={{ x, y }}
      >
        <motion.div
          animate={{ opacity: label ? 0 : 1 }}
          className="size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
        />
      </motion.div>
    </>
  );
}
