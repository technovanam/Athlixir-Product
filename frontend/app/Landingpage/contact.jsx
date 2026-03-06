"use client";

import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import StarBorder from '@/components/ui/StarBorder';

const Contact = () => {
    return (
        <footer className="bg-black text-white py-20 border-t border-white/10" id="contact">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-4">
                        Get In Touch
                    </h2>
                    <p className="text-gray-400 text-sm uppercase tracking-[0.3em]">
                        We're here to <span className="text-[#FF5722]">help you</span>
                    </p>
                </div>

                <div className="max-w-4xl mx-auto mb-12">
                    <StarBorder
                        as="div"
                        color="#FF5722"
                        speed="5s"
                        thickness={2}
                        className="w-full"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Contact Info */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <Mail className="text-[#FF5722] mt-1" size={20} />
                                    <div>
                                        <h3 className="text-xs font-bold uppercase text-gray-500 mb-1">Email</h3>
                                        <p className="text-white">support@athlixir.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Phone className="text-[#FF5722] mt-1" size={20} />
                                    <div>
                                        <h3 className="text-xs font-bold uppercase text-gray-500 mb-1">Phone</h3>
                                        <p className="text-white">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="text-[#FF5722] mt-1" size={20} />
                                    <div>
                                        <h3 className="text-xs font-bold uppercase text-gray-500 mb-1">Location</h3>
                                        <p className="text-white">India</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <form className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FF5722]/50"
                                    suppressHydrationWarning
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FF5722]/50"
                                    suppressHydrationWarning
                                />
                                <textarea
                                    placeholder="Your Message"
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FF5722]/50 resize-none"
                                />
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-[#FF5722] text-white font-bold rounded-xl hover:bg-[#E64A19] transition flex items-center justify-center gap-3 uppercase tracking-widest shadow-lg"
                                    suppressHydrationWarning
                                >
                                    Send Message
                                    <ArrowRight size={20} />
                                </button>
                            </form>
                        </div>
                    </StarBorder>
                </div>

                <div className="pt-8 border-t border-white/10 text-center text-xs text-gray-500">
                    <p>© 2025 Athlixir | Built with purpose.</p>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
