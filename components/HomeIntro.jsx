"use client";

import Reveal from "./Reveal";

export default function HomeIntro() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">02</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl">
            Regional Knowledge. Senior Attention. Practical Action.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brand-muted md:text-lg">
            BizGate works at the intersection of hospitality, technology and changing market
            conditions. We combine regional relationships, an understanding of market culture and
            needs, and guest-experience expertise to turn complex information into clear,
            measurable action.
          </p>
          <p className="mt-4 text-base leading-relaxed text-brand-muted md:text-lg">
            Every engagement receives direct senior involvement from professionals who understand
            hospitality operations, guest sentiment in Arabic and English, and the realities of
            doing business across the Middle East.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
