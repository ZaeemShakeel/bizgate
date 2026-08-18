"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { useTranslations } from 'next-intl';

export default function HospitalityAI() {
  const t = useTranslations('HospitalityAI');

  // Load pillars dynamically from translations
  const rawPillars = t.raw('pillars');
  const pillars = Array.isArray(rawPillars) ? rawPillars : [];

  return (
    <section id="hospitality-ai" className="border-y border-brand-line bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
            {t('eyebrow')}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl">
            {t('headline')}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brand-muted md:text-lg">
            {t('intro1')}
          </p>
          <p className="mt-4 text-base leading-relaxed text-brand-muted md:text-lg">
            {t('intro2')}
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
            {t('footerText')}
          </p>
          <Link href="/#contact" className="btn-primary h-11 shrink-0 px-6">
            {t('cta')}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
