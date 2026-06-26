"use client";

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { menu, menuCategories, tierBlurb } from "@/lib/menu";

function Badge({ children }) {
  const royal = children === "Signature";
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 font-sans text-[0.55rem] font-semibold uppercase tracking-widest ${
        royal ? "bg-gold text-noir" : "border border-gold/60 text-gold"
      }`}
    >
      {children}
    </span>
  );
}

function Row({ item, open, onToggle, onPreview, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.04 }}
      className="border-b border-noir/10"
    >
      <button
        type="button"
        onClick={onToggle}
        onMouseEnter={() => onPreview(item.img)}
        onMouseLeave={() => onPreview(null)}
        data-open={open ? "true" : "false"}
        className="group flex w-full cursor-pointer items-center gap-4 py-4 text-left"
      >
        {/* Thumbnail — mobile/tablet only; desktop uses the cursor-follow preview */}
        <span className="relative size-14 shrink-0 overflow-hidden rounded-lg ring-1 ring-noir/10 md:hidden">
          <Image
            src={item.img}
            alt={item.name}
            fill
            sizes="56px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-2">
            <span className="flex items-baseline gap-2.5">
              <span className="font-display text-lg font-semibold text-noir transition-colors group-hover:text-bordeaux">
                {item.name}
              </span>
              <span className="font-sans text-[0.6rem] uppercase tracking-[0.22em] text-stone">
                {item.type}
              </span>
            </span>
            {item.tag && <Badge>{item.tag}</Badge>}
          </span>

          {/* Ingredient reveal */}
          <span className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-data-[open=true]:grid-rows-[1fr] group-data-[open=true]:opacity-100">
            <span className="overflow-hidden">
              <span className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-serif text-[0.95rem] leading-snug text-espresso/80">
                {item.ingredients.map((ing, i) => (
                  <span key={i} className="flex items-center">
                    {i > 0 && <span className="mr-2 text-gold/70">·</span>}
                    {ing}
                  </span>
                ))}
              </span>
            </span>
          </span>
        </span>
      </button>
    </motion.div>
  );
}

export default function MenuSection() {
  const [active, setActive] = useState("classic");
  const [open, setOpen] = useState(() => new Set());
  const [preview, setPreview] = useState(null);
  const items = menu[active];

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 350, damping: 30, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 350, damping: 30, mass: 0.5 });

  const toggle = (key) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  return (
    <section
      id="menu"
      className="relative bg-cream py-24 sm:py-32"
      onMouseMove={(e) => {
        px.set(e.clientX);
        py.set(e.clientY);
      }}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">02 — La Carte</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-noir sm:text-5xl">
            The carte, by tier
          </h2>
          <p className="mt-5 font-serif text-lg leading-relaxed text-espresso/80">
            From everyday Classics to our caviar-crowned Royales. Hover or tap any
            crêpe to reveal exactly what goes inside.
          </p>
        </div>

        {/* Tier tabs */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {menuCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`cursor-pointer rounded-full px-5 py-2.5 font-sans text-sm transition-all duration-300 ${
                active === c.id
                  ? "bg-noir text-ivory shadow-lg shadow-noir/15"
                  : "border border-noir/15 text-espresso/80 hover:border-noir/40"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mx-auto mt-9 max-w-xl text-center font-serif text-lg italic text-stone">
              {tierBlurb[active]}
            </p>

            <div className="mt-8 grid gap-x-10 sm:grid-cols-2">
              {items.map((item, i) => {
                const key = `${active}-${item.name}`;
                return (
                  <Row
                    key={key}
                    item={item}
                    index={i}
                    open={open.has(key)}
                    onToggle={() => toggle(key)}
                    onPreview={setPreview}
                  />
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="mt-12 text-center font-serif text-base italic text-stone">
          Every crêpe is made to order — allergies and dietary requests gladly
          accommodated.
        </p>
      </div>

      {/* Cursor-follow preview (desktop) */}
      <AnimatePresence>
        {preview && (
          <motion.div
            style={{ x: sx, y: sy }}
            className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
          >
            <motion.div
              key={preview}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1, rotate: -4 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="frame-gold relative h-64 w-52 -translate-x-1/2 -translate-y-[114%] overflow-hidden rounded-sm shadow-2xl shadow-black/50"
            >
              <img
                src={preview}
                alt=""
                className="graded h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
