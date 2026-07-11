"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Magnetic, RotatingWord } from "./fx";
import Particles from "./particles";

export default function Hero() {
  const videoRef = useRef(null);
  const headlineRef = useRef(null);
  const [motionOK, setMotionOK] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMotionOK(!reduce);
    const v = videoRef.current;
    if (v && !reduce) {
      v.play().catch(() => {});
    }
  }, []);

  const onMouseMove = (e) => {
    const el = headlineRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
    el.style.setProperty("--foil", `${pct}%`);
  };

  return (
    <section
      id="top"
      onMouseMove={onMouseMove}
      className="relative flex min-h-[78svh] items-center justify-center overflow-hidden bg-noir text-ivory lg:min-h-[82svh]"
    >
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover animate-kenburns"
          poster="/hero-poster.jpg"
          autoPlay={motionOK}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Soft cinematic overlay — blackish at top & bottom, transparent through the middle */}
        <div className="absolute inset-0 bg-gradient-to-b from-noir/70 via-noir/20 to-noir/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_48%_at_50%_56%,oklch(0.205_0.012_60/0.28),transparent_72%)]" />
        <div className="grain absolute inset-0 opacity-25" />
        <Particles className="absolute inset-0 h-full w-full" count={48} />
      </div>

      {/* Decorative gold frame */}
      <div className="pointer-events-none absolute inset-4 hidden border border-gold/20 sm:block" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-28 text-center sm:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex items-center justify-center gap-3 font-sans text-xs uppercase tracking-[0.32em] text-gold"
        >
          <span className="h-px w-8 bg-gold/60" />
          French crêpe catering · Los Angeles · Las Vegas
          <span className="h-px w-8 bg-gold/60" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          ref={headlineRef}
          className="font-display text-5xl font-semibold leading-[1.04] tracking-tight text-balance sm:text-7xl lg:text-[5.75rem]"
        >
          The authentic taste of
          <span className="block font-display italic text-foil">Parisian crêpes</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mx-auto mt-7 max-w-xl font-serif text-lg leading-relaxed text-ivory/85 text-pretty sm:text-xl"
        >
          Authentic French crêpes — sweet, savory and Royal Ossetra caviar — handmade
          in front of your guests by real French chefs from Paris. Catering weddings,
          parties &amp; events across Los Angeles, Las Vegas, California and Nevada.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-5 font-sans text-sm uppercase tracking-[0.22em] text-gold"
        >
          Crafted for{" "}
          <RotatingWord
            words={["weddings", "galas", "soirées", "celebrations", "late nights"]}
            className="font-semibold text-ivory"
          />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Magnetic>
            <a
              href="#contact"
              className="btn-sweep group inline-flex cursor-pointer items-center gap-2 rounded-full bg-gold px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-noir transition-all duration-300 hover:bg-gold-soft hover:shadow-[0_10px_40px_-10px_oklch(0.74_0.105_78/0.7)]"
            >
              Get your free quote
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#menu"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-ivory/30 px-8 py-4 font-sans text-sm font-medium uppercase tracking-wider text-ivory transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Explore the menu
            </a>
          </Magnetic>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-5 font-sans text-sm tracking-wide text-ivory/70"
        >
          Custom-quoted for your event · we reply within a day
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.65 }}
          className="mt-8 flex flex-col-reverse items-center justify-center gap-2.5 font-sans text-sm text-ivory/84 sm:flex-row sm:gap-2"
        >
          <span className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="size-3.5 fill-gold text-gold" />
            ))}
          </span>
          <span className="text-center tracking-wide sm:ml-2 sm:text-left">
            French chefs since 2007 · Paris → Marseille → California
          </span>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-ivory/30 p-1.5">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}
