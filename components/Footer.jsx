import Link from "next/link";
import Logo from "./Logo";

const serviceLinks = [
  { label: "Hotel Sales Representation", href: "/#services" },
  { label: "Brand & Marketing Management", href: "/#services" },
  { label: "Management Advisory", href: "/#services" },
  { label: "Digital Transformation", href: "/#services" },
  { label: "Case Studies", href: "/case-studies" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Our Services", href: "/#services" },
  { label: "How We Help", href: "/#solutions" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About Us", href: "/#about" },
  { label: "Contacts", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.3fr_1fr_1fr] md:px-8 md:py-20">
        <div>
          <Link href="/" aria-label="BizGate home">
            <Logo variant="light" />
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
            BizGate Marketing &amp; Consultancies — a Dubai-based agency helping hospitality
            and tourism brands grow through sales representation, marketing, PR, advisory,
            and digital transformation.
          </p>
          <div className="mt-6 space-y-2 text-sm text-white/70">
            <p>Maktoum Road, Golden Building — Dubai</p>
            <a href="tel:+971506760033" className="block hover:text-white">
              +971 50 676 0033
            </a>
            <a href="mailto:info@bizgate.info" className="block hover:text-white">
              info@bizgate.info
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-sky">
            Quick links
          </p>
          <ul className="mt-5 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-white/75 transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-sky">
            Our services
          </p>
          <ul className="mt-5 space-y-3">
            {serviceLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-white/75 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© 2009–{new Date().getFullYear()} By BizGate. All Rights Reserved.</p>
          <p>Call us for any question or concern</p>
        </div>
      </div>
    </footer>
  );
}
