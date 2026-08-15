"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { primaryCta } from "../lib/siteContent";

const differentiators = [
  {
    title: "Hospitality and Tourism Specialization",
    copy: "Our work is grounded in 28 years of leadership experience across airlines, tourism authorities, hospitality, travel technology and regional market development.",
  },
  {
    title: "Regional Understanding",
    copy: "Based in Dubai and active across the Middle East, we understand the cultures, relationships and commercial realities that influence decisions in regional markets.",
  },
  {
    title: "Senior Involvement",
    copy: "Every engagement benefits from direct senior attention, from initial assessment and strategy through implementation, training and performance review.",
  },
  {
    title: "Cultural and Bilingual Capability",
    copy: "We understand guest sentiment and business communication in both Arabic and English, helping international expertise connect effectively with local market needs.",
  },
  {
    title: "Independent, Practical Advice",
    copy: "Our recommendations are shaped by each client's priorities — not by a single platform or technology provider. We focus on solutions that are relevant, practical and measurable.",
  },
];

const process = [
  { step: "Listen", copy: "We begin by understanding your objectives, current challenges, stakeholders and market environment." },
  { step: "Assess", copy: "We examine the available data, guest feedback, operational practices and competitive position to identify the issues that matter most." },
  { step: "Advise", copy: "We translate findings into clear priorities, practical recommendations and an achievable plan." },
  { step: "Support", copy: "We work alongside leadership and operational teams through implementation, training, reporting and ongoing performance improvement." },
];

const principles = ["Credibility", "Specialist Expertise", "Partnership", "Practical Impact"];

export default function About() {
  return (
    <section id="about" className="overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <Reveal direction="left" className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">About BizGate</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl">
              Regional Understanding. Specialist Hospitality Expertise.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-muted md:text-base">
              BizGate is a Dubai-based consultancy specializing in hospitality, tourism, digital
              reputation and regional market growth. We began operations in 2008 and rebranded in
              2010, at a time when online guest reviews were beginning to transform how travellers
              selected hotels and destinations.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted md:text-base">
              Today, we work with hotels, resorts, hotel groups, tourism authorities, hospitality
              technology companies and international brands seeking to grow across the Middle East.
              Our role goes beyond providing data or technology — we help clients understand what the
              market is saying, identify what requires attention and turn insight into practical
              action.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/founder" className="btn-primary h-11 px-5">
                Meet the founder
              </Link>
              <Link href="/#contact" className="btn-ghost h-11 px-5">
                {primaryCta}
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
                  alt="Mohamad Ibrahim Masri, Founder of BizGate"
                  fill
                  className="object-cover object-top"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                  Founder &amp; CEO
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold">Mohamad Ibrahim Masri</h3>
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
              <p className="font-display text-lg font-semibold text-brand-blue">2008</p>
            </motion.div>
          </Reveal>
        </div>

        <Reveal delay={0.06} className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-sky">
            What Makes BizGate Different
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-brand-line bg-brand-fog/70 p-5"
              >
                <h3 className="font-display text-lg font-semibold text-brand-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.copy}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Reveal direction="left" className="rounded-2xl border border-brand-line bg-brand-fog/70 p-5 md:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-sky">How We Work</p>
            <ul className="mt-4 space-y-4">
              {process.map((item) => (
                <li key={item.step}>
                  <p className="font-display text-lg font-semibold text-brand-ink">{item.step}</p>
                  <p className="mt-1 text-sm text-brand-muted">{item.copy}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-brand-muted">
              We regularly meet client and partner teams on-site to present insights, discuss
              feedback and develop practical improvement priorities together.
            </p>
          </Reveal>

          <Reveal direction="right" delay={0.08} className="rounded-2xl border border-brand-line bg-brand-fog/70 p-5 md:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-sky">Our Principles</p>
            <ul className="mt-4 space-y-3">
              {principles.map((item) => (
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
            A Regional Partner With an Independent Perspective
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
            Whether you are strengthening hotel performance, managing destination-wide quality,
            introducing hospitality technology or entering the GCC market, BizGate brings the
            regional understanding and specialist expertise required to move forward with
            confidence.
          </h3>
          <Link href="/#contact" className="btn-primary on-dark mt-6 inline-flex h-11 items-center px-5">
            {primaryCta} →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
