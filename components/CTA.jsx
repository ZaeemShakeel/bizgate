"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { useTranslations, useLocale } from "next-intl";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const areaOfInterestKeys = [
  "reputation",
  "destination",
  "hotelGroup",
  "mysteryGuest",
  "gcc",
  "hospitalityTech",
  "training",
  "other",
];

export default function CTA() {
  const t = useTranslations("CTA");
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const form = event.currentTarget;
    const data = {
      fullName: form.fullName.value.trim(),
      organization: form.organization.value.trim(),
      jobTitle: form.jobTitle.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      countryOrMarket: form.countryOrMarket.value.trim(),
      website: form.website.value.trim(),
      areaOfInterest: form.areaOfInterest.value,
      objectives: form.objectives.value.trim(),
      preferredLanguage: form.preferredLanguage.value,
    };

    try {
      const res = await fetch(`${API_URL}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.message || t("errorDefault"));
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err.message || t("errorDefault"));
    } finally {
      setSubmitting(false);
    }
  }

  const isArabic = locale === "ar";

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/cta-growth.jpg"
          alt="Dubai business district at night"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#121416]/88" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(18,20,24,0.9),rgba(42,92,170,0.45))]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-14 md:px-8 md:py-16 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <Reveal direction={isArabic ? "right" : "left"}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
            {t("copy")}
          </p>
          <p className="mt-3 max-w-xl text-xs text-white/60 md:text-sm">
            {t("subcopy")}
          </p>

          <div className="mt-8 grid gap-4 text-sm text-white/80 sm:grid-cols-2 lg:grid-cols-1">
            <p>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
                {t("addressLabel")}
              </span>
              {t("addressValue")}
            </p>
            <p>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
                {t("phoneLabel")}
              </span>
              <a href="tel:+97142981775" className="hover:text-white transition">
                +971 4 298 1775
              </a>
            </p>
            <p>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
                {t("emailLabel")}
              </span>
              <a href="mailto:admin@bizgate.info" className="hover:text-white transition">
                admin@bizgate.info
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal direction={isArabic ? "left" : "right"} delay={0.08}>
          <motion.div
            initial={{ opacity: 0.9, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/20 bg-white p-5 text-brand-ink shadow-[0_20px_50px_rgba(0,0,0,0.28)] md:p-6"
          >
            {submitted ? (
              <div className="flex min-h-[300px] flex-col justify-center">
                <p className="font-display text-2xl font-semibold text-brand-blue">
                  {t("successTitle")}
                </p>
                <p className="mt-3 text-sm text-brand-muted">
                  {t("successMessage")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="font-display text-xl font-semibold text-brand-ink">
                  {t("formTitle")}
                </p>
                {error ? (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
                ) : null}
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="mb-1 block text-xs font-medium text-brand-ink/80">
                      {t("fullName")}
                    </span>
                    <input
                      required
                      name="fullName"
                      className="h-10 w-full rounded-lg border border-brand-line bg-brand-fog px-3 outline-none transition focus:border-brand-blue"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1 block text-xs font-medium text-brand-ink/80">
                      {t("organization")}
                    </span>
                    <input
                      required
                      name="organization"
                      className="h-10 w-full rounded-lg border border-brand-line bg-brand-fog px-3 outline-none transition focus:border-brand-blue"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="mb-1 block text-xs font-medium text-brand-ink/80">
                      {t("jobTitle")}
                    </span>
                    <input
                      required
                      name="jobTitle"
                      className="h-10 w-full rounded-lg border border-brand-line bg-brand-fog px-3 outline-none transition focus:border-brand-blue"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1 block text-xs font-medium text-brand-ink/80">
                      {t("email")}
                    </span>
                    <input
                      required
                      type="email"
                      name="email"
                      className="h-10 w-full rounded-lg border border-brand-line bg-brand-fog px-3 outline-none transition focus:border-brand-blue"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="mb-1 block text-xs font-medium text-brand-ink/80">
                      {t("phone")}
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      className="h-10 w-full rounded-lg border border-brand-line bg-brand-fog px-3 outline-none transition focus:border-brand-blue"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1 block text-xs font-medium text-brand-ink/80">
                      {t("country")}
                    </span>
                    <input
                      required
                      name="countryOrMarket"
                      className="h-10 w-full rounded-lg border border-brand-line bg-brand-fog px-3 outline-none transition focus:border-brand-blue"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="mb-1 block text-xs font-medium text-brand-ink/80">
                      {t("website")}
                    </span>
                    <input
                      name="website"
                      placeholder="https://..."
                      className="h-10 w-full rounded-lg border border-brand-line bg-brand-fog px-3 outline-none transition focus:border-brand-blue"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1 block text-xs font-medium text-brand-ink/80">
                      {t("preferredLanguage")}
                    </span>
                    <select
                      required
                      name="preferredLanguage"
                      defaultValue={locale}
                      className="h-10 w-full rounded-lg border border-brand-line bg-brand-fog px-3 outline-none transition focus:border-brand-blue"
                    >
                      <option value="en">{t("languages.en")}</option>
                      <option value="ar">{t("languages.ar")}</option>
                    </select>
                  </label>
                </div>

                <label className="block text-sm">
                  <span className="mb-1 block text-xs font-medium text-brand-ink/80">
                    {t("areaOfInterest")}
                  </span>
                  <select
                    required
                    name="areaOfInterest"
                    defaultValue=""
                    className="h-10 w-full rounded-lg border border-brand-line bg-brand-fog px-3 outline-none transition focus:border-brand-blue"
                  >
                    <option value="" disabled>---</option>
                    {areaOfInterestKeys.map((key) => (
                      <option key={key} value={t(`areasOfInterest.${key}`)}>
                        {t(`areasOfInterest.${key}`)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm">
                  <span className="mb-1 block text-xs font-medium text-brand-ink/80">
                    {t("objectives")}
                  </span>
                  <textarea
                    required
                    name="objectives"
                    rows={3}
                    className="w-full rounded-lg border border-brand-line bg-brand-fog px-3 py-2 outline-none transition focus:border-brand-blue"
                  />
                </label>

                <p className="text-[11px] text-brand-muted">
                  {t("privacyNotice")}
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary h-11 w-full sm:w-auto disabled:opacity-60"
                >
                  {submitting ? t("submitting") : t("submit")}
                </button>
              </form>
            )}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
