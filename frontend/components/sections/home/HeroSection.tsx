"use client";

/**
 * Hero Section Component
 * Main landing section with headline, description, CTAs, and floating cards
 */
export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Image */}
      <div className="absolute inset-0 z-0">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/video/120447-720880542_medium.mp4"
          autoPlay
          loop
          muted
          playsInline
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
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col items-center text-center">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-5 animate-fade-in [animation-delay:100ms]">
            <span className="text-white">Your Talent.</span>{" "}
            <span className="text-[#9ca3af]">Your Data.</span>
            <br />
            <span className="text-[#FF5722]">Your Future.</span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-white/70 font-light max-w-2xl mx-auto mb-8 animate-fade-in [animation-delay:200ms]">
            Empowering grassroots athletes with verified digital profiles, injury tracking,
            <br />
            performance analytics, and real career opportunities.
          </p>
        </div>
      </div>


    </section>
  );
}
