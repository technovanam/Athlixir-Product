"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CarouselCard {
    title: string;
    label: string;
    img: string;
}

const ExploreCarousel = () => {
    const containerRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [translateX, setTranslateX] = useState(0);

    useEffect(() => {
        const measure = () => {
            if (trackRef.current) {
                const trackWidth = trackRef.current.scrollWidth;
                const viewportWidth = window.innerWidth;
                setTranslateX(trackWidth - viewportWidth + 48); // +48 for right padding
            }
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth the scroll progress to match Lenis's ease-out feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 25,
        restDelta: 0.001,
    });

    const x = useTransform(smoothProgress, [0, 1], [0, -translateX]);

    const cards: CarouselCard[] = [
        { title: "Verified Digital Profile", label: "Identity", img: "https://images.unsplash.com/photo-1770368787714-4e5a5ea557fd?q=80&w=1170&auto=format&fit=crop" },
        { title: "Performance Analysis", label: "Tech", img: "https://plus.unsplash.com/premium_photo-1681487769650-a0c3fbaed85a?q=80&w=1255&auto=format&fit=crop" },
        { title: "Forgery Detection", label: "Security", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80" },
        { title: "Tier Leaderboards", label: "Growth", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80" },
        { title: "Academy Locator", label: "Access", img: "https://images.unsplash.com/photo-1604357209793-fca5dca89f97?q=80&w=764&auto=format&fit=crop" },
        { title: "Funding Support", label: "Sponsor", img: "https://plus.unsplash.com/premium_photo-1701121214648-245e9c86cc92?q=80&w=880&auto=format&fit=crop" },
    ];

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-background">
            <div className="sticky top-0 h-screen flex flex-col justify-center py-16 overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12 mb-12">
                    <h2 className="text-4xl md:text-6xl font-black text-white">
                        Experience the <br />
                        <span className="text-gray-500">Athlixir Advantage.</span>
                    </h2>
                </div>

                <motion.div
                    ref={trackRef}
                    style={{ x }}
                    className="flex space-x-8 px-6 lg:px-12 will-change-transform pb-4"
                >
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="min-w-[320px] md:min-w-[420px] h-[460px] relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group bg-white/[0.02] flex-shrink-0"
                        >
                            <img
                                src={card.img}
                                alt={card.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-40"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                            <div className="absolute bottom-0 left-0 w-full p-10">
                                <span className="text-[10px] uppercase font-black tracking-[0.3em] text-primary mb-4 block">
                                    0{index + 1}
                                </span>
                                <div className="flex justify-between items-end gap-4">
                                    <h3 className="text-3xl font-black text-white">
                                        {card.title}
                                    </h3>
                                    <div className="bg-white/5 backdrop-blur-xl p-4 rounded-2xl text-white border border-white/10 shadow-xl">
                                        <ArrowRight size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ExploreCarousel;
