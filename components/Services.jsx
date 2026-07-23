import Image from "next/image";

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
    image: "/service-lobby.jpg",
    alt: "Hotel lobby ready for guests",
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
    image: "/service-resort.jpg",
    alt: "Resort architecture and hospitality design",
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
    image: "/cta-hotel.jpg",
    alt: "Contemporary hotel facade",
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
    image: "/hero-hotel.jpg",
    alt: "Hotel property exterior",
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
    <section id="services" className="relative bg-brand-sand">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand-mid">
            Our services
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] text-brand-dark md:text-5xl">
            Marketing, representation, advisory, and digital solutions for hospitality.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brand-ink/70 md:text-lg">
            Established in Dubai since 2009 as a boutique tourism consultancy specializing
            in brand management, management advisory, and digital transformation solutions.
          </p>
        </div>

        <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
          {services.map((service, index) => (
            <article
              key={service.id}
              className={`reveal reveal-delay-${(index % 3) + 1} grid items-center gap-10 lg:grid-cols-2 lg:gap-16`}
            >
              <div
                className={`relative min-h-[320px] overflow-hidden md:min-h-[420px] ${
                  service.reverse ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover transition duration-700 hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/35 to-transparent" />
              </div>

              <div className={service.reverse ? "lg:order-1" : ""}>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-mid">
                  {service.eyebrow}
                </p>
                <h3 className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] text-brand-dark md:text-4xl">
                  {service.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-brand-ink/70">{service.copy}</p>
                <ul className="mt-8 space-y-3">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-brand-ink/85">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-dark" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    className="inline-flex h-11 items-center rounded-full bg-brand-dark px-5 text-sm font-semibold text-white transition hover:bg-brand-ink"
                  >
                    Free consultation
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div id="partners" className="mt-20 grid gap-6 md:grid-cols-3">
          {extras.map((item, index) => (
            <div
              key={item.title}
              className={`reveal reveal-delay-${index + 1} border-t border-brand-dark/15 bg-white/50 p-7`}
            >
              <h3 className="font-display text-2xl text-brand-dark">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-brand-ink/70">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
