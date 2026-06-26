"use client";

import { useEffect, useRef, useState } from "react";

export default function BgVideo({ src, poster, className = "" }) {
  const ref = useRef(null);
  const [ok, setOk] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setOk(!reduce);
    if (ref.current && !reduce) ref.current.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      autoPlay={ok}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
