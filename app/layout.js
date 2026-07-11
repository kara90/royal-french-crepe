import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/site/smooth-scroll";
import Cursor from "@/components/site/cursor";
import Preloader from "@/components/site/preloader";
import ScrollProgress from "@/components/site/scroll-progress";
import { faqs } from "@/lib/faq";

// One clean, warm, highly-readable family across the whole site (with real
// italics for the elegant accents). Hierarchy comes from weight + size.
const display = Hanken_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const serif = Hanken_Grotesk({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const geist = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://royalfrenchcrepe.com"),
  title: {
    default:
      "Royal French Crêpe — Authentic French Crêpes & Catering | Los Angeles & Las Vegas",
    template: "%s · Royal French Crêpe",
  },
  description:
    "Authentic French crêpes, handmade by real French chefs from Paris — the taste of France in Los Angeles, Las Vegas and across California & Nevada. Sweet, savory & Royal Ossetra caviar crêpes, plus live crêpe-station catering for weddings and events. Real French crêpes since 2007.",
  applicationName: "Royal French Crêpe",
  keywords: [
    "authentic French crepes",
    "French crepes",
    "French food",
    "authentic French crepes from French chefs",
    "French crepes Los Angeles",
    "French crepes Las Vegas",
    "French crepes California",
    "French crepes Nevada",
    "best French crepes in California",
    "best French crepes in Nevada",
    "crepe catering Los Angeles",
    "crepe catering Las Vegas",
    "crepe catering Nevada",
    "live crepe station",
    "wedding crepe catering California",
    "Parisian crepes",
    "caviar crepe",
    "mobile crepe catering",
    "Royal French Crepe",
  ],
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Royal French Crêpe" }],
  creator: "Royal French Crêpe",
  publisher: "Royal French Crêpe",
  category: "food",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Royal French Crêpe — Authentic French Crêpes & Catering",
    description:
      "Handmade French crêpes — sweet, savory & Royal Ossetra caviar — plus live crêpe-station catering across LA, Las Vegas & California. Crafting crêpes since 2007.",
    url: "https://royalfrenchcrepe.com",
    siteName: "Royal French Crêpe",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image-royal.jpg",
        width: 1200,
        height: 630,
        alt: "Royal French Crêpe — a crowned crêpe with ice cream, strawberries and banana before a French château",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Royal French Crêpe — Authentic French Crêpes & Catering",
    description:
      "Handmade French crêpes & live crêpe-station catering across LA, Las Vegas & California. Since 2007.",
    images: ["/og-image-royal.jpg"],
  },
};

export const viewport = {
  themeColor: "#1a120b",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://royalfrenchcrepe.com/#website",
      url: "https://royalfrenchcrepe.com",
      name: "Royal French Crêpe",
      inLanguage: "en-US",
      publisher: { "@id": "https://royalfrenchcrepe.com/#business" },
    },
    {
      "@type": "Caterer",
      "@id": "https://royalfrenchcrepe.com/#business",
      name: "Royal French Crêpe",
      alternateName: "Royal French Crêpe — Authentic French Crêpes",
      description:
        "Authentic French crêpes handmade by real French chefs from Paris — the taste of France in Los Angeles, Las Vegas and across California and Nevada. Sweet, savory and Royal Ossetra caviar crêpes, plus live crêpe-station catering for weddings and events.",
      slogan: "Authentic French crêpes, made by real French chefs.",
      keywords:
        "authentic French crêpes, French food, French crêpes Los Angeles, French crêpes Las Vegas, best French crêpes in California, French crêpe catering, Parisian crêpes, caviar crêpe",
      knowsAbout: [
        "French crêpes",
        "French cuisine",
        "Parisian crêpes",
        "crêpe catering",
        "Royal Ossetra caviar crêpes",
      ],
      url: "https://royalfrenchcrepe.com",
      telephone: "+1-323-287-4274",
      email: "royalfrenchcrepe@gmail.com",
      image: [
        "https://royalfrenchcrepe.com/og-image-royal.jpg",
        "https://royalfrenchcrepe.com/images/menu/caviar-1.jpg",
        "https://royalfrenchcrepe.com/images/louis-xvi-feature.jpg",
      ],
      logo: "https://royalfrenchcrepe.com/icon.png",
      priceRange: "$$$",
      servesCuisine: ["French", "Crêpes", "Desserts"],
      foundingDate: "2007",
      currenciesAccepted: "USD",
      paymentAccepted: "Zelle, CashApp, Venmo",
      hasMenu: "https://royalfrenchcrepe.com/#menu",
      address: {
        "@type": "PostalAddress",
        addressRegion: "CA",
        addressCountry: "US",
      },
      areaServed: [
        { "@type": "City", name: "Los Angeles" },
        { "@type": "City", name: "Las Vegas" },
        { "@type": "AdministrativeArea", name: "California" },
        { "@type": "AdministrativeArea", name: "Nevada" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "08:30",
          closes: "03:00",
        },
      ],
      sameAs: ["https://www.instagram.com/royalfrenchcrepe/"],
    },
    {
      "@type": "FAQPage",
      "@id": "https://royalfrenchcrepe.com/#faq",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-noir">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Preloader />
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
