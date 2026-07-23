"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";

const links = [
  { label: "About Us", href: "#about" },
  { label: "Our Services", href: "#services" },
  { label: "How We Help", href: "#solutions" },
  { label: "Our Clients", href: "#clients" },
  { label: "Contacts", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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

  const solid = scrolled || open;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] bg-brand-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2.5 text-sm md:px-8">
          <p className="truncate text-white/85">
            Dubai hospitality growth partner — sales, marketing, advisory &amp; digital.
          </p>
          <a href="#contact" className="shrink-0 font-semibold text-brand-orange hover:text-white">
            Get a demo →
          </a>
        </div>
      </div>

      <header
        className={`fixed inset-x-0 top-[2.55rem] z-50 transition-all duration-300 ${
          solid
            ? "nav-blur border-b border-brand-line shadow-[0_10px_30px_rgba(42,92,170,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[4.4rem] max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="relative z-10" aria-label="BizGate home">
            <Logo variant={solid ? "dark" : "light"} />
          </a>

          <nav className="hidden items-center gap-7 xl:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-[0.92rem] font-medium tracking-wide transition-colors ${
                  solid ? "text-brand-ink/75 hover:text-brand-blue" : "text-white/85 hover:text-white"
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
                solid ? "text-brand-muted hover:text-brand-blue" : "text-white/75 hover:text-white"
              }`}
            >
              +971 50 676 0033
            </a>
            <a
              href="#contact"
              className={`inline-flex h-11 items-center rounded-full px-5 text-sm font-semibold transition-all ${
                solid
                  ? "bg-brand-blue text-white shadow-[0_8px_20px_rgba(42,92,170,0.25)] hover:bg-brand-navy"
                  : "bg-white text-brand-blue hover:bg-brand-mist"
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
              solid ? "border-brand-line text-brand-blue" : "border-white/30 text-white"
            }`}
          >
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

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="fixed inset-0 top-[calc(2.55rem+4.4rem)] bg-white xl:hidden"
            >
              <div className="flex h-full flex-col gap-1 px-6 py-8">
                {links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="border-b border-brand-line py-4 font-display text-3xl text-brand-ink"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-8"
                >
                  Free consultation
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
