"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { primaryCta } from "../lib/siteContent";

const helpItems = [
  "Transform guest sentiment into operational priorities",
  "Benchmark performance across hotels, groups or destinations",
  "Strengthen review-response strategy and governance",
  "Evaluate service delivery through mystery-guest audits",
  "Equip teams through practical on-site training and management meetings",
  "Build effective market-entry and regional-growth programs",
];

export default function Solutions() {
  return (
    <section id="solutions" className="relative overflow-hidden mesh-bg">
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal direction="left" className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">04</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-5xl">
              From Guest Feedback to Better Decisions
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-muted md:text-lg">
              Guest feedback is everywhere. Actionable direction is not.
            </p>
            <p className="mt-4 text-base leading-relaxed text-brand-muted md:text-lg">
              BizGate brings review data, guest sentiment, market knowledge and human judgment
              together — helping leadership teams understand what matters, decide what to improve
              and measure progress over time.
            </p>
          </Reveal>

          <Reveal direction="right" delay={0.08}>
            <div className="rounded-[1.75rem] bg-brand-navy p-8 text-white md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
                We help organizations
              </p>
              <ul className="mt-5 space-y-3">
                {helpItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/80 md:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-sky" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-white/70 md:text-base">
                Whether you are protecting reputation, improving guest experience or entering the
                GCC, let us define the right next step.
              </p>
              <Link href="/#contact" className="btn-primary on-dark mt-8">
                {primaryCta} →
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
