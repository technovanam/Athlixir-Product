import { Header } from "@/components/layout";
import { HeroSection, AboutSection } from "@/components/sections/home";
import { Features, Research, ForAthletes, Contact } from "./Landingpage";

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
        <Features />
        <Research />
        <ForAthletes />
        <Contact />
      </main>
    </>
  );
}
