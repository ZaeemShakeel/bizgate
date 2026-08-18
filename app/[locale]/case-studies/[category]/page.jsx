"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import CTA from "../../../../components/CTA";
import {
  API_URL,
  caseStudyHref,
  clientLabel,
  demoCaseStudies,
  mediaUrl,
  slugify,
} from "../../../../lib/caseStudies";

export default function CaseStudyCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const category = params?.category;
  const [cases, setCases] = useState([]);
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;
    let alive = true;

    async function load() {
      setLoading(true);
      try {
        const [listRes, detailRes] = await Promise.all([
          fetch(`${API_URL}/api/case-studies?category=${encodeURIComponent(category)}`),
          fetch(`${API_URL}/api/case-studies/${encodeURIComponent(category)}`),
        ]);

        let list = [];
        if (listRes.ok) {
          const data = await listRes.json();
          list = Array.isArray(data.caseStudies) ? data.caseStudies : [];
        }

        // Legacy URL support: /case-studies/:slug → redirect to /case-studies/:category/:slug
        if (!list.length && detailRes.ok) {
          const data = await detailRes.json();
          if (data.caseStudy) {
            router.replace(caseStudyHref(data.caseStudy));
            return;
          }
        }

        if (!list.length) {
          list = demoCaseStudies.filter((item) => item.categorySlug === slugify(category));
          const legacy = demoCaseStudies.find((item) => item.slug === category);
          if (!list.length && legacy) {
            router.replace(caseStudyHref(legacy));
            return;
          }
        }

        if (!alive) return;
        setCases(list);
        setLabel(list[0]?.category || category.replace(/-/g, " "));
      } catch {
        if (!alive) return;
        const list = demoCaseStudies.filter(
          (item) => item.categorySlug === slugify(category)
        );
        const legacy = demoCaseStudies.find((item) => item.slug === category);
        if (!list.length && legacy) {
          router.replace(caseStudyHref(legacy));
          return;
        }
        setCases(list);
        setLabel(list[0]?.category || category.replace(/-/g, " "));
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [category, router]);

  return (
    <main className="overflow-x-hidden">
      <Header />

      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(52,152,219,0.25),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-40 md:px-8 md:pb-20">
          <Link
            href="/case-studies"
            className="mb-8 inline-flex text-sm font-semibold text-white/75 transition hover:text-white"
          >
            ← All case studies
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
            Category
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold capitalize tracking-[-0.03em] md:text-6xl">
            {label || "Case studies"}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            Browse BizGate case studies in this category.
          </p>
        </div>
      </section>

      <section className="bg-brand-white">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          {loading ? (
            <p className="text-brand-muted">Loading cases…</p>
          ) : !cases.length ? (
            <div className="rounded-2xl border border-brand-line bg-brand-fog p-10 text-center">
              <h2 className="font-display text-2xl text-brand-ink">No cases in this category yet</h2>
              <Link href="/case-studies" className="btn-primary mt-6 inline-flex">
                View all case studies
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {cases.map((item, index) => (
                <motion.div
                  key={item._id || item.slug}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.5 }}
                >
                  <Link href={caseStudyHref(item)} className="group block">
                    <article className="relative h-[400px] overflow-hidden rounded-2xl border border-brand-line/70 shadow-[0_18px_45px_rgba(22,58,107,0.14)]">
                      <Image
                        src={mediaUrl(item.coverImage) || "/hero-hotel.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.28)_45%,rgba(0,0,0,0)_100%)]" />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(0deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.62)_28%,rgba(0,0,0,0.32)_55%,rgba(0,0,0,0.12)_75%,rgba(0,0,0,0)_100%)]" />
                      <div className="absolute inset-x-0 top-0 z-10 p-4">
                        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                          {item.category || "BizGate Case"}
                        </span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white">
                        <h2 className="font-display text-xl font-semibold leading-snug">
                          {item.title}
                        </h2>
                        <p className="mt-2 line-clamp-2 text-sm text-white/75">
                          {item.challenge}
                        </p>
                        <p className="mt-3 text-xs uppercase tracking-[0.14em] text-brand-orange">
                          {clientLabel(item)}
                        </p>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
