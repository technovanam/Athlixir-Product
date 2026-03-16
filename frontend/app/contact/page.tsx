"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import StarBorder from '@/components/ui/StarBorder';

export default function ContactPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <img
                    src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1305&auto=format&fit=crop"
                    alt="stadium"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            </div>

            {/* Back Button */}
            <div className="absolute top-10 left-10">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-secondary hover:text-white text-sm font-bold uppercase tracking-widest"
                >
                    <ArrowRight className="rotate-180 text-primary" size={18} />
                    Back to Home
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl px-6 py-20"
            >
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-black text-white uppercase mb-4">
                        Get In Touch
                    </h1>
                    <p className="text-secondary text-sm uppercase tracking-[0.3em]">
                        We're here to <span className="text-primary">help you</span>
                    </p>
                </div>

                {/* Contact Card with StarBorder */}
                <StarBorder
                    as="div"
                    color="var(--primary)"
                    speed="5s"
                    thickness={2}
                    className="w-full"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <Mail className="text-primary mt-1" size={20} />
                                <div>
                                    <h3 className="text-xs font-bold uppercase text-muted mb-1">Email</h3>
                                    <p className="text-white">support@athlixir.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="text-primary mt-1" size={20} />
                                <div>
                                    <h3 className="text-xs font-bold uppercase text-muted mb-1">Phone</h3>
                                    <p className="text-white">+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <MapPin className="text-primary mt-1" size={20} />
                                <div>
                                    <h3 className="text-xs font-bold uppercase text-muted mb-1">Location</h3>
                                    <p className="text-white">India</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-muted focus:outline-none focus:border-primary/50"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-muted focus:outline-none focus:border-primary/50"
                            />
                            <textarea
                                placeholder="Your Message"
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-muted focus:outline-none focus:border-primary/50 resize-none"
                            />
                            <button
                                type="submit"
                                className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition flex items-center justify-center gap-3 uppercase tracking-widest shadow-lg"
                            >
                                Send Message
                                <ArrowRight size={20} />
                            </button>
                        </form>
                    </div>
                </StarBorder>
            </motion.div>
        </div>
    );
}
