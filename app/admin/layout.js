import { Sora, Manrope } from "next/font/google";
import "../globals.css";

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

export const metadata = {
  title: 'BizGate Admin',
  description: 'BizGate Admin Panel',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-body antialiased bg-brand-fog`}>
        {children}
      </body>
    </html>
  )
}
