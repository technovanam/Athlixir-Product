"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

import GooeyButton from '@/components/GooeyButton';

const ForAthletes = () => {
    return (
        <section id="for-athletes" className="relative h-[500px] md:h-[650px] flex items-center justify-center overflow-hidden bg-black">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1305&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Stadium"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center text-white px-6 md:px-12 container mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex px-5 py-2 rounded-full border border-[#FF5722]/30 bg-[#FF5722]/10 text-[11px] font-bold uppercase tracking-[0.25em] mb-10 text-[#FF5722] backdrop-blur-sm"
                >
                    Get Early Access
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black mb-10 leading-[1.1] tracking-tight"
                >
                    Ready to Build Your <br />
                    <span className="text-[#FF5722]">Athletic Future?</span>
                </motion.h2>

                <p className="text-xl md:text-2xl mb-14 max-w-3xl mx-auto font-light leading-relaxed text-gray-400">
                    Start your verified digital journey today. Train smarter. <br className="hidden md:block" /> Stay protected. Get discovered.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center space-y-5 sm:space-y-0 sm:space-x-8">
                    <GooeyButton
                        label="Create Free Profile"
                        href="/signup"
                        active={true}
                    />
                    <GooeyButton
                        label="Explore Platform"
                        href="/login"
                    />
                </div>
            </div>
        </section>
    );
};

export default ForAthletes;
