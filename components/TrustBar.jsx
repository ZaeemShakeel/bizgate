const highlights = [
  {
    title: "Consultation",
    copy: "We manage and assist organisations with their omni-channel marketing initiatives.",
  },
  {
    title: "Hotel Representation",
    copy: "For our international and regional hotels, we provide regional representation.",
  },
  {
    title: "Leisure & Retail",
    copy: "We play an integral role in all sales & marketing strategies, from creation to implementation.",
  },
  {
    title: "Public Relations",
    copy: "An all-encompassing trade and consumer PR service through editorial coverage.",
  },
  {
    title: "Special Projects",
    copy: "BizGate offers flexibility to our clients, whether looking for a long-term contract or project support.",
  },
];

export default function TrustBar() {
  return (
    <section className="relative overflow-hidden border-y border-brand-dark/10 bg-brand-dark text-white">
      <div className="texture-grid absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="reveal max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand-pale/70">
            Ahlan Wa Sahlan — Welcome
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] md:text-4xl">
            Focused on the future of travel. Connected to the travel trade.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
            We possess extensive knowledge of the Middle East market and its key leaders —
            proud to be recognized for success stories that help our clients’ brands stand
            out and gain market share.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className={`reveal reveal-delay-${(index % 3) + 1} border-t border-white/15 pt-5`}
            >
              <h3 className="font-display text-xl text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
