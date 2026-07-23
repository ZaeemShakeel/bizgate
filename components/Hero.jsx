"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

export default function Hero() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
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
        <Image
          src="/hero-growth.jpg"
          alt="Dubai skyline representing business growth"
          fill
          priority
          className="object-cover kenburns"
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(250,167,38,0.18),transparent_35%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-44 md:px-8 md:pb-24 lg:justify-center lg:pb-20">
        <div className="max-w-3xl">
          <p className="hero-eyebrow mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/75">
            Welcome to BizGate
          </p>
          <h1 className="hero-title font-display text-[2.4rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white md:text-5xl lg:text-[3.6rem]">
            We give your company and brand a boost.
          </h1>
          <p className="hero-copy mt-6 max-w-xl text-base leading-relaxed text-white/82 md:text-lg">
            A dynamic marketing and consultancy agency in Dubai — focused on the
            future of travel, connected to the travel trade, and helping hospitality
            brands stand out and gain market share.
          </p>
          <div className="hero-actions mt-9 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn-primary on-dark">
              Get a demo
            </a>
            <a href="#services" className="btn-secondary">
              Explore services
            </a>
          </div>
          <motion.div
            className="hero-badge mt-10 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur-md"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="h-2 w-2 rounded-full bg-brand-orange" />
            Empowering hospitality brands across the UAE &amp; GCC
          </motion.div>
        </div>
      </div>
    </section>
  );
}
