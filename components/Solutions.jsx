const items = [
  {
    problem: "“We need stronger hotel representation in the Middle East.”",
    solution: "Hotel Sales Representation",
    answer:
      "Regional representation with wealth of contacts in the travel trade fraternity and access to thousands of corporate travel buyers.",
  },
  {
    problem: "“Our brand needs omni-channel marketing across the GCC.”",
    solution: "Brand & Marketing Management",
    answer:
      "We oversee customer experience and brand performance strategy execution to enrich presence and grow market share.",
  },
  {
    problem: "“We need advisory support for planning and growth.”",
    solution: "Management Advisory",
    answer:
      "Consulting services from financial planning to researched, time-tested advice designed to assist all types of businesses.",
  },
  {
    problem: "“Our digital guest journey and visibility need upgrading.”",
    solution: "Digital Transformation",
    answer:
      "SaaS applications for online visibility, business development, relationship management, digital touchpoints, and customer experience.",
  },
  {
    problem: "“We need PR that reaches trade and consumer audiences.”",
    solution: "Public Relations",
    answer:
      "All-encompassing trade and consumer PR through editorial coverage, supported by strong Arabic and English media relationships.",
  },
  {
    problem: "“We want flexible engagement, not a rigid contract.”",
    solution: "Flexibility",
    answer:
      "Customer needs are at the center of what we do — long-term contracts or special project arrangements to suit your goals.",
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="relative overflow-hidden bg-brand-mist">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(153,153,153,0.22),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="reveal max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand-mid">
            How we help
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] text-brand-dark md:text-5xl">
            Businesses today cross borders — you need a partner that goes where you are.
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden bg-brand-dark/10 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={item.solution}
              className={`reveal reveal-delay-${(index % 3) + 1} bg-brand-sand p-7 md:p-8`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-mid">
                Challenge
              </p>
              <p className="mt-3 font-display text-xl leading-snug text-brand-dark">{item.problem}</p>
              <div className="mt-8 border-t border-brand-dark/10 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-dark">
                  BizGate: {item.solution}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-brand-ink/70">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
