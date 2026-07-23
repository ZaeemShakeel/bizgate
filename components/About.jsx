const mission = [
  "Industry expertise",
  "Cost efficiency",
  "Effective partnership",
  "Result driven sales & marketing services",
  "Dedication and innovative approach",
];

const strengths = [
  "Strong relationship with Arabic & English media.",
  "Established contacts with tour operators, travel agents and hoteliers across the Gulf region.",
  "High profile relationship with key government departments in UAE.",
];

const values = ["Credibility", "Feasibility", "Agility", "Simplicity"];

export default function About() {
  return (
    <section id="about" className="bg-brand-sand">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="reveal max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand-mid">Who we are</p>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] text-brand-dark md:text-5xl">
            Ahlan Wa Sahlan — Welcome to BizGate
          </h2>
          <p className="mt-6 text-base leading-relaxed text-brand-ink/70 md:text-lg">
            Welcome to BizGate — a dynamic marketing and consultancy agency strategically
            located in Dubai, which has started its activities in 2007. Focused on the future
            of travel and connected to the travel trade.
          </p>
          <p className="mt-4 text-base leading-relaxed text-brand-ink/70 md:text-lg">
            Established in Dubai since 2009 as a boutique tourism consultancy firm specializing
            in brand management, management advisory and digital transformation solutions. We
            pride ourselves on delivering the very best in marketing and PR support, business
            strategy and planning, market and demand forecasting, and technology consulting services.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="reveal border border-brand-dark/10 bg-white/60 p-8 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-mid">
              Our mission
            </p>
            <ul className="mt-6 space-y-4">
              {mission.map((item) => (
                <li key={item} className="flex gap-3 text-brand-ink/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-dark" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal reveal-delay-1 border border-brand-dark/10 bg-white/60 p-8 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-mid">
              Our strengths
            </p>
            <ul className="mt-6 space-y-4">
              {strengths.map((item) => (
                <li key={item} className="flex gap-3 text-brand-ink/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-dark" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="reveal reveal-delay-2 mt-10 bg-brand-dark p-8 text-white md:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand-pale/70">
            Authorised Marketing &amp; Consultancies Brand
          </p>
          <h3 className="mt-4 max-w-3xl font-display text-3xl tracking-[-0.02em]">
            We have built our reputation upon 4 core values.
          </h3>
          <p className="mt-4 max-w-2xl text-white/70">
            These principles define the way we consistently work across all of our projects.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value} className="border border-white/15 px-5 py-6 text-center">
                <p className="font-display text-2xl">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
