"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Exponential ease-out — mirrors the Lenis feel across all scroll-driven animations
const lenisEasing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: lenisEasing,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Dispatch a native scroll event on every Lenis tick so that
    // framer-motion's useScroll hooks stay in sync with the smoothed position
    lenis.on("scroll", () => {
      window.dispatchEvent(new Event("scroll", { bubbles: false }));
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
