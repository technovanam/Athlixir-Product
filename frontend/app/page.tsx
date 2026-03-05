import { Header, Footer } from "@/components/layout";
import { HeroSection, AboutSection } from "@/components/sections/home";

/**
 * Home Page
 * Landing page with hero section and main content
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        {/* Additional sections will be added here */}
      </main>
      <Footer />
    </>
  );
}
