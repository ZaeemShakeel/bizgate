"use client";

import Image from "next/image";
import { Link } from "../../../../../i18n/routing";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../../../../../components/Header";
import Footer from "../../../../../components/Footer";
import CTA from "../../../../../components/CTA";
import Reveal from "../../../../../components/Reveal";
import {
  API_URL,
  caseStudyHref,
  clientLabel,
  demoCaseStudies,
  getCaseSections,
  mediaUrl,
} from "../../../../../lib/caseStudies";

import { useLocale } from "next-intl";

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

function GalleryScroller({ images, title, onOpen }) {
  const loop = useMemo(() => [...images, ...images], [images]);
  const locale = useLocale();

  if (!images.length) return null;

  return (
    <div className="mt-10">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm text-brand-muted">
          {locale === "ar" ? "معرض الصور التلقائي — انقر على أي صورة للتكبير." : "Auto-scrolling gallery — click any image to view larger."}
        </p>
        <span className="rounded-full bg-brand-fog px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue">
          {locale === "ar" ? "انقر للعرض" : "Click to view"}
        </span>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-brand-line bg-brand-fog/50 py-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

        <div className="case-gallery-track flex w-max gap-4 px-5">
          {loop.map((src, index) => {
            const realIndex = index % images.length;
            return (
              <button
                key={`${src}-${index}`}
                type="button"
                onClick={() => onOpen(realIndex)}
                className="group relative h-52 w-80 shrink-0 overflow-hidden rounded-xl border border-brand-line bg-white shadow-[0_12px_30px_rgba(22,58,107,0.1)]"
              >
                <Image
                  src={src}
                  alt={`${title} visual`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/25" />
                <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                  {locale === "ar" ? "انقر للعرض" : "Click to view"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Lightbox({ images, index, onClose, onChange }) {
  const src = images[index];
  const total = images.length;
  const locale = useLocale();

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onChange((index - 1 + total) % total);
      if (event.key === "ArrowRight") onChange((index + 1) % total);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onChange, index, total]);

  if (!src) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-5 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Previous image"
        className="absolute left-4 top-1/2 z-[90] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-3xl text-white backdrop-blur-md transition hover:bg-white/20 md:left-8 md:h-14 md:w-14"
        onClick={(event) => {
          event.stopPropagation();
          onChange((index - 1 + total) % total);
        }}
      >
        ‹
      </button>

      <button
        type="button"
        aria-label="Next image"
        className="absolute right-4 top-1/2 z-[90] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-3xl text-white backdrop-blur-md transition hover:bg-white/20 md:right-8 md:h-14 md:w-14"
        onClick={(event) => {
          event.stopPropagation();
          onChange((index + 1) % total);
        }}
      >
        ›
      </button>

      <motion.div
        className="relative h-[min(80vh,720px)] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-black"
        initial={{ opacity: 0, scale: 0.94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.35, ease }}
        onClick={(event) => event.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28, ease }}
          >
            <Image src={src} alt="Case study visual" fill className="object-contain" sizes="90vw" />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/25"
        >
          {locale === "ar" ? "إغلاق" : "Close"}
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
          {index + 1} / {total}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CaseStudyDetailPage() {
  const params = useParams();
  const category = params?.category;
  const slug = params?.slug;
  const locale = useLocale();
  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (!slug) return;
    let alive = true;

    async function load() {
      setLoading(true);
      try {
        const detailPath = category
          ? `${API_URL}/api/case-studies/${category}/${slug}`
          : `${API_URL}/api/case-studies/${slug}`;

        const [detailRes, listRes] = await Promise.all([
          fetch(detailPath),
          fetch(`${API_URL}/api/case-studies`),
        ]);

        let detail = null;
        if (detailRes.ok) {
          const data = await detailRes.json();
          detail = data.caseStudy || null;
        }
        if (!detail) {
          detail =
            demoCaseStudies.find((c) => {
              if (c.slug !== slug) return false;
              if (!category) return true;
              return c.categorySlug === category;
            }) || null;
        }

        let list = demoCaseStudies;
        if (listRes.ok) {
          const data = await listRes.json();
          if (Array.isArray(data.caseStudies) && data.caseStudies.length) {
            list = data.caseStudies;
          }
        }

        if (!alive) return;
        setItem(detail);
        setRelated(list.filter((c) => c.slug !== slug).slice(0, 2));
      } catch {
        if (!alive) return;
        const detail =
          demoCaseStudies.find((c) => {
            if (c.slug !== slug) return false;
            if (!category) return true;
            return c.categorySlug === category;
          }) || null;
        setItem(detail);
        setRelated(demoCaseStudies.filter((c) => c.slug !== slug).slice(0, 2));
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [category, slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-brand-fog">
        <Header />
        <div className="flex min-h-[70vh] items-center justify-center pt-28 text-brand-muted">
          Loading case study…
        </div>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="min-h-screen bg-brand-fog">
        <Header />
        <div className="mx-auto max-w-3xl px-5 pb-24 pt-40 text-center md:px-8">
          <h1 className="font-display text-4xl font-semibold text-brand-ink">{locale === "ar" ? "دراسة الحالة غير موجودة" : "Case study not found"}</h1>
          <p className="mt-4 text-brand-muted">
            {locale === "ar" ? "قد تكون دراسة الحالة هذه غير نشطة أو الرابط غير صحيح." : "This case may be inactive or the link is incorrect."}
          </p>
          <Link href="/case-studies" className="btn-primary mt-8 inline-flex">
            {locale === "ar" ? "العودة إلى دراسات الحالة" : "Back to case studies"}
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const gallery = (item.gallery?.length
    ? item.gallery
    : [item.coverImage, "/service-lobby.jpg", "/hero-hotel.jpg"].filter(Boolean)
  ).map((src) => mediaUrl(src));
  const videos = (item.videos || []).map((src) => mediaUrl(src));
  const icons = (item.icons || []).map((src) => mediaUrl(src));
  
  // Conditionally use Arabic or English fields
  const title = locale === "ar" ? item.title_ar || item.title : item.title;
  const sections = getCaseSections(item, locale);
  const heroSummary = locale === "ar" ? item.outcome_ar || sections[sections.length - 1]?.body || "" : item.outcome || sections[sections.length - 1]?.body || "";
  
  const firstSection = sections[0];
  const restSections = sections.slice(1);

  return (
    <motion.main
      className="overflow-x-hidden"
      variants={pageFade}
      initial="hidden"
      animate="show"
      key={`${category}-${slug}`}
    >
      <Header />

      <section className="relative min-h-[88svh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.35, ease }}
        >
          <Image
            src={mediaUrl(item.coverImage) || "/hero-hotel.jpg"}
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
              href={item.categorySlug ? `/case-studies/${item.categorySlug}` : "/case-studies"}
              className="mb-8 inline-flex w-fit text-sm font-semibold text-white/75 transition hover:text-white"
            >
              {locale === "ar" ? "← دراسات الحالة" : "← All case studies"}
            </Link>
          </motion.div>
          <motion.div
            variants={heroItem}
            className="inline-flex w-fit rounded-full bg-white/12 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur"
          >
            {item.category || (locale === "ar" ? "حالة بيزجيت" : "BizGate Case Study")}
          </motion.div>
          <motion.p
            variants={heroItem}
            className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange"
          >
            {clientLabel(item)}
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-[-0.03em] text-white md:text-6xl"
          >
            {title}
          </motion.h1>
          {heroSummary ? (
            <motion.p
              variants={heroItem}
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg"
            >
              {heroSummary}
            </motion.p>
          ) : null}
          <motion.div variants={heroItem} className="mt-8 flex flex-wrap gap-3">
            <a href="#story" className="btn-primary on-dark">
              {locale === "ar" ? "قراءة القصة كاملة" : "Read the full story"}
            </a>
            <Link href="/#contact" className="btn-secondary">
              {locale === "ar" ? "تحدث إلى بيزجيت" : "Talk to BizGate"}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section id="story" className="bg-brand-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">
              {locale === "ar" ? "القسم 01" : "Section 01"}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl">
              {firstSection?.title || (locale === "ar" ? "ما احتاج العميل حله." : "What the client needed to solve.")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-brand-muted md:text-lg whitespace-pre-line">
              {firstSection?.body}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="border border-brand-line bg-brand-fog p-7 md:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal">
              {locale === "ar" ? "نظرة على العميل" : "Client snapshot"}
            </p>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                  {locale === "ar" ? "العميل" : "Client"}
                </p>
                <p className="mt-2 font-display text-2xl text-brand-ink">{clientLabel(item)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                  {locale === "ar" ? "الفئة" : "Category"}
                </p>
                <p className="mt-2 text-brand-ink/85">{item.category || "General"}</p>
              </div>
              {icons.length ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                    {locale === "ar" ? "أيقونات / علامات" : "Icons / marks"}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {icons.map((src) => (
                      <div
                        key={src}
                        className="relative h-12 w-12 overflow-hidden border border-brand-line bg-white p-1.5"
                      >
                        <Image src={src} alt="" fill className="object-contain" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>
      </section>

      {restSections.map((section, index) => {
        const isAccent = index % 2 === 1;
        return (
          <section
            key={`${section.title}-${index}`}
            className={
              isAccent
                ? "bg-brand-navy text-white"
                : "mesh-bg border-y border-brand-line"
            }
          >
            <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
              <Reveal>
                <p
                  className={`text-sm font-semibold uppercase tracking-[0.2em] ${
                    isAccent ? "text-brand-orange" : "text-brand-orange"
                  }`}
                >
                  {locale === "ar" ? `القسم 0${index + 2}` : `Section 0${index + 2}`}
                </p>
                <h2
                  className={`mt-4 max-w-3xl font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl ${
                    isAccent ? "text-white" : "text-brand-ink"
                  }`}
                >
                  {section.title}
                </h2>
                <p
                  className={`mt-6 max-w-4xl text-base leading-relaxed md:text-lg whitespace-pre-line ${
                    isAccent ? "text-white/75" : "text-brand-muted"
                  }`}
                >
                  {section.body}
                </p>
              </Reveal>
            </div>
          </section>
        );
      })}

      <section className="bg-brand-white">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">
              {locale === "ar" ? "صور ومواد داعمة" : "Supporting visuals"}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-brand-ink md:text-4xl">
              {locale === "ar" ? "لقطات شاشة، وصور، ومواد من المشروع." : "Screenshots, photos, and media from the engagement."}
            </h2>
          </Reveal>

          <GalleryScroller
            images={gallery}
            title={item.title}
            onOpen={(index) => setLightboxIndex(index)}
          />

          {videos.length ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {videos.map((src) => (
                <video
                  key={src}
                  src={src}
                  controls
                  className="w-full rounded-xl border border-brand-line bg-black"
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {related.length ? (
        <section className="border-t border-brand-line bg-brand-fog">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
            <h2 className="font-display text-3xl font-semibold text-brand-ink">{locale === "ar" ? "المزيد من دراسات حالة بيزجيت" : "More BizGate cases"}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((caseItem, index) => (
                <Reveal key={caseItem.slug} delay={index * 0.08}>
                  <Link
                    href={caseStudyHref(caseItem)}
                    className="group relative block h-56 overflow-hidden rounded-2xl border border-brand-line"
                  >
                    <Image
                      src={mediaUrl(caseItem.coverImage) || "/hero-hotel.jpg"}
                      alt={locale === "ar" ? caseItem.title_ar || caseItem.title : caseItem.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="50vw"
                    />
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs uppercase tracking-[0.16em] text-brand-orange">
                        {caseItem.category || clientLabel(caseItem)}
                      </p>
                      <p className="mt-1 font-display text-xl font-semibold">
                        {locale === "ar" ? caseItem.title_ar || caseItem.title : caseItem.title}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTA />
      <Footer />

      <AnimatePresence>
        {lightboxIndex !== null ? (
          <Lightbox
            images={gallery}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onChange={setLightboxIndex}
          />
        ) : null}
      </AnimatePresence>
    </motion.main>
  );
}
