"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import Reveal from "./reveal";

export default function VideoFeature() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="watch" className="grain relative overflow-hidden bg-noir py-24 text-ivory sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.74_0.105_78/0.12),transparent_65%)]" />
      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">La Présentation</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            See the experience
          </h2>
          <p className="mt-5 font-serif text-lg leading-relaxed text-ivory/86">
            A taste of what we bring to your table — the craft, the show, the crêpes.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="frame-gold relative mt-12 aspect-video overflow-hidden rounded-sm shadow-2xl shadow-black/50">
            {playing ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube-nocookie.com/embed/yRsHp32OPhc?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                title="Royal French Crêpe — presentation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play presentation video"
                data-cursor="Play"
                className="group absolute inset-0 cursor-pointer"
              >
                <Image
                  src="/images/brand/presentation-poster.jpg"
                  alt="Royal French Crêpe presentation video"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-noir/40 transition-colors duration-500 group-hover:bg-noir/30" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex size-20 items-center justify-center rounded-full bg-gold/95 text-noir shadow-2xl shadow-black/40 transition-transform duration-300 group-hover:scale-110 sm:size-24">
                    <Play className="ml-1 size-8 fill-noir sm:size-9" />
                  </span>
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
