"use client";

import Image from "next/image";
import { Link } from "../../../../i18n/routing";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import CTA from "../../../../components/CTA";
import Reveal from "../../../../components/Reveal";
import { useTranslations, useLocale } from "next-intl";
import { mediaUrl } from "../../../../lib/caseStudies";

const API_URL =
  typeof window !== "undefined"
    ? ""
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const ease = [0.22, 1, 0.36, 1];

const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const locale = useLocale();
  const isAr = locale === "ar";
  const t = useTranslations("ServicesPage");

  const [service, setService] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let alive = true;

    async function load() {
      setLoading(true);
      try {
        const [detailRes, allRes] = await Promise.all([
          fetch(`${API_URL}/api/services/${slug}`),
          fetch(`${API_URL}/api/services`),
        ]);

        if (!detailRes.ok) {
          if (alive) setNotFound(true);
          return;
        }

        const detailData = await detailRes.json();
        const svc = detailData.service;
        if (!alive) return;
        setService(svc);

        if (allRes.ok) {
          const allData = await allRes.json();
          const others = (allData.services || []).filter(
            (s) =>
              s.slug !== svc.slug &&
              (s.categorySlug === svc.categorySlug || !svc.categorySlug)
          );
          setRelated(others.slice(0, 3));
        }
      } catch {
        if (alive) setNotFound(true);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => { alive = false; };
  }, [slug]);

  // SEO meta — must be before any early returns (Rules of Hooks)
  const seoTitle = isAr && service?.metaTitle_ar
    ? service.metaTitle_ar
    : service?.metaTitle || (isAr && service?.title_ar ? service.title_ar : service?.title);
  const seoDesc = isAr && service?.metaDescription_ar
    ? service.metaDescription_ar
    : service?.metaDescription || (isAr && service?.summary_ar ? service.summary_ar : service?.summary);
  const seoKw = isAr && service?.metaKeywords_ar ? service.metaKeywords_ar : service?.metaKeywords;

  useEffect(() => {
    if (!service) return;
    document.title = seoTitle ? `${seoTitle} | BizGate` : "BizGate";

    let descEl = document.querySelector('meta[name="description"]');
    if (!descEl) {
      descEl = document.createElement("meta");
      descEl.name = "description";
      document.head.appendChild(descEl);
    }
    descEl.content = seoDesc || "";

    if (seoKw) {
      let kwEl = document.querySelector('meta[name="keywords"]');
      if (!kwEl) {
        kwEl = document.createElement("meta");
        kwEl.name = "keywords";
        document.head.appendChild(kwEl);
      }
      kwEl.content = seoKw;
    }
  }, [service, seoTitle, seoDesc, seoKw]);

  // ── Loading state ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="overflow-x-hidden">
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-blue border-t-transparent" />
        </div>
        <Footer />
      </main>
    );
  }

  // ── Not found state ──────────────────────────────────────────────────────
  if (notFound || !service) {
    return (
      <main className="overflow-x-hidden">
        <Header />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5 text-center">
          <p className="font-display text-2xl font-semibold text-brand-ink">
            {t("notFound")}
          </p>
          <Link href={`/${locale}/services`} className="btn-primary">
            {t("backToServices")}
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const title = isAr && service.title_ar ? service.title_ar : service.title;
  const eyebrow = isAr && service.eyebrow_ar ? service.eyebrow_ar : service.eyebrow;
  const summary = isAr && service.summary_ar ? service.summary_ar : service.summary;
  const content = isAr && service.content_ar ? service.content_ar : service.content;
  const points = isAr && service.points_ar?.length ? service.points_ar : (service.points || []);
  const cta = isAr && service.cta_ar ? service.cta_ar : (service.cta || t("detailCta"));

  // SEO meta already applied above (before early returns)

  return (
    <main className="overflow-x-hidden">
      <Header />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[56vh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease }}
        >
          {service.coverImage ? (
            <Image
              src={mediaUrl(service.coverImage)}
              alt={title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-brand-navy" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(11,18,32,0.92),rgba(22,58,107,0.7),rgba(18,20,24,0.45))]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-black/20" />
        </motion.div>

        <div className="relative mx-auto flex min-h-[56vh] max-w-7xl flex-col justify-end px-5 pb-14 pt-40 md:px-8 md:pb-20">
          <motion.div variants={heroStagger} initial="hidden" animate="show">
            {eyebrow && (
              <motion.p
                variants={heroItem}
                className="text-sm font-bold uppercase tracking-[0.2em] text-brand-orange"
              >
                {eyebrow}
              </motion.p>
            )}
            <motion.h1
              variants={heroItem}
              className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl"
            >
              {title}
            </motion.h1>
            {summary && (
              <motion.p
                variants={heroItem}
                className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg"
              >
                {summary}
              </motion.p>
            )}
            <motion.div variants={heroItem} className="mt-8 flex flex-wrap gap-3">
              <Link href="/#contact" className="btn-primary on-dark">
                {t("ctaLabel")} →
              </Link>
              <Link
                href="/services"
                className="btn-secondary"
              >
                {t("backToServices")}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Content Body ────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">

            {/* Main content */}
            <div>
              {content && (
                <Reveal>
                  <div className="prose prose-lg max-w-none text-brand-ink/90">
                    {content.split("\n\n").map((para, i) => (
                      <p key={i} className="mb-5 leading-relaxed text-brand-muted md:text-base">
                        {para}
                      </p>
                    ))}
                  </div>
                </Reveal>
              )}

              {/* Key Points */}
              {points.length > 0 && (
                <Reveal delay={0.1}>
                  <div className="mt-10">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-sky">
                      {t("keyPoints")}
                    </p>
                    <ul className="space-y-3">
                      {points.map((pt, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue/10">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
                          </span>
                          <span className="text-sm leading-relaxed text-brand-ink/85 md:text-base">
                            {pt}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}

              {/* CTA */}
              <Reveal delay={0.15}>
                <div className="mt-12">
                  <Link href="/#contact" className="btn-primary">
                    {cta}
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Related Services Sidebar */}
            {related.length > 0 && (
              <aside>
                <Reveal direction={isAr ? "left" : "right"} delay={0.08}>
                  <div className="sticky top-24 rounded-2xl border border-brand-line bg-brand-fog p-6">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-brand-sky">
                      {t("relatedTitle")}
                    </p>
                    <ul className="space-y-4">
                      {related.map((rel) => (
                        <li key={rel._id || rel.slug}>
                          <Link
                            href={`/services/${rel.slug}`}
                            className="group flex gap-3"
                          >
                            {rel.coverImage && (
                              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                                <Image
                                  src={mediaUrl(rel.coverImage)}
                                  alt=""
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                  sizes="56px"
                                />
                              </div>
                            )}
                            <div>
                              {rel.eyebrow && (
                                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-orange">
                                  {isAr && rel.eyebrow_ar ? rel.eyebrow_ar : rel.eyebrow}
                                </p>
                              )}
                              <p className="mt-0.5 text-sm font-semibold leading-snug text-brand-ink group-hover:text-brand-blue transition">
                                {isAr && rel.title_ar ? rel.title_ar : rel.title}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/services"
                      className="mt-5 block text-center text-sm font-semibold text-brand-blue hover:text-brand-navy transition"
                    >
                      {t("backToServices")}
                    </Link>
                  </div>
                </Reveal>
              </aside>
            )}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
