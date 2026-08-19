"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { useTranslations } from "next-intl";
import {
  clientExperience,
  leadershipExperience,
  technologyPartners,
} from "../lib/siteContent";

const clientLogos = ["01", "02", "03", "04", "06", "07", "08", "09", "10", "11", "12", "13", "14"];

const logoMapping = {
  // Founder & leadership experience
  "Singapore Airlines": "/images/logo/Singapore_Airlines_Logo_2.svg.webp",
  "Malaysia Tourism Promotion Board": "/images/logo/malasiay.png",
  "Wego": "/images/logo/wego.jpg",

  // Selected client & partner experience
  "Philippine Department of Tourism": "/images/logo/Philippine Department of Tourism.jpg",
  "Berjaya": "/images/logo/Berjaya.png",
  "Sunway": "/images/logo/Sunway_logo.png",
  "Pyramisa": "/images/logo/Pyramisa.jpg",
  "IPMagix": "/images/logo/IPMagix.jpg",

  // Technology partners
  "TrustYou": "/images/logo/TrustYou.png",
  "Canary Technologies": "/images/logo/Canary_Technologies_Logo.jpg",
};

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

        <div className="mt-12 grid gap-6 lg:grid-cols-3 items-stretch">
          <Reveal direction="left" className="rounded-2xl border border-brand-line bg-brand-fog/70 p-6 flex flex-col h-full">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-sky">
              {t("cat1")}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 content-start flex-1">
              {leadershipExperience.map((name, index) => {
                const logoSrc = logoMapping[name];
                const isLastOdd = leadershipExperience.length % 2 !== 0 && index === leadershipExperience.length - 1;
                return (
                  <div
                    key={name}
                    className={`flex h-14 w-full items-center justify-center rounded-xl bg-white p-3 shadow-sm border border-brand-line/30 transition hover:shadow-md ${
                      isLastOdd ? "col-span-2" : ""
                    }`}
                  >
                    {logoSrc ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={logoSrc}
                          alt={name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                      </div>
                    ) : (
                      <span className="text-sm font-semibold text-brand-ink">{name}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.06} className="rounded-2xl border border-brand-line bg-brand-fog/70 p-6 flex flex-col h-full">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-sky">
              {t("cat2")}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 content-start flex-1">
              {clientExperience.map((name, index) => {
                const logoSrc = logoMapping[name];
                const isLastOdd = clientExperience.length % 2 !== 0 && index === clientExperience.length - 1;
                return (
                  <div
                    key={name}
                    className={`flex h-14 w-full items-center justify-center rounded-xl bg-white p-3 shadow-sm border border-brand-line/30 transition hover:shadow-md ${
                      isLastOdd ? "col-span-2" : ""
                    }`}
                  >
                    {logoSrc ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={logoSrc}
                          alt={name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                      </div>
                    ) : (
                      <span className="text-sm font-semibold text-brand-ink">{name}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1} className="rounded-2xl border border-brand-line bg-brand-fog/70 p-6 flex flex-col h-full">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-sky">
              {t("cat3")}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 content-start flex-1">
              {technologyPartners.map((name, index) => {
                const logoSrc = logoMapping[name];
                const isLastOdd = technologyPartners.length % 2 !== 0 && index === technologyPartners.length - 1;
                return (
                  <div
                    key={name}
                    className={`flex h-14 w-full items-center justify-center rounded-xl bg-white p-3 shadow-sm border border-brand-line/30 transition hover:shadow-md ${
                      isLastOdd ? "col-span-2" : ""
                    }`}
                  >
                    {logoSrc ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={logoSrc}
                          alt={name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                      </div>
                    ) : (
                      <span className="text-sm font-semibold text-brand-ink">{name}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="pb-16 pt-12" dir="ltr">
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
