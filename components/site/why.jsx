import Image from "next/image";
import Reveal from "./reveal";
import BgVideo from "./bg-video";
import Tilt from "./tilt";
import { ChefHat, Leaf, Flame, Crown } from "lucide-react";

const features = [
  {
    icon: ChefHat,
    title: "100% French chefs",
    text: "Trained in Paris and Marseille, using a traditional technique families have guarded for hundreds of years.",
  },
  {
    icon: Leaf,
    title: "Natural ingredients",
    text: "High-quality, all-natural ingredients only — no GMOs, no chemicals. You can taste the difference in every bite.",
  },
  {
    icon: Flame,
    title: "Made before your eyes",
    text: "Every crêpe is poured, spread and folded live. It's not just food — it's a little Parisian show.",
  },
  {
    icon: Crown,
    title: "A perfected recipe",
    text: "Hundreds of hours of refinement gave us a lighter, richer batter with our own secret touches.",
  },
];

export default function Why() {
  return (
    <section className="grain relative overflow-hidden bg-noir py-24 text-ivory sm:py-32">
      <BgVideo
        src="/videos/brand-dining.mp4"
        poster="/videos/brand-dining.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-noir/77" />
      <div className="pointer-events-none absolute -right-40 top-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,oklch(0.74_0.105_78/0.12),transparent_65%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Ce Qui Nous Rend Magnifique</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            What makes us so <span className="italic text-gold-gradient">magnifique</span>
          </h2>
          <p className="mt-5 font-serif text-lg leading-relaxed text-ivory/86">
            Anyone can pour batter on a pan. Very few can hand you Paris on a plate.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-ivory/10 bg-ivory/[0.03] p-8 transition-all duration-500 hover:border-gold/40 hover:bg-ivory/[0.06]">
                <span className="inline-flex size-12 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-noir">
                  <f.icon className="size-5" />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold">{f.title}</h3>
                <p className="mt-3 font-serif text-[1.12rem] leading-relaxed text-ivory/84">
                  {f.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Brand story — "Let them eat crêpes" */}
        <div className="mt-20 flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-16">
          <Reveal>
            <Tilt
              max={9}
              className="relative size-52 shrink-0 overflow-hidden rounded-full ring-1 ring-gold/40 shadow-2xl shadow-black/40 sm:size-60"
            >
              <Image
                src="/images/let-them-eat-crepes.jpg"
                alt="Marie Antoinette holding a crêpe — “Let them eat crêpes”"
                fill
                sizes="240px"
                className="object-cover"
              />
            </Tilt>
          </Reveal>
          <Reveal delay={0.1} className="max-w-md text-center md:text-left">
            <p className="eyebrow">Notre Marque</p>
            <h3 className="mt-4 font-display text-3xl font-semibold italic text-gold-gradient sm:text-4xl">
              “Let them eat crêpes.”
            </h3>
            <p className="mt-5 font-serif text-lg leading-relaxed text-ivory/86">
              Our name is a wink to Marie Antoinette — the line reimagined for a new
              century. Royal French Crêpe brings a little of that decadence to everyone,
              from a Tuesday treat to a Versailles-worthy celebration.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
