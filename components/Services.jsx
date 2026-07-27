"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";

const services = [
  {
    id: "sales",
    eyebrow: "Hotel Sales Representation",
    title: "Regional representation for international and local hotel partners.",
    copy: "We provide regional representation for our international and regional hotel partners who benefit from our wealth of contacts in the travel trade fraternity. Our sales representatives assist you in driving more business to your hotel, with access to thousands of corporate travel buyers.",
    points: [
      "Corporate travel buyer access",
      "Travel trade fraternity network",
      "Market entry and demand generation",
    ],
    image: "/service-sales.jpg",
    alt: "Business team reviewing growth metrics",
  },
  {
    id: "marketing",
    eyebrow: "Brand & Marketing Management",
    title: "Omni-channel marketing that elevates brand performance across the GCC.",
    copy: "We help businesses with their omni-channel marketing efforts, overseeing the overall customer experience and brand performance strategy execution in the GCC region — to enrich brand presence and grow market share.",
    points: [
      "Brand performance strategy",
      "Customer experience oversight",
      "GCC-focused campaign execution",
    ],
    image: "/service-marketing.jpg",
    alt: "Marketing team collaborating on brand strategy",
  },
  {
    id: "advisory",
    eyebrow: "Management Advisory",
    title: "Consulting that supports planning, growth, and operational clarity.",
    copy: "We offer consulting services designed to assist all types of businesses — from robust financial planning to extensively researched, time-tested advice aimed at improving results and decision-making.",
    points: [
      "Business strategy and planning",
      "Market and demand forecasting",
      "Financial and management guidance",
    ],
    image: "/service-advisory.jpg",
    alt: "Advisory session in a modern boardroom",
  },
  {
    id: "digital",
    eyebrow: "Digital Transformation",
    title: "SaaS and technology solutions for visibility and guest experience.",
    copy: "We deliver outstanding SaaS applications that improve online visibility, business development, relationship management, digital touchpoints, and customer experience for hospitality operators.",
    points: [
      "Online visibility solutions",
      "Relationship management tools",
      "Digital guest touchpoints",
    ],
    image: "/service-digital.jpg",
    alt: "Digital analytics and transformation tools",
  },
];

const extras = [
  {
    title: "Offerings",
    copy: "Hotel sales representation support designed to drive more business through corporate buyers, trade partners, and regional commercial channels.",
  },
  {
    title: "Flexibility",
    copy: "Understanding customer needs is at the center of what we do. That’s why we offer flexible arrangements — long-term contracts or project-based support.",
  },
  {
    title: "Public Relations",
    copy: "An all-encompassing trade and consumer PR service through editorial coverage across Arabic and English media.",
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;

    const timer = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % services.length);
    }, 2000);

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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">
            Our services
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl">
            Marketing, representation, advisory, and digital solutions for hospitality.
          </h2>
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
              0{index + 1} {item.eyebrow.split(" ")[0]}
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
                  0{active + 1} / 04
                </div>
              </div>

              <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-sky">
                  {service.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] text-brand-ink md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted md:text-base">{service.copy}</p>
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
                    Free consultation
                  </Link>
                  <Link href="/#solutions" className="btn-ghost h-11 px-5">
                    See how we help
                  </Link>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div id="partners" className="mt-12 grid gap-4 md:grid-cols-3">
          {extras.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.08}
              direction={index === 1 ? "up" : index === 0 ? "left" : "right"}
              className="rounded-2xl border border-brand-line bg-brand-fog/70 p-5 transition hover:border-brand-sky/40 hover:bg-white"
            >
              <div className="mb-3 h-1 w-8 rounded-full bg-gradient-to-r from-brand-blue to-brand-orange" />
              <h3 className="font-display text-xl font-semibold text-brand-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
