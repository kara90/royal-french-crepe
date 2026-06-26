import Image from "next/image";
import Reveal from "./reveal";
import Tilt from "./tilt";

const timeline = [
  {
    year: "2007",
    title: "Two chefs in Paris",
    text: "It began in the heart of Paris — two French chefs, one traditional recipe passed down through generations, and a small crêpe stand that drew a line down the street.",
  },
  {
    year: "2009 – 2019",
    title: "Marseille & a decade of mastery",
    text: "Ten years across Paris and Marseille sharpened the craft — the lace-thin edges, the perfect fold, the secret touches that can't be taught from a book.",
  },
  {
    year: "2019",
    title: "An ocean crossed",
    text: "We brought our griddles to Los Angeles, on a simple mission: share real French culture and cuisine with America — the authentic way.",
  },
  {
    year: "Today",
    title: "A perfected recipe",
    text: "Hundreds of hours refining a healthier, tastier batter gave us the crêpe we serve now — across LA, Las Vegas and events all over California.",
  },
];

export default function Story() {
  return (
    <section id="story" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">01 — Notre Histoire</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-noir sm:text-5xl">
            From a Paris street corner
            <span className="block italic text-stone">to your celebration</span>
          </h2>
          <div className="rule-gold mx-auto mt-7 w-28" />
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Tilt className="frame-gold relative aspect-[4/5] overflow-hidden rounded-sm shadow-xl shadow-noir/10">
              <Image
                src="/images/station-candlelit.jpg"
                alt="A candlelit Royal French Crêpe station with copper pans and a 'Handmade French Crêpes' sign"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </Tilt>
          </Reveal>

          <ol className="relative space-y-8 border-l border-noir/15 pl-8">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.06}>
                <li className="relative">
                  <span className="absolute -left-[2.6rem] top-1.5 flex size-4 items-center justify-center rounded-full border border-gold bg-cream">
                    <span className="size-1.5 rounded-full bg-gold" />
                  </span>
                  <span className="font-display text-sm font-semibold uppercase tracking-widest text-gold">
                    {t.year}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-semibold text-noir">
                    {t.title}
                  </h3>
                  <p className="mt-2 font-serif text-[1.05rem] leading-relaxed text-espresso/85">
                    {t.text}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
