"use client";

import Image from "next/image";
import { Link } from "../../../i18n/routing";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CTA from "../../../components/CTA";
import { API_URL, caseStudyHref, clientLabel, demoCaseStudies, mediaUrl } from "../../../lib/caseStudies";
import { useTranslations, useLocale } from "next-intl";

const pageFade = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const heroStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CaseStudiesIndexPage() {
  const [cases, setCases] = useState(demoCaseStudies);
  const t = useTranslations("CaseStudiesIndex");
  const locale = useLocale();

  const stats = [
    {
      step: "01",
      label: t("step1Label"),
      copy: t("step1Copy"),
      accent: "text-brand-sky",
      glow: "from-brand-sky/20",
    },
    {
      step: "02",
      label: t("step2Label"),
      copy: t("step2Copy"),
      accent: "text-brand-teal",
      glow: "from-brand-teal/20",
    },
    {
      step: "03",
      label: t("step3Label"),
      copy: t("step3Copy"),
      accent: "text-brand-orange",
      glow: "from-brand-orange/20",
    },
  ];

  useEffect(() => {
    let alive = true;
    fetch(`${API_URL}/api/case-studies`)
      .then((res) => res.json())
      .then((data) => {
        if (!alive) return;
        if (Array.isArray(data.caseStudies) && data.caseStudies.length) {
          setCases(data.caseStudies);
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return (
    <motion.main
      className="overflow-x-hidden"
      variants={pageFade}
      initial="hidden"
      animate="show"
    >
      <Header />

      <section className="relative min-h-[78svh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/hero-growth.jpg"
            alt="BizGate case studies"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.88),rgba(22,58,107,0.62),rgba(18,20,24,0.45))]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-black/25" />
        </motion.div>

        <motion.div
          className="relative mx-auto flex min-h-[78svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-44 md:px-8 md:pb-20"
          variants={heroStagger}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={heroItem}
            className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-orange"
          >
            {t("heroEyebrow")}
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-[-0.03em] text-white md:text-6xl"
          >
            {t("heroHeadline")}
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg"
          >
            {t("heroIntro")}
          </motion.p>
          <motion.div variants={heroItem} className="mt-8 flex flex-wrap gap-3">
            <a href="#cases" className="btn-primary on-dark">
              {t("exploreCases")}
            </a>
            <Link href="/#contact" className="btn-secondary">
              {t("startProject")}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative z-10 -mt-10 px-5 md:-mt-14 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.35 + index * 0.12,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`relative overflow-hidden rounded-2xl border border-white/50 bg-white/90 p-6 shadow-[0_20px_50px_rgba(22,58,107,0.14)] backdrop-blur-xl`}
            >
              <div
                className={`pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${item.glow} to-transparent blur-2xl`}
              />
              <div className="relative flex items-start justify-between gap-4">
                <p className={`font-display text-3xl font-semibold ${item.accent}`}>
                  {item.step}
                </p>
                <span className="rounded-full bg-brand-fog px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-muted">
                  {t("framework")}
                </span>
              </div>
              <h3 className="relative mt-5 font-display text-xl font-semibold text-brand-ink">
                {item.label}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-brand-muted">
                {item.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="cases" className="bg-brand-white">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
              {t("featuredEyebrow")}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-5xl">
              {t("featuredHeadline")}
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {cases.map((item, index) => (
              <motion.div
                key={item._id || item.slug}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link href={caseStudyHref(item)} className="group block">
                  <motion.article
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.28 }}
                    className="relative h-[440px] overflow-hidden rounded-2xl border border-brand-line/70 shadow-[0_22px_55px_rgba(22,58,107,0.16)]"
                  >
                    <Image
                      src={mediaUrl(item.coverImage) || "/hero-hotel.jpg"}
                      alt={locale === "ar" ? item.title_ar || item.title : item.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* Soft top shade — compact so category stays readable */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.28)_45%,rgba(0,0,0,0)_100%)]" />
                    {/* Soft bottom shade — long fade so the edge disappears */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(0deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.62)_28%,rgba(0,0,0,0.32)_55%,rgba(0,0,0,0.12)_75%,rgba(0,0,0,0)_100%)]" />

                    <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-5">
                      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                        {item.category || (locale === "ar" ? "حالة بيزجيت" : "BizGate Case")}
                      </span>
                      <span className="rounded-full border border-brand-orange/40 bg-brand-orange/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-orange backdrop-blur-md">
                        {clientLabel(item)}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white md:p-6">
                      <h3 className="font-display text-2xl font-semibold leading-snug">
                        {locale === "ar" ? item.title_ar || item.title : item.title}
                      </h3>
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/80">
                        {locale === "ar" ? item.challenge_ar || item.challenge : item.challenge}
                      </p>
                      <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4 text-sm font-semibold">
                        <span className="text-white/90">{t("openCase")}</span>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition group-hover:-translate-x-1 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1 group-hover:bg-brand-blue">
                          →
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </motion.main>
  );
}
