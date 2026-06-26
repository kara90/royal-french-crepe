"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, MessageCircle } from "lucide-react";
import { Instagram } from "./icons";
import { site } from "@/lib/site";

const actions = [
  {
    label: "Call us",
    href: site.phoneHref,
    Icon: Phone,
    className: "bg-noir text-ivory",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/13232874274",
    Icon: MessageCircle,
    className: "bg-[#25D366] text-white",
  },
  {
    label: "Instagram",
    href: site.instagram,
    Icon: Instagram,
    className: "bg-ivory text-noir",
  },
];

export default function ContactFab() {
  const [open, setOpen] = useState(false);
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
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-[70] flex flex-col items-end gap-3"
        >
          <AnimatePresence>
            {open &&
              actions.map((a, i) => (
                <motion.a
                  key={a.label}
                  href={a.href}
                  target={a.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.8 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <span className="rounded-full bg-noir/90 px-3 py-1.5 font-sans text-xs font-medium text-ivory shadow-lg backdrop-blur">
                    {a.label}
                  </span>
                  <span
                    className={`flex size-12 items-center justify-center rounded-full shadow-xl shadow-black/25 ${a.className}`}
                  >
                    <a.Icon className="size-5" />
                  </span>
                </motion.a>
              ))}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close contact menu" : "Open contact menu"}
            className="flex size-14 items-center justify-center rounded-full bg-gold text-noir shadow-2xl shadow-gold/30 transition-transform duration-300 hover:scale-105"
          >
            <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.3 }}>
              {open ? <X className="size-6" /> : <Phone className="size-6" />}
            </motion.span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
