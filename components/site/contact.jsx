"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Check, Phone, ArrowRight, ArrowLeft } from "lucide-react";
import { Instagram } from "./icons";
import { site } from "@/lib/site";

const EMAIL = site.email;
const occasions = [
  "Wedding",
  "Birthday",
  "Corporate event",
  "Bar / Bat Mitzvah",
  "Private party",
  "Other",
];
const guestRanges = ["Up to 25", "25–50", "50–100", "100–250", "250+"];
const styleOptions = ["Classic", "Premium", "Royal", "Caviar", "Coffee & Tea"];

const STEPS = ["Occasion", "Details", "Crêpes", "You"];

export default function Contact() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [data, setData] = useState({
    occasion: "",
    date: "",
    guests: "",
    location: "",
    styles: [],
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const toggleStyle = (s) =>
    setData((d) => ({
      ...d,
      styles: d.styles.includes(s)
        ? d.styles.filter((x) => x !== s)
        : [...d.styles, s],
    }));

  const canNext =
    (step === 0 && data.occasion) ||
    (step === 1 && data.guests) ||
    (step === 2 && data.styles.length) ||
    step === 3;

  const submit = (e) => {
    e.preventDefault();
    const subject = `Catering inquiry — ${data.occasion || "Event"}${
      data.name ? ` (${data.name})` : ""
    }`;
    const body = [
      `Occasion: ${data.occasion}`,
      `Date: ${data.date || "—"}`,
      `Guests: ${data.guests}`,
      `Location: ${data.location || "—"}`,
      `Crêpe styles: ${data.styles.join(", ")}`,
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      "",
      data.message,
    ].join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full rounded-lg border border-noir/15 bg-ivory px-4 py-3 font-sans text-base text-noir outline-none transition-colors placeholder:text-stone/60 focus:border-gold focus:ring-2 focus:ring-gold/30";
  const chip = (selected) =>
    `cursor-pointer rounded-full border px-4 py-2 font-sans text-sm transition-all duration-200 ${
      selected
        ? "border-gold bg-gold text-noir"
        : "border-noir/20 text-espresso hover:border-noir/45"
    }`;

  return (
    <section id="contact" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left — invitation + direct contact */}
          <div>
            <p className="eyebrow">Contactez-Nous</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-noir sm:text-5xl">
              Let&apos;s plan something
              <br />
              <span className="italic text-stone">délicieux</span>
            </h2>
            <div className="rule-gold mt-7 w-28" />
            <p className="mt-7 max-w-md font-serif text-lg leading-relaxed text-espresso/85">
              Tell us about your event and we&apos;ll tailor a quote to your guest
              count, menu and location. Every celebration is custom — there are no
              fixed prices, just the experience you want.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={site.phoneHref}
                className="flex items-center gap-3 font-sans text-base text-espresso transition-colors hover:text-gold"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-full border border-noir/15">
                  <Phone className="size-4" />
                </span>
                {site.phone}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 font-sans text-base text-espresso transition-colors hover:text-gold"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-full border border-noir/15">
                  <Mail className="size-4" />
                </span>
                {EMAIL}
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-sans text-base text-espresso transition-colors hover:text-gold"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-full border border-noir/15">
                  <Instagram className="size-4" />
                </span>
                {site.instagramHandle}
              </a>
            </div>

            <div className="mt-8">
              <p className="font-sans text-xs uppercase tracking-widest text-stone">
                Reserve your date
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {site.payments.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-noir/15 bg-ivory px-4 py-1.5 font-sans text-sm text-espresso"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — multi-step booking */}
          <div className="rounded-2xl border border-noir/10 bg-ivory/70 p-7 shadow-sm sm:p-9">
            {sent ? (
              <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-gold text-noir">
                  <Check className="size-8" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-noir">
                  Merci, {data.name || "friend"}!
                </h3>
                <p className="mt-3 max-w-sm font-serif text-base text-espresso/80">
                  Your email app just opened with everything filled in — hit send and
                  we&apos;ll get back to you with a custom quote. Or write us directly
                  at {EMAIL}.
                </p>
              </div>
            ) : (
              <form onSubmit={submit}>
                {/* Progress */}
                <div className="mb-7 flex items-center gap-2">
                  {STEPS.map((s, i) => (
                    <div key={s} className="flex flex-1 flex-col gap-1.5">
                      <span
                        className={`h-1 rounded-full transition-colors duration-300 ${
                          i <= step ? "bg-gold" : "bg-noir/12"
                        }`}
                      />
                      <span
                        className={`font-sans text-[0.6rem] uppercase tracking-widest ${
                          i === step ? "text-noir" : "text-stone"
                        }`}
                      >
                        {s}
                      </span>
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="min-h-[15rem]"
                  >
                    {step === 0 && (
                      <div>
                        <h3 className="font-display text-xl font-semibold text-noir">
                          What are we celebrating?
                        </h3>
                        <div className="mt-5 flex flex-wrap gap-2.5">
                          {occasions.map((o) => (
                            <button
                              type="button"
                              key={o}
                              onClick={() => set("occasion", o)}
                              className={chip(data.occasion === o)}
                            >
                              {o}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="space-y-5">
                        <h3 className="font-display text-xl font-semibold text-noir">
                          When &amp; how many?
                        </h3>
                        <div>
                          <label className="font-sans text-sm text-espresso/80">
                            Event date
                          </label>
                          <input
                            type="date"
                            value={data.date}
                            onChange={(e) => set("date", e.target.value)}
                            className={`${field} mt-1.5`}
                          />
                        </div>
                        <div>
                          <label className="font-sans text-sm text-espresso/80">
                            Guest count
                          </label>
                          <div className="mt-2 flex flex-wrap gap-2.5">
                            {guestRanges.map((g) => (
                              <button
                                type="button"
                                key={g}
                                onClick={() => set("guests", g)}
                                className={chip(data.guests === g)}
                              >
                                {g}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="font-sans text-sm text-espresso/80">
                            Location / city
                          </label>
                          <input
                            placeholder="e.g. Beverly Hills, CA"
                            value={data.location}
                            onChange={(e) => set("location", e.target.value)}
                            className={`${field} mt-1.5`}
                          />
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div>
                        <h3 className="font-display text-xl font-semibold text-noir">
                          Which crêpes are calling you?
                        </h3>
                        <p className="mt-2 font-serif text-base text-stone">
                          Pick any that interest you — we&apos;ll build the menu with you.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2.5">
                          {styleOptions.map((s) => (
                            <button
                              type="button"
                              key={s}
                              onClick={() => toggleStyle(s)}
                              className={chip(data.styles.includes(s))}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-4">
                        <h3 className="font-display text-xl font-semibold text-noir">
                          Where do we send the quote?
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <input
                            required
                            placeholder="Your name"
                            value={data.name}
                            onChange={(e) => set("name", e.target.value)}
                            className={field}
                          />
                          <input
                            required
                            type="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) => set("email", e.target.value)}
                            className={field}
                          />
                        </div>
                        <input
                          placeholder="Phone"
                          value={data.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          className={field}
                        />
                        <textarea
                          rows={3}
                          placeholder="Anything else we should know?"
                          value={data.message}
                          onChange={(e) => set("message", e.target.value)}
                          className={`${field} resize-none`}
                        />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Nav buttons */}
                <div className="mt-7 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    className={`inline-flex items-center gap-2 font-sans text-sm text-stone transition-colors hover:text-noir ${
                      step === 0 ? "pointer-events-none opacity-0" : ""
                    }`}
                  >
                    <ArrowLeft className="size-4" /> Back
                  </button>

                  {step < 3 ? (
                    <button
                      type="button"
                      disabled={!canNext}
                      onClick={() => canNext && setStep((s) => s + 1)}
                      className="inline-flex items-center gap-2 rounded-full bg-noir px-7 py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-ivory transition-all duration-300 enabled:hover:bg-espresso disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Continue <ArrowRight className="size-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-noir transition-all duration-300 hover:bg-gold-soft hover:shadow-lg hover:shadow-gold/25"
                    >
                      Send inquiry <Send className="size-4" />
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
