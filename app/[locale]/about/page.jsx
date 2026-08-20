"use client";

import Image from "next/image";
import { Link } from "../../../i18n/routing";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CTA from "../../../components/CTA";
import Reveal from "../../../components/Reveal";
import { useTranslations, useLocale } from "next-intl";

const ease = [0.22, 1, 0.36, 1];

const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const diffIcons = [
  // Hospitality specialization
  (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  // Regional understanding
  (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  // Senior involvement
  (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  // Cultural capability
  (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>
  ),
  // Independent advice
  (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
];

const principleIcons = [
  (
    <svg className="h-6 w-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  (
    <svg className="h-6 w-6 text-brand-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  (
    <svg className="h-6 w-6 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  (
    <svg className="h-6 w-6 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
];

export default function AboutPage() {
  const t = useTranslations("About");
  const tHeader = useTranslations("Header");
  const locale = useLocale();
  const isAr = locale === "ar";

  const [openDiffIndex, setOpenDiffIndex] = useState(0);

  const stats = [
    { num: t("stat1Num"), label: t("stat1Label") },
    { num: t("stat2Num"), label: t("stat2Label") },
    { num: t("stat3Num"), label: t("stat3Label") },
    { num: t("stat4Num"), label: t("stat4Label") },
  ];

  const differentiators = [
    {
      num: "01",
      title: t("diff1Title"),
      copy: t("diff1Copy"),
      icon: diffIcons[0],
    },
    {
      num: "02",
      title: t("diff2Title"),
      copy: t("diff2Copy"),
      icon: diffIcons[1],
    },
    {
      num: "03",
      title: t("diff3Title"),
      copy: t("diff3Copy"),
      icon: diffIcons[2],
    },
    {
      num: "04",
      title: t("diff4Title"),
      copy: t("diff4Copy"),
      icon: diffIcons[3],
    },
    {
      num: "05",
      title: t("diff5Title"),
      copy: t("diff5Copy"),
      icon: diffIcons[4],
    },
  ];

  const process = [
    { num: "01", step: t("process1Step"), copy: t("process1Copy"), color: "border-brand-sky text-brand-sky bg-brand-sky/10" },
    { num: "02", step: t("process2Step"), copy: t("process2Copy"), color: "border-brand-teal text-brand-teal bg-brand-teal/10" },
    { num: "03", step: t("process3Step"), copy: t("process3Copy"), color: "border-brand-orange text-brand-orange bg-brand-orange/10" },
    { num: "04", step: t("process4Step"), copy: t("process4Copy"), color: "border-brand-blue text-brand-blue bg-brand-blue/10" },
  ];

  const principles = t.raw("principles");

  function toggleDiff(idx) {
    setOpenDiffIndex((prev) => (prev === idx ? -1 : idx));
  }

  return (
    <main className="overflow-x-hidden bg-white">
      <Header />

      {/* ── Hero Section ── */}
      <section className="relative min-h-[75svh] overflow-hidden bg-brand-navy text-white">
        <div className="absolute inset-0">
          <Image
            src="/hero-growth.jpg"
            alt="BizGate About Us Hero"
            fill
            priority
            className="object-cover opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(11,18,32,0.95)_0%,rgba(22,58,107,0.85)_55%,rgba(15,118,110,0.75)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_40%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[75svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-36 md:px-8 md:pb-20 lg:justify-center">
          <motion.div
            variants={heroStagger}
            initial="hidden"
            animate="show"
            className="max-w-4xl"
          >
            <motion.div variants={heroItem} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-brand-orange shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                {t("aboutHeroEyebrow")}
              </span>
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12]"
            >
              {t("aboutHeroTitle")}
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg"
            >
              {t("aboutHeroSubtitle")}
            </motion.p>

            {/* Quick Stats Grid */}
            <motion.div
              variants={heroItem}
              className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 pt-6 border-t border-white/15"
            >
              {stats.map((item) => (
                <div key={item.label} className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <p className="font-display text-2xl font-bold text-brand-orange md:text-3xl">
                    {item.num}
                  </p>
                  <p className="mt-1 text-xs text-white/75 md:text-sm font-medium">
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── The BizGate Story & Leadership ── */}
      <section className="relative py-20 md:py-28 bg-white border-b border-brand-line/60">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <Reveal direction={isAr ? "right" : "left"} className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">
                {t("eyebrow")}
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl lg:text-5xl leading-tight">
                {t("title")}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-brand-muted md:text-lg">
                {t("copy1")}
              </p>
              <p className="mt-4 text-base leading-relaxed text-brand-muted md:text-lg">
                {t("copy2")}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/founder" className="btn-primary h-12 px-6 shadow-md hover:shadow-lg transition">
                  {t("founderBtn")}
                </Link>
                <Link href="/#contact" className="btn-ghost h-12 px-6">
                  {tHeader("primaryCta")}
                </Link>
              </div>
            </Reveal>

            <Reveal direction={isAr ? "left" : "right"} delay={0.08} className="relative mx-auto w-full max-w-[360px] lg:mx-0 lg:justify-self-end">
              <motion.div
                className="relative overflow-hidden rounded-3xl border border-brand-line bg-brand-fog shadow-[0_24px_60px_rgba(26,35,50,0.14)]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative h-[380px] sm:h-[420px]">
                  <Image
                    src="/founder.jpg"
                    alt="Mohamad Ibrahim Masri, Founder of BizGate"
                    fill
                    className="object-cover object-top"
                    sizes="360px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-orange">
                    {t("founderRole")}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-white">
                    {t("founderName")}
                  </h3>
                </div>
              </motion.div>

              <motion.div
                className={`absolute top-6 rounded-2xl border border-white/90 bg-white/95 backdrop-blur-md px-4 py-3 shadow-lg ${
                  isAr ? "-right-4" : "-left-4"
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-muted">
                  {t("since")}
                </p>
                <p className="font-display text-xl font-bold text-brand-blue">2008</p>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── What Makes BizGate Different (Interactive Accordion) ── */}
      <section className="py-20 md:py-28 bg-brand-fog/40 border-b border-brand-line/60">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl">
              {t("diffEyebrow")}
            </h2>
          </Reveal>

          <div className="mt-10 space-y-3.5">
            {differentiators.map((item, idx) => {
              const isOpen = openDiffIndex === idx;
              return (
                <motion.div
                  key={item.num}
                  initial={false}
                  animate={{
                    backgroundColor: isOpen ? "rgba(42, 92, 170, 0.04)" : "#ffffff",
                    borderColor: isOpen ? "rgba(42, 92, 170, 0.35)" : "rgba(226, 232, 240, 0.8)",
                  }}
                  className="overflow-hidden rounded-2xl border shadow-sm transition-colors duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleDiff(idx)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-start transition md:p-6 focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4 md:gap-5 min-w-0">
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                          isOpen
                            ? "bg-brand-blue text-white shadow-md"
                            : "bg-brand-fog text-brand-blue border border-brand-line/50"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-brand-muted/70">
                          {item.num}
                        </span>
                        <span className="font-display text-base font-semibold text-brand-ink md:text-lg">
                          {item.title}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180 border-brand-blue bg-brand-blue text-white"
                          : "border-brand-line bg-white text-brand-muted hover:border-brand-blue/50"
                      }`}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: "auto" },
                          collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="border-t border-brand-line/40 px-5 pb-6 pt-4 md:px-6">
                          <p className="text-sm leading-relaxed text-brand-muted md:text-base max-w-4xl">
                            {item.copy}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How We Work (Stepped Methodology) & Our Principles ── */}
      <section className="py-20 md:py-28 bg-white border-b border-brand-line/60">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] items-start">
            {/* How We Work */}
            <Reveal direction={isAr ? "right" : "left"} className="rounded-3xl border border-brand-line/70 bg-brand-fog/50 p-6 md:p-10 relative overflow-hidden">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-sky/5 blur-3xl" />

              <div className="flex items-center gap-3">
                <span className="flex h-2.5 w-2.5 rounded-full bg-brand-sky animate-pulse" />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-sky">
                  {t("processEyebrow")}
                </p>
              </div>
              <h3 className="mt-2 font-display text-2xl font-semibold text-brand-ink md:text-3xl">
                {t("processEyebrow")}
              </h3>

              {/* Stepped Timeline */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {process.map((item) => (
                  <div
                    key={item.num}
                    className="group relative flex flex-col justify-between rounded-2xl border border-brand-line/80 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-brand-blue/40"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className={`inline-flex items-center justify-center rounded-lg border px-2.5 py-1 font-mono text-xs font-bold ${item.color}`}>
                          {item.num}
                        </span>
                      </div>
                      <h4 className="mt-3 font-display text-lg font-semibold text-brand-ink group-hover:text-brand-blue transition-colors">
                        {item.step}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-brand-muted md:text-sm">
                        {item.copy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Process Footer Note */}
              <div className="mt-6 rounded-2xl border border-brand-sky/20 bg-brand-sky/5 p-4 md:p-5 flex items-start gap-3.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-sky text-white shadow-sm">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <p className="text-xs leading-relaxed text-brand-ink/85 md:text-sm">
                  {t("processFooter")}
                </p>
              </div>
            </Reveal>

            {/* Our Principles */}
            <Reveal direction={isAr ? "left" : "right"} delay={0.08} className="rounded-3xl border border-brand-line/70 bg-brand-fog/50 p-6 md:p-10 relative overflow-hidden h-full flex flex-col justify-between">
              <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-brand-orange/5 blur-3xl" />

              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-brand-orange animate-pulse" />
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">
                    {t("principlesEyebrow")}
                  </p>
                </div>
                <h3 className="mt-2 font-display text-2xl font-semibold text-brand-ink md:text-3xl">
                  {t("principlesEyebrow")}
                </h3>

                <div className="mt-8 grid gap-3.5">
                  {Array.isArray(principles) &&
                    principles.map((item, idx) => (
                      <div
                        key={item}
                        className="flex items-center gap-4 rounded-2xl border border-brand-line/80 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-brand-orange/40"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-fog">
                          {principleIcons[idx % principleIcons.length]}
                        </div>
                        <div>
                          <p className="font-display text-base font-semibold text-brand-ink">
                            {item}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-brand-line/60">
                <Link
                  href="/#contact"
                  className="btn-primary w-full text-center flex items-center justify-center gap-2 h-11"
                >
                  {tHeader("primaryCta")}
                  <span className={isAr ? "rotate-180" : ""}>→</span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* ── Regional Partner CTA Banner ── */}
          <Reveal delay={0.1} direction="scale" className="mt-14 overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0e1726_0%,#162a4d_50%,#0f766e_100%)] p-6 md:p-10 text-white shadow-xl relative">
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-sky/15 blur-3xl" />
            <div className="relative w-full">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-sky">
                {t("regionalEyebrow")}
              </span>
              <p className="mt-3 font-display text-lg md:text-xl lg:text-2xl font-semibold leading-relaxed text-white/95">
                {t("regionalTitle")}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3.5">
                <Link href="/#contact" className="btn-primary on-dark inline-flex h-11 items-center gap-2 px-6 shadow-md hover:shadow-lg transition">
                  {tHeader("primaryCta")}
                  <span className={isAr ? "rotate-180" : ""}>→</span>
                </Link>
                <Link href="/services" className="btn-secondary h-11 inline-flex items-center px-6 text-sm">
                  {tHeader("services")}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Contact / CTA ── */}
      <CTA />

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}
