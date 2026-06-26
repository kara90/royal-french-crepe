"use client";

import { motion } from "framer-motion";
import { CountUp } from "./fx";
import Particles from "./particles";
import { stats } from "@/lib/site";

export default function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-ivory/10 bg-noir py-16 text-ivory sm:py-20">
      <Particles className="absolute inset-0 h-full w-full" count={30} />
      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="relative text-center"
          >
            <div className="font-display text-5xl font-semibold text-gold-gradient sm:text-6xl">
              <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <p className="mx-auto mt-3 max-w-[14ch] font-serif text-sm leading-snug text-ivory/70">
              {s.label}
            </p>
            {i < stats.length - 1 && (
              <span className="absolute -right-px top-1/2 hidden h-12 w-px -translate-y-1/2 bg-ivory/10 lg:block" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
