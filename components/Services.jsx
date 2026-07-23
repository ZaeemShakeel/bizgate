"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
    reverse: true,
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
    reverse: true,
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
  return (
    <section id="services" className="relative bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">
            Our services
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-5xl">
            Marketing, representation, advisory, and digital solutions for hospitality.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brand-muted md:text-lg">
            Established in Dubai since 2009 as a boutique tourism consultancy specializing
            in brand management, management advisory, and digital transformation solutions.
          </p>
        </Reveal>

        <div className="mt-16 space-y-24 md:mt-24 md:space-y-32">
          {services.map((service, index) => (
            <article
              key={service.id}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <Reveal
                delay={0.05}
                className={`relative min-h-[300px] overflow-hidden rounded-[1.75rem] md:min-h-[420px] ${
                  service.reverse ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/45 via-transparent to-transparent" />
                <motion.div
                  className="absolute bottom-5 left-5 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Growth focused
                </motion.div>
              </Reveal>

              <Reveal delay={0.12} className={service.reverse ? "lg:order-1" : ""}>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-sky">
                  {service.eyebrow}
                </p>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl">
                  {service.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-brand-muted">{service.copy}</p>
                <ul className="mt-8 space-y-3">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-brand-ink/90">
                      <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-mist text-[10px] font-bold text-brand-blue">
                        ✓
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#contact" className="btn-primary">
                    Free consultation
                  </a>
                  <a href="#solutions" className="btn-ghost">
                    See how we help
                  </a>
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-brand-muted">
                  0{index + 1} / 04
                </p>
              </Reveal>
            </article>
          ))}
        </div>

        <div id="partners" className="mt-20 grid gap-5 md:grid-cols-3">
          {extras.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.08}
              className="rounded-2xl border border-brand-line bg-brand-fog/70 p-7 transition hover:border-brand-sky/40 hover:bg-white"
            >
              <div className="mb-4 h-1.5 w-10 rounded-full bg-gradient-to-r from-brand-blue to-brand-orange" />
              <h3 className="font-display text-2xl font-semibold text-brand-ink">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-brand-muted">{item.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
