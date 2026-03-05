"use client";

import Link from "next/link";
import { Badge, Button } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";
import ScoutingReachCard from "./ScoutingReachCard";
import VerifiedBadge from "./VerifiedBadge";

/**
 * Hero Section Component
 * Main landing section with headline, description, CTAs, and floating cards
 */
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Image */}
      <div className="absolute inset-0 z-0">
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/landing.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        
        {/* Primary dark overlay */}
        <div className="absolute inset-0 bg-black/45" />
        
        {/* Vertical gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/35 to-black/65" />
        
        {/* Light vignette effect */}
        <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 150px 50px rgba(0,0,0,0.5)' }} />
        
        {/* Top blur zone for header area */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />
        
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <Badge className="mb-6 animate-fade-in">
            {SITE_CONFIG.tagline}
          </Badge>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-5 animate-fade-in [animation-delay:100ms]">
            <span className="text-white">{SITE_CONFIG.heroTitle.line1}</span>{" "}
            <span className="text-[#9ca3af]">{SITE_CONFIG.heroTitle.line2}</span>
            <br />
            <span className="text-[#FF5722]">{SITE_CONFIG.heroTitle.line3}</span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-white/70 font-light max-w-2xl mx-auto mb-8 animate-fade-in [animation-delay:200ms]">
            Empowering grassroots athletes with verified digital profiles, injury tracking,
            <br />
            performance analytics, and real career opportunities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in [animation-delay:300ms]">
            <Link href="/signup">
              <Button variant="primary" size="md" className="min-w-[180px]">
                GET STARTED
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="outline" size="md" className="min-w-[180px]">
                EXPLORE PLATFORM
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Cards - Desktop Only - Positioned relative to viewport */}
      <div className="hidden lg:block">
        {/* Left Card - Scouting Reach */}
        <div className="absolute left-4 xl:left-8 2xl:left-16 top-1/2 -translate-y-1/2 z-20">
          <ScoutingReachCard />
        </div>

        {/* Right Card - Verified Badge */}
        <div className="absolute right-4 xl:right-8 2xl:right-16 top-1/2 -translate-y-1/3 z-20">
          <VerifiedBadge />
        </div>
      </div>
    </section>
  );
}
