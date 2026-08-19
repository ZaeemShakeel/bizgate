"use client";

import Image from "next/image";
import { Link } from "../../../../i18n/routing";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import CTA from "../../../../components/CTA";
import Reveal from "../../../../components/Reveal";
import {
  API_URL,
  demoInsights,
} from "../../../../lib/insights";
import { mediaUrl } from "../../../../lib/caseStudies";

import { useLocale, useTranslations } from "next-intl";

const ease = [0.22, 1, 0.36, 1];

const pageFade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease } },
};

const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function InsightDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const locale = useLocale();
  const t = useTranslations("Insights");
  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let alive = true;

    async function load() {
      setLoading(true);
      try {
        const [detailRes, listRes] = await Promise.all([
          fetch(`${API_URL}/api/insights/${slug}`),
          fetch(`${API_URL}/api/insights`),
        ]);

        let detail = null;
        if (detailRes.ok) {
          const data = await detailRes.json();
          detail = data.insight || null;
        }
        if (!detail) {
          detail = demoInsights.find((i) => i.slug === slug) || null;
        }

        let list = demoInsights;
        if (listRes.ok) {
          const data = await listRes.json();
          if (Array.isArray(data.insights) && data.insights.length) {
            list = data.insights;
          }
        }

        if (!alive) return;
        setItem(detail);
        setRelated(list.filter((i) => i.slug !== slug).slice(0, 2));
      } catch {
        if (!alive) return;
        const detail = demoInsights.find((i) => i.slug === slug) || null;
        setItem(detail);
        setRelated(demoInsights.filter((i) => i.slug !== slug).slice(0, 2));
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [slug]);

  const isAr = locale === "ar";

  if (loading) {
    return (
      <main className="min-h-screen bg-brand-fog" dir={isAr ? "rtl" : "ltr"}>
        <Header />
        <div className="flex min-h-[70vh] items-center justify-center pt-28 text-brand-muted">
          {isAr ? "تحميل المقال..." : "Loading insight…"}
        </div>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="min-h-screen bg-brand-fog" dir={isAr ? "rtl" : "ltr"}>
        <Header />
        <div className="mx-auto max-w-3xl px-5 pb-24 pt-40 text-center md:px-8">
          <h1 className="font-display text-4xl font-semibold text-brand-ink">
            {isAr ? "المقال غير موجود" : "Insight not found"}
          </h1>
          <p className="mt-4 text-brand-muted">
            {isAr ? "قد يكون هذا المقال غير متاح أو أن الرابط غير صحيح." : "This article may be unavailable or the link is incorrect."}
          </p>
          <Link href="/insights" className="btn-primary mt-8 inline-flex">
            {t("backToInsights")}
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const title = isAr && item.title_ar ? item.title_ar : item.title;
  const content = isAr && item.content_ar ? item.content_ar : item.content;
  const cover = mediaUrl(item.coverImage) || "/service-digital.jpg";
  
  const paragraphs = content ? content.split("\n\n") : [];
  const firstParagraph = paragraphs[0] || "";
  const remainingParagraphs = paragraphs.slice(1);

  return (
    <motion.main
      className="overflow-x-hidden"
      variants={pageFade}
      initial="hidden"
      animate="show"
      dir={isAr ? "rtl" : "ltr"}
      key={slug}
    >
      <Header />

      {/* Hero */}
      <section className="relative min-h-[88svh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.35, ease }}
        >
          <Image
            src={cover}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(18,20,24,0.84)_0%,rgba(22,58,107,0.55)_48%,rgba(18,20,24,0.35)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1724] via-transparent to-black/20" />
        </motion.div>

        <motion.div
          className="relative mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-44 md:px-8 md:pb-20"
          variants={heroStagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={heroItem}>
            <Link
              href="/insights"
              className="mb-8 inline-flex w-fit text-sm font-semibold text-white/75 transition hover:text-white"
            >
              {t("backToInsights")}
            </Link>
          </motion.div>
          <motion.div
            variants={heroItem}
            className="inline-flex w-fit rounded-full bg-white/12 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur"
          >
            {item.category || "Insight"}
          </motion.div>
          <motion.h1
            variants={heroItem}
            className="mt-6 max-w-4xl font-display text-4xl font-semibold tracking-[-0.03em] text-white md:text-6xl"
          >
            {title}
          </motion.h1>
          <motion.div variants={heroItem} className="mt-8 flex flex-wrap gap-3">
            <a href="#content" className="btn-primary on-dark">
              {isAr ? "اقرأ المقال بالكامل" : "Read Full Article"}
            </a>
            <Link href="/#contact" className="btn-secondary">
              {isAr ? "تحدث إلى بيزجيت" : "Talk to BizGate"}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Intro paragraph with sidebar info */}
      <section id="content" className="bg-brand-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">
              {isAr ? "مقدمة" : "Introduction"}
            </p>
            <p className="mt-6 text-base leading-relaxed text-brand-muted md:text-lg whitespace-pre-line">
              {firstParagraph}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="border border-brand-line bg-brand-fog p-7 md:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal">
              {isAr ? "تفاصيل المقال" : "Article snapshot"}
            </p>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                  {isAr ? "الناشر" : "Publisher"}
                </p>
                <p className="mt-2 font-display text-2xl text-brand-ink">
                  {isAr ? "بيزجيت للاستشارات" : "BizGate Marketing"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                  {isAr ? "الفئة" : "Category"}
                </p>
                <p className="mt-2 text-brand-ink/85">{item.category || "Insights"}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Remaining paragraphs with alternating backgrounds */}
      {remainingParagraphs.map((para, index) => {
        const isAccent = index % 2 === 1;
        return (
          <section
            key={index}
            className={
              isAccent
                ? "bg-brand-navy text-white"
                : "mesh-bg border-y border-brand-line"
            }
          >
            <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
              <Reveal>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
                  {isAr ? `الجزء 0${index + 2}` : `Section 0${index + 2}`}
                </p>
                <p
                  className={`mt-6 max-w-4xl text-base leading-relaxed md:text-lg whitespace-pre-line ${
                    isAccent ? "text-white/75" : "text-brand-muted"
                  }`}
                >
                  {para}
                </p>
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* More insights */}
      {related.length ? (
        <section className="border-t border-brand-line bg-brand-fog">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
            <h2 className="font-display text-3xl font-semibold text-brand-ink">
              {t("moreInsights")}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((insightItem, index) => {
                const rTitle = isAr && insightItem.title_ar ? insightItem.title_ar : insightItem.title;
                const rCover = mediaUrl(insightItem.coverImage) || "/service-digital.jpg";

                return (
                  <Reveal key={insightItem.slug} delay={index * 0.08}>
                    <Link
                      href={`/insights/${insightItem.slug}`}
                      className="group relative block h-56 overflow-hidden rounded-2xl border border-brand-line"
                    >
                      <Image
                        src={rCover}
                        alt={rTitle}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="50vw"
                      />
                      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="text-xs uppercase tracking-[0.16em] text-brand-orange">
                          {insightItem.category || "Insight"}
                        </p>
                        <p className="mt-1 font-display text-xl font-semibold">
                          {rTitle}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <CTA />
      <Footer />
    </motion.main>
  );
}
