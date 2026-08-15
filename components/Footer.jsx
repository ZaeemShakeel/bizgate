import Link from "next/link";
import Logo from "./Logo";
import { contactDetails, serviceNavItems } from "../lib/siteContent";

const companyLinks = [
  { label: "About BizGate", href: "/#about" },
  { label: "Founder", href: "/founder" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/#contact" },
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
            BizGate Marketing &amp; Consultancies — a specialist hospitality and tourism
            consultancy for digital reputation, guest experience intelligence, service quality
            and Middle East market growth.
          </p>
          <div className="mt-6 space-y-2 text-sm text-white/70">
            <p>{contactDetails.address}</p>
            <p>{contactDetails.poBox}</p>
            <a href={contactDetails.phoneHref} className="block hover:text-white">
              {contactDetails.phone}
            </a>
            <a href={`mailto:${contactDetails.email}`} className="block hover:text-white">
              {contactDetails.email}
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-sky">
            Company
          </p>
          <ul className="mt-5 space-y-3">
            {companyLinks.map((link) => (
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
            Services
          </p>
          <ul className="mt-5 space-y-3">
            {serviceNavItems.map((item) => (
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
          <p>
            © 2026 BizGate Marketing &amp; Consultancies. All rights reserved. Operating since
            2008 · Rebranded in 2010 · Dubai, UAE
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
