"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { API_URL, caseStudyHref, clientLabel, demoCaseStudies, mediaUrl } from "../lib/caseStudies";

export default function CaseStudies({ limit = 3 }) {
  const [cases, setCases] = useState(demoCaseStudies);

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

  const visible = limit ? cases.slice(0, limit) : cases;

  return (
    <section id="case-studies" className="relative overflow-hidden bg-brand-white">
      <div className="absolute inset-0 mesh-bg opacity-80" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
            Case Studies
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-5xl">
            Regional Experience in Action.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-muted md:text-lg">
            BizGate works with tourism authorities, hotel groups and hospitality technology
            companies to turn market knowledge, guest feedback and performance data into practical
            action.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((item, index) => (
            <Reveal key={item._id || item.slug} delay={index * 0.08} direction="scale">
              <Link href={caseStudyHref(item)} className="group block">
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="relative h-[400px] overflow-hidden rounded-2xl border border-brand-line/70 shadow-[0_18px_45px_rgba(22,58,107,0.14)]"
                >
                  <Image
                    src={mediaUrl(item.coverImage) || "/hero-hotel.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.28)_45%,rgba(0,0,0,0)_100%)]" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(0deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.62)_28%,rgba(0,0,0,0.32)_55%,rgba(0,0,0,0.12)_75%,rgba(0,0,0,0)_100%)]" />

                  <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4">
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                      {item.category || "BizGate Case"}
                    </span>
                    <span className="rounded-full border border-brand-orange/40 bg-brand-orange/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-orange backdrop-blur-md">
                      {clientLabel(item)}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white">
                    <h3 className="font-display text-xl font-semibold leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/80">
                      {item.challenge}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-sm font-semibold">
                      <span>View case study</span>
                      <span className="transition group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </Reveal>
          ))}
        </div>

        {limit ? (
          <div className="mt-10">
            <Link href="/case-studies" className="btn-primary">
              Browse all case studies
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
