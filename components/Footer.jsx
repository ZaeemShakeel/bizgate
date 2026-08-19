import Link from "next/link";
import Logo from "./Logo";
import { contactDetails } from "../lib/siteContent";
import { useTranslations, useLocale } from 'next-intl';

const companyLinks = [
  { key: "blog", href: "/blogs" },
  { key: "founder", href: "/founder" },
  { key: "insights", href: "/insights" },
  { key: "caseStudies", href: "/case-studies" },
  { key: "about", href: "/#about" },
  { key: "contact", href: "/#contact" },
];

const serviceDropdownItems = [
  { key: "reputation", href: "/#services" },
  { key: "destination", href: "/#services" },
  { key: "hotelGroup", href: "/#services" },
  { key: "mysteryGuest", href: "/#services" },
  { key: "gcc", href: "/#services" },
  { key: "hospitalityTech", href: "/#services" },
  { key: "training", href: "/#services" },
];

export default function Footer() {
  const t = useTranslations('Header');
  const tFooter = useTranslations('Footer');
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <footer className="bg-brand-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.3fr_1fr_1fr] md:px-8 md:py-20">
        <div>
          <Link href="/" aria-label="BizGate home">
            <Logo variant="light" />
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
            {isAr ? (
              "بيزجيت للتسويق والاستشارات: شركة استشارية متخصصة في قطاع السياحة والضيافة للسمعة الرقمية، وذكاء تجربة الضيوف، وجودة الخدمة، ونمو أسواق الشرق الأوسط."
            ) : (
              "BizGate Marketing & Consultancies: A specialist hospitality and tourism consultancy for digital reputation, guest experience intelligence, service quality and Middle East market growth."
            )}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-white/70">
            {isAr ? (
              <>
                مكتب 203، مركز الأعمال الذهبي، شارع آل مكتوم، بورسعيد، ديرة، دبي، الإمارات العربية المتحدة &middot; ص.ب. 234558 &middot; <a href={contactDetails.phoneHref} className="hover:text-white" dir="ltr">{contactDetails.phone}</a> &middot; <a href={`mailto:${contactDetails.email}`} className="hover:text-white">{contactDetails.email}</a>
              </>
            ) : (
              <>
                Office 203, Golden Business Center, Al Maktoum Road, Port Saeed, Deira, Dubai, UAE &middot; P.O. Box 234558 &middot; <a href={contactDetails.phoneHref} className="hover:text-white">{contactDetails.phone}</a> &middot; <a href={`mailto:${contactDetails.email}`} className="hover:text-white">{contactDetails.email}</a>
              </>
            )}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-sky">
            {tFooter('company')}
          </p>
          <ul className="mt-5 space-y-3">
            {companyLinks.map((link) => (
              <li key={link.key}>
                <Link href={link.href} className="text-white/75 transition hover:text-white">
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-sky">
            {tFooter('services')}
          </p>
          <ul className="mt-5 space-y-3">
            {serviceDropdownItems.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="text-white/75 transition hover:text-white">
                  {t(`servicesDropdown.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            {isAr ? (
              "© 2026 بيزجيت للتسويق والاستشارات. جميع الحقوق محفوظة. نعمل منذ 2008 · أُعيدت التسمية في 2010 · دبي، الإمارات العربية المتحدة"
            ) : (
              "© 2026 BizGate Marketing & Consultancies. All rights reserved. Operating since 2008 · Rebranded in 2010 · Dubai, UAE"
            )}
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">
              {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
            </Link>
            <Link href="/terms" className="hover:text-white">
              {isAr ? "شروط الاستخدام" : "Terms of Use"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
