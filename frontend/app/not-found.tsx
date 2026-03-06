"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";

/* ═══════════════════════════════════════════════
   Exhausted Runner — full-body SVG w/ breathing
   ═══════════════════════════════════════════════ */
function TiredRunner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 200"

      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="runner-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF8243" />
          <stop offset="100%" stopColor="#FF2E1F" />
        </linearGradient>
        <filter id="runner-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#runner-glow)" className="animate-[breatheBody_3s_ease-in-out_infinite]">
        {/* Head */}
        <circle cx="70" cy="24" r="14" stroke="url(#runner-grad)" strokeWidth="2.5" fill="none" />
        {/* Exhausted expression — closed eyes */}
        <path d="M63 22 L67 23" stroke="#FF5A2F" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M73 22 L77 23" stroke="#FF5A2F" strokeWidth="1.5" strokeLinecap="round" />
        {/* Open mouth — panting */}
        <ellipse cx="70" cy="30" rx="3" ry="2" stroke="#FF5A2F" strokeWidth="1" fill="none" className="animate-[pant_1.5s_ease-in-out_infinite]" />

        {/* Neck */}
        <path d="M70 38 L68 46" stroke="url(#runner-grad)" strokeWidth="2.5" strokeLinecap="round" />

        {/* Torso — hunched */}
        <path d="M68 46 Q62 72 56 94" stroke="url(#runner-grad)" strokeWidth="3" strokeLinecap="round" />

        {/* Shoulders */}
        <path d="M66 50 L58 52" stroke="url(#runner-grad)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M66 50 L78 54" stroke="url(#runner-grad)" strokeWidth="2.5" strokeLinecap="round" />

        {/* Left arm — hanging down toward left knee */}
        <path d="M58 52 Q48 66 42 82" stroke="url(#runner-grad)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="42" cy="82" r="3.5" fill="#FF5A2F" opacity="0.5" />

        {/* Right arm — hanging down toward right knee */}
        <path d="M78 54 Q82 70 84 86" stroke="url(#runner-grad)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="84" cy="86" r="3.5" fill="#FF5A2F" opacity="0.5" />

        {/* Left leg */}
        <path d="M56 94 Q42 118 34 148" stroke="url(#runner-grad)" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M34 148 L26 156" stroke="url(#runner-grad)" strokeWidth="2.5" strokeLinecap="round" />

        {/* Right leg */}
        <path d="M56 94 Q70 120 78 148" stroke="url(#runner-grad)" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M78 148 L86 156" stroke="url(#runner-grad)" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Sweat drops */}
      {[
        { cx: 86, cy: 18, r: 2, delay: 0 },
        { cx: 90, cy: 26, r: 1.5, delay: 0.7 },
        { cx: 54, cy: 20, r: 1.8, delay: 1.2 },
        { cx: 50, cy: 28, r: 1.2, delay: 1.8 },
        { cx: 88, cy: 34, r: 1, delay: 2.3 },
      ].map((d, i) => (
        <circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r={d.r}
          fill="#FF8243"
          className="animate-[sweatDrop_2.2s_ease-in_infinite]"
          style={{ animationDelay: `${d.delay}s` }}
        />
      ))}

      {/* Ground shadow */}
      <ellipse cx="60" cy="164" rx="36" ry="4" fill="#FF5A2F" opacity="0.08" className="animate-[shadowPulse_3s_ease-in-out_infinite]" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Animated Heartbeat Line  →  Flatline
   ═══════════════════════════════════════════════ */
function HeartbeatLine() {
  return (
    <svg viewBox="0 0 600 50" className="w-full max-w-lg mx-auto" preserveAspectRatio="none">
      {/* Faint repeating heartbeat background */}
      <path
        d="M0 25 L100 25 L120 25 L135 8 L150 42 L165 12 L180 38 L195 25 L300 25 L320 25 L335 8 L350 42 L365 12 L380 38 L395 25 L600 25"
        stroke="#FF5A2F"
        strokeWidth="1"
        fill="none"
        opacity="0.08"
      />
      {/* Main animated pulse */}
      <path
        d="M0 25 L100 25 L120 25 L135 8 L150 42 L165 12 L180 38 L195 25 L350 25 L600 25"
        stroke="url(#pulse-grad)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="600"
        strokeDashoffset="600"
        className="animate-[drawPulse_3.5s_ease-out_1s_forwards]"
      />
      {/* Glow behind pulse */}
      <path
        d="M0 25 L100 25 L120 25 L135 8 L150 42 L165 12 L180 38 L195 25 L350 25 L600 25"
        stroke="#FF5A2F"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.15"
        strokeDasharray="600"
        strokeDashoffset="600"
        className="animate-[drawPulse_3.5s_ease-out_1s_forwards]"
      />
      <defs>
        <linearGradient id="pulse-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF5A2F" stopOpacity="0" />
          <stop offset="20%" stopColor="#FF8243" />
          <stop offset="35%" stopColor="#FF5A2F" />
          <stop offset="50%" stopColor="#FF2E1F" />
          <stop offset="65%" stopColor="#FF5A2F" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF5A2F" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Floating Particles  (dust / embers)
   ═══════════════════════════════════════════════ */
function FloatingParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${5 + Math.round((i * 53) % 90)}%`,
    size: 1.5 + (i % 4),
    duration: 6 + (i % 5) * 2,
    delay: (i * 0.7) % 4,
    opacity: 0.08 + (i % 3) * 0.06,
  }));

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#FF5A2F] animate-[floatUp_var(--dur)_ease-in-out_infinite]"
          style={{
            left: p.left,
            bottom: "-5%",
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            ["--dur" as string]: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Track Lines Background
   ═══════════════════════════════════════════════ */
function TrackLanes() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-[0.03]">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
          style={{
            top: `${12 + i * 10}%`,
            left: "-10%",
            right: "-10%",
            transform: `rotate(${-1.5 + i * 0.15}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Glitch Text effect for the "0" digit
   ═══════════════════════════════════════════════ */
function GlitchDigit({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {/* Red shift layer */}
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#FF3D3D] via-[#FF2E1F] to-[#CC1100] text-transparent bg-clip-text animate-[glitchR_4s_ease-in-out_infinite]"
      >
        {children}
      </span>
      {/* Cyan shift layer */}
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#FF8243] via-[#FFAA70] to-[#FF5A2F] text-transparent bg-clip-text animate-[glitchL_4s_ease-in-out_infinite]"
      >
        {children}
      </span>
      {/* Main digit */}
      <span className="relative bg-gradient-to-b from-[#FF8243] via-[#FF5A2F] to-[#FF2E1F] text-transparent bg-clip-text">
        {children}
      </span>
    </span>
  );
}

/* ═══════════════════════════════════════════════
   Main 404 Page
   ═══════════════════════════════════════════════ */
export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 bg-[#050505] text-white overflow-hidden select-none">
      {/* Layered ambient glows */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,_#FF6B3D12,_transparent)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_30%_70%,_#FF2E1F08,_transparent_50%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_80%_20%,_#FF824308,_transparent_50%)]" />

      <TrackLanes />
      {mounted && <FloatingParticles />}

      <div className="relative max-w-3xl w-full text-center">
        {/* ── Runner + 404 ── */}
        <div className="flex items-end justify-center gap-3 md:gap-6 mb-2">
          <TiredRunner className="w-20 h-32 md:w-28 md:h-44 animate-[fadeSlideUp_1s_ease-out_0.2s_forwards] opacity-0" />

          <div className="flex items-baseline">
            {["4", "0", "4"].map((digit, i) => (
              <span
                key={i}
                className="text-[90px] md:text-[150px] lg:text-[180px] leading-none font-bold tracking-tighter opacity-0 animate-[digitDrop_0.7s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
                style={{ animationDelay: `${0.2 + i * 0.18}s` }}
              >
                {digit === "0" ? (
                  <GlitchDigit>{digit}</GlitchDigit>
                ) : (
                  <span className="bg-gradient-to-b from-[#FF8243] via-[#FF5A2F] to-[#FF2E1F] text-transparent bg-clip-text">
                    {digit}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* ── Ground line ── */}
        <div className="w-full max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-[#FF5A2F]/20 to-transparent mb-4 animate-[fadeIn_0.6s_ease-out_0.8s_forwards] opacity-0" />

        {/* ── Heartbeat ── */}
        <HeartbeatLine />

        {/* ── Copy ── */}
        <div className="mt-8 space-y-3 animate-[fadeSlideUp_0.7s_ease-out_1.4s_forwards] opacity-0">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#8F8F8F] font-medium">
            You&apos;ve run off the track
          </p>
          <p className="text-sm md:text-base text-[#555] max-w-sm mx-auto leading-relaxed">
            This page doesn&apos;t exist. Even the best athletes take a wrong
            turn sometimes — let&apos;s get you back in the game.
          </p>
        </div>

        {/* ── Buttons ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 animate-[fadeSlideUp_0.7s_ease-out_1.8s_forwards] opacity-0">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto px-10 group">
              <span className="inline-flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Back to Home
              </span>
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-10 border-[#222] bg-transparent text-white hover:bg-white/5 hover:border-[#FF5A2F]/30 transition-colors"
            >
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes breatheBody {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes pant {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.4); }
        }
        @keyframes sweatDrop {
          0% { opacity: 0.7; transform: translateY(0) scale(1); }
          60% { opacity: 0.2; transform: translateY(16px) scale(0.6); }
          100% { opacity: 0; transform: translateY(24px) scale(0.3); }
        }
        @keyframes shadowPulse {
          0%, 100% { transform: scaleX(1); opacity: 0.08; }
          50% { transform: scaleX(1.1); opacity: 0.04; }
        }
        @keyframes digitDrop {
          0% { opacity: 0; transform: translateY(-50px) scale(0.7) rotate(-3deg); }
          60% { opacity: 1; transform: translateY(4px) scale(1.02) rotate(0.5deg); }
          100% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
        }
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes drawPulse {
          0% { stroke-dashoffset: 600; }
          55% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: var(--base-opacity, 0.1); }
          50% { opacity: calc(var(--base-opacity, 0.1) * 2); }
          100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
        }
        @keyframes glitchR {
          0%, 88%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          90% { clip-path: inset(20% 0 60% 0); transform: translate(3px, -1px); }
          92% { clip-path: inset(50% 0 10% 0); transform: translate(-2px, 1px); }
          94% { clip-path: inset(0 0 0 0); transform: translate(0); }
        }
        @keyframes glitchL {
          0%, 86%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          88% { clip-path: inset(40% 0 30% 0); transform: translate(-3px, 1px); }
          90% { clip-path: inset(10% 0 70% 0); transform: translate(2px, -1px); }
          92% { clip-path: inset(0 0 0 0); transform: translate(0); }
        }
      `}</style>
    </main>
  );
}
