import Nav from "@/components/site/nav";
import Hero from "@/components/site/hero";
import Marquee from "@/components/site/marquee";
import Stats from "@/components/site/stats";
import Story from "@/components/site/story";
import Why from "@/components/site/why";
import VideoFeature from "@/components/site/video-feature";
import MenuSection from "@/components/site/menu-section";
import Caviar from "@/components/site/caviar";
import Louis from "@/components/site/louis";
import Heritage from "@/components/site/heritage";
import Catering from "@/components/site/catering";
import Gallery from "@/components/site/gallery";
import KineticBand from "@/components/site/kinetic-band";
import Locations from "@/components/site/locations";
import Contact from "@/components/site/contact";
import Footer from "@/components/site/footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Royal French Crêpe",
  servesCuisine: ["French", "Crêpes", "Dessert"],
  description:
    "Authentic premium French crêpes handmade by French chefs from Paris. Sweet, savory and Royal Ossetra caviar crêpes, plus mobile catering across LA, Las Vegas and California.",
  email: "royalfrenchcrepe@gmail.com",
  url: "https://royalfrenchcrepe.com",
  sameAs: ["https://www.instagram.com/royalfrenchcrepe/"],
  areaServed: ["Los Angeles", "Las Vegas", "California"],
  openingHours: "Mo-Su 08:30-03:00",
  priceRange: "$$",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="flex flex-col">
        <Hero />
        <Marquee />
        <Stats />
        <Story />
        <Why />
        <VideoFeature />
        <MenuSection />
        <Caviar />
        <Louis />
        <Heritage />
        <Catering />
        <Gallery />
        <KineticBand />
        <Locations />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
