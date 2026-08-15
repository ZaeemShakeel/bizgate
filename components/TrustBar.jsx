"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    numeral: "i",
    title: "Hotels, Resorts and Hotel Groups",
    copy: "Turn guest feedback into practical priorities, improve review-response performance and create consistent visibility across properties.",
  },
  {
    numeral: "ii",
    title: "Tourism Authorities and Destinations",
    copy: "Monitor and benchmark hospitality quality across an entire destination, supported by executive reporting and stakeholder engagement.",
  },
  {
    numeral: "iii",
    title: "Hospitality Technology Companies",
    copy: "Enter, localize and grow in the region through market development, sales representation, client onboarding and local support.",
  },
  {
    numeral: "iv",
    title: "International Brands Entering the GCC",
    copy: "Build the relationships, positioning and route to market required for sustainable regional growth.",
  },
];

export default function TrustBar() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".welcome-eyebrow", { y: 28, opacity: 0, duration: 0.6 })
        .from(".welcome-title", { y: 40, opacity: 0, duration: 0.75 }, "-=0.3")
        .from(".welcome-copy", { y: 28, opacity: 0, duration: 0.65 }, "-=0.35")
        .from(
          ".trust-card",
          {
            y: 50,
            opacity: 0,
            scale: 0.96,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-brand-navy text-white">
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-brand-sky/20 blur-3xl pulse-soft" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-brand-orange/15 blur-3xl pulse-soft" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="max-w-3xl">
          <p className="welcome-eyebrow text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">
            01
          </p>
          <h2 className="welcome-title mt-4 font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
            Who We Help
          </h2>
          <p className="welcome-copy mt-5 text-base leading-relaxed text-white/72 md:text-lg">
            A focused practice for the people who shape demand and protect reputation in Middle
            East hospitality.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <motion.div
              key={item.numeral}
              className="trust-card rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              whileHover={{ y: -6, backgroundColor: "rgba(255,255,255,0.1)" }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-sky">
                {item.numeral}
              </p>
              <h3 className="mt-3 font-display text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/68">{item.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
