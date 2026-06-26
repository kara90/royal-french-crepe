import Image from "next/image";
import Reveal from "./reveal";
import BgVideo from "./bg-video";
import { menu } from "@/lib/menu";

export default function Caviar() {
  return (
    <section
      id="caviar"
      className="grain relative isolate overflow-hidden bg-espresso py-24 text-ivory sm:py-32"
    >
      {/* Discreet background film, dimmed by a filter on top so you only just
          make it out, like the Magnifique section */}
      <BgVideo
        src="/videos/caviar-bg.mp4"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-espresso/74" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.74_0.105_78/0.14),transparent_55%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/* Photo — left */}
        <Reveal className="order-2 lg:order-1">
          <div className="frame-gold relative aspect-[4/5] overflow-hidden rounded-sm shadow-2xl shadow-black/40">
            <Image
              src="/images/menu/caviar-1.jpg"
              alt="Parisian crêpe with smoked salmon and Royal Ossetra caviar on a black plate"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Title, copy & cards — right */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow">03 — La Collection Royale</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              The crêpe, crowned with{" "}
              <span className="italic text-gold-gradient">Royal Ossetra caviar</span>
            </h2>
            <div className="rule-gold mt-7 w-28" />
            <p className="mt-7 max-w-md font-serif text-lg leading-relaxed text-ivory/80">
              Where French tradition meets pure luxury. An ultra-thin Parisian crêpe
              with sour cream, organic salad, tomatoes and a whisper of lemon, finished
              with authentic Royal Ossetra caviar, served with or without smoked salmon.
              Our most exclusive creation, for guests who want the unforgettable.
            </p>
          </Reveal>

          <div className="mt-9 space-y-5">
            {menu.caviar.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.1}>
                <div className="group rounded-2xl border border-gold/25 bg-ivory/[0.04] p-7 transition-all duration-500 hover:border-gold/60 hover:bg-ivory/[0.07]">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-2xl font-semibold">{item.name}</h3>
                    <span className="rounded-full bg-gold px-3 py-1 font-sans text-[0.7rem] font-semibold uppercase tracking-widest text-noir">
                      {item.tag}
                    </span>
                  </div>
                  <p className="mt-3 font-serif text-[1.12rem] leading-relaxed text-ivory/86">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <p className="pt-1 text-center font-serif text-base italic text-ivory/82">
                Available by request &amp; for private events.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
