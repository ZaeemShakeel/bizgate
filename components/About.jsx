"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const mission = [
  "Industry expertise",
  "Cost efficiency",
  "Effective partnership",
  "Result driven sales & marketing services",
  "Dedication and innovative approach",
];

const strengths = [
  "Strong Arabic & English media relationships",
  "Gulf tour operators, agents & hoteliers network",
  "High-profile UAE government connections",
];

const values = ["Credibility", "Feasibility", "Agility", "Simplicity"];

export default function About() {
  return (
    <section id="about" className="overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <Reveal direction="left" className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">Who we are</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl">
              Ahlan Wa Sahlan — Welcome to BizGate
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-muted md:text-base">
              Welcome to BizGate — a dynamic marketing and consultancy agency strategically
              located in Dubai, which has started its activities in 2007. Focused on the future
              of travel and connected to the travel trade.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted md:text-base">
              Established in Dubai since 2009 as a boutique tourism consultancy firm specializing
              in brand management, management advisory and digital transformation solutions.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/founder" className="btn-primary h-11 px-5">
                Meet the founder
              </Link>
              <Link href="/#team" className="btn-ghost h-11 px-5">
                Our professionals
              </Link>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.08} className="relative mx-auto w-full max-w-[320px] lg:mx-0 lg:justify-self-end">
            <motion.div
              className="relative overflow-hidden rounded-2xl border border-brand-line bg-brand-fog shadow-[0_16px_40px_rgba(26,35,50,0.12)]"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative h-[340px] sm:h-[360px]">
                <Image
                  src="/founder.jpg"
                  alt="BizGate Founder"
                  fill
                  className="object-cover object-top"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                  Founder
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold">Mohamad Masri</h3>
              </div>
            </motion.div>

            <motion.div
              className="absolute -left-3 top-5 rounded-xl border border-white/80 bg-white px-3 py-2 shadow-md"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-muted">Since</p>
              <p className="font-display text-lg font-semibold text-brand-blue">2007</p>
            </motion.div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Reveal direction="left" className="rounded-2xl border border-brand-line bg-brand-fog/70 p-5 md:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-sky">
              Our mission
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {mission.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-brand-ink/90">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="right" delay={0.08} className="rounded-2xl border border-brand-line bg-brand-fog/70 p-5 md:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-sky">
              Our strengths
            </p>
            <ul className="mt-3 space-y-2">
              {strengths.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-brand-ink/90">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} direction="scale" className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1d22] via-[#2a2f36] to-[#1f8993] p-6 text-white md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Authorised Marketing &amp; Consultancies Brand
          </p>
          <h3 className="mt-2 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
            Built on 4 core values.
          </h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value}
                className="rounded-xl border border-white/15 bg-white/10 px-4 py-4 text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * index, duration: 0.4 }}
              >
                <p className="font-display text-lg font-semibold">{value}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
