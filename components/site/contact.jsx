"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Check,
  ArrowRight,
  ArrowLeft,
  Mail,
  ChevronDown,
  Heart,
} from "lucide-react";
import { Instagram } from "./icons";
import { site } from "@/lib/site";
import { menu, menuCategories } from "@/lib/menu";

const MAX_CREPES = 6;
const iceCreamFlavors = ["Vanilla", "Chocolate"];

const EMAIL = site.email;
const occasions = [
  "Wedding",
  "Baby shower",
  "Birthday",
  "Corporate event",
  "Bar / Bat Mitzvah",
  "Private party",
  "Other",
];
const guestRanges = ["Up to 25", "25–50", "50–100", "100–250", "250+"];

// "14:30" → "2:30 PM"
const to12h = (t) => {
  if (!t) return "—";
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:${String(m).padStart(2, "0")} ${ap}`;
};

const STEPS = ["Occasion", "Details", "Crêpes", "Your idea", "You"];

export default function Contact() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [data, setData] = useState({
    occasion: "",
    date: "",
    startTime: "",
    endTime: "",
    timeTbd: false,
    guests: "",
    guestsExact: "",
    location: "",
    crepes: [],
    iceCream: [],
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    callback: false,
    phone: "",
    callbackDay: "",
    callbackTime: "",
    quickCrepes: "",
    quickEvent: "",
  });
  const [crepeCat, setCrepeCat] = useState("premium");
  const [mode, setMode] = useState("guided"); // "guided" | "quick"
  const [quickBrowse, setQuickBrowse] = useState(false);

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const toggleCrepe = (name) =>
    setData((d) => {
      if (d.crepes.includes(name))
        return { ...d, crepes: d.crepes.filter((x) => x !== name) };
      if (d.crepes.length >= MAX_CREPES) return d;
      return { ...d, crepes: [...d.crepes, name] };
    });
  const toggleIceCream = (f) =>
    setData((d) => ({
      ...d,
      iceCream: d.iceCream.includes(f)
        ? d.iceCream.filter((x) => x !== f)
        : [...d.iceCream, f],
    }));
  // Quick inquiry: tapping a crêpe in the browse panel adds/removes it from the
  // free-text field, so people can type OR pick — both feed the same answer.
  const toggleQuickCrepe = (name) =>
    setData((d) => {
      const list = d.quickCrepes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const next = list.includes(name)
        ? list.filter((x) => x !== name)
        : [...list, name];
      return { ...d, quickCrepes: next.join(", ") };
    });

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim());
  const contactOk =
    data.firstName.trim() &&
    data.lastName.trim() &&
    emailOk &&
    (!data.callback ||
      (data.phone.trim() && data.callbackDay && data.callbackTime));
  const canNext =
    (step === 0 && data.occasion) ||
    (step === 1 &&
      data.date &&
      (data.guests || data.guestsExact.trim()) &&
      data.location &&
      (data.timeTbd || (data.startTime && data.endTime))) ||
    (step === 2 && data.crepes.length) ||
    step === 3 ||
    (step === 4 && contactOk);

  // Quick inquiry: name + email + a line about crêpes + a line about the event.
  const quickOk =
    data.firstName.trim() &&
    data.lastName.trim() &&
    emailOk &&
    data.quickCrepes.trim() &&
    data.quickEvent.trim();

  const KEY = site.web3formsKey;
  const useWeb3 = KEY && !KEY.includes("PASTE");

  const openMailto = (subject, body) => {
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  // Shared delivery: Web3Forms → inbox, with a mailto fallback that never loses a lead.
  const sendToInbox = async ({ subject, body, payload }) => {
    if (!useWeb3) {
      openMailto(subject, body);
      setSent(true);
      return;
    }
    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setSent(true);
      } else {
        throw new Error(json.message || "send failed");
      }
    } catch {
      // Network/API hiccup → don't lose the lead, open their email app.
      openMailto(subject, body);
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  // Guided inquiry — the full, everything-we-need submission (no back-and-forth).
  const submit = (e) => {
    e.preventDefault();
    if (!contactOk) return;
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const eventTimeStr = data.timeTbd
      ? "Not sure yet (still planning)"
      : `${to12h(data.startTime)} – ${to12h(data.endTime)} (base 2 hrs)`;
    const guestsStr = data.guestsExact.trim()
      ? `${data.guestsExact.trim()} guests${data.guests ? ` (${data.guests})` : ""}`
      : data.guests;
    const subject = `Catering inquiry (Guided) — ${data.occasion || "Event"}${
      fullName ? ` (${fullName})` : ""
    }`;
    const callbackLines = data.callback
      ? [
          "",
          "Wants a callback: YES",
          `Phone: ${data.phone || "—"}`,
          `Preferred day: ${data.callbackDay || "—"}`,
          `Preferred time: ${to12h(data.callbackTime)}`,
        ]
      : ["", "Wants a callback: No"];
    const body = [
      "Inquiry type: Guided (complete)",
      "",
      `Occasion: ${data.occasion}`,
      `Date: ${data.date || "—"}`,
      `Event time: ${eventTimeStr}`,
      `Guests: ${guestsStr}`,
      `Location: ${data.location || "—"}`,
      `Crêpes wanted: ${data.crepes.join(", ") || "—"}`,
      `Natural ice cream: ${
        data.iceCream.length ? data.iceCream.join(", ") : "Not requested"
      }`,
      "",
      `Name: ${fullName}`,
      `Email: ${data.email}`,
      ...callbackLines,
      "",
      "What they want:",
      data.message || "—",
    ].join("\n");
    const payload = {
      access_key: KEY,
      subject,
      from_name: "Royal French Crêpe — Website",
      replyto: data.email,
      botcheck: "",
      "Inquiry type": "Guided (complete)",
      Occasion: data.occasion,
      Date: data.date || "—",
      "Event time": eventTimeStr,
      Guests: guestsStr,
      Location: data.location || "—",
      "Crêpes wanted": data.crepes.join(", ") || "—",
      "Natural ice cream": data.iceCream.length
        ? data.iceCream.join(", ")
        : "Not requested",
      "First name": data.firstName,
      "Last name": data.lastName,
      Email: data.email,
      "Wants a callback": data.callback ? "Yes" : "No",
      "What they want": data.message || "—",
    };
    if (data.callback) {
      payload.Phone = data.phone;
      payload["Callback day"] = data.callbackDay || "—";
      payload["Callback time"] = to12h(data.callbackTime);
    }
    sendToInbox({ subject, body, payload });
  };

  // Quick inquiry — the minimum essentials; we may follow up for the rest.
  const submitQuick = (e) => {
    e.preventDefault();
    if (!quickOk) return;
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const subject = `Catering inquiry (Quick) — ${fullName}`;
    const body = [
      "Inquiry type: Quick (essentials — may need follow-up)",
      "",
      `Name: ${fullName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "—"}`,
      `Crêpes wanted: ${data.quickCrepes}`,
      `Natural ice cream: ${
        data.iceCream.length ? data.iceCream.join(", ") : "Not requested"
      }`,
      `Event date, time & location: ${data.quickEvent}`,
      "",
      "What they want:",
      data.message || "—",
    ].join("\n");
    const payload = {
      access_key: KEY,
      subject,
      from_name: "Royal French Crêpe — Website",
      replyto: data.email,
      botcheck: "",
      "Inquiry type": "Quick (essentials)",
      "First name": data.firstName,
      "Last name": data.lastName,
      Email: data.email,
      Phone: data.phone || "—",
      "Crêpes wanted": data.quickCrepes,
      "Natural ice cream": data.iceCream.length
        ? data.iceCream.join(", ")
        : "Not requested",
      "Event date, time & location": data.quickEvent,
      "What they want": data.message || "—",
    };
    sendToInbox({ subject, body, payload });
  };

  const field =
    "w-full rounded-lg border border-noir/15 bg-ivory px-4 py-3 font-sans text-base text-noir outline-none transition-colors placeholder:font-normal placeholder:text-stone/45 focus:border-gold focus:ring-2 focus:ring-gold/30";
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
            <p className="eyebrow">07 — Contactez-Nous</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-noir sm:text-5xl">
              Let&apos;s plan something
              <br />
              <span className="italic text-stone">délicieux</span>
            </h2>
            <div className="rule-gold mt-7 w-28" />
            <p className="mt-7 max-w-md font-serif text-lg leading-relaxed text-espresso/85">
              Tell us about your event and we&apos;ll tailor a quote to your guest
              count, menu and location. Every celebration is custom — there are no
              fixed prices, just the experience you want. We reply within a day.
            </p>

            <div className="mt-8 space-y-3">
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
                  Merci, {data.firstName || "friend"}!
                </h3>
                <p className="mt-3 max-w-sm font-serif text-base text-espresso/80">
                  {useWeb3
                    ? "We've received your inquiry and will get back to you with a custom quote — usually within a day."
                    : "Your email app just opened with everything filled in — hit send and we'll get back to you with a custom quote."}
                </p>
              </div>
            ) : (
              <>
                {/* Two ways to reach us — guided (recommended) or quick */}
                <div className="mb-7 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setMode("guided")}
                    className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                      mode === "guided"
                        ? "border-gold bg-gold/10 ring-1 ring-gold"
                        : "border-noir/15 bg-ivory hover:border-noir/30"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-display text-base font-semibold text-noir">
                        Guided inquiry
                      </span>
                      <span className="shrink-0 rounded-full bg-gold px-2 py-0.5 font-sans text-[0.62rem] font-semibold uppercase tracking-wider text-noir">
                        Recommended
                      </span>
                    </span>
                    <span className="mt-1.5 block font-serif text-sm leading-snug text-espresso/80">
                      A few quick questions so we have everything — the fastest way to
                      a firm quote, with no back-and-forth.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode("quick")}
                    className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                      mode === "quick"
                        ? "border-gold bg-gold/10 ring-1 ring-gold"
                        : "border-noir/15 bg-ivory hover:border-noir/30"
                    }`}
                  >
                    <span className="font-display text-base font-semibold text-noir">
                      Quick inquiry
                    </span>
                    <span className="mt-1.5 block font-serif text-sm leading-snug text-espresso/80">
                      In a hurry? Just your crêpes, date &amp; location. Faster to send —
                      but we may follow up for a few details.
                    </span>
                  </button>
                </div>

                {mode === "guided" ? (
                  <form
                    onSubmit={submit}
                    onKeyDown={(e) => {
                      // Never let Enter submit or skip steps — only the buttons advance.
                      if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
                        e.preventDefault();
                      }
                    }}
                  >
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
                        className={`font-sans text-[0.8rem] font-medium uppercase tracking-wide ${
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
                            Event date *
                          </label>
                          <input
                            type="date"
                            value={data.date}
                            onChange={(e) => set("date", e.target.value)}
                            className={`${field} mt-1.5`}
                          />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                            <label className="font-sans text-sm text-espresso/80">
                              Event time *
                            </label>
                            <span className="font-sans text-xs text-stone">
                              Base service is 2 hrs · extra time can be added
                            </span>
                          </div>
                          {!data.timeTbd && (
                            <div className="mt-1.5 grid gap-3 sm:grid-cols-2">
                              <div>
                                <span className="font-sans text-xs text-stone">
                                  Start
                                </span>
                                <input
                                  type="time"
                                  value={data.startTime}
                                  onChange={(e) => set("startTime", e.target.value)}
                                  className={`${field} mt-1`}
                                />
                              </div>
                              <div>
                                <span className="font-sans text-xs text-stone">End</span>
                                <input
                                  type="time"
                                  value={data.endTime}
                                  onChange={(e) => set("endTime", e.target.value)}
                                  className={`${field} mt-1`}
                                />
                              </div>
                            </div>
                          )}
                          <label className="mt-2.5 flex cursor-pointer items-center gap-2">
                            <input
                              type="checkbox"
                              checked={data.timeTbd}
                              onChange={(e) => set("timeTbd", e.target.checked)}
                              className="size-4 accent-gold"
                            />
                            <span className="font-sans text-sm text-espresso">
                              I&apos;m not sure of the time yet — still planning
                            </span>
                          </label>
                        </div>
                        <div>
                          <label className="font-sans text-sm text-espresso/80">
                            Guest count *
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
                          <input
                            type="text"
                            inputMode="numeric"
                            placeholder="Know the exact number? Type it — e.g. 70"
                            value={data.guestsExact}
                            onChange={(e) => set("guestsExact", e.target.value)}
                            className={`${field} mt-2.5`}
                          />
                        </div>
                        <div>
                          <label className="font-sans text-sm text-espresso/80">
                            Location / city *
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
                          Pick the crêpes you love
                        </h3>
                        <p className="mt-2 font-serif text-base text-stone">
                          Browse by tier and choose up to {MAX_CREPES}.{" "}
                          <span className="font-sans text-sm font-semibold text-gold">
                            {data.crepes.length}/{MAX_CREPES} selected
                          </span>
                        </p>

                        {/* Tier filter */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {menuCategories.map((c) => (
                            <button
                              type="button"
                              key={c.id}
                              onClick={() => setCrepeCat(c.id)}
                              className={`rounded-full px-3.5 py-1.5 font-sans text-xs transition-all duration-200 ${
                                crepeCat === c.id
                                  ? "bg-noir text-ivory"
                                  : "border border-noir/15 text-espresso/80 hover:border-noir/40"
                              }`}
                            >
                              {c.label}
                            </button>
                          ))}
                        </div>

                        {/* Crêpe list with photos + ingredients (mirrors the menu) */}
                        <div className="mt-3 max-h-96 space-y-2 overflow-y-auto pr-1">
                          {menu[crepeCat].map((item) => {
                            const selected = data.crepes.includes(item.name);
                            const atMax =
                              !selected && data.crepes.length >= MAX_CREPES;
                            return (
                              <button
                                type="button"
                                key={item.name}
                                disabled={atMax}
                                onClick={() => toggleCrepe(item.name)}
                                className={`flex w-full items-center gap-3.5 rounded-lg border p-2.5 text-left transition-colors duration-200 ${
                                  selected
                                    ? "border-gold bg-gold/10"
                                    : "border-noir/12 hover:border-noir/30"
                                } ${
                                  atMax
                                    ? "cursor-not-allowed opacity-40"
                                    : "cursor-pointer"
                                }`}
                              >
                                <span className="relative size-14 shrink-0 overflow-hidden rounded-md ring-1 ring-noir/10">
                                  <Image
                                    src={item.img}
                                    alt={item.name}
                                    fill
                                    sizes="56px"
                                    className="graded object-cover"
                                  />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="flex items-baseline gap-2">
                                    <span className="truncate font-display text-lg font-semibold text-noir">
                                      {item.name}
                                    </span>
                                    <span className="shrink-0 font-sans text-[0.7rem] uppercase tracking-widest text-stone">
                                      {item.type}
                                    </span>
                                  </span>
                                  <span className="mt-1 line-clamp-2 font-serif text-[0.9rem] leading-snug text-espresso/70">
                                    {item.ingredients.join(" · ")}
                                  </span>
                                </span>
                                {selected && (
                                  <Check className="size-5 shrink-0 text-gold" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Optional natural ice cream */}
                        <div className="mt-5 rounded-lg border border-noir/12 bg-ivory p-4">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-display text-base font-semibold text-noir">
                              Natural ice cream
                            </span>
                            <span className="rounded-full border border-noir/15 px-2 py-0.5 font-sans text-[0.7rem] uppercase tracking-widest text-stone">
                              Optional
                            </span>
                          </div>
                          <p className="mt-1 font-serif text-sm text-stone">
                            Add a scoop of natural ice cream — an optional add-on at an
                            extra charge. Pick a flavor, or skip it.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {iceCreamFlavors.map((f) => (
                              <button
                                type="button"
                                key={f}
                                onClick={() => toggleIceCream(f)}
                                className={chip(data.iceCream.includes(f))}
                              >
                                {f}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div>
                        <h3 className="font-display text-xl font-semibold text-noir">
                          Tell us what you&apos;re imagining
                        </h3>
                        <p className="mt-2 font-serif text-base text-stone">
                          The vibe, must-have crêpes, dietary needs, timing — anything
                          that&apos;ll make it perfect. The more detail, the better your
                          quote.
                        </p>
                        <textarea
                          rows={6}
                          placeholder="e.g. Sunset garden wedding for ~80 guests. We'd love a live crêpe station — sweet & savory, a few vegan options, and the Marie Antoinette for dessert. Setup around 5pm…"
                          value={data.message}
                          onChange={(e) => set("message", e.target.value)}
                          className={`${field} mt-4 resize-none`}
                        />
                      </div>
                    )}

                    {step === 4 && (
                      <div className="space-y-4">
                        <h3 className="font-display text-xl font-semibold text-noir">
                          Where do we send the quote?
                        </h3>
                        <p className="-mt-1 font-serif text-base text-espresso/80">
                          First name, last name and email are required so we can
                          reach you with your quote.
                        </p>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <input
                            required
                            placeholder="First name *"
                            value={data.firstName}
                            onChange={(e) => set("firstName", e.target.value)}
                            className={field}
                          />
                          <input
                            required
                            placeholder="Last name *"
                            value={data.lastName}
                            onChange={(e) => set("lastName", e.target.value)}
                            className={field}
                          />
                        </div>
                        <input
                          required
                          type="email"
                          placeholder="Email *"
                          value={data.email}
                          onChange={(e) => set("email", e.target.value)}
                          className={field}
                        />
                        <p className="-mt-1.5 font-serif text-base text-espresso/80">
                          Please give us your{" "}
                          <span className="font-semibold text-espresso">best email</span> —
                          this is how we&apos;ll reach you with your custom quote, so make
                          sure it&apos;s one you check often.
                        </p>
                        {step === 4 && !contactOk && (
                          <p className="font-sans text-sm text-red-700/80">
                            Please add your first name, last name and a valid email
                            {data.callback
                              ? ", plus your phone, best day and best time to call,"
                              : ""}{" "}
                            to send your inquiry.
                          </p>
                        )}

                        {/* Wedding-specific caution — callback is extra important */}
                        {data.occasion === "Wedding" && (
                          <div className="flex items-start gap-2.5 rounded-lg border border-bordeaux/35 bg-bordeaux/[0.06] px-4 py-3">
                            <Heart className="mt-0.5 size-4 shrink-0 text-bordeaux" />
                            <p className="font-serif text-sm leading-relaxed text-espresso">
                              <span className="font-semibold text-noir">
                                Planning a wedding?
                              </span>{" "}
                              A callback is{" "}
                              <span className="font-semibold text-bordeaux">
                                extremely recommended
                              </span>{" "}
                              — weddings have the most details to get exactly right, and a
                              quick call makes sure nothing is missed on your big day.
                            </p>
                          </div>
                        )}

                        {/* Callback opt-in — strongly recommended */}
                        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gold/45 bg-gold/[0.06] px-4 py-3.5">
                          <input
                            type="checkbox"
                            checked={data.callback}
                            onChange={(e) => set("callback", e.target.checked)}
                            className="mt-0.5 size-5 accent-gold"
                          />
                          <span className="block">
                            <span className="flex flex-wrap items-center gap-2">
                              <span className="font-sans text-base font-medium text-espresso">
                                I&apos;d like a callback to talk it through
                              </span>
                              <span className="rounded-full bg-gold px-2 py-0.5 font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-noir">
                                {data.occasion === "Wedding"
                                  ? "Extremely recommended"
                                  : "Recommended"}
                              </span>
                            </span>
                            <span className="mt-1.5 block font-serif text-sm leading-relaxed text-espresso/80">
                              There are so many ways to make your event yours — décor,
                              styles, crêpe choices and add-ons. A quick call lets us
                              tailor everything to you. It&apos;s optional, but we
                              strongly recommend it.
                            </span>
                          </span>
                        </label>

                        {data.callback && (
                          <div className="space-y-4 rounded-lg border border-gold/40 bg-gold/[0.06] p-4">
                            <p className="font-serif text-base leading-relaxed text-espresso/85">
                              We&apos;ll call you from{" "}
                              <span className="whitespace-nowrap font-semibold text-noir">
                                {site.phone}
                              </span>{" "}
                              at the time you choose — save it so you&apos;ll know it&apos;s
                              us calling, not spam.
                            </p>
                            <div>
                              <label className="font-sans text-sm text-espresso/80">
                                Phone number *
                              </label>
                              <input
                                required={data.callback}
                                type="tel"
                                placeholder="Your phone number"
                                value={data.phone}
                                onChange={(e) => set("phone", e.target.value)}
                                className={`${field} mt-1.5`}
                              />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <label className="font-sans text-sm text-espresso/80">
                                  Best day to call *
                                </label>
                                <input
                                  type="date"
                                  required={data.callback}
                                  value={data.callbackDay}
                                  onChange={(e) => set("callbackDay", e.target.value)}
                                  className={`${field} mt-1.5`}
                                />
                              </div>
                              <div>
                                <label className="font-sans text-sm text-espresso/80">
                                  Best time to call *
                                </label>
                                <input
                                  type="time"
                                  required={data.callback}
                                  value={data.callbackTime}
                                  onChange={(e) => set("callbackTime", e.target.value)}
                                  className={`${field} mt-1.5`}
                                />
                              </div>
                            </div>
                          </div>
                        )}
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

                  {step < 4 ? (
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
                      disabled={sending || !contactOk}
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-noir transition-all duration-300 hover:bg-gold-soft hover:shadow-lg hover:shadow-gold/25 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
                    >
                      {sending ? "Sending…" : "Send inquiry"}
                      <Send className="size-4" />
                    </button>
                  )}
                    </div>
                  </form>
                ) : (
                  <form
                    onSubmit={submitQuick}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
                        e.preventDefault();
                      }
                    }}
                  >
                    <div className="space-y-4">
                      <h3 className="font-display text-xl font-semibold text-noir">
                        Send us the essentials
                      </h3>
                      <p className="-mt-1 font-serif text-base text-espresso/80">
                        We&apos;ll reply within a day. Not sure of a detail yet? Just say
                        so — we&apos;ll figure it out together.
                      </p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <input
                          required
                          placeholder="First name *"
                          value={data.firstName}
                          onChange={(e) => set("firstName", e.target.value)}
                          className={field}
                        />
                        <input
                          required
                          placeholder="Last name *"
                          value={data.lastName}
                          onChange={(e) => set("lastName", e.target.value)}
                          className={field}
                        />
                      </div>
                      <input
                        required
                        type="email"
                        placeholder="Email *"
                        value={data.email}
                        onChange={(e) => set("email", e.target.value)}
                        className={field}
                      />
                      <p className="-mt-1.5 font-serif text-sm text-espresso/80">
                        Please give us your{" "}
                        <span className="font-semibold text-espresso">best email</span> —
                        it&apos;s how we&apos;ll reach you with your quote.
                      </p>
                      <input
                        type="tel"
                        placeholder="Phone (optional)"
                        value={data.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        className={field}
                      />
                      <div>
                        <label className="font-sans text-sm text-espresso/80">
                          Which crêpes are you thinking? *
                        </label>
                        <input
                          required
                          placeholder="e.g. Marie Antoinette, La Gourmande — or 'help me choose'"
                          value={data.quickCrepes}
                          onChange={(e) => set("quickCrepes", e.target.value)}
                          className={`${field} mt-1.5`}
                        />
                        <button
                          type="button"
                          onClick={() => setQuickBrowse((v) => !v)}
                          className="mt-2 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-espresso underline-offset-2 transition-colors hover:text-gold"
                        >
                          <ChevronDown
                            className={`size-4 transition-transform duration-300 ${
                              quickBrowse ? "rotate-180" : ""
                            }`}
                          />
                          {quickBrowse ? "Hide the menu" : "Not sure? Browse the menu"}
                        </button>

                        <AnimatePresence initial={false}>
                          {quickBrowse && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 rounded-lg border border-noir/12 bg-ivory p-3">
                                {/* Tier filter */}
                                <div className="flex flex-wrap gap-2">
                                  {menuCategories.map((c) => (
                                    <button
                                      type="button"
                                      key={c.id}
                                      onClick={() => setCrepeCat(c.id)}
                                      className={`rounded-full px-3.5 py-1.5 font-sans text-xs transition-all duration-200 ${
                                        crepeCat === c.id
                                          ? "bg-noir text-ivory"
                                          : "border border-noir/15 text-espresso/80 hover:border-noir/40"
                                      }`}
                                    >
                                      {c.label}
                                    </button>
                                  ))}
                                </div>
                                {/* Crêpe list with photos — tap to add above */}
                                <div className="mt-3 max-h-96 space-y-2 overflow-y-auto pr-1">
                                  {menu[crepeCat].map((item) => {
                                    const selected = data.quickCrepes
                                      .split(",")
                                      .map((s) => s.trim())
                                      .includes(item.name);
                                    return (
                                      <button
                                        type="button"
                                        key={item.name}
                                        onClick={() => toggleQuickCrepe(item.name)}
                                        className={`flex w-full cursor-pointer items-center gap-3.5 rounded-lg border p-2.5 text-left transition-colors duration-200 ${
                                          selected
                                            ? "border-gold bg-gold/10"
                                            : "border-noir/12 hover:border-noir/30"
                                        }`}
                                      >
                                        <span className="relative size-14 shrink-0 overflow-hidden rounded-md ring-1 ring-noir/10">
                                          <Image
                                            src={item.img}
                                            alt={item.name}
                                            fill
                                            sizes="56px"
                                            className="graded object-cover"
                                          />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                          <span className="flex items-baseline gap-2">
                                            <span className="truncate font-display text-lg font-semibold text-noir">
                                              {item.name}
                                            </span>
                                            <span className="shrink-0 font-sans text-[0.7rem] uppercase tracking-widest text-stone">
                                              {item.type}
                                            </span>
                                          </span>
                                          <span className="mt-1 line-clamp-2 font-serif text-[0.9rem] leading-snug text-espresso/70">
                                            {item.ingredients.join(" · ")}
                                          </span>
                                        </span>
                                        {selected && (
                                          <Check className="size-5 shrink-0 text-gold" />
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                                <p className="mt-2 font-sans text-xs text-stone">
                                  Tap any crêpe to add it above. Still unsure? Just leave
                                  &ldquo;help me choose&rdquo;.
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      {/* Optional natural ice cream — same as the guided inquiry */}
                      <div className="rounded-lg border border-noir/12 bg-ivory p-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-display text-base font-semibold text-noir">
                            Natural ice cream
                          </span>
                          <span className="rounded-full border border-noir/15 px-2 py-0.5 font-sans text-[0.7rem] uppercase tracking-widest text-stone">
                            Optional
                          </span>
                        </div>
                        <p className="mt-1 font-serif text-sm text-stone">
                          Add a scoop of natural ice cream — an optional add-on at an
                          extra charge. Pick a flavor, or skip it.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {iceCreamFlavors.map((f) => (
                            <button
                              type="button"
                              key={f}
                              onClick={() => toggleIceCream(f)}
                              className={chip(data.iceCream.includes(f))}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="font-sans text-sm text-espresso/80">
                          Event date, time &amp; location *
                        </label>
                        <input
                          required
                          placeholder="e.g. Sat Aug 9, 5–7pm, Malibu — or 'still deciding'"
                          value={data.quickEvent}
                          onChange={(e) => set("quickEvent", e.target.value)}
                          className={`${field} mt-1.5`}
                        />
                      </div>
                      <textarea
                        rows={3}
                        placeholder="Anything else? (optional)"
                        value={data.message}
                        onChange={(e) => set("message", e.target.value)}
                        className={`${field} resize-none`}
                      />
                      {!quickOk && (
                        <p className="font-sans text-sm text-red-700/80">
                          Add your name, a valid email, your crêpes and event details to
                          send.
                        </p>
                      )}
                      <div className="flex flex-col-reverse gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                        <p className="font-serif text-sm italic text-stone">
                          Want a one-and-done quote?{" "}
                          <button
                            type="button"
                            onClick={() => setMode("guided")}
                            className="font-semibold not-italic text-espresso underline-offset-2 hover:text-gold hover:underline"
                          >
                            Use the guided inquiry
                          </button>
                        </p>
                        <button
                          type="submit"
                          disabled={sending || !quickOk}
                          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-noir transition-all duration-300 hover:bg-gold-soft hover:shadow-lg hover:shadow-gold/25 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
                        >
                          {sending ? "Sending…" : "Send"}
                          <Send className="size-4" />
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
