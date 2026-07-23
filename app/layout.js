import { Libre_Bodoni, Jost } from "next/font/google";
import "./globals.css";

const display = Libre_Bodoni({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const body = Jost({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "BizGate | Hospitality Marketing & Consultancies",
  description:
    "Dubai-based hospitality marketing and consultancy agency. Hotel sales representation, brand management, digital transformation, and management advisory across the Middle East.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
