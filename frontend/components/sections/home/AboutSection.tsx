"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge, Button } from "@/components/ui";
import { Target, TrendingUp, Users } from "lucide-react";

/**
 * About Section Component
 * Displays information about Athlixir with feature highlights and image cards
 */
export default function AboutSection() {
  return (
    <section id="about" className="relative bg-[#0a0a0a] py-20 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-1">
        <div className="flex flex-col lg:flex-row justify-between items-start">
          {/* Left Content - Text */}
          <div className="space-y-8 pt-8 lg:max-w-[520px]">
            {/* Badge */}
            <Badge>ABOUT ATHLIXIR</Badge>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.1] tracking-tight">
              <span className="text-white">Bringing Trust,</span>
              <br />
              <span className="text-white">Technology &</span>
              <br />
              <span className="text-[#6B7280]/80">Opportunity.</span>
            </h2>

            {/* Description */}
            <p className="text-[15px] font-normal leading-[1.6] text-white/50 max-w-[480px]">
              Athlixir is a digital ecosystem built for athletes from Tier-2 and
              Tier-3 cities. We help athletes build{" "}
              <span className="text-white font-semibold">verified profiles</span>,
              track performance, prevent injuries, and connect with mentors — all in
              one unified platform.
            </p>

            {/* Features */}
            <div className="flex flex-row gap-12 pt-4">
              {/* Precision */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-[#FF5722]/30 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-[#FF5722]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-wider text-white uppercase mb-1">
                    Precision
                  </h4>
                  <p className="text-[13px] text-white/40 max-w-[300px] leading-relaxed">
                    Verified data that scouts and academies can actually trust.
                  </p>
                </div>
              </div>

              {/* Growth */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-[#FF5722]/30 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-[#FF5722]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-wider text-white uppercase mb-1">
                    Growth
                  </h4>
                  <p className="text-[13px] text-white/40 max-w-[250px] leading-relaxed">
                    AI-driven analytics to identify and fix performance gaps.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link href="#features">
                <Button variant="primary" size="md">
                  LEARN MORE
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Image Cards */}
          <div className="relative h-[580px] w-[520px] hidden lg:block flex-shrink-0">
            {/* Training Card - Large, positioned left */}
            <div className="absolute top-0 left-[20px] w-[280px] h-[420px] rounded-xl overflow-hidden animate-float shadow-lg z-10">
              <Image
                src="/images/training.jpg"
                alt="Training"
                fill
                sizes="280px"
                quality={100}
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="text-[11px] font-semibold tracking-wider text-[#FF5722] uppercase">
                  Training
                </span>
                <h4 className="text-2xl font-bold text-white mt-1">Train Smarter.</h4>
              </div>
            </div>

            {/* Community Card - Far Left, Overlapping Training Card */}
            <div className="absolute left-[-200px] top-[250px] bg-[#1a1a1a] backdrop-blur-sm rounded-md p-5 w-[180px] border border-white/[0.08] animate-float-horizontal shadow-lg z-20">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-[#FF5722]" />
                <span className="text-[11px] font-semibold tracking-wider text-white/80 uppercase">
                  Community
                </span>
              </div>
              <div className="flex -space-x-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 border-2 border-[#1a1a1a]" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 border-2 border-[#1a1a1a]" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-[#1a1a1a]" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 border-2 border-[#1a1a1a]" />
              </div>
              <p className="text-[13px] text-white/60">Join 2k+ Athletes</p>
            </div>

            {/* Ecosystem Card - Bottom Right, Overlapping */}
            <div className="absolute top-[260px] right-0 w-[260px] h-[310px] rounded-xl overflow-hidden animate-float-alt shadow-lg z-10">
              <Image
                src="/images/ecosystem.jpg"
                alt="Ecosystem"
                fill
                sizes="260px"
                quality={100}
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="text-[11px] font-semibold tracking-wider text-[#FF5722] uppercase">
                  Ecosystem
                </span>
                <h4 className="text-2xl font-bold text-white mt-1">Real Impact.</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
