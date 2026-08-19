"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { useTranslations } from "next-intl";

export default function Solutions() {
  const t = useTranslations("Solutions");

  const helpItems = [
    t("item1"),
    t("item2"),
    t("item3"),
    t("item4"),
    t("item5"),
    t("item6"),
  ];

  return (
    <section id="solutions" className="relative overflow-hidden mesh-bg">
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal direction="left" className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-muted md:text-lg">
              {t("subTitle")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-brand-muted md:text-lg">
              {t("copy")}
            </p>
          </Reveal>

          <Reveal direction="right" delay={0.08}>
            <div className="rounded-[1.75rem] bg-brand-navy p-8 text-white md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
                {t("cardEyebrow")}
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
                {t("cardFooter")}
              </p>
              <Link href="/#contact" className="btn-primary on-dark mt-8 inline-block">
                {t("cta")} →
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
