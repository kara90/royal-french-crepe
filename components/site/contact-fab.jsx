"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#contact"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-[70] inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-noir shadow-2xl shadow-gold/30 transition-transform duration-300 hover:scale-105"
        >
          Book Catering
        </motion.a>
      )}
    </AnimatePresence>
  );
}
