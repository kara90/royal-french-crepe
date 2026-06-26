import Image from "next/image";
import Reveal from "./reveal";

const ingredients = [
  "Natural ice cream",
  "Banana",
  "Strawberries",
  "Nutella",
  "Toasted almonds",
  "Shredded coconut",
  "Jam",
  "Whipped cream",
  "Caramel",
  "Chocolate",
];

export default function Louis() {
  return (
    <section
      id="louis"
      className="grain relative overflow-hidden bg-noir py-24 text-ivory sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(0.74_0.105_78/0.14),transparent_55%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/* Copy — left */}
        <div className="order-2 lg:order-1">
          <Reveal>
            <p className="eyebrow">Le Joyau Sucré</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Louis XVI —{" "}
              <span className="italic text-gold-gradient">our sweetest crown</span>
            </h2>
            <div className="rule-gold mt-7 w-28" />
            <p className="mt-7 max-w-md font-serif text-lg leading-relaxed text-ivory/80">
              The crown of our Royal collection&apos;s sweet side — a warm crêpe wrapped
              around scoops of natural ice cream, fresh banana and strawberries,
              Nutella, toasted almonds, shredded coconut, jam and whipped cream, then
              finished with ribbons of caramel and chocolate. Indulgence fit for a king.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {ingredients.map((ing) => (
                <li
                  key={ing}
                  className="rounded-full border border-gold/30 bg-ivory/[0.04] px-3.5 py-1.5 font-serif text-sm text-ivory/80"
                >
                  {ing}
                </li>
              ))}
            </ul>
            <p className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-1.5 font-sans text-[0.7rem] font-semibold uppercase tracking-widest text-noir">
              Royal · The most premium sweet crêpe
            </p>
          </Reveal>
        </div>

        {/* Photo — right */}
        <Reveal className="order-1 lg:order-2">
          <div className="frame-gold relative aspect-[3/2] overflow-hidden rounded-sm shadow-2xl shadow-black/40">
            <Image
              src="/images/louis-xvi-feature.jpg"
              alt="Louis XVI — the most premium sweet crêpe, with ice cream, fruit, Nutella, caramel and chocolate"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
