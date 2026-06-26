import Reveal from "./reveal";
import BgVideo from "./bg-video";
import { MapPin, Clock } from "lucide-react";

export default function Locations() {
  return (
    <section id="visit" className="grain relative overflow-hidden bg-noir py-24 text-ivory sm:py-32">
      <BgVideo
        src="/videos/brand-aerial.mp4"
        poster="/videos/brand-aerial.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-noir/70" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,oklch(0.74_0.105_78/0.12),transparent_65%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">06 — Où Nous Trouver</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Find us
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {[
            { city: "Los Angeles", note: "California" },
            { city: "Las Vegas", note: "Nevada" },
          ].map((loc, i) => (
            <Reveal key={loc.city} delay={i * 0.1}>
              <div className="group h-full rounded-2xl border border-ivory/10 bg-ivory/[0.03] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:bg-ivory/[0.06] hover:shadow-2xl hover:shadow-black/30">
                <MapPin className="size-6 text-gold transition-transform duration-500 group-hover:scale-110" />
                <h3 className="mt-5 font-display text-2xl font-semibold">{loc.city}</h3>
                <p className="mt-1 font-serif text-lg text-ivory/70">{loc.note}</p>
                <p className="mt-5 font-serif text-base leading-relaxed text-ivory/60">
                  Retail crêpes &amp; mobile catering. Message us for today&apos;s
                  location and to reserve your event.
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-2xl border border-gold/25 bg-ivory/[0.04] p-7 text-center sm:flex-row sm:gap-5">
            <Clock className="size-6 text-gold" />
            <p className="font-display text-xl font-medium">
              Open every day · 8:30 AM – 3:00 AM
            </p>
            <span className="hidden text-ivory/30 sm:inline">|</span>
            <p className="font-serif text-base text-ivory/70">
              Late-night crêpes are kind of our thing.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
