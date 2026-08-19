"use client";

import Image from "next/image";
import { Link } from "../../../i18n/routing";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CTA from "../../../components/CTA";
import { API_URL, demoInsights } from "../../../lib/insights";
import { mediaUrl } from "../../../lib/caseStudies";
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

export default function InsightsPage() {
  const [insights, setInsights] = useState(demoInsights);
  const t = useTranslations("Insights");
  const locale = useLocale();

  useEffect(() => {
    let alive = true;
    fetch(`${API_URL}/api/insights`)
      .then((res) => res.json())
      .then((data) => {
        if (!alive) return;
        if (Array.isArray(data.insights) && data.insights.length) {
          setInsights(data.insights);
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const isAr = locale === "ar";

  const topics = [
    { name: isAr ? "السمعة الرقمية" : "Digital Reputation" },
    { name: isAr ? "تجربة الضيف وأداء الفنادق" : "Guest Experience & Hotel Performance" },
    { name: isAr ? "ذكاء الوجهة السياحية" : "Destination Intelligence" },
    { name: isAr ? "تكنولوجيا الضيافة والذكاء الاصطناعي" : "Hospitality Technology & AI" },
    { name: isAr ? "جودة الخدمة وتدقيق الضيف الخفي" : "Service Quality & Mystery Guest Audits" },
    { name: isAr ? "نمو سوق الخليج العربي" : "GCC Market Growth" },
  ];

  return (
    <motion.main
      className="overflow-x-hidden"
      variants={pageFade}
      initial="hidden"
      animate="show"
      dir={isAr ? "rtl" : "ltr"}
    >
      <Header />

      {/* Hero */}
      <section className="relative min-h-[78svh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/service-digital.jpg"
            alt="BizGate insights"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.9),rgba(22,58,107,0.72),rgba(18,20,24,0.55))]" />
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
            <a href="#articles" className="btn-primary on-dark">
              {isAr ? "استكشف المقالات" : "Explore articles"}
            </a>
            <Link href="/#contact" className="btn-secondary">
              {isAr ? "تواصل معنا" : "Contact us"}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Topics scroller section */}
      <section className="relative z-10 -mt-10 px-5 md:-mt-14 md:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-white/50 bg-white/90 p-5 shadow-[0_20px_50px_rgba(22,58,107,0.14)] backdrop-blur-xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
            {isAr ? "استكشف المواضيع والاتجاهات الرئيسية" : "Explore Key Topics & Trends"}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {topics.map((topic) => (
              <span
                key={topic.name}
                className="rounded-full bg-brand-fog px-4.5 py-2 text-xs font-semibold text-brand-ink transition hover:bg-brand-mist hover:text-brand-blue"
              >
                {topic.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section id="articles" className="bg-brand-white">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-5xl">
              {t("headline")}
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {insights.length === 0 ? (
              <p className="col-span-full py-12 text-center text-brand-muted">{t("noInsights")}</p>
            ) : (
              insights.map((item, index) => {
                const title = isAr && item.title_ar ? item.title_ar : item.title;
                const summary = isAr && item.summary_ar ? item.summary_ar : item.summary;
                const cover = mediaUrl(item.coverImage) || "/service-digital.jpg";

                return (
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
                    <Link href={`/insights/${item.slug}`} className="group block">
                      <motion.article
                        whileHover={{ y: -8 }}
                        transition={{ duration: 0.28 }}
                        className="relative h-[440px] overflow-hidden rounded-2xl border border-brand-line/70 shadow-[0_22px_55px_rgba(22,58,107,0.16)]"
                      >
                        <Image
                          src={cover}
                          alt={title}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-[1.06]"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />

                        {/* Top shade */}
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.28)_45%,rgba(0,0,0,0)_100%)]" />
                        {/* Soft bottom shade — long gradual navy gradient for maximum text readability */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-[linear-gradient(0deg,rgba(10,17,30,0.98)_0%,rgba(10,17,30,0.9)_35%,rgba(10,17,30,0.52)_65%,rgba(10,17,30,0.18)_85%,rgba(10,17,30,0)_100%)]" />

                        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-5">
                          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                            {item.category || "Insight"}
                          </span>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-4 pt-5 text-white md:px-6 md:pb-5">
                          <h3 className="font-display text-xl font-semibold leading-snug md:text-2xl">
                            {title}
                          </h3>
                          {summary && (
                            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/80 md:text-sm">
                              {summary}
                            </p>
                          )}
                          <div className="mt-3.5 flex items-center justify-between border-t border-white/15 pt-3 text-xs font-semibold md:text-sm">
                            <span className="text-white/90">{t("readMore")}</span>
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition group-hover:-translate-x-1 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1 group-hover:bg-brand-blue md:h-9 md:w-9">
                              →
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </motion.main>
  );
}
