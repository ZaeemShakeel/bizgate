"use client";

import Image from "next/image";
import { Link } from "../../../i18n/routing";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CTA from "../../../components/CTA";
import Reveal from "../../../components/Reveal";
import { useTranslations, useLocale } from "next-intl";
import { mediaUrl } from "../../../lib/caseStudies";

const API_URL =
  typeof window !== "undefined"
    ? ""
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ── Fallback data from existing translations ──────────────────────────────────
const FALLBACK_SERVICES = [
  {
    _id: "f1",
    slug: "digital-reputation-guest-experience",
    category: "Digital Reputation",
    categorySlug: "digital-reputation",
    eyebrow: "01 · Digital Reputation",
    title: "Digital Reputation & Guest Experience Intelligence",
    summary:
      "Every review contains information about the guest experience. BizGate helps hotels transform that information into clear operational and commercial priorities.",
    points: [
      "Digital reputation audits and benchmarking",
      "Guest-sentiment and impact analysis",
      "Review-response strategy and governance",
      "Executive reporting and improvement plans",
    ],
    coverImage: "/service-digital.jpg",
    isActive: true,
    order: 1,
  },
  {
    _id: "f2",
    slug: "destination-reputation-quality",
    category: "Destination Programs",
    categorySlug: "destination-programs",
    eyebrow: "02 · Destination Programs",
    title: "Destination Reputation & Quality Programs",
    summary:
      "BizGate works with tourism authorities to monitor, benchmark and improve hospitality performance across their destinations.",
    points: [
      "Destination-wide hotel reputation monitoring",
      "Guest-sentiment and quality analysis",
      "Stakeholder and executive reporting",
      "Hotel engagement, workshops and training",
    ],
    coverImage: "/service-advisory.jpg",
    isActive: true,
    order: 2,
  },
  {
    _id: "f3",
    slug: "hotel-group-performance-advisory",
    category: "Hotel Groups",
    categorySlug: "hotel-groups",
    eyebrow: "03 · Hotel Groups",
    title: "Hotel Group Performance Advisory",
    summary:
      "BizGate helps hotel groups replace fragmented guest-feedback data with a consistent view of performance across their portfolios.",
    points: [
      "Group and property-level performance reporting",
      "Comparative property benchmarking",
      "Group-wide review-response standards",
      "Executive summaries and leadership workshops",
    ],
    coverImage: "/service-sales.jpg",
    isActive: true,
    order: 3,
  },
  {
    _id: "f4",
    slug: "mystery-guest-service-quality",
    category: "Mystery Guest",
    categorySlug: "mystery-guest",
    eyebrow: "04 · Mystery Guest",
    title: "Mystery Guest & Service Quality Audits",
    summary:
      "Mystery-guest audits verify what actually happens during a stay and whether service delivery meets operational and brand standards.",
    points: [
      "Customized audit criteria and scoring",
      "Complete guest journey assessments",
      "Evidence-based reporting and executive summaries",
      "Corrective action plans, training and follow-up",
    ],
    coverImage: "/service-lobby.jpg",
    isActive: true,
    order: 4,
  },
  {
    _id: "f5",
    slug: "gcc-market-entry-representation",
    category: "GCC Market Entry",
    categorySlug: "gcc-market-entry",
    eyebrow: "05 · GCC Market Entry",
    title: "GCC Market Entry & Representation",
    summary:
      "BizGate helps international hotels, destinations and travel companies enter and grow in the GCC through local knowledge and trusted relationships.",
    points: [
      "Market assessment and entry strategy",
      "Sales representation and business development",
      "B2B roadshows, trade events and launch activities",
      "Local follow-up and market intelligence",
    ],
    coverImage: "/service-marketing.jpg",
    isActive: true,
    order: 5,
  },
  {
    _id: "f6",
    slug: "hospitality-technology-market-development",
    category: "Technology",
    categorySlug: "technology",
    eyebrow: "06 · Hospitality Technology",
    title: "Hospitality Technology Market Development",
    summary:
      "BizGate helps hospitality technology companies enter and grow across the Middle East through market assessment, positioning and business development.",
    points: [
      "Market potential and competitor assessment",
      "Introductions to hotel owners, groups and decision-makers",
      "Client onboarding and relationship support",
      "Arabic-language and cultural market support",
    ],
    coverImage: "/hero-growth.jpg",
    isActive: true,
    order: 6,
  },
  {
    _id: "f7",
    slug: "training-management-workshops",
    category: "Training",
    categorySlug: "training",
    eyebrow: "07 · Training & Workshops",
    title: "Training & Management Workshops",
    summary:
      "BizGate conducts on-site training, management meetings and executive workshops — turning insight into action with the people responsible for performance.",
    points: [
      "On-site staff and management training",
      "Executive workshops and leadership sessions",
      "Customized programs for hotels, groups and authorities",
      "Follow-up and performance coaching",
    ],
    coverImage: "/service-resort.jpg",
    isActive: true,
    order: 7,
  },
];

