"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";

const items = [
  {
    problem: "“We need stronger hotel representation in the Middle East.”",
    solution: "Hotel Sales Representation",
    answer:
      "Regional representation with wealth of contacts in the travel trade fraternity and access to thousands of corporate travel buyers.",
  },
  {
    problem: "“Our brand needs omni-channel marketing across the GCC.”",
    solution: "Brand & Marketing Management",
    answer:
      "We oversee customer experience and brand performance strategy execution to enrich presence and grow market share.",
  },
  {
    problem: "“We need advisory support for planning and growth.”",
    solution: "Management Advisory",
    answer:
      "Consulting services from financial planning to researched, time-tested advice designed to assist all types of businesses.",
  },
  {
    problem: "“Our digital guest journey and visibility need upgrading.”",
    solution: "Digital Transformation",
    answer:
      "SaaS applications for online visibility, business development, relationship management, digital touchpoints, and customer experience.",
  },
  {
    problem: "“We need PR that reaches trade and consumer audiences.”",
    solution: "Public Relations",
    answer:
      "All-encompassing trade and consumer PR through editorial coverage, supported by strong Arabic and English media relationships.",
  },
  {
    problem: "“We want flexible engagement, not a rigid contract.”",
    solution: "Flexibility",
    answer:
      "Customer needs are at the center of what we do — long-term contracts or special project arrangements to suit your goals.",
  },
];

export default function Solutions() {
  const [active, setActive] = useState(0);

  return (
    <section id="solutions" className="relative overflow-hidden mesh-bg">
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">
            How we help
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-5xl">
            Feeling lost in growth operations?
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-muted md:text-lg">
            Businesses today cross borders — you need a partner that goes where you are.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-3">
            {items.map((item, index) => {
              const isActive = active === index;
              return (
                <button
                  key={item.solution}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
                    isActive
                      ? "border-brand-blue bg-white shadow-[0_12px_30px_rgba(42,92,170,0.12)]"
                      : "border-transparent bg-white/50 hover:border-brand-line hover:bg-white"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">
                    Challenge
                  </p>
                  <p className="mt-2 font-display text-lg leading-snug text-brand-ink">{item.problem}</p>
                </button>
              );
            })}
          </div>

          <Reveal className="relative min-h-[320px] overflow-hidden rounded-[1.75rem] bg-brand-navy p-8 text-white md:p-10">
            <div className="pointer-events-none absolute -right-10 top-0 h-48 w-48 rounded-full bg-brand-sky/25 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-10 h-40 w-40 rounded-full bg-brand-orange/20 blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="relative"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
                  Solution
                </p>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em]">
                  BizGate: {items[active].solution}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">
                  {items[active].answer}
                </p>
                <a href="#contact" className="btn-primary on-dark mt-8">
                  Talk to our team
                </a>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
