import { Playfair_Display, Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/site/smooth-scroll";
import Cursor from "@/components/site/cursor";
import Preloader from "@/components/site/preloader";
import ScrollProgress from "@/components/site/scroll-progress";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://royalfrenchcrepe.com"),
  title: {
    default: "Royal French Crêpe — L'Expérience Parisienne | Los Angeles & Las Vegas",
    template: "%s · Royal French Crêpe",
  },
  description:
    "Authentic premium French crêpes, handmade by French chefs from Paris. Sweet, savory & Royal Ossetra caviar crêpes — plus elegant mobile catering across LA, Las Vegas & California. Open 8:30 AM–3 AM.",
  keywords: [
    "French crepes",
    "Los Angeles crepes",
    "Las Vegas crepes",
    "crepe catering California",
    "Royal French Crepe",
    "Parisian crepes",
    "caviar crepe",
    "wedding crepe catering",
  ],
  openGraph: {
    title: "Royal French Crêpe — L'Expérience Parisienne",
    description:
      "Authentic premium French crêpes, handmade by French chefs. Sweet, savory & caviar crêpes, plus catering across LA, Las Vegas & California.",
    url: "https://royalfrenchcrepe.com",
    siteName: "Royal French Crêpe",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/marie-antoinette.jpg",
        width: 1000,
        height: 679,
        alt: "Marie Antoinette crêpe by Royal French Crêpe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Royal French Crêpe — L'Expérience Parisienne",
    description:
      "Authentic premium French crêpes & catering across LA, Las Vegas & California.",
    images: ["/images/marie-antoinette.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-noir">
        <Preloader />
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
