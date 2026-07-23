"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const team = [
  {
    name: "Mohamad Masri",
    role: "Founder",
    image: "/team-masri.jpg",
  },
  {
    name: "Bayan Othman",
    role: "Sales & Marketing Director",
    image: "/team-bayan.jpg",
  },
];

export default function Team() {
  return (
    <section id="team" className="border-y border-brand-line bg-brand-fog">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <Reveal className="max-w-2xl">
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

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:max-w-3xl">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={index * 0.1}>
              <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-brand-mist">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="font-display text-2xl font-semibold">{member.name}</h3>
                    <p className="mt-1 text-sm font-medium uppercase tracking-[0.14em] text-white/75">
                      {member.role}
                    </p>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
