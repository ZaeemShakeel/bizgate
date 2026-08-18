import { Sora, Manrope, Cairo, Tajawal } from "next/font/google";
import FloatingWhatsApp from "../../components/FloatingWhatsApp";
import "../globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '../../i18n/routing';
import {notFound} from 'next/navigation';

const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

const arabicDisplay = Tajawal({
  subsets: ["arabic"],
  variable: "--font-display",
  weight: ["400", "500", "700"],
});

const arabicBody = Cairo({
  subsets: ["arabic"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "BizGate | Hospitality Marketing & Consultancies",
  description:
    "Dubai-based hospitality marketing and consultancy agency. Hotel sales representation, brand management, digital transformation, and management advisory across the Middle East.",
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const isArabic = locale === 'ar';
  
  const fontClasses = isArabic 
    ? `${arabicDisplay.variable} ${arabicBody.variable} font-body antialiased`
    : `${display.variable} ${body.variable} font-body antialiased`;

  return (
    <html lang={locale} dir={isArabic ? 'rtl' : 'ltr'}>
      <body className={fontClasses}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <FloatingWhatsApp />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
