"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { useTranslations } from 'next-intl';

export default function Services() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const t = useTranslations('Services');
  const tHeader = useTranslations('Header');

  // Load services dynamically from translations
  const rawServicesList = t.raw('servicesList');
  // Need to ensure the default fallback values if something is missing
  const services = Array.isArray(rawServicesList) ? rawServicesList : [];

  useEffect(() => {
    if (paused) return undefined;

    const timer = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % services.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [paused, services.length]);

  function goTo(index) {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  }

  const service = services[active];

  if (!service) return null; // Safety check

  return (
    <section id="services" className="relative bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">{t('eyebrow')}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl">
            {t('headline')}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-muted">
            {t('intro')}
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {services.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(index)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                active === index
                  ? "bg-brand-blue text-white"
                  : "bg-brand-fog text-brand-muted hover:bg-brand-mist hover:text-brand-blue"
              }`}
            >
              0{index + 1}
            </button>
          ))}
        </div>

        <div
          className="relative mt-8 overflow-hidden rounded-[1.5rem] border border-brand-line bg-white shadow-[0_16px_40px_rgba(26,35,50,0.08)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.article
              key={service.id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-stretch lg:grid-cols-2"
            >
              <div className="relative min-h-[240px] overflow-hidden md:min-h-[360px]">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-ink">
                  0{active + 1} / 06
                </div>
              </div>

              <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-sky">
                  {service.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] text-brand-ink md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted md:text-base">
                  {service.copy}
                </p>
                <ul className="mt-5 space-y-2">
                  {service.points && service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-brand-ink/90">
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-mist text-[9px] font-bold text-brand-blue">
                        ✓
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/#contact" className="btn-primary h-11 px-5">
                    {service.cta}
                  </Link>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <Reveal delay={0.08} className="mt-12 rounded-2xl border border-brand-line bg-brand-fog/70 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-sky">
            {t('trainingEyebrow')}
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] text-brand-ink md:text-3xl">
            {t('trainingTitle')}
          </h3>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brand-muted md:text-base">
            {t('trainingCopy')}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/#contact" className="btn-primary h-11 px-5">
              {t('trainingCta')}
            </Link>
            <Link href="/#contact" className="btn-ghost h-11 px-5">
              {tHeader('primaryCta')}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
