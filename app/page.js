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
import Faq from "@/components/site/faq";
import Contact from "@/components/site/contact";
import Footer from "@/components/site/footer";

export default function Home() {
  return (
    <>
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
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
