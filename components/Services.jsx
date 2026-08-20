"use client";

import Image from "next/image";
import { Link } from "../i18n/routing";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { useTranslations, useLocale } from "next-intl";
import { mediaUrl } from "../lib/caseStudies";

const API_URL =
  typeof window !== "undefined"
    ? ""
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const FALLBACK_SERVICES = [
  {
    _id: "f1",
    slug: "digital-reputation-guest-experience",
    category: "Digital Reputation",
    categorySlug: "digital-reputation",
    title: "Digital Reputation & Guest Experience Intelligence",
    title_ar: "الرقمية السمعة في والخبرة الذكاء",
    coverImage: "/service-digital.jpg",
    isActive: true,
    order: 1,
  },
  {
    _id: "f2",
    slug: "destination-reputation-quality",
    category: "Destination Programs",
    categorySlug: "destination-programs",
    title: "Destination Reputation & Quality Programs",
    title_ar: "السياحية للوجهات المتخصصة البرامج",
    coverImage: "/service-advisory.jpg",
    isActive: true,
    order: 2,
  },
  {
    _id: "f3",
    slug: "hotel-group-performance-advisory",
    category: "Hotel Groups",
    categorySlug: "hotel-groups",
    title: "Hotel Group Performance Advisory",
    title_ar: "الفندقية للمجموعات التجاري األداء",
    coverImage: "/service-sales.jpg",
    isActive: true,
    order: 3,
  },
  {
    _id: "f4",
    slug: "mystery-guest-service-quality",
    category: "Mystery Guest",
    categorySlug: "mystery-guest",
    title: "Mystery Guest & Service Quality Audits",
    title_ar: "السرّي الضيف",
    coverImage: "/service-lobby.jpg",
    isActive: true,
    order: 4,
  },
  {
    _id: "f5",
    slug: "gcc-market-entry-representation",
    category: "GCC Market Entry",
    categorySlug: "gcc-market-entry",
    title: "GCC Market Entry & Representation",
    title_ar: "الخليج أسواق دخول",
    coverImage: "/service-marketing.jpg",
    isActive: true,
    order: 5,
  },
  {
    _id: "f6",
    slug: "hospitality-technology-market-development",
    category: "Technology",
    categorySlug: "technology",
    title: "Hospitality Technology Market Development",
    title_ar: "الضيافة تقنيات",
    coverImage: "/hero-growth.jpg",
    isActive: true,
    order: 6,
  },
  {
    _id: "f7",
    slug: "training-management-workshops",
    category: "Training",
    categorySlug: "training",
    title: "Training & Management Workshops",
    title_ar: "التدريب العملي",
    coverImage: "/service-resort.jpg",
    isActive: true,
    order: 7,
  },
];

