"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Reveal from "./reveal";
import { faqs } from "@/lib/faq";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <p className="eyebrow">Questions Fréquentes</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-noir sm:text-5xl">
            Good to know
          </h2>
          <p className="mt-5 font-serif text-lg leading-relaxed text-espresso/85">
            Everything you need before you book your crêpe catering.
          </p>
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.05}>
                <div className="overflow-hidden rounded-2xl border border-noir/12 bg-ivory transition-colors duration-300 hover:border-noir/25">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-lg font-semibold text-noir sm:text-xl">
                      {item.q}
                    </span>
                    <Plus
                      className={`size-5 shrink-0 text-gold transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="px-6 pb-6 font-serif text-base leading-relaxed text-espresso/85 sm:text-lg">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
