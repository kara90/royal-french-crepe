import Reveal from "./reveal";
import { Check, ArrowRight } from "lucide-react";

const packages = [
  {
    french: "Les Douceurs",
    name: "The Sweet Station",
    from: "$800",
    desc: "Five sweet crêpes of your choice — Nutella, fresh fruit, ice-cream classics. A dessert bar your guests will swarm.",
    includes: [
      "Any 5 sweet crêpes",
      "Made to order, live",
      "Full toppings & syrup bar",
    ],
  },
  {
    french: "Le Mélange",
    name: "The Classic Mix",
    from: "$1,200",
    tag: "Most popular",
    desc: "Five crêpes, any blend of sweet and savory — the crowd-pleaser with something for every guest.",
    includes: [
      "Any 5 sweet or savory crêpes",
      "Made to order, live",
      "Full toppings & syrup bar",
    ],
  },
  {
    french: "L'Expérience Royale",
    name: "The Full Experience",
    from: "$1,800",
    desc: "The complete Parisian station — sweet & savory crêpes, natural ice cream, and hot drinks.",
    includes: [
      "Sweet & savory crêpes",
      "Natural ice cream",
      "Coffee, tea & hot chocolate",
      "The full live show",
    ],
  },
];

export default function Packages() {
  return (
    <section id="packages" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Nos Formules · Catering Packages</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-noir sm:text-5xl">
            Choose your crêpe station
          </h2>
          <p className="mt-5 font-serif text-lg leading-relaxed text-espresso/85">
            Three ways to bring the Parisian station to your event — each one
            custom-quoted to your guest count. Events start at{" "}
            <span className="font-semibold text-noir">$800</span>.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1} className="h-full">
              <div
                className={`flex h-full flex-col rounded-2xl border bg-ivory p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-noir/10 ${
                  p.tag ? "border-gold shadow-lg shadow-gold/10" : "border-noir/12"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-gold">
                      {p.french}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-noir">
                      {p.name}
                    </h3>
                  </div>
                  {p.tag && (
                    <span className="shrink-0 rounded-full bg-gold px-2.5 py-1 font-sans text-[0.62rem] font-semibold uppercase tracking-wider text-noir">
                      {p.tag}
                    </span>
                  )}
                </div>

                <p className="mt-4 font-serif text-[1.05rem] leading-relaxed text-espresso/80">
                  {p.desc}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {p.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                      <span className="font-serif text-base text-espresso/85">
                        {inc}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-auto pt-6">
                  <span className="font-display text-lg font-semibold text-noir">
                    From {p.from}
                  </span>
                  <span className="mt-0.5 block font-sans text-xs text-stone">
                    custom-quoted to your guest count
                  </span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 text-center">
          <a
            href="#contact"
            className="btn-sweep group inline-flex cursor-pointer items-center gap-2 rounded-full bg-noir px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-ivory transition-all duration-300 hover:bg-espresso hover:shadow-lg hover:shadow-noir/20"
          >
            Get your free quote
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="mt-4 font-serif text-sm italic text-stone">
            Popular weekends fill fast — the earlier you ask, the more we can tailor.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