export default function Services() {
  const t = useTranslations("Services");
  const locale = useLocale();
  const isAr = locale === "ar";

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const autoplayRef = useRef(null);

  // Load from API with fallback
  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch(`${API_URL}/api/services`);
        if (res.ok) {
          const d = await res.json();
          if (alive) {
            setServices(d.services?.length ? d.services : FALLBACK_SERVICES);
          }
        } else {
          if (alive) setServices(FALLBACK_SERVICES);
        }
      } catch {
        if (alive) setServices(FALLBACK_SERVICES);
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => { alive = false; };
  }, []);

  // Update items per page based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay function
  const startAutoplay = () => {
    stopAutoplay();
    if (services.length <= itemsPerPage) return;
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = services.length - itemsPerPage;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 3500);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const handlePrev = () => {
    stopAutoplay();
    setCurrentIndex((prev) => {
      const maxIndex = services.length - itemsPerPage;
      if (maxIndex <= 0) return 0;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const handleNext = () => {
    stopAutoplay();
    setCurrentIndex((prev) => {
      const maxIndex = services.length - itemsPerPage;
      if (maxIndex <= 0) return 0;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [services, itemsPerPage]);

  const maxIndex = Math.max(0, services.length - itemsPerPage);
  const visibleServices = services.slice(currentIndex, currentIndex + itemsPerPage);

  // If there are fewer than 4 remaining at index, pad or wrap around
  const displayServices = [];
  for (let i = 0; i < itemsPerPage; i++) {
    const item = services[(currentIndex + i) % services.length];
    if (item) displayServices.push(item);
  }

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-20 md:py-28 border-b border-brand-line/50"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(42,92,170,0.03),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* Section Header */}
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-orange">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-5xl">
            {t("headline")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brand-muted md:text-lg">
            {t("intro")}
          </p>
        </Reveal>

        {/* Carousel Container */}
        <div className="relative mt-12 md:mt-16">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-2xl bg-brand-muted/10 aspect-[3/4]"
                />
              ))}
            </div>
          ) : (
            <div className="overflow-hidden">
              <motion.div
                className="grid gap-6"
                style={{
                  gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))`,
                }}
                layout
              >
                <AnimatePresence mode="popLayout">
                  {displayServices.map((item, index) => {
                    const title = isAr && item.title_ar ? item.title_ar : item.title;
                    const category = isAr && item.category_ar ? item.category_ar : item.category;

                    return (
                      <motion.div
                        key={item._id || item.slug}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        layout
                      >
                        <Link
                          href={`/services/${item.slug}`}
                          className="group relative block overflow-hidden rounded-2xl bg-brand-navy shadow-lg aspect-[3/4] border border-white/10"
                        >
                          {/* Image background */}
                          {item.coverImage ? (
                            <Image
                              src={mediaUrl(item.coverImage)}
                              alt={title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/30 to-brand-navy/60" />
                          )}

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(11,18,32,0.92)_100%)] transition-opacity duration-300 group-hover:opacity-95" />

                          {/* Category and Title overlaid at the bottom */}
                          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white z-10 flex flex-col gap-1.5">
                            {category && (
                              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-orange">
                                {category}
                              </span>
                            )}
                            <h3 className="font-display text-base font-semibold leading-snug md:text-lg transition-colors group-hover:text-brand-sky">
                              {title}
                            </h3>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </div>
          )}

          {/* Navigation Arrows */}
          {!loading && services.length > itemsPerPage && (
            <>
              {/* Prev Button */}
              <button
                onClick={isAr ? handleNext : handlePrev}
                className="absolute -left-2 xl:-left-16 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-brand-line bg-white text-brand-blue shadow-md transition-all hover:bg-brand-blue hover:text-white hover:border-brand-blue focus:outline-none cursor-pointer hidden sm:flex"
                aria-label="Previous service"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={isAr ? handlePrev : handleNext}
                className="absolute -right-2 xl:-right-16 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-brand-line bg-white text-brand-blue shadow-md transition-all hover:bg-brand-blue hover:text-white hover:border-brand-blue focus:outline-none cursor-pointer hidden sm:flex"
                aria-label="Next service"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {!loading && services.length > itemsPerPage && (
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: services.length }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    stopAutoplay();
                    setCurrentIndex(Math.min(i, maxIndex));
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-6 bg-brand-blue"
                      : "w-2 bg-brand-muted/20 hover:bg-brand-muted/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Services CTA */}
        {!loading && (
          <Reveal delay={0.05} className="mt-10 flex justify-center">
            <Link
              href="/services"
              className="btn-ghost inline-flex items-center gap-2.5 px-8 font-medium transition-all group"
            >
              {t("viewAllServices")}
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Reveal>
        )}

        {/* Highlighted Training & Workshops Block */}
        <Reveal delay={0.1} className="mt-8 md:mt-10">
          <div className="rounded-3xl border border-brand-line/60 bg-brand-fog/40 p-8 md:p-12 relative overflow-hidden">
            {/* Visual background accents */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-sky/5 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-brand-orange/5 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
                  {t("trainingEyebrow")}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-brand-ink md:text-3xl lg:text-4xl">
                  {t("trainingTitle")}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-brand-muted md:text-lg">
                  {t("trainingCopy")}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0 min-w-[240px] w-full sm:w-auto lg:w-64">
                <Link
                  href="/#contact"
                  className="btn-primary w-full text-center font-medium transition-all hover:shadow-lg"
                >
                  {t("trainingCtaSecondary")}
                </Link>
                <Link
                  href="/#contact"
                  className="btn-ghost w-full text-center font-medium transition-all hover:bg-brand-mist/50"
                >
                  {t("trainingCta")}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
