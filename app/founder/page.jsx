"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CTA from "../../components/CTA";
import Reveal from "../../components/Reveal";

const ease = [0.22, 1, 0.36, 1];

const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const highlights = [
  { value: "15+", label: "Years in hospitality growth" },
  { value: "2007", label: "BizGate journey started" },
  { value: "GCC", label: "Regional market focus" },
];

const expertise = [
  {
    title: "Strategy",
    copy: "Commercial roadmaps for hotels, resorts, and tourism brands entering or scaling in the Middle East.",
  },
  {
    title: "Partnerships",
    copy: "Trusted relationships across travel trade, corporate buyers, media, and government stakeholders.",
  },
  {
    title: "Regional growth",
    copy: "Sales representation, brand positioning, and market activation built around measurable demand.",
  },
];

const focusAreas = [
  "Hotel sales representation across the Gulf",
  "Brand management and market positioning",
  "Travel-trade and corporate partnership building",
  "Management advisory for hospitality operators",
  "Digital transformation and guest-journey design",
  "Arabic & English media and PR direction",
];

const timeline = [
  {
    year: "2007",
    title: "Industry foundations",
    copy: "Began building deep hospitality and travel-trade experience across the region, working closely with hotels and destination partners.",
  },
  {
    year: "2009",
    title: "BizGate established in Dubai",
    copy: "Founded BizGate as a boutique tourism consultancy specialising in brand management, advisory, and commercial representation.",
  },
  {
    year: "Today",
    title: "Regional growth partner",
    copy: "Leads BizGate as a trusted partner for hospitality brands seeking sustainable sales, marketing, and digital growth in the GCC.",
  },
];

export default function FounderPage() {
  return (
    <main className="overflow-x-hidden">
      <Header />

      <section className="relative min-h-[86svh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease }}
        >
          <Image
            src="/hero-growth.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(11,18,32,0.92),rgba(22,58,107,0.72),rgba(18,20,24,0.5))]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-black/25" />
        </motion.div>

        <div className="relative mx-auto grid min-h-[86svh] max-w-7xl items-center gap-10 px-5 pb-16 pt-40 md:px-8 md:pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div variants={heroStagger} initial="hidden" animate="show">
            <motion.p
              variants={heroItem}
              className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-orange"
            >
              Founder
            </motion.p>
            <motion.h1
              variants={heroItem}
              className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-white md:text-6xl"
            >
              Mohamad Masri
            </motion.h1>
            <motion.p
              variants={heroItem}
              className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg"
            >
              Strategy, partnerships &amp; regional growth leadership.
            </motion.p>
            <motion.p
              variants={heroItem}
              className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base"
            >
              Founder of BizGate Marketing &amp; Consultancies — a Dubai-based agency helping
              hospitality and tourism brands turn regional opportunity into consistent,
              measurable commercial results.
            </motion.p>

            <motion.div variants={heroItem} className="mt-8 flex flex-wrap gap-3">
              <Link href="/#contact" className="btn-primary on-dark">
                Talk to Mohamad
              </Link>
              <Link href="/case-studies" className="btn-secondary">
                View our work
              </Link>
            </motion.div>

            <motion.div
              variants={heroItem}
              className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3"
            >
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur"
                >
                  <p className="font-display text-2xl font-semibold text-white">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-white/70">
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-[380px] lg:mx-0 lg:justify-self-end"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.8, ease }}
          >
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/20 shadow-[0_28px_70px_rgba(8,20,40,0.45)]">
              <div className="relative h-[420px] sm:h-[480px]">
                <Image
                  src="/founder.jpg"
                  alt="Mohamad Masri, Founder of BizGate"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 80vw, 380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                  BizGate Founder
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold">
                  Mohamad Masri
                </h2>
              </div>
            </div>

            <motion.div
              className="absolute -left-4 top-8 rounded-xl border border-white/70 bg-white px-4 py-3 shadow-lg"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-muted">
                Based in
              </p>
              <p className="font-display text-lg font-semibold text-brand-blue">Dubai</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-brand-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">
              About the founder
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl">
              A hands-on partner for hospitality growth in the Gulf.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-brand-muted">
              Mohamad Masri founded BizGate to give hotels, resorts, and tourism brands a
              dependable commercial partner in the Middle East — one that understands both
              international brand standards and the way business is really done across the
              region.
            </p>
            <p className="mt-4 text-base leading-relaxed text-brand-muted">
              His work sits where strategy meets execution: mapping the right buyers,
              opening the right doors, aligning marketing with sales, and staying
              accountable to the numbers that matter to owners and operators.
            </p>
            <p className="mt-4 text-base leading-relaxed text-brand-muted">
              Under his leadership, BizGate has grown into a boutique consultancy trusted
              for sales representation, brand management, advisory, and digital
              transformation across the GCC.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="border border-brand-line bg-brand-fog p-7 md:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal">
              Areas of focus
            </p>
            <ul className="mt-6 space-y-3">
              {focusAreas.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-brand-ink/90 md:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="mesh-bg border-y border-brand-line">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
              Leadership
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl">
              Strategy, partnerships &amp; regional growth.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {expertise.map((item, index) => (
              <Reveal
                key={item.title}
                delay={0.06 * index}
                className="border border-brand-line bg-white p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
                  0{index + 1}
                </p>
                <h3 className="mt-3 font-display text-2xl text-brand-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">{item.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-white">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">
              The journey
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl">
              From industry experience to a regional consultancy.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {timeline.map((item, index) => (
              <Reveal
                key={item.year}
                delay={0.06 * index}
                className="relative overflow-hidden rounded-2xl border border-brand-line bg-brand-fog/70 p-6"
              >
                <span className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-sky/15 blur-2xl" />
                <p className="relative font-display text-3xl font-semibold text-brand-blue">
                  {item.year}
                </p>
                <h3 className="relative mt-4 font-display text-xl font-semibold text-brand-ink">
                  {item.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-brand-muted">
                  {item.copy}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal direction="left" className="relative mx-auto w-full max-w-[340px] lg:mx-0">
            <div className="relative h-[380px] overflow-hidden rounded-[1.5rem] border border-white/15 sm:h-[420px]">
              <Image
                src="/team-masri.jpg"
                alt="Mohamad Masri at work"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 80vw, 340px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent" />
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.08}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
              In his words
            </p>
            <blockquote className="mt-6 font-display text-2xl font-semibold leading-snug tracking-[-0.02em] md:text-4xl">
              “Growth in this region is built on trust. When the strategy is clear and the
              relationships are real, the commercial results follow.”
            </blockquote>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-white/60">
              Mohamad Masri — Founder, BizGate
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#contact" className="btn-primary on-dark">
                Book a conversation
              </Link>
              <Link href="/#about" className="btn-secondary">
                About BizGate
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
