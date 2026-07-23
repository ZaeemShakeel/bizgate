import Image from "next/image";

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
    <section id="team" className="border-y border-brand-dark/10 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <div className="reveal max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand-mid">
            Professionals
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] text-brand-dark md:text-4xl">
            Our management team
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-ink/70">
            Our managed services help hospitality brands succeed — let’s get started.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:max-w-3xl">
          {team.map((member, index) => (
            <article
              key={member.name}
              className={`reveal reveal-delay-${index + 1} group`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-brand-mist">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 40vw"
                />
              </div>
              <div className="mt-5">
                <h3 className="font-display text-2xl text-brand-dark">{member.name}</h3>
                <p className="mt-1 text-sm font-medium uppercase tracking-[0.16em] text-brand-mid">
                  {member.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
