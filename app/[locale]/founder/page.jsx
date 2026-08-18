"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CTA from "../../../components/CTA";
import Reveal from "../../../components/Reveal";
import { useTranslations } from 'next-intl';

const ease = [0.22, 1, 0.36, 1];

const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function FounderPage() {
  const t = useTranslations('Founder');
  
  const rawExperienceList = t.raw('experienceList');
  const experienceList = Array.isArray(rawExperienceList) ? rawExperienceList : [];

  return (
    <main className="overflow-x-hidden">
      <Header />

      <section className="relative min-h-[86svh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease }}
        >
          <Image
            src="/hero-growth.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(11,18,32,0.92),rgba(22,58,107,0.72),rgba(18,20,24,0.5))]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-black/25" />
        </motion.div>

        <div className="relative mx-auto grid min-h-[86svh] max-w-7xl items-center gap-10 px-5 pb-16 pt-40 md:px-8 md:pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div variants={heroStagger} initial="hidden" animate="show">
            <motion.p
              variants={heroItem}
              className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-orange"
            >
              {t('title')}
            </motion.p>
            <motion.h1
              variants={heroItem}
              className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-white md:text-6xl"
            >
              {t('name')}
            </motion.h1>
            <motion.p
              variants={heroItem}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg"
            >
              {t('bio1')}
            </motion.p>

            <motion.div variants={heroItem} className="mt-10 flex flex-wrap gap-3">
              <a href={t('linkedinUrl')} target="_blank" rel="noreferrer" className="btn-primary on-dark">
                {t('connect')}
              </a>
              <Link href="/#contact" className="btn-secondary">
                Talk to Mohamad
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-[380px] lg:mx-0 lg:justify-self-end"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.8, ease }}
          >
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/20 shadow-[0_28px_70px_rgba(8,20,40,0.45)]">
              <div className="relative h-[420px] sm:h-[480px]">
                <Image
                  src="/founder.jpg"
                  alt={t('name')}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 80vw, 380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                  {t('title')}
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold">
                  {t('name')}
                </h2>
              </div>
            </div>

            <motion.div
              className="absolute -left-4 top-8 rounded-xl border border-white/70 bg-white px-4 py-3 shadow-lg"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-muted">
                Based in
              </p>
              <p className="font-display text-lg font-semibold text-brand-blue">Dubai</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-brand-white">
        <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">
              Experience
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl">
              {t('experienceTitle')}
            </h2>
            
            <ul className="mt-8 space-y-4">
              {experienceList.map((item, index) => (
                <li key={index} className="flex gap-4 rounded-2xl border border-brand-line bg-white p-6 shadow-sm">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-sky/10 text-[11px] font-bold text-brand-blue">
                    ✓
                  </span>
                  <span className="text-base leading-relaxed text-brand-ink/90">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
