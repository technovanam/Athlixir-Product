"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import StarBorder from '@/components/ui/StarBorder';
import GooeyButton from '@/components/GooeyButton';
import Logo from '@/components/layout/Logo';

const Contact = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#0A0A0A] border-t border-white/10 font-sans overflow-hidden" id="contact">


            {/* ── BACKGROUND AVATAR LAYER (Strictly non-interactive, placed at bottom absolute) ── */}
            <div className="absolute inset-x-0 bottom-0 pointer-events-none z-0">
                {/* Left Avatar: Coach & Player */}
                <div className="absolute bottom-0 left-[5%] lg:left-[15%] w-[380px] md:w-[450px] h-[350px]">
                    <Image src="/images/athlete_coach_discussion.png" alt="Coach discussing with player" fill className="object-contain object-bottom" quality={100} />
                </div>

                {/* Right Avatar: Hero Athlete */}
                <div className="absolute bottom-0 right-[-10%] lg:right-[2%] w-[400px] md:w-[500px] h-[450px]">
                    <Image src="/images/athlete_hero_avatar.png" alt="Athlete performing analytics" fill className="object-contain object-bottom origin-bottom-right" quality={100} priority />
                </div>
            </div>

            {/* ── MAIN CONTENT GRID (z-10 relative) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[700px] relative z-10 pointer-events-none">

                {/* LEFT SIDE (Spans 7 cols) -> Content needs pointer-events-auto */}
                <div className="col-span-1 lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 pointer-events-auto">

                    {/* Top Logo & Description */}
                    <div className="p-10 md:p-16 border-b border-white/10 flex flex-col sm:flex-row gap-8 items-start justify-between min-h-[250px] lg:min-h-[300px] z-20">
                        <Logo />
                        <p className="text-white/70 max-w-xs text-[14px] leading-relaxed font-light">
                            Because if your athletic tracking software can&apos;t keep up with your training intensity, neither will your performance.
                        </p>
                    </div>

                    {/* Links Flow */}
                    <div className="p-10 md:p-16 flex-grow flex flex-col justify-between relative z-20 pt-10">

                        {/* Links Grid -> Perfectly aligned */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 w-full max-w-3xl relative z-30">
                            <div className="flex flex-col space-y-5">
                                <h4 className="text-white font-bold text-base tracking-wide">Resources</h4>
                                <ul className="space-y-3 font-light text-white/60 text-sm">
                                    <li><Link href="#features" className="hover:text-white transition-colors block py-0.5">Why Athlixir?</Link></li>
                                    <li><Link href="#research" className="hover:text-white transition-colors block py-0.5">Case Studies</Link></li>
                                    <li><Link href="#blog" className="hover:text-white transition-colors block py-0.5">Training Blog</Link></li>
                                    <li><Link href="#guides" className="hover:text-white transition-colors block py-0.5">Coaching Guides</Link></li>
                                </ul>
                            </div>
                            <div className="flex flex-col space-y-5">
                                <h4 className="text-white font-bold text-base tracking-wide">Company</h4>
                                <ul className="space-y-3 font-light text-white/60 text-sm">
                                    <li><Link href="#about" className="hover:text-white transition-colors block py-0.5">About Us</Link></li>
                                    <li><Link href="#careers" className="hover:text-white transition-colors block py-0.5">Careers</Link></li>
                                    <li><Link href="#partners" className="hover:text-white transition-colors block py-0.5">Partners</Link></li>
                                    <li><Link href="#contact" className="hover:text-white transition-colors block py-0.5">Contact Us</Link></li>
                                </ul>
                            </div>
                            <div className="flex flex-col space-y-5">
                                <h4 className="text-white font-bold text-base tracking-wide">Social</h4>
                                <ul className="space-y-3 font-light text-white/60 text-sm">
                                    <li><Link href="#" className="hover:text-white transition-colors block py-0.5">LinkedIn</Link></li>
                                    <li><Link href="#" className="hover:text-white transition-colors block py-0.5">Twitter</Link></li>
                                    <li><Link href="#" className="hover:text-white transition-colors block py-0.5">Instagram</Link></li>
                                    <li><Link href="#" className="hover:text-white transition-colors block py-0.5">YouTube</Link></li>
                                </ul>
                            </div>

                            {/* Contact Form */}
                            <form className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full bg-white/5 border border-white/10 rounded-md py-3 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FF5722]/50"
                                    suppressHydrationWarning
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full bg-white/5 border border-white/10 rounded-md py-3 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FF5722]/50"
                                    suppressHydrationWarning
                                />
                                <textarea
                                    placeholder="Your Message"
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-md py-3 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FF5722]/50 resize-none"
                                />
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-[#FF5722] text-white font-bold rounded-md hover:bg-[#E64A19] transition flex items-center justify-center gap-3 uppercase tracking-widest shadow-lg"
                                    suppressHydrationWarning
                                >
                                    Send Message
                                    <ArrowRight size={20} />
                                </button>
                            </form>
                        </div>

                        {/* Spacer prevents text from overflowing into background Avatar space */}
                        <div className="h-[380px] w-full shrink-0 relative pointer-events-none" aria-hidden="true" />

                        {/* Bottom Bar */}
                        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row gap-5 text-xs text-white/50 font-medium relative z-30 w-full items-center sm:items-baseline">
                            <span className="font-bold text-white/70">© {currentYear} Athlixir Inc.</span>
                            <Link href="/support" className="hover:text-white transition-colors ml-0 sm:ml-4">Support</Link>
                            <Link href="/privacy" className="hover:text-white transition-colors hidden sm:inline-block">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors hidden sm:inline-block">Terms of Use</Link>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE (Spans 5 cols) -> Higher z-index background so form easily pops */}
                <div className="col-span-1 lg:col-span-5 relative flex flex-col pointer-events-auto z-20">

                    <div className="p-6 sm:p-10 lg:p-14 relative z-30">
                        <div className="mb-8 pl-2">
                            <h2 className="text-3xl md:text-5xl lg:text-[44px] font-black text-white uppercase mb-3 leading-none">Get In Touch</h2>
                            <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold">We're here to <span className="text-[#FF5722]">help you</span></p>
                        </div>

                        {/* Highly opaque sub-box to ensure text/form lines are never hindered by underneath images */}
                        <StarBorder as="div" color="#FF5722" speed="5s" thickness={2} className="w-full relative z-30 bg-[#0A0A0A]">
                            <div className="p-6 sm:p-8 rounded-[inherit] space-y-6 relative z-30 border border-white/5 bg-[#0A0A0A]">
                                <form className="space-y-5">
                                    <input type="text" placeholder="Your Name" className="w-full bg-[#151515] border border-white/10 rounded-xl py-4 px-5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FF5722]/60 focus:ring-1 focus:ring-[#FF5722]/60 transition-all font-medium" />
                                    <input type="email" placeholder="Your Email" className="w-full bg-[#151515] border border-white/10 rounded-xl py-4 px-5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FF5722]/60 focus:ring-1 focus:ring-[#FF5722]/60 transition-all font-medium" />
                                    <textarea placeholder="Your Message" rows={4} className="w-full bg-[#151515] border border-white/10 rounded-xl py-4 px-5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FF5722]/60 focus:ring-1 focus:ring-[#FF5722]/60 resize-none transition-all font-medium" />
                                    <div className="pt-4 flex justify-end w-full">
                                        <GooeyButton label="Send Message" type="submit" className="w-full max-w-[200px] border border-white/20 hover:border-[#FF5722] text-sm py-4" />
                                    </div>
                                </form>
                            </div>
                        </StarBorder>
                    </div>

                    {/* Spacer guarantees container naturally stretches without form overlap */}
                    <div className="h-[400px] w-full shrink-0 mt-auto pointer-events-none" aria-hidden="true" />
                </div>
            </div>
        </footer>
    );
};

export default Contact;
