"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import Reveal from "./reveal";

const VIDEO_ID = "yRsHp32OPhc";
const BASE = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}`;
// Silent, looping preview — autoplays when scrolled into view.
const PREVIEW_SRC = `${BASE}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1`;
// Full playback — starts from the beginning, with sound + controls.
const ACTIVE_SRC = `${BASE}?autoplay=1&mute=0&start=0&controls=1&modestbranding=1&playsinline=1&rel=0`;

export default function VideoFeature() {
  const wrapRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [activated, setActivated] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const showPreview = inView && !reduce && !activated;

  return (
    <section
      id="watch"
      className="grain relative overflow-hidden bg-noir py-24 text-ivory sm:py-32"
    >
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
          <div
            ref={wrapRef}
            className="frame-gold relative mt-12 aspect-video overflow-hidden rounded-sm bg-noir shadow-2xl shadow-black/50"
          >
            {activated ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={ACTIVE_SRC}
                title="Royal French Crêpe — presentation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              <>
                {showPreview ? (
                  <iframe
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    src={PREVIEW_SRC}
                    title="Royal French Crêpe — preview"
                    tabIndex={-1}
                    aria-hidden="true"
                    allow="autoplay; encrypted-media"
                  />
                ) : (
                  <Image
                    src="/images/brand/presentation-poster.jpg"
                    alt="Royal French Crêpe presentation video"
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-cover"
                  />
                )}

                <button
                  type="button"
                  onClick={() => setActivated(true)}
                  aria-label="Play the video with sound from the beginning"
                  data-cursor="Play"
                  className="group absolute inset-0 cursor-pointer"
                >
                  <span
                    className={`absolute inset-0 transition-colors duration-500 ${
                      showPreview
                        ? "bg-noir/15 group-hover:bg-noir/25"
                        : "bg-noir/40 group-hover:bg-noir/30"
                    }`}
                  />
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <span className="flex size-20 items-center justify-center rounded-full bg-gold/95 text-noir shadow-2xl shadow-black/40 transition-transform duration-300 group-hover:scale-110 sm:size-24">
                      <Play className="ml-1 size-8 fill-noir sm:size-9" />
                    </span>
                    {showPreview && (
                      <span className="rounded-full bg-noir/55 px-4 py-1.5 font-sans text-xs font-medium uppercase tracking-widest text-ivory backdrop-blur-sm">
                        Tap to play with sound
                      </span>
                    )}
                  </span>
                </button>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
