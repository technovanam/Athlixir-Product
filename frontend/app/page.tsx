import { Header } from "@/components/layout";
import { HeroSection, AboutSection } from "@/components/sections/home";
import { Features, ExploreCarousel, Research, ForAthletes, SDGImpact, FinalCTA, Contact } from "./Landingpage";

/**
 * Home Page
 * Landing page with hero section and main content
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full">
        <HeroSection />
        <AboutSection />
        <Features />
        <ExploreCarousel />
        <Research />
        <ForAthletes />
        <SDGImpact />
        <FinalCTA />
        <Contact />
      </main>
    </>
  );
}
