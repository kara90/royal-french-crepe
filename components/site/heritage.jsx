import Reveal from "./reveal";
import BgVideo from "./bg-video";

export default function Heritage() {
  return (
    <section className="relative isolate flex min-h-[26rem] items-center justify-center overflow-hidden py-28 text-ivory">
      <BgVideo
        src="/videos/brand-feast.mp4"
        poster="/videos/brand-feast.jpg"
        className="absolute inset-0 -z-10 h-full w-full scale-105 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-noir/62" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-noir/80 via-noir/22 to-noir/80" />

      <Reveal className="mx-auto max-w-3xl px-6 text-center">
        <span className="font-display text-5xl text-gold">“</span>
        <p className="-mt-4 font-display text-2xl font-medium italic leading-snug text-balance sm:text-3xl">
          A recipe French families have guarded for hundreds of years — now poured,
          spread and folded in front of you.
        </p>
        <p className="mt-6 eyebrow">Royal French Crêpe · Since 2007</p>
      </Reveal>
    </section>
  );
}
