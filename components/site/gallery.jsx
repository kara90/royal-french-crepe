"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { X, ArrowLeft, ArrowRight, MoveHorizontal } from "lucide-react";
import Reveal from "./reveal";

const shots = [
  { src: "/images/catering-stand.jpg", cap: "Oceanside crêpe station" },
  { src: "/images/classic-stand.jpg", cap: "Our classic stand" },
  { src: "/images/crepe-handheld.jpg", cap: "Folded to order" },
  { src: "/images/marie-antoinette.jpg", cap: "Marie Antoinette" },
  { src: "/images/catering-garden.jpg", cap: "Garden soirée" },
  { src: "/images/menu/caviar-1.jpg", cap: "La Royale Ossetra" },
  { src: "/images/atlantic-salmon.jpg", cap: "Buckwheat galette" },
  { src: "/images/station-candlelit.jpg", cap: "Candlelit service" },
  { src: "/images/la-gourmande.jpg", cap: "La Gourmande" },
  { src: "/images/catering-oceanside.jpg", cap: "Handcrafted on site" },
  { src: "/images/the-new-york.jpg", cap: "The New York" },
  { src: "/images/menu/caviar-2.jpg", cap: "L'Essence d'Ossetra" },
];

// Duplicated once so the strip can loop back on itself seamlessly.
const row = [...shots, ...shots];

export default function Gallery() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const loop = useRef(0); // exact width of one full set (for a seamless wrap)
  const paused = useRef(false); // hover / touch
  const visible = useRef(false); // in viewport
  const reduce = useRef(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      const el = trackRef.current;
      if (el && el.children.length > shots.length) {
        loop.current =
          el.children[shots.length].offsetLeft - el.children[0].offsetLeft;
      }
    };
    measure();
    const t = setTimeout(measure, 800); // re-measure once images settle
    window.addEventListener("resize", measure);

    const io = new IntersectionObserver(
      ([e]) => (visible.current = e.isIntersecting),
      { threshold: 0 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
      io.disconnect();
    };
  }, []);

  // Slow, continuous auto-slide — pauses on hover/touch, off-screen, or lightbox.
  useAnimationFrame((_, delta) => {
    if (reduce.current || paused.current || !visible.current || active !== null)
      return;
    if (!loop.current) return;
    const speed = 0.03; // ~30px per second
    let next = x.get() - speed * delta;
    if (next <= -loop.current) next += loop.current;
    x.set(next);
  });

  const open = (i) => setActive(i);
  const step = (d) => setActive((a) => (a + d + shots.length) % shots.length);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cream py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">05 — La Galerie</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-noir sm:text-5xl">
              The lookbook
            </h2>
          </div>
          <span className="hidden items-center gap-2 font-sans text-xs uppercase tracking-widest text-stone sm:flex">
            <MoveHorizontal className="size-4 text-gold" /> Hover to pause
          </span>
        </Reveal>
      </div>

      <div
        className="mt-12 overflow-hidden"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onTouchStart={() => (paused.current = true)}
        onTouchEnd={() => (paused.current = false)}
      >
        <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-5 px-6">
          {row.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => open(i % shots.length)}
              data-cursor="View"
              className="group relative aspect-[3/4] w-64 shrink-0 overflow-hidden rounded-sm bg-noir sm:w-72"
            >
              <Image
                src={s.src}
                alt={s.cap}
                fill
                draggable={false}
                sizes="288px"
                className="graded object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent opacity-80" />
              <span className="pointer-events-none absolute inset-3 border border-gold/0 transition-colors duration-500 group-hover:border-gold/50" />
              <span className="absolute bottom-4 left-4 right-4 text-left font-display text-lg font-medium text-ivory">
                {s.cap}
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-noir/95 p-4 backdrop-blur-sm"
          >
            <button
              aria-label="Close"
              onClick={() => setActive(null)}
              className="absolute right-5 top-5 text-ivory/80 transition-colors hover:text-gold"
            >
              <X className="size-7" />
            </button>
            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-3 text-ivory/84 transition-colors hover:text-gold sm:left-8"
            >
              <ArrowLeft className="size-8" />
            </button>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[82vh] w-auto max-w-4xl"
            >
              <img
                src={shots[active].src}
                alt={shots[active].cap}
                className="graded max-h-[82vh] w-auto rounded-sm object-contain shadow-2xl shadow-black/60"
              />
              <p className="mt-4 text-center font-display text-xl text-ivory">
                {shots[active].cap}
              </p>
            </motion.div>
            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-3 text-ivory/84 transition-colors hover:text-gold sm:right-8"
            >
              <ArrowRight className="size-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
