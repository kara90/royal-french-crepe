"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { menu, menuCategories, tierBlurb } from "@/lib/menu";

function Badge({ children }) {
  const royal = children === "Signature";
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 font-sans text-[0.68rem] font-semibold uppercase tracking-widest ${
        royal ? "bg-gold text-noir" : "border border-gold/60 text-gold"
      }`}
    >
      {children}
    </span>
  );
}

function Row({ item, open, onToggle, index }) {
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
        data-open={open ? "true" : "false"}
        className="group flex w-full cursor-pointer items-center gap-4 py-4 text-left"
      >
        {/* Product image — always visible */}
        <span className="relative size-24 shrink-0 overflow-hidden rounded-lg ring-1 ring-noir/10 shadow-sm">
          <Image
            src={item.img}
            alt={item.name}
            fill
            sizes="96px"
            className="graded object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-2">
            <span className="flex items-baseline gap-2.5">
              <span className="font-display text-lg font-semibold text-noir transition-colors group-hover:text-bordeaux">
                {item.name}
              </span>
              <span className="font-sans text-[0.7rem] uppercase tracking-[0.22em] text-stone">
                {item.type}
              </span>
            </span>
            {item.tag && <Badge>{item.tag}</Badge>}
          </span>

          {/* Ingredients — one-line teaser always shown; full list on hover/tap */}
          <span className="mt-1.5 line-clamp-1 font-serif text-[0.95rem] leading-snug text-espresso/65 group-hover:hidden group-data-[open=true]:hidden">
            {item.ingredients.join(" · ")}
          </span>
          <span className="mt-1.5 hidden flex-wrap items-center gap-x-2 gap-y-0.5 font-serif text-[0.95rem] leading-snug text-espresso/85 group-hover:flex group-data-[open=true]:flex">
            {item.ingredients.map((ing, i) => (
              <span key={i} className="flex items-center">
                {i > 0 && <span className="mr-2 text-gold/70">·</span>}
                {ing}
              </span>
            ))}
          </span>
        </span>
      </button>
    </motion.div>
  );
}

export default function MenuSection() {
  const [active, setActive] = useState("premium");
  const [open, setOpen] = useState(() => new Set());
  const items = menu[active];

  const toggle = (key) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  return (
    <section id="menu" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">01 — La Carte</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-noir sm:text-5xl">
            The carte, by tier
          </h2>
          <p className="mt-5 font-serif text-lg leading-relaxed text-espresso/80">
            From everyday Classics to our caviar-crowned Royales. Hover or tap any
            crêpe to reveal every ingredient.
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
    </section>
  );
}
