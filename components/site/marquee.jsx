import Tricolor from "./tricolor";

const items = [
  "Handmade to order",
  "100% French chefs",
  "Natural ingredients",
  "No GMOs · No chemicals",
  "Live show cooking",
  "Royal Ossetra caviar",
  "Catering across California",
  "Open 8:30 AM – 3 AM",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="bg-noir text-ivory">
      <Tricolor />
      <div className="overflow-hidden border-b border-ivory/10 py-4">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap will-change-transform">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-serif text-base italic text-ivory/85">
            {t}
            <span className="text-gold not-italic">✦</span>
          </span>
        ))}
      </div>
      </div>
    </div>
  );
}
