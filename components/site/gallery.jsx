"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight, MoveHorizontal } from "lucide-react";
import Reveal from "./reveal";

const shots = [
  { src: "/images/catering-stand.jpg", cap: "Oceanside crêpe station" },
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

export default function Gallery() {
  const trackRef = useRef(null);
  const dragged = useRef(false);
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (el) setWidth(el.scrollWidth - el.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const open = (i) => {
    if (dragged.current) return;
    setActive(i);
  };
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
    <section className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">05 — La Galerie</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-noir sm:text-5xl">
              The lookbook
            </h2>
          </div>
          <span className="hidden items-center gap-2 font-sans text-xs uppercase tracking-widest text-stone sm:flex">
            <MoveHorizontal className="size-4 text-gold" /> Drag to explore
          </span>
        </Reveal>
      </div>

      <motion.div ref={trackRef} className="mt-12 cursor-grab overflow-hidden active:cursor-grabbing">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          dragElastic={0.08}
          onDragStart={() => (dragged.current = true)}
          onDragEnd={() => setTimeout(() => (dragged.current = false), 50)}
          whileTap={{ cursor: "grabbing" }}
          data-cursor="Drag"
          className="flex gap-5 px-6"
        >
          {shots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => open(i)}
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
      </motion.div>

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
              className="absolute left-3 text-ivory/70 transition-colors hover:text-gold sm:left-8"
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
              className="absolute right-3 text-ivory/70 transition-colors hover:text-gold sm:right-8"
            >
              <ArrowRight className="size-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
