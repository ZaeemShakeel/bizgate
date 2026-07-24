"use client";

import { useEffect, useLayoutEffect, useState, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

const rotatingWords = ["boost", "edge", "growth", "presence", "future"];

export default function Hero() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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

  useEffect(() => {
    const currentWord = rotatingWords[wordIndex];
    const typingSpeed = isDeleting ? 45 : 95;
    const pauseAtEnd = 1600;

    let timeout;

    if (!isDeleting && displayText === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseAtEnd);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? currentWord.slice(0, Math.max(0, prev.length - 1))
            : currentWord.slice(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

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
        <div className="max-w-3xl">
          <p className="hero-eyebrow mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/75">
            Welcome to BizGate
          </p>
          <h1 className="hero-title font-display text-[2.4rem] font-semibold leading-[1.12] tracking-[-0.04em] text-white md:text-5xl lg:text-[3.6rem]">
            We give your company and brand a{" "}
            <span className="inline italic text-[#5eb3f0] underline decoration-[#3498db] decoration-[3px] underline-offset-[10px] md:underline-offset-[12px]">
              {displayText}
              <span className="ml-0.5 inline-block h-[0.9em] w-[2px] animate-pulse bg-[#5eb3f0] align-[-0.05em]" />
            </span>
            .
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
