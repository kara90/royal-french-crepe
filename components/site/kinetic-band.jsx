const words = ["Crêpes", "Catering", "Célébration", "Paris", "Caviar", "Soirée"];

export default function KineticBand() {
  const row = [...words, ...words];
  return (
    <section
      aria-hidden="true"
      className="overflow-hidden border-y border-ivory/10 bg-noir py-8 sm:py-12"
    >
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap will-change-transform sm:gap-16">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 sm:gap-16">
            <span
              className={`font-display text-5xl font-semibold tracking-tight sm:text-7xl lg:text-8xl ${
                i % 2 === 0
                  ? "text-ivory/90"
                  : "italic text-transparent [-webkit-text-stroke:1px_oklch(0.74_0.105_78_/_0.6)]"
              }`}
            >
              {w}
            </span>
            <span className="text-2xl text-gold sm:text-3xl">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
