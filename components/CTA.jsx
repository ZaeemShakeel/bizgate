"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

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
          src="/cta-growth.jpg"
          alt="Dubai business district at night"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-navy/85" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(42,92,170,0.85),rgba(22,58,107,0.7))]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
            Free consultation
          </p>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
            The future of hospitality growth is now.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            Call us for any question or concern. We’re here to discuss hotel sales
            representation, brand marketing, advisory, and digital transformation.
          </p>

          <div className="mt-10 space-y-4 text-white/80">
            <p>
              <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                Address
              </span>
              Maktoum Road, Golden Building — Dubai
            </p>
            <p>
              <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                Phone
              </span>
              <a href="tel:+971506760033" className="hover:text-white">
                +971 50 676 0033
              </a>
            </p>
            <p>
              <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                Email
              </span>
              <a href="mailto:info@bizgate.info" className="hover:text-white">
                info@bizgate.info
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div
            initial={{ opacity: 0.9, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[1.5rem] border border-white/20 bg-white p-7 text-brand-ink shadow-[0_24px_60px_rgba(0,0,0,0.28)] md:p-9"
          >
            {submitted ? (
              <div className="flex min-h-[320px] flex-col justify-center">
                <p className="font-display text-3xl font-semibold text-brand-blue">Thank you</p>
                <p className="mt-4 text-brand-muted">
                  Your message has been prepared. For now this is a frontend preview —
                  please also reach us at info@bizgate.info or +971 50 676 0033.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <p className="font-display text-2xl font-semibold text-brand-ink">
                  Request a consultation
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="mb-2 block font-medium text-brand-ink/80">First name *</span>
                    <input
                      required
                      name="firstName"
                      className="h-11 w-full rounded-xl border border-brand-line bg-brand-fog px-3 outline-none transition focus:border-brand-blue"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-2 block font-medium text-brand-ink/80">Last name *</span>
                    <input
                      required
                      name="lastName"
                      className="h-11 w-full rounded-xl border border-brand-line bg-brand-fog px-3 outline-none transition focus:border-brand-blue"
                    />
                  </label>
                </div>
                <label className="block text-sm">
                  <span className="mb-2 block font-medium text-brand-ink/80">Phone *</span>
                  <input
                    required
                    type="tel"
                    name="phone"
                    className="h-11 w-full rounded-xl border border-brand-line bg-brand-fog px-3 outline-none transition focus:border-brand-blue"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-2 block font-medium text-brand-ink/80">Email *</span>
                  <input
                    required
                    type="email"
                    name="email"
                    className="h-11 w-full rounded-xl border border-brand-line bg-brand-fog px-3 outline-none transition focus:border-brand-blue"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-2 block font-medium text-brand-ink/80">Comment or message *</span>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    className="w-full rounded-xl border border-brand-line bg-brand-fog px-3 py-3 outline-none transition focus:border-brand-blue"
                  />
                </label>
                <button type="submit" className="btn-primary">
                  Submit
                </button>
              </form>
            )}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
