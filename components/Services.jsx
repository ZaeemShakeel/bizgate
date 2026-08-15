"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { primaryCta } from "../lib/siteContent";

const services = [
  {
    id: "reputation",
    eyebrow: "01 · Digital Reputation",
    title: "Digital Reputation & Guest Experience Intelligence",
    copy: "Every review contains information about the guest experience. BizGate helps hotels transform that information into clear operational and commercial priorities.",
    points: [
      "Digital reputation audits and benchmarking",
      "Guest-sentiment and impact analysis",
      "Review-response strategy and governance",
      "Executive reporting and improvement plans",
    ],
    cta: "Request a Reputation Audit →",
    image: "/service-digital.jpg",
    alt: "Digital reputation analytics dashboard",
  },
  {
    id: "destination",
    eyebrow: "02 · Destination Programs",
    title: "Destination Reputation & Quality Programs",
    copy: "BizGate works with tourism authorities to monitor, benchmark and improve hospitality performance across their destinations.",
    points: [
      "Destination-wide hotel reputation monitoring",
      "Guest-sentiment and quality analysis",
      "Stakeholder and executive reporting",
      "Hotel engagement, workshops and training",
    ],
    cta: "Discuss a Destination Program →",
    image: "/service-advisory.jpg",
    alt: "Destination hospitality quality review",
  },
  {
    id: "hotel-group",
    eyebrow: "03 · Hotel Groups",
    title: "Hotel Group Performance Advisory",
    copy: "BizGate helps hotel groups replace fragmented guest-feedback data with a consistent view of performance across their portfolios.",
    points: [
      "Group and property-level performance reporting",
      "Comparative property benchmarking",
      "Group-wide review-response standards",
      "Executive summaries and leadership workshops",
    ],
    cta: "Book a Hotel Group Consultation →",
    image: "/service-sales.jpg",
    alt: "Hotel group performance review",
  },
  {
    id: "mystery-guest",
    eyebrow: "04 · Mystery Guest",
    title: "Mystery Guest & Service Quality Audits",
    copy: "Online reviews reveal how guests perceive their experience. Mystery-guest audits verify what actually happens during that experience and whether service delivery meets operational and brand standards.",
    points: [
      "Customized audit criteria and scoring",
      "Complete guest journey assessments",
      "Evidence-based reporting and executive summaries",
      "Corrective action plans, training and follow-up",
    ],
    cta: "Discuss a Mystery Guest Audit →",
    image: "/service-lobby.jpg",
    alt: "Hotel guest experience assessment",
  },
  {
    id: "gcc",
    eyebrow: "05 · GCC Market Entry",
    title: "GCC Market Entry & Representation",
    copy: "BizGate helps international hotels, destinations and travel companies enter and grow in the GCC through local knowledge, trusted relationships and direct market support.",
    points: [
      "Market assessment and entry strategy",
      "Sales representation and business development",
      "B2B roadshows, trade events and launch activities",
      "Local follow-up and market intelligence",
    ],
    cta: "Explore GCC Market Representation →",
    image: "/service-marketing.jpg",
    alt: "GCC market development meeting",
  },
  {
    id: "hospitality-tech",
    eyebrow: "06 · Hospitality Technology",
    title: "Hospitality Technology Market Development",
    copy: "BizGate helps hospitality technology companies enter and grow across the Middle East through market assessment, regional positioning, business development and local support.",
    points: [
      "Market potential and competitor assessment",
      "Introductions to hotel owners, groups and decision-makers",
      "Client onboarding and relationship support",
      "Arabic-language and cultural market support",
    ],
    cta: "Discuss Regional Growth Opportunities →",
    image: "/hero-growth.jpg",
    alt: "Hospitality technology partnership",
  },
];

const training = {
  title: "On-Site Training, Management Meetings & Executive Workshops",
  copy: "BizGate has conducted extensive on-site training, management meetings and executive workshops for hotels, hotel groups, tourism organizations and industry partners — turning insight into action with the people responsible for performance.",
  cta: "Discuss an On-Site Training or Management Session →",
};

export default function Services() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;

    const timer = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % services.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [paused]);

  function goTo(index) {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  }

  const service = services[active];

  return (
    <section id="services" className="relative bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">03 · Services</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl">
            Hospitality Insight, Regional Expertise and Practical Execution.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-muted">
            BizGate helps hospitality and tourism organizations strengthen their reputation,
            understand guest experience and grow across Middle Eastern markets. Clients may engage
            us for a focused assignment or combine several services into a long-term advisory
            program.
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
                  {service.points.map((point) => (
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
            Training &amp; Workshops
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] text-brand-ink md:text-3xl">
            {training.title}
          </h3>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brand-muted md:text-base">
            {training.copy}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/#contact" className="btn-primary h-11 px-5">
              {training.cta}
            </Link>
            <Link href="/#contact" className="btn-ghost h-11 px-5">
              {primaryCta}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
