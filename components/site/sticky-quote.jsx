"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Mobile-only bottom bar: appears once the hero is scrolled out of view,
// hides while the contact form / FAQ / footer is on screen.
// Driven by scroll events + rect measurement (plays nice with Lenis).
export default function StickyQuote() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const stops = ["contact", "faq"]
      .map((id) => document.getElementById(id))
      .concat([document.querySelector("footer")])
      .filter(Boolean);

    const update = () => {
      const vh = window.innerHeight;
      const pastHero = hero ? hero.getBoundingClientRect().bottom < 0 : false;
      const nearForm = stops.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top < vh && r.bottom > 0;
      });
      setShow(pastHero && !nearForm);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[70] border-t border-gold/25 bg-noir/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold text-ivory">
                Planning an event?
              </p>
              <p className="truncate font-sans text-xs text-ivory/65">
                Free custom quote · reply within a day
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gold px-5 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-noir"
            >
              Get a quote <ArrowRight className="size-3.5" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
