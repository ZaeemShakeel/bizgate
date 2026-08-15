"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { primaryCta, serviceNavItems } from "../lib/siteContent";

const links = [
  { label: "About BizGate", href: "/#about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

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
      <div className="fixed inset-x-0 top-0 z-[60]">
        <div className="bg-brand-navy text-white">
          <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-5 text-sm md:px-8">
            <p className="truncate text-white/85">
              Hospitality reputation, guest experience &amp; regional growth · Dubai
            </p>
            <Link
              href="/#contact"
              className="shrink-0 font-semibold text-brand-orange hover:text-white"
            >
              {primaryCta} →
            </Link>
          </div>
        </div>

        <header
          className={`transition-all duration-300 ${
            solid
              ? "nav-blur border-b border-brand-line shadow-[0_10px_30px_rgba(42,92,170,0.08)]"
              : "bg-transparent"
          }`}
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[4.25rem] md:px-8">
            <Link href="/" className="relative z-10" aria-label="BizGate home">
              <Logo variant={solid ? "dark" : "light"} />
            </Link>

            <nav className="hidden items-center gap-6 xl:flex">
              <Link
                href="/"
                className={`text-[0.92rem] font-medium tracking-wide transition-colors ${
                  solid
                    ? "text-brand-ink/75 hover:text-brand-blue"
                    : "text-white/85 hover:text-white"
                }`}
              >
                Home
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href="/#services"
                  className={`inline-flex items-center gap-1 text-[0.92rem] font-medium tracking-wide transition-colors ${
                    solid
                      ? "text-brand-ink/75 hover:text-brand-blue"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  Services
                  <span className="text-[10px] opacity-70">▾</span>
                </Link>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute left-0 top-full z-50 mt-3 w-72 rounded-2xl border border-brand-line bg-white p-2 shadow-[0_16px_40px_rgba(26,35,50,0.12)]"
                    >
                      {serviceNavItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block rounded-xl px-3 py-2.5 text-sm text-brand-ink/85 transition hover:bg-brand-fog hover:text-brand-blue"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[0.92rem] font-medium tracking-wide transition-colors ${
                    solid
                      ? "text-brand-ink/75 hover:text-brand-blue"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/founder"
                className={`text-[0.92rem] font-medium tracking-wide transition-colors ${
                  solid
                    ? "text-brand-ink/60 hover:text-brand-blue"
                    : "text-white/65 hover:text-white"
                }`}
              >
                Founder
              </Link>
            </nav>

            <div className="hidden items-center gap-4 lg:flex">
              <Link
                href="/#contact"
                className={`inline-flex h-10 items-center rounded-full px-5 text-sm font-semibold transition-all ${
                  solid
                    ? "bg-brand-blue text-white shadow-[0_8px_20px_rgba(42,92,170,0.25)] hover:bg-brand-navy"
                    : "bg-white text-brand-blue hover:bg-brand-mist"
                }`}
              >
                {primaryCta}
              </Link>
            </div>

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border xl:hidden ${
                solid ? "border-brand-line text-brand-blue" : "border-white/30 text-white"
              }`}
            >
              <div className="flex w-5 flex-col gap-1.5">
                <span
                  className={`h-0.5 w-full rounded-full bg-current transition-transform ${
                    open ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full rounded-full bg-current transition-opacity ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full rounded-full bg-current transition-transform ${
                    open ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-0 top-[calc(2.25rem+4rem)] z-[55] overflow-y-auto bg-white md:top-[calc(2.25rem+4.25rem)] xl:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-8">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="block border-b border-brand-line py-4 font-display text-3xl text-brand-ink"
              >
                Home
              </Link>
              <Link
                href="/#services"
                onClick={() => setOpen(false)}
                className="block border-b border-brand-line py-4 font-display text-3xl text-brand-ink"
              >
                Services
              </Link>
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-brand-line py-4 font-display text-3xl text-brand-ink"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/founder"
                onClick={() => setOpen(false)}
                className="block border-b border-brand-line py-4 font-display text-3xl text-brand-ink"
              >
                Founder
              </Link>
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-8"
              >
                {primaryCta}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
