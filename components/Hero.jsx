"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { primaryCta } from "../lib/siteContent";

export default function Hero() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.75;
      video.play().catch(() => {});
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { y: 24, opacity: 0, duration: 0.7 })
        .from(".hero-title", { y: 40, opacity: 0, duration: 0.9 }, "-=0.35")
        .from(".hero-copy", { y: 28, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(".hero-actions", { y: 20, opacity: 0, duration: 0.6 }, "-=0.35")
        .from(".hero-badge", { y: 16, opacity: 0, duration: 0.55 }, "-=0.3");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={rootRef} className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/video-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-growth.jpg"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_35%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-44 md:px-8 md:pb-24 lg:justify-center lg:pb-20">
        <div className="max-w-4xl">
          <p className="hero-eyebrow mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/75">
            Hospitality Reputation &amp; Growth · Middle East
          </p>
          <h1 className="hero-title font-display text-[2.4rem] font-semibold leading-[1.12] tracking-[-0.04em] text-white md:text-5xl lg:text-[3.6rem]">
            Stronger Reputation. Better Guest Experience. Smarter Regional Growth.
          </h1>
          <p className="hero-copy mt-6 max-w-2xl text-base leading-relaxed text-white/82 md:text-lg">
            BizGate is a Dubai-based hospitality and tourism consultancy helping hotels,
            resorts, hotel groups, tourism authorities and hospitality technology companies
            strengthen digital reputation, improve guest experience and grow across the Middle
            East.
          </p>
          <div className="hero-actions mt-9 flex flex-wrap items-center gap-4">
            <Link href="/#contact" className="btn-primary on-dark">
              {primaryCta} →
            </Link>
            <Link href="/#services" className="btn-secondary">
              Explore Our Services
            </Link>
          </div>
          <motion.div
            className="hero-badge mt-10 inline-flex max-w-2xl flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white/85 backdrop-blur-md"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-brand-orange" />
            <span>
              Digital-reputation expertise since 2008 · Founder-led · 28 years in travel and
              tourism
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
