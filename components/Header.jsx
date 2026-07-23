"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { label: "About Us", href: "#about" },
  { label: "Our Services", href: "#services" },
  { label: "Our Clients", href: "#clients" },
  { label: "Our Partners", href: "#partners" },
  { label: "Contacts", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "nav-blur border-b border-brand-dark/10 shadow-[0_8px_30px_rgba(54,68,65,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="relative z-10" aria-label="BizGate home">
          <Logo variant={scrolled || open ? "dark" : "light"} />
        </a>

        <nav className="hidden items-center gap-7 xl:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[0.92rem] font-medium tracking-wide transition-colors ${
                scrolled ? "text-brand-ink/80 hover:text-brand-dark" : "text-white/85 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+971506760033"
            className={`text-sm font-medium transition-colors ${
              scrolled ? "text-brand-ink/70 hover:text-brand-dark" : "text-white/75 hover:text-white"
            }`}
          >
            +971 50 676 0033
          </a>
          <a
            href="#contact"
            className={`inline-flex h-11 items-center rounded-full px-5 text-sm font-semibold transition-all duration-300 ${
              scrolled
                ? "bg-brand-dark text-white hover:bg-brand-ink"
                : "bg-white text-brand-dark hover:bg-brand-pale"
            }`}
          >
            Free consultation
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border xl:hidden ${
            scrolled || open ? "border-brand-dark/15 text-brand-dark" : "border-white/30 text-white"
          }`}
        >
          <span className="sr-only">Menu</span>
          <div className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-0.5 w-full rounded-full bg-current transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span className={`h-0.5 w-full rounded-full bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-full rounded-full bg-current transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <div
        className={`fixed inset-0 top-[4.5rem] bg-brand-sand/98 transition-all duration-300 xl:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-full flex-col gap-2 px-6 py-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-brand-dark/10 py-4 font-display text-3xl text-brand-dark"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-brand-dark text-sm font-semibold text-white"
          >
            Free consultation
          </a>
        </div>
      </div>
    </header>
  );
}
