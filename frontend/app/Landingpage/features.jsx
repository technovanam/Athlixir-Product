"use client";

import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, Shield, Zap, TrendingUp } from 'lucide-react';

const Features = () => {
    return (
        <section id="features" className="py-20 md:py-28 bg-[#0F0F0F] relative text-white overflow-hidden">
            {/* Background Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#FF5722]/5 to-[#0A0A0A] z-0" />
            <div className="absolute inset-0 opacity-[0.15] z-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF5722]/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-stretch relative z-10">

                {/* Left Side - Featured Card */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="p-8 md:p-12 rounded-xl bg-[#161616] backdrop-blur-xl border border-white/[0.08] relative overflow-hidden group shadow-lg flex flex-col h-full"
                >
                    {/* Enhanced Background Graphic to fill the gap */}
                    <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity hidden lg:block">
                        <div className="relative w-full h-full flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-[1px] border-[#FF5722]/30 rounded-full border-dashed"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-10 border-[1px] border-white/10 rounded-full border-dashed"
                            />
                            <BarChart2 size={120} className="text-[#FF5722]/20" />
                        </div>
                    </div>

                    <div className="inline-flex px-5 py-2 rounded-full border border-[#FF5722]/30 bg-[#FF5722]/10 text-[10px] font-bold mb-8 tracking-[0.2em] uppercase text-[#FF5722] w-fit relative z-10">
                        Powering Potential
                    </div>

                    <h3 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tight leading-tight relative z-10">
                        Smart Performance <br />
                        <span className="text-[#FF5722]">Analytics Engine.</span>
                    </h3>

                    <p className="text-gray-400 mb-10 leading-relaxed text-base md:text-lg max-w-md font-light relative z-10">
                        Track training sessions with surgical precision. Our AI identifies performance plateaus and provides actionable recovery protocols.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 relative z-10">
                        <div className="space-y-4">
                            {[
                                { icon: Shield, text: "Verified Injury History" },
                                { icon: Zap, text: "AI Progress Trends" },
                                { icon: TrendingUp, text: "Recruitment Portfolios" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center space-x-3">
                                    <item.icon className="w-4 h-4 text-[#FF5722]" />
                                    <span className="text-sm text-gray-300 font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Secondary visual - 'Active Probes' to fill the lower right gap */}
                    <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end space-y-4 opacity-40">
                        <div className="flex items-center space-x-4">
                            <span className="text-[8px] uppercase tracking-[0.3em] text-gray-500 font-black">Biometric Link</span>
                            <div className="w-12 h-[1px] bg-[#FF5722]/30" />
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-[8px] uppercase tracking-[0.3em] text-gray-500 font-black">Neural Engine</span>
                            <div className="w-12 h-[1px] bg-[#FF5722]/30" />
                            <div className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>
                    </div>

<<<<<<< HEAD
=======
                    <div className="mt-auto relative z-10">
                        <button className="px-8 py-4 bg-[#FF5722] text-white font-bold rounded-md hover:bg-[#E64A19] transition-all shadow-sm hover:shadow-md text-xs uppercase tracking-widest flex items-center space-x-3 group w-fit">
                            <span>Explore Dashboard</span>
                            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
>>>>>>> 0027ef71d71ba168e4af98dcc214890d9616d586
                </motion.div>

                {/* Right Side - Content & Preview */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-between h-full relative"
                >
                    <div className="relative z-10 mb-8">
                        <div className="inline-flex px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] font-bold mb-6 tracking-[0.2em] uppercase text-blue-400 backdrop-blur-sm">
                            The Future
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 tracking-tight">
                            Experience the Next <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600">Generation.</span>
                        </h2>
                        <p className="text-lg text-gray-400 max-w-lg leading-relaxed font-light mb-8">
                            Wearable integration, sponsorship matching, and tier-based leaderboards — built specifically for India's rising champions.
                        </p>

                        {/* New Info Tags to fill space */}
                        <div className="flex flex-wrap gap-2 lg:gap-3">
                            {['GPS Tech', 'Bio-Metric', 'Cloud Sync', 'AI Training'].map((tag) => (
                                <span key={tag} className="px-3 py-1.5 rounded-md bg-[#1E1E1E] border border-white/[0.08] text-[9px] uppercase tracking-wider text-gray-500 font-bold hover:border-blue-500/40 transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Preview Element */}
                    <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:flex-grow rounded-xl overflow-hidden shadow-lg border border-white/[0.08] group min-h-[300px]">
                        <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
                            alt="Future Tech"
                            className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent" />

                        {/* Floating overlay card */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-6 left-6 p-5 rounded-lg bg-[#0F0F0F]/80 backdrop-blur-md border border-white/[0.08] w-64"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-[#FF5722] uppercase tracking-widest">Active Metric</span>
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                            <div className="text-2xl font-bold mb-1">98.4 bpm</div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "70%" }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="h-full bg-[#FF5722]"
                                />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
