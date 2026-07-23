import Image from "next/image";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero-hotel.jpg"
          alt="Luxury hotel exterior at dusk"
          fill
          priority
          className="object-cover kenburns"
          sizes="100vw"
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(204,204,203,0.18),transparent_40%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-36 md:px-8 md:pb-24 lg:justify-center lg:pb-20">
        <div className="max-w-3xl">
          <p className="animate-float-in mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-white/75">
            Welcome to BizGate
          </p>
          <h1 className="animate-float-in-delay font-display text-[2.35rem] font-medium leading-[1.1] tracking-[-0.03em] text-white md:text-5xl lg:text-[3.5rem]">
            We give your company and brand a boost.
          </h1>
          <p className="animate-float-in-delay-2 mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            A dynamic marketing and consultancy agency in Dubai — focused on the
            future of travel, connected to the travel trade, and helping hospitality
            brands stand out and gain market share.
          </p>
          <div className="animate-float-in-delay-2 mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex h-12 items-center rounded-full bg-white px-7 text-sm font-semibold text-brand-dark transition hover:bg-brand-pale"
            >
              Free consultation
            </a>
            <a
              href="#services"
              className="inline-flex h-12 items-center rounded-full border border-white/35 px-7 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Our services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
