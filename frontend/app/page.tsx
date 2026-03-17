import { Header } from "@/components/layout";
import { HeroSection, AboutSection, Features, ExploreCarousel, Research, ForAthletes, SDGImpact, FinalCTA, Contact } from "./Landingpage";
import LazySection from "@/components/ui/LazySection";

/**
 * Home Page
 * Landing page with hero section and main content
 * Optimized with lazy loading for better performance
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full">
        {/* Hero loads immediately */}
        <HeroSection />
        
        {/* Other sections load lazily */}
        <LazySection>
          <AboutSection />
        </LazySection>
        
        <LazySection>
          <Features />
        </LazySection>
        
        <LazySection>
          <ExploreCarousel />
        </LazySection>
        
        <LazySection>
          <Research />
        </LazySection>
        
        <LazySection>
          <ForAthletes />
        </LazySection>
        
        <LazySection>
          <SDGImpact />
        </LazySection>
        
        <LazySection>
          <FinalCTA />
        </LazySection>
        
        <LazySection>
          <Contact />
        </LazySection>
      </main>
    </>
  );
}
