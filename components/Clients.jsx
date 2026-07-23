import Image from "next/image";

const clients = [
  "01",
  "02",
  "03",
  "04",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
];

export default function Clients() {
  const loop = [...clients, ...clients];

  return (
    <section id="clients" className="overflow-hidden border-y border-brand-dark/10 bg-brand-fog/40">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="reveal flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand-mid">
              Our clients
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-[-0.02em] text-brand-dark md:text-4xl">
              Trusted by hospitality and travel partners across the region.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-brand-ink/65">
            From brand introduction to ongoing sales and marketing support, BizGate partners
            with hotels and tourism brands that want measurable Middle East growth.
          </p>
        </div>
      </div>

      <div className="pb-16 md:pb-20">
        <div className="marquee-track items-center gap-10 px-5">
          {loop.map((id, index) => (
            <div
              key={`${id}-${index}`}
              className="relative flex h-20 w-40 shrink-0 items-center justify-center bg-white px-4"
            >
              <Image
                src={`/client${id}.jpg`}
                alt={`BizGate client ${id}`}
                width={140}
                height={60}
                className="max-h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
