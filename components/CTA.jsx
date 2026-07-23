"use client";

import Image from "next/image";
import { useState } from "react";

export default function CTA() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/cta-hotel.jpg"
          alt="Modern hotel at night"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-ink/82" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(54,68,65,0.9),rgba(31,42,40,0.6))]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="reveal">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/65">
            Free consultation
          </p>
          <h2 className="mt-5 font-display text-4xl font-medium tracking-[-0.02em] text-white md:text-5xl">
            Our managed services will help you succeed. Let’s get started.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            Call us for any question or concern. We’re here to discuss hotel sales
            representation, brand marketing, advisory, and digital transformation.
          </p>

          <div className="mt-10 space-y-4 text-white/80">
            <p>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                Address
              </span>
              Maktoum Road, Golden Building — Dubai
            </p>
            <p>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                Phone
              </span>
              <a href="tel:+971506760033" className="hover:text-white">
                +971 50 676 0033
              </a>
            </p>
            <p>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                Email
              </span>
              <a href="mailto:info@bizgate.info" className="hover:text-white">
                info@bizgate.info
              </a>
            </p>
          </div>
        </div>

        <div className="reveal reveal-delay-1 border border-white/15 bg-white/95 p-7 text-brand-ink shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:p-9">
          {submitted ? (
            <div className="flex min-h-[320px] flex-col justify-center">
              <p className="font-display text-3xl text-brand-dark">Thank you</p>
              <p className="mt-4 text-brand-ink/70">
                Your message has been prepared. For now this is a frontend preview —
                please also reach us at info@bizgate.info or +971 50 676 0033.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="font-display text-2xl text-brand-dark">Request a consultation</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-2 block font-medium text-brand-ink/80">First name *</span>
                  <input
                    required
                    name="firstName"
                    className="h-11 w-full border border-brand-dark/15 bg-brand-sand/60 px-3 outline-none transition focus:border-brand-dark"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-2 block font-medium text-brand-ink/80">Last name *</span>
                  <input
                    required
                    name="lastName"
                    className="h-11 w-full border border-brand-dark/15 bg-brand-sand/60 px-3 outline-none transition focus:border-brand-dark"
                  />
                </label>
              </div>
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-brand-ink/80">Phone *</span>
                <input
                  required
                  type="tel"
                  name="phone"
                  className="h-11 w-full border border-brand-dark/15 bg-brand-sand/60 px-3 outline-none transition focus:border-brand-dark"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-brand-ink/80">Email *</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="h-11 w-full border border-brand-dark/15 bg-brand-sand/60 px-3 outline-none transition focus:border-brand-dark"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block font-medium text-brand-ink/80">Comment or message *</span>
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="w-full border border-brand-dark/15 bg-brand-sand/60 px-3 py-3 outline-none transition focus:border-brand-dark"
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-12 items-center rounded-full bg-brand-dark px-7 text-sm font-semibold text-white transition hover:bg-brand-ink"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
