import Image from "next/image";
import Reveal from "./reveal";
import { RotatingWord } from "./fx";
import { Heart, Cake, PartyPopper, Sparkles, Users, Music } from "lucide-react";

const events = [
  { icon: Heart, label: "Weddings" },
  { icon: Cake, label: "Birthdays" },
  { icon: Sparkles, label: "Bar / Bat Mitzvahs" },
  { icon: PartyPopper, label: "Baby showers" },
  { icon: Music, label: "Concerts & fairs" },
  { icon: Users, label: "Corporate & private" },
];

export default function Catering() {
  return (
    <section id="catering" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">04 — Traiteur · Catering</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-noir sm:text-5xl">
              A French crêpe station
              <br />
              <span className="italic text-stone">
                that steals the{" "}
                <RotatingWord
                  words={["party", "wedding", "gala", "soirée", "show"]}
                  className="text-bordeaux"
                />
              </span>
            </h2>
            <div className="rule-gold mt-7 w-28" />
            <p className="mt-7 max-w-md font-serif text-lg leading-relaxed text-espresso/85">
              Our chefs bring the full Parisian experience to you — the griddle, the
              show, the aroma, the crowd that gathers. We cater all around California
              and accommodate any cultural, religious or dietary request.
            </p>
            <p className="mt-4 max-w-md font-serif text-base leading-relaxed text-stone">
              Every event is unique, so every quote is custom — tell us your date,
              location, guest count and the crêpes you love, and we&apos;ll tailor it
              to you.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {events.map((e) => (
                <span
                  key={e.label}
                  className="inline-flex items-center gap-2 rounded-full border border-noir/15 bg-ivory px-4 py-2 font-sans text-sm text-espresso/85"
                >
                  <e.icon className="size-4 text-gold" />
                  {e.label}
                </span>
              ))}
            </div>

            <a
              href="#contact"
              className="btn-sweep mt-10 inline-flex items-center gap-2 rounded-full bg-noir px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-ivory transition-all duration-300 hover:bg-espresso hover:shadow-lg hover:shadow-noir/20"
            >
              Request a catering quote
            </a>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="grid grid-cols-2 gap-4">
              <div className="frame-gold relative col-span-2 aspect-[16/10] overflow-hidden rounded-sm shadow-xl shadow-noir/10">
                <Image
                  src="/images/catering-oceanside.jpg"
                  alt="A Royal French Crêpe chef preparing crêpes at an oceanside California event"
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-sm shadow-lg shadow-noir/10">
                <Image
                  src="/images/catering-event.jpg"
                  alt="Guests enjoying a crêpe catering station with smoked salmon and caviar"
                  fill
                  sizes="(max-width: 1024px) 45vw, 22vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-sm shadow-lg shadow-noir/10">
                <Image
                  src="/images/catering-umbrella.jpg"
                  alt="Plated crêpes with salmon, caviar and fresh strawberries at a garden party"
                  fill
                  sizes="(max-width: 1024px) 45vw, 22vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
