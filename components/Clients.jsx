"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { useTranslations } from "next-intl";

const clientLogos = ["01", "02", "03", "04", "06", "07", "08", "09", "10", "11", "12", "13", "14"];

export default function Clients() {
  const loop = [...clientLogos, ...clientLogos];
  const t = useTranslations("Clients");

  return (
    <section id="clients" className="overflow-hidden border-y border-brand-line bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-muted md:text-base">
            {t("copy")}
          </p>
        </Reveal>

        <div className="pb-8 pt-12" dir="ltr">
          <div className="marquee-track items-center gap-6 px-5">
            {loop.map((id, index) => (
              <div
                key={`${id}-${index}`}
                className="relative flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-brand-line bg-brand-fog px-4"
              >
                <Image
                  src={`/client${id}.jpg`}
                  alt={`BizGate client ${id}`}
                  width={140}
                  height={60}
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
