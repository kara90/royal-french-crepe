import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { Instagram } from "./icons";
import { site } from "@/lib/site";
import Tricolor from "./tricolor";

const nav = [
  { label: "Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Caviar", href: "#caviar" },
  { label: "Catering", href: "#catering" },
  { label: "Visit", href: "#visit" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-noir text-ivory">
      <Tricolor />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <span className="flex items-center gap-3">
              <span className="relative size-12 overflow-hidden rounded-full ring-1 ring-gold/40">
                <Image
                  src="/images/brand/royal-logo.jpg"
                  alt="Royal French Crêpe logo"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <p className="font-display text-2xl font-semibold">Royal French Crêpe</p>
            </span>
            <p className="eyebrow mt-3">L&apos;Expérience Parisienne</p>
            <p className="mt-5 max-w-sm font-serif text-base leading-relaxed text-ivory/65">
              Authentic premium French crêpes, handmade by French chefs from Paris.
              Now serving Los Angeles, Las Vegas &amp; events across California.
            </p>
          </div>

          <div>
            <h3 className="font-sans text-xs uppercase tracking-widest text-gold">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {nav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-serif text-base text-ivory/70 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs uppercase tracking-widest text-gold">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-2 font-serif text-base text-ivory/70 transition-colors hover:text-gold"
                >
                  <Phone className="size-4" /> {site.phone}
                </a>
              </li>
              <li>
                <a
                  href="mailto:royalfrenchcrepe@gmail.com"
                  className="flex items-center gap-2 font-serif text-base text-ivory/70 transition-colors hover:text-gold"
                >
                  <Mail className="size-4" /> royalfrenchcrepe@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/royalfrenchcrepe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-serif text-base text-ivory/70 transition-colors hover:text-gold"
                >
                  <Instagram className="size-4" /> @royalfrenchcrepe
                </a>
              </li>
              <li className="font-serif text-base text-ivory/70">
                Open daily · 8:30 AM – 3:00 AM
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-ivory/10 pt-7 sm:flex-row">
          <p className="font-sans text-xs text-ivory/50">
            © {new Date().getFullYear()} Royal French Crêpe · All Rights Reserved
          </p>
          <p className="font-serif text-sm italic text-ivory/50">
            Made the French way — slowly, and with butter.
          </p>
        </div>
      </div>
    </footer>
  );
}
