import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Logo from "./Logo";
import HangingBulb from "./HangingBulb";

/**
 * Footer component
 * Contains navigation links, social links, and the new illustrated layout
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-white/10 font-sans">
      <HangingBulb />
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">

        {/* =======================
            LEFT SIDE (Spans 7 cols)
            ======================= */}
        <div className="col-span-1 lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10">

          {/* Top-Left: Logo & Description */}
          <div className="p-10 md:p-16 border-b border-white/10 flex flex-col sm:flex-row gap-8 items-start justify-between min-h-[250px] lg:min-h-[300px]">
            <Logo />
            <p className="text-white/70 max-w-xs text-[14px] leading-relaxed font-light">
              Because if your athletic tracking software can&apos;t keep up with your training intensity, neither will your performance.
            </p>
          </div>

          {/* Bottom-Left: Links & Small Avatars */}
          <div className="p-10 md:p-16 flex-grow relative overflow-hidden flex flex-col justify-between min-h-[450px]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-32 relative z-10 w-full max-w-2xl">
              {/* Resources */}
              <div className="flex flex-col space-y-5">
                <h4 className="text-white font-bold text-base tracking-wide">Resources</h4>
                <ul className="space-y-3 font-light text-white/60 text-sm">
                  <li><Link href="#features" className="hover:text-white transition-colors">Why Athlixir?</Link></li>
                  <li><Link href="#case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
                  <li><Link href="#blog" className="hover:text-white transition-colors">Training Blog</Link></li>
                  <li><Link href="#guides" className="hover:text-white transition-colors">Coaching Guides</Link></li>
                  <li><Link href="#webinars" className="hover:text-white transition-colors">Webinars</Link></li>
                  <li><Link href="#glossary" className="hover:text-white transition-colors">Glossary</Link></li>
                </ul>
              </div>

              {/* Company */}
              <div className="flex flex-col space-y-5">
                <h4 className="text-white font-bold text-base tracking-wide">Company</h4>
                <ul className="space-y-3 font-light text-white/60 text-sm">
                  <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="#careers" className="hover:text-white transition-colors">Careers</Link></li>
                  <li><Link href="#leadership" className="hover:text-white transition-colors">Leadership</Link></li>
                  <li><Link href="#partners" className="hover:text-white transition-colors">Partners</Link></li>
                  <li><Link href="#press" className="hover:text-white transition-colors">Press</Link></li>
                  <li><Link href="#contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                </ul>
              </div>

              {/* Social */}
              <div className="flex flex-col space-y-5">
                <h4 className="text-white font-bold text-base tracking-wide">Social</h4>
                <ul className="space-y-3 font-light text-white/60 text-sm">
                  <li><Link href="#" className="hover:text-white transition-colors">LinkedIn</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Twitter</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Facebook</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Instagram</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">YouTube</Link></li>
                </ul>
              </div>
            </div>

            {/* Little Coach & Player Discussion Avatar Layer */}
            <div className="absolute bottom-0 left-[10%] md:left-[25%] lg:left-[20%] w-[380px] md:w-[480px] h-[350px] pointer-events-none opacity-90 transition-transform duration-500 hover:scale-105 z-0">
              <Image
                src="/images/athlete_coach_discussion.png"
                alt="Coach & Player Discussion"
                fill
                className="object-contain object-bottom"
                quality={100}
              />
            </div>

            {/* Bottom Links Bar */}
            <div className="flex flex-col sm:flex-row gap-5 text-xs text-white/50 font-medium relative z-10 w-full lg:mb-0 mb-4 items-center sm:items-baseline">
              <span className="font-bold text-white/70">© {currentYear} Athlixir Inc.</span>
              <Link href="/support" className="hover:text-white transition-colors ml-0 sm:ml-4">Support</Link>
              <Link href="/privacy" className="hover:text-white transition-colors hidden sm:inline-block">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors hidden sm:inline-block">Terms of Use</Link>
              <Link href="/cookies" className="hover:text-white transition-colors hidden sm:inline-block">Cookie Policy</Link>
            </div>
          </div>
        </div>

        {/* =======================
            RIGHT SIDE (Spans 5 cols)
            ======================= */}
        <div className="col-span-1 lg:col-span-5 relative overflow-hidden flex flex-col bg-[#0f0f0f] z-10">
          <div className="p-10 md:p-16 relative z-10">
            <span className="text-[#FF5722] text-xs font-black tracking-[0.2em] uppercase mb-4 block">
              Join Ecosystem
            </span>
            <h2 className="text-5xl md:text-6xl xl:text-7xl font-semibold tracking-tight text-white mb-12 leading-[1.05]">
              Request a<br />Demo
            </h2>

            {/* Input Form Group */}
            <div className="relative max-w-sm xl:max-w-md w-full">
              <input
                type="email"
                placeholder="Enter your email..."
                className="w-full bg-white text-black font-medium rounded-full py-4 pl-6 pr-[72px] focus:outline-none focus:ring-4 focus:ring-[#FF5722]/40 shadow-xl transition-all"
              />
              <button
                className="absolute right-1 top-1 bottom-1 aspect-square bg-[#FF5722] rounded-full flex items-center justify-center hover:bg-[#E64D1F] transition-colors shadow-md group"
                aria-label="Submit Email"
              >
                <ArrowRight className="text-white w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Large Hero Athlete Avatar Layer */}
          <div className="absolute right-[-10%] bottom-0 top-[35%] w-full min-w-[300px] pointer-events-none z-0">
            <Image
              src="/images/athlete_hero_avatar.png"
              alt="Athlete performing analytics"
              fill
              className="object-contain object-bottom md:object-right-bottom scale-110 origin-bottom-right"
              quality={100}
              priority
            />
          </div>
        </div>

      </div>
    </footer>
  );
}
