"use client";

import Link from "next/link";
import Reveal from "./Reveal";

const pillars = [
  {
    title: "AI Readiness & Governance",
    copy: "We assess your objectives, tools and workflows before recommending where AI can create genuine value — including response governance, approval processes, brand-voice guidelines and practical staff training.",
  },
  {
    title: "Guest Experience Intelligence",
    copy: "AI-assisted analysis can transform large volumes of reviews and survey feedback into clearer themes and management priorities. BizGate adds human validation and operational context.",
  },
  {
    title: "Digital & AI Discoverability",
    copy: "We assess how your brand appears across websites, listings, reviews and AI-generated answers, then help strengthen the clarity, consistency and authority of its digital presence.",
  },
];

export default function HospitalityAI() {
  return (
    <section id="hospitality-ai" className="border-y border-brand-line bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
            Hospitality in the Age of AI
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl">
            AI Creates Value When Human Judgment Remains in Control.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brand-muted md:text-lg">
            Artificial intelligence can help hospitality teams analyse large volumes of guest
            feedback, identify patterns and prepare responses more efficiently. However, brand
            voice, cultural understanding, guest privacy, accuracy and sensitive decisions still
            require experienced human oversight.
          </p>
          <p className="mt-4 text-base leading-relaxed text-brand-muted md:text-lg">
            BizGate helps hospitality organizations adopt AI responsibly and practically —
            combining the speed of technology with regional expertise and human judgment.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pillars.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08} direction="up">
              <div className="h-full rounded-2xl border border-brand-line bg-brand-fog/60 p-6">
                <h3 className="font-display text-xl font-semibold text-brand-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">{item.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12} className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-base font-medium text-brand-ink">
            Technology can accelerate analysis. Human expertise determines what action to take.
          </p>
          <Link href="/#contact" className="btn-primary h-11 shrink-0 px-6">
            Discuss Your AI Readiness →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
