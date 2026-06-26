"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Caviar", href: "#caviar" },
  { label: "Catering", href: "#catering" },
  { label: "Visit", href: "#visit" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-noir/90 backdrop-blur-md border-b border-ivory/10 py-3.5 shadow-lg shadow-noir/20"
          : "bg-gradient-to-b from-noir/40 to-transparent pt-7 pb-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="relative size-11 overflow-hidden rounded-full ring-1 ring-gold/40">
            <Image
              src="/images/brand/royal-logo.jpg"
              alt="Royal French Crêpe logo"
              fill
              sizes="44px"
              className="object-cover"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight text-ivory sm:text-xl">
              Royal French Crêpe
            </span>
            <span className="mt-1 font-sans text-[0.66rem] uppercase tracking-[0.34em] text-gold">
              L&apos;Expérience Parisienne
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative font-sans text-sm text-ivory/85 transition-colors hover:text-ivory after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-sweep rounded-full bg-gold px-5 py-2.5 font-sans text-sm font-semibold text-noir transition-all duration-300 hover:bg-gold-soft hover:shadow-lg hover:shadow-gold/20"
          >
            Book Catering
          </a>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="text-ivory md:hidden"
        >
          <Menu className="size-6" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-noir/98 backdrop-blur md:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="flex items-center gap-2">
                <span className="relative size-9 overflow-hidden rounded-full ring-1 ring-gold/40">
                  <Image
                    src="/images/brand/royal-logo.jpg"
                    alt="Royal French Crêpe logo"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </span>
                <span className="font-display text-lg text-ivory">Royal French Crêpe</span>
              </span>
              <button aria-label="Close menu" onClick={() => setOpen(false)}>
                <X className="size-6 text-ivory" />
              </button>
            </div>
            <div className="mt-10 flex flex-col items-center gap-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i }}
                  className="font-display text-3xl text-ivory/90"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full bg-gold px-7 py-3 font-sans text-sm font-semibold uppercase tracking-widest text-noir"
              >
                Book Catering
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
