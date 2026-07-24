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
        <div className="absolute inset-0 bg-[#121416]/88" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(18,20,24,0.9),rgba(42,92,170,0.45))]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-14 md:px-8 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <Reveal direction="left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
            Free consultation
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
            The future of hospitality growth is now.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
            Call us for any question or concern. We’re here to discuss hotel sales
            representation, brand marketing, advisory, and digital transformation.
          </p>

          <div className="mt-6 grid gap-3 text-sm text-white/80 sm:grid-cols-3 lg:grid-cols-1">
            <p>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
                Address
              </span>
              Maktoum Road, Golden Building — Dubai
            </p>
            <p>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
                Phone
              </span>
              <a href="tel:+971506760033" className="hover:text-white">
                +971 50 676 0033
              </a>
            </p>
            <p>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
                Email
              </span>
              <a href="mailto:info@bizgate.info" className="hover:text-white">
                info@bizgate.info
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.08}>
          <motion.div
            initial={{ opacity: 0.9, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/20 bg-white p-5 text-brand-ink shadow-[0_20px_50px_rgba(0,0,0,0.28)] md:p-6"
          >
            {submitted ? (
              <div className="flex min-h-[220px] flex-col justify-center">
                <p className="font-display text-2xl font-semibold text-brand-blue">Thank you</p>
                <p className="mt-3 text-sm text-brand-muted">
                  Your message has been prepared. For now this is a frontend preview —
                  please also reach us at info@bizgate.info or +971 50 676 0033.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <p className="font-display text-xl font-semibold text-brand-ink">
                  Request a consultation
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="mb-1 block text-xs font-medium text-brand-ink/80">First name *</span>
                    <input
                      required
                      name="firstName"
                      className="h-10 w-full rounded-lg border border-brand-line bg-brand-fog px-3 outline-none transition focus:border-brand-blue"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1 block text-xs font-medium text-brand-ink/80">Last name *</span>
                    <input
                      required
                      name="lastName"
                      className="h-10 w-full rounded-lg border border-brand-line bg-brand-fog px-3 outline-none transition focus:border-brand-blue"
                    />
                  </label>
                </div>
                <label className="block text-sm">
                  <span className="mb-1 block text-xs font-medium text-brand-ink/80">Phone *</span>
                  <input
                    required
                    type="tel"
                    name="phone"
                    className="h-10 w-full rounded-lg border border-brand-line bg-brand-fog px-3 outline-none transition focus:border-brand-blue"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block text-xs font-medium text-brand-ink/80">Email *</span>
                  <input
                    required
                    type="email"
                    name="email"
                    className="h-10 w-full rounded-lg border border-brand-line bg-brand-fog px-3 outline-none transition focus:border-brand-blue"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block text-xs font-medium text-brand-ink/80">Comment or message *</span>
                  <textarea
                    required
                    name="message"
                    rows={3}
                    className="w-full rounded-lg border border-brand-line bg-brand-fog px-3 py-2 outline-none transition focus:border-brand-blue"
                  />
                </label>
                <button type="submit" className="btn-primary h-11 w-full sm:w-auto">
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
