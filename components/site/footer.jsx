import Image from "next/image";
import { Mail } from "lucide-react";
import { Instagram } from "./icons";
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
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
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
            <p className="mt-4 font-serif text-base leading-relaxed text-ivory/84">
              Authentic premium French crêpes, handmade by French chefs from Paris —
              now serving Los Angeles, Las Vegas &amp; events across California.
            </p>
          </div>

          {/* Links + contact */}
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div>
              <h3 className="font-sans text-sm uppercase tracking-widest text-gold">
                Explore
              </h3>
              <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-1">
                {nav.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="font-serif text-base text-ivory/86 transition-colors hover:text-gold"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-sans text-sm uppercase tracking-widest text-gold">
                Get in touch
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href="mailto:royalfrenchcrepe@gmail.com"
                    className="flex items-center gap-2 font-serif text-base text-ivory/86 transition-colors hover:text-gold"
                  >
                    <Mail className="size-4" /> royalfrenchcrepe@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/royalfrenchcrepe/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-serif text-base text-ivory/86 transition-colors hover:text-gold"
                  >
                    <Instagram className="size-4" /> @royalfrenchcrepe
                  </a>
                </li>
                <li className="font-serif text-base text-ivory/86">
                  Open daily · 8:30 AM – 3:00 AM
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center gap-2 border-t border-ivory/10 pt-6 text-center sm:flex-row sm:justify-between sm:gap-4 sm:text-left">
          <p className="font-sans text-sm text-ivory/82">
            © {new Date().getFullYear()} Royal French Crêpe · All Rights Reserved
          </p>
          <p className="font-sans text-sm text-ivory/82">
            Designed, built &amp; managed by{" "}
            <a
              href="https://beyondtheedgestudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ivory/80 underline-offset-2 transition-colors hover:text-gold hover:underline"
            >
              Beyond the Edge Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
