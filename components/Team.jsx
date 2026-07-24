"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Mohamad Masri",
    role: "Founder",
    image: "/team-masri.jpg",
    note: "Strategy, partnerships & regional growth leadership.",
  },
  {
    name: "Bayan Othman",
    role: "Sales & Marketing Director",
    image: "/team-bayan.jpg",
    note: "Brand performance, sales pipelines and market execution.",
  },
];

export default function Team() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-card-left", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".team-card-right", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="team" ref={sectionRef} className="relative overflow-hidden border-y border-brand-line bg-brand-fog">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-sky/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">
            Professionals
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-brand-ink md:text-4xl">
            Our management team
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-muted">
            Our managed services help hospitality brands succeed — let’s get started.
          </p>
        </Reveal>

        <div className="relative mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`${index === 0 ? "team-card-left md:mt-8" : "team-card-right md:-mt-2"} group relative`}
            >
              <motion.article
                whileHover={{ y: -10 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden rounded-[1.75rem] border border-brand-line bg-brand-mist shadow-[0_20px_50px_rgba(42,92,170,0.1)]"
              >
                <div className="relative h-[380px] w-full overflow-hidden sm:h-[420px] md:h-[460px]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 45vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.16em] ${
                        index === 0 ? "text-brand-orange" : "text-brand-sky"
                      }`}
                    >
                      {member.role}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold md:text-3xl">{member.name}</h3>
                    <p className="mt-2 text-sm text-white/75">{member.note}</p>
                  </div>
                </div>
              </motion.article>

              {index === 1 && (
                <motion.div
                  className="absolute -right-2 top-8 hidden rounded-full bg-brand-blue px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-lg md:block"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  Leadership
                </motion.div>
              )}
            </div>
          ))}

          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white text-sm font-semibold text-brand-blue shadow-xl md:flex"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, type: "spring", stiffness: 220, damping: 16 }}
          >
            +
          </motion.div>
        </div>
      </div>
    </section>
  );
}
