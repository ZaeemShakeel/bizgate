"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import {
  clientExperience,
  leadershipExperience,
  technologyPartners,
} from "../lib/siteContent";

const clientLogos = ["01", "02", "03", "04", "06", "07", "08", "09", "10", "11", "12", "13", "14"];

export default function Clients() {
  const loop = [...clientLogos, ...clientLogos];

  return (
    <section id="clients" className="overflow-hidden border-y border-brand-line bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">
            Experience &amp; Partners
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl">
            Leadership experience, client work and technology partnerships — kept distinct.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-muted md:text-base">
            Founder and leadership experience reflects career history. Selected client experience
            reflects organizations BizGate has supported. Technology partners are named where
            relevant — BizGate remains an independent advisor, not a single-vendor reseller.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Reveal direction="left" className="rounded-2xl border border-brand-line bg-brand-fog/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-sky">
              Founder &amp; leadership experience
            </p>
            <ul className="mt-4 space-y-2">
              {leadershipExperience.map((name) => (
                <li key={name} className="text-sm font-medium text-brand-ink">
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.06} className="rounded-2xl border border-brand-line bg-brand-fog/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-sky">
              Selected client &amp; partner experience
            </p>
            <ul className="mt-4 space-y-2">
              {clientExperience.map((name) => (
                <li key={name} className="text-sm font-medium text-brand-ink">
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="right" delay={0.1} className="rounded-2xl border border-brand-line bg-brand-fog/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-sky">
              Technology partners
            </p>
            <ul className="mt-4 space-y-2">
              {technologyPartners.map((name) => (
                <li key={name} className="text-sm font-medium text-brand-ink">
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="pb-16 pt-12">
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
