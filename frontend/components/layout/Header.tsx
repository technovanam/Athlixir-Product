"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui";
import Logo from "./Logo";

/**
 * Header component with navigation
 * Includes sticky behavior, scroll-based styling, and mobile menu
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const navRef = useRef<HTMLDivElement>(null);

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect and active section detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Detect active section based on scroll position
      const sections = NAV_LINKS.filter(link => link.href.startsWith('#')).map(link => link.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(`#${sections[i]}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on section change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeSection]);

  // Update slider position
  useEffect(() => {
    if (!mounted) return;
    
    const updateSlider = () => {
      if (navRef.current) {
        const activeLink = navRef.current.querySelector('[data-active="true"]') as HTMLElement;
        if (activeLink) {
          const navRect = navRef.current.getBoundingClientRect();
          const linkRect = activeLink.getBoundingClientRect();
          setSliderStyle({
            left: linkRect.left - navRect.left,
            width: linkRect.width,
          });
        }
      }
    };
    
    // Run immediately and also after a small delay for initial render
    updateSlider();
    const timer = setTimeout(updateSlider, 100);
    window.addEventListener("resize", updateSlider);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateSlider);
    };
  }, [activeSection, mounted]);

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Check if it's a route or hash
    if (href.startsWith('/')) {
      // Navigate to route
      window.location.href = href;
    } else {
      // Scroll to section
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(href);
      }
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "backdrop-blur-md py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
            <div ref={navRef} className="flex items-center gap-10 relative pt-3">
              {/* Sliding Indicator - positioned above nav items */}
              <span
                className={cn(
                  "absolute top-0 h-1 bg-[#FF5722] rounded-b-sm z-50",
                  "transition-[left,width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  mounted && sliderStyle.width > 0 ? "opacity-100" : "opacity-0"
                )}
                style={{ 
                  left: sliderStyle.left, 
                  width: sliderStyle.width,
                  transform: 'translateZ(0)'
                }}
              />
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  data-active={activeSection === link.href}
                  className={cn(
                    "relative text-[15px] font-medium transition-colors duration-200 hover:text-[#FF5722] py-2 cursor-pointer",
                    activeSection === link.href
                      ? "text-[#FF5722]"
                      : "text-white/80"
                  )}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                LOGIN
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="sm">
                GET STARTED
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white hover:text-[#FF5722] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isMobileMenuOpen ? "max-h-[400px] opacity-100 mt-6" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col gap-4 py-4 border-t border-white/10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "text-base font-medium py-2 transition-colors duration-200 hover:text-[#FF5722] cursor-pointer",
                  activeSection === link.href
                    ? "text-[#FF5722]"
                    : "text-white/80"
                )}
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10">
              <Link href="/login">
                <Button variant="outline" size="md" className="w-full">
                  LOGIN
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" size="md" className="w-full">
                  GET STARTED
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
