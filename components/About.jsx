"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('About');
  const tHeader = useTranslations('Header');

  const differentiators = [
    {
      title: t('diff1Title'),
      copy: t('diff1Copy'),
    },
    {
      title: t('diff2Title'),
      copy: t('diff2Copy'),
    },
    {
      title: t('diff3Title'),
      copy: t('diff3Copy'),
    },
    {
      title: t('diff4Title'),
      copy: t('diff4Copy'),
    },
    {
      title: t('diff5Title'),
      copy: t('diff5Copy'),
    },
  ];

  const process = [
    { step: t('process1Step'), copy: t('process1Copy') },
    { step: t('process2Step'), copy: t('process2Copy') },
    { step: t('process3Step'), copy: t('process3Copy') },
    { step: t('process4Step'), copy: t('process4Copy') },
  ];

  const principles = t.raw('principles');

  return (
    <section id="about" className="overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <Reveal direction="left" className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">{t('eyebrow')}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-muted md:text-base">
              {t('copy1')}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted md:text-base">
              {t('copy2')}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/founder" className="btn-primary h-11 px-5">
                {t('founderBtn')}
              </Link>
              <Link href="/#contact" className="btn-ghost h-11 px-5">
                {tHeader('primaryCta')}
              </Link>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.08} className="relative mx-auto w-full max-w-[320px] lg:mx-0 lg:justify-self-end">
            <motion.div
              className="relative overflow-hidden rounded-2xl border border-brand-line bg-brand-fog shadow-[0_16px_40px_rgba(26,35,50,0.12)]"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative h-[340px] sm:h-[360px]">
                <Image
                  src="/founder.jpg"
                  alt="Mohamad Ibrahim Masri, Founder of BizGate"
                  fill
                  className="object-cover object-top"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                  {t('founderRole')}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold">Mohamad Ibrahim Masri</h3>
              </div>
            </motion.div>

            <motion.div
              className="absolute -left-3 top-5 rounded-xl border border-white/80 bg-white px-3 py-2 shadow-md"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-muted">{t('since')}</p>
              <p className="font-display text-lg font-semibold text-brand-blue">2008</p>
            </motion.div>
          </Reveal>
        </div>

        <Reveal delay={0.06} className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-sky">
            {t('diffEyebrow')}
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-brand-line bg-brand-fog/70 p-5"
              >
                <h3 className="font-display text-lg font-semibold text-brand-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.copy}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Reveal direction="left" className="rounded-2xl border border-brand-line bg-brand-fog/70 p-5 md:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-sky">{t('processEyebrow')}</p>
            <ul className="mt-4 space-y-4">
              {process.map((item) => (
                <li key={item.step}>
                  <p className="font-display text-lg font-semibold text-brand-ink">{item.step}</p>
                  <p className="mt-1 text-sm text-brand-muted">{item.copy}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-brand-muted">
              {t('processFooter')}
            </p>
          </Reveal>

          <Reveal direction="right" delay={0.08} className="rounded-2xl border border-brand-line bg-brand-fog/70 p-5 md:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-sky">{t('principlesEyebrow')}</p>
            <ul className="mt-4 space-y-3">
              {principles.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-brand-ink/90">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} direction="scale" className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1d22] via-[#2a2f36] to-[#1f8993] p-6 text-white md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            {t('regionalEyebrow')}
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
            {t('regionalTitle')}
          </h3>
          <Link href="/#contact" className="btn-primary on-dark mt-6 inline-flex h-11 items-center px-5">
            {tHeader('primaryCta')} →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