const ease = [0.22, 1, 0.36, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease, delay: i * 0.06 },
  }),
};

// ── Swiper (pure CSS, no dependency) ────────────────────────────────────────
function ServiceSwiper({ services, locale, t }) {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const go = (idx) => setActive((idx + services.length) % services.length);

  useEffect(() => {
    timerRef.current = setInterval(() => go(active + 1), 4000);
    return () => clearInterval(timerRef.current);
  }, [active, services.length]);

  if (!services.length) return null;
  const item = services[active];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-line bg-white shadow-xl">
      <div className="grid lg:grid-cols-2">
        {/* Image */}
        <div className="relative h-56 lg:h-full min-h-[280px]">
          {item.coverImage ? (
            <Image
              src={mediaUrl(item.coverImage)}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 bg-brand-navy" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-navy/60 lg:to-brand-navy/70" />
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease }}
            className="flex flex-col justify-center p-8 md:p-10"
          >
            {item.eyebrow && (
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">
                {locale === "ar" && item.eyebrow_ar ? item.eyebrow_ar : item.eyebrow}
              </p>
            )}
            <h3 className="font-display text-2xl font-semibold text-brand-ink md:text-3xl">
              {locale === "ar" && item.title_ar ? item.title_ar : item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted md:text-base">
              {locale === "ar" && item.summary_ar ? item.summary_ar : item.summary}
            </p>
            <Link
              href={`/services/${item.slug}`}
              className="btn-primary mt-6 self-start"
            >
              {t("learnMore")} →
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => { clearInterval(timerRef.current); setActive(i); }}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-brand-blue" : "w-2 bg-brand-blue/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Helper SVG Icons for Services
function getServiceIcon(slug) {
  switch (slug) {
    case "digital-reputation-guest-experience":
      return (
        <svg
          className="h-5 w-5 text-brand-blue transition-colors duration-300 group-hover:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.97-2.883a1 1 0 00-1.175 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 9.72c-.783-.57-.38-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z"
          />
        </svg>
      );
    case "destination-reputation-quality":
      return (
        <svg
          className="h-5 w-5 text-brand-blue transition-colors duration-300 group-hover:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      );
    case "hotel-group-performance-advisory":
      return (
        <svg
          className="h-5 w-5 text-brand-blue transition-colors duration-300 group-hover:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      );
    case "mystery-guest-service-quality":
      return (
        <svg
          className="h-5 w-5 text-brand-blue transition-colors duration-300 group-hover:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      );
    case "gcc-market-entry-representation":
      return (
        <svg
          className="h-5 w-5 text-brand-blue transition-colors duration-300 group-hover:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      );
    case "hospitality-technology-market-development":
      return (
        <svg
          className="h-5 w-5 text-brand-blue transition-colors duration-300 group-hover:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
    case "training-management-workshops":
      return (
        <svg
          className="h-5 w-5 text-brand-blue transition-colors duration-300 group-hover:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      );
    default:
      return (
        <svg
          className="h-5 w-5 text-brand-blue transition-colors duration-300 group-hover:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      );
  }
}

// ── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ item, locale, t, index }) {
  const isAr = locale === "ar";
  const title = isAr && item.title_ar ? item.title_ar : item.title;
  const eyebrow = isAr && item.eyebrow_ar ? item.eyebrow_ar : item.eyebrow;
  const summary = isAr && item.summary_ar ? item.summary_ar : item.summary;
  const points = isAr && item.points_ar?.length ? item.points_ar : (item.points || []);
  const category = isAr && item.category_ar ? item.category_ar : item.category;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-brand-line/70 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-brand-blue/40 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-brand-fog">
        {item.coverImage ? (
          <Image
            src={mediaUrl(item.coverImage)}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-95"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-navy/30" />
        )}
        
        {/* Subtle dark overlay at bottom of image to smooth card body transition */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent" />

        {eyebrow && (
          <div className="absolute start-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-blue shadow-sm backdrop-blur-sm">
            {eyebrow}
          </div>
        )}
      </div>

      {/* Overlapping Icon Badge */}
      <div className="absolute top-[168px] start-6 z-20 flex h-12 w-12 items-center justify-center rounded-xl border border-brand-line/60 bg-white shadow-md transition-all duration-500 group-hover:scale-110 group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:shadow-brand-blue/20">
        {getServiceIcon(item.slug)}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 pt-9 md:px-6 md:pb-6">
        {/* Category tag */}
        {category && (
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-orange mb-1.5 block">
            {category}
          </span>
        )}

        <h3 className="font-display text-lg font-semibold leading-snug text-brand-ink transition-colors duration-300 group-hover:text-brand-blue">
          {title}
        </h3>
        
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-brand-muted line-clamp-3">
          {summary}
        </p>

        {/* Feature bullet list */}
        {points && points.length > 0 && (
          <ul className="mt-4 space-y-2 border-t border-brand-line/60 pt-4">
            {points.slice(0, 2).map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-brand-muted">
                {/* Micro Checkmark SVG */}
                <svg className="w-3.5 h-3.5 mt-0.5 text-brand-blue shrink-0 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="line-clamp-1">{point}</span>
              </li>
            ))}
          </ul>
        )}

        <Link
          href={`/services/${item.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue transition-colors duration-300 hover:text-brand-navy"
        >
          <span>{t("learnMore")}</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" aria-hidden>
            {isAr ? "←" : "→"}
          </span>
        </Link>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const t = useTranslations("ServicesPage");
  const locale = useLocale();
  const isAr = locale === "ar";

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    async function load() {
      setLoading(true);
      try {
        const [svcRes, catRes] = await Promise.all([
          fetch(`${API_URL}/api/services`),
          fetch(`${API_URL}/api/services/categories`),
        ]);

        let svcData = [];
        if (svcRes.ok) {
          const d = await svcRes.json();
          svcData = d.services || [];
        }

        let catData = [];
        if (catRes.ok) {
          const d = await catRes.json();
          catData = d.categories || [];
        }

        if (!alive) return;

        // Use fallback if API is empty
        setServices(svcData.length ? svcData : FALLBACK_SERVICES);
        setCategories(catData);
      } catch {
        if (alive) {
          setServices(FALLBACK_SERVICES);
          setError("");
        }
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => { alive = false; };
  }, []);

  const filtered =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.categorySlug === activeCategory);

  // Featured first 3 for swiper
  const featured = services.slice(0, 5);

  return (
    <main className="overflow-x-hidden">
      <Header />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-navy py-24 md:py-32">
        <div className="absolute inset-0">
          <Image
            src="/hero-growth.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 via-brand-navy/60 to-brand-navy/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(42,92,170,0.35),transparent_55%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <Reveal direction={isAr ? "right" : "left"}>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-orange">
              {t("heroEyebrow")}
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl lg:text-6xl max-w-3xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              {t("heroIntro")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#contact" className="btn-primary on-dark">
                {t("ctaLabel")} →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Featured Swiper ────────────────────────────────────────────── */}
      {!loading && featured.length > 0 && (
        <section className="bg-brand-fog py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-sky">
                {isAr ? "مميز" : "Featured"}
              </p>
              <h2 className="mb-8 font-display text-2xl font-semibold text-brand-ink md:text-3xl">
                {isAr ? "خدماتنا المميزة" : "Our Key Services"}
              </h2>
            </Reveal>
            <ServiceSwiper services={featured} locale={locale} t={t} />
          </div>
        </section>
      )}

      {/* ── All Services Grid ──────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl">
              {isAr ? "جميع الخدمات" : "All Services"}
            </h2>
          </Reveal>

          {/* Category Filter Tabs */}
          {categories.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                  activeCategory === "all"
                    ? "bg-brand-blue text-white"
                    : "bg-brand-fog text-brand-ink hover:bg-brand-mist"
                }`}
              >
                {t("filterAll")}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                    activeCategory === cat.slug
                      ? "bg-brand-blue text-white"
                      : "bg-brand-fog text-brand-ink hover:bg-brand-mist"
                  }`}
                >
                  {isAr && cat.name_ar ? cat.name_ar : cat.name}
                </button>
              ))}
            </div>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl bg-brand-fog h-64" />
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="mt-10 text-center text-sm text-red-600">{t("loadError")}</p>
          )}

          {/* Cards grid */}
          {!loading && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                {filtered.map((svc, i) => (
                  <ServiceCard
                    key={svc._id || svc.slug}
                    item={svc}
                    locale={locale}
                    t={t}
                    index={i}
                  />
                ))}
                {filtered.length === 0 && (
                  <p className="col-span-4 py-16 text-center text-brand-muted">
                    {isAr ? "لا توجد خدمات في هذه الفئة." : "No services in this category."}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
