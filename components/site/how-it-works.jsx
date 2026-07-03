import Reveal from "./reveal";
import { ArrowRight } from "lucide-react";

// True 3-step sequence — numbered because order carries meaning.
const steps = [
  {
    n: "01",
    title: "Tell us about your event",
    text: "Two minutes in our booking form — your date, location, guest count and the crêpes you love.",
  },
  {
    n: "02",
    title: "Get your custom quote",
    text: "No fixed packages. We tailor the menu and price to your event and reply within a day.",
  },
  {
    n: "03",
    title: "We arrive & cook live",
    text: "Chefs, griddles and the full Parisian show. Base service is two hours — extra time is easy to add.",
  },
];

export default function HowItWorks() {
  return (
    <section className="grain relative overflow-hidden bg-noir py-24 text-ivory sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.74_0.105_78/0.1),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Réservez en Trois Étapes</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Three steps to a{" "}
            <span className="italic text-gold-gradient">Parisian party</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1} className="h-full">
              <div className="relative h-full rounded-2xl border border-ivory/10 bg-ivory/[0.03] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-ivory/[0.06]">
                <span className="font-display text-5xl font-semibold text-gold-gradient">
                  {s.n}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 font-serif text-[1.08rem] leading-relaxed text-ivory/84">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 text-center">
          <a
            href="#contact"
            className="btn-sweep group inline-flex cursor-pointer items-center gap-2 rounded-full bg-gold px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-noir transition-all duration-300 hover:bg-gold-soft hover:shadow-[0_10px_40px_-10px_oklch(0.74_0.105_78/0.7)]"
          >
            Start with your date
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="mt-4 font-sans text-sm tracking-wide text-ivory/65">
            A deposit locks your date · Zelle, CashApp or Venmo
          </p>
        </Reveal>
      </div>
    </section>
  );
}
