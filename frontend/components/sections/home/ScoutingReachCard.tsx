"use client";

import { Zap } from "lucide-react";
import { Card } from "@/components/ui";
import { SCOUTING_STATS } from "@/lib/constants";

/**
 * Scouting Reach Stats Card
 * Displays comparison between manual profile and Athlixir-powered reach
 */
export default function ScoutingReachCard() {
  return (
    <Card className="w-[260px] animate-float">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 rounded-md bg-[#FF5722]/20 flex items-center justify-center">
          <Zap className="w-4 h-4 text-[#FF5722]" />
        </div>
        <span className="text-xs font-semibold tracking-wider text-white/80 uppercase">
          Scouting Reach
        </span>
      </div>

      {/* Manual Profile Stat */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-white/60">
            {SCOUTING_STATS.manualProfile}%
          </span>
          <div className="w-10 h-5 rounded-full bg-white/10 relative">
            <div className="absolute left-1 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/40" />
          </div>
        </div>
        <p className="text-[10px] font-medium tracking-wider text-white/40 uppercase">
          Manual Profile
        </p>
      </div>

      {/* Athlixir Powered Stat */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-[#FF5722]">
            {SCOUTING_STATS.athlixirPowered}%
          </span>
          <div className="w-10 h-5 rounded-full bg-[#FF5722]/20 relative">
            <div className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#FF5722]" />
          </div>
        </div>
        <p className="text-[10px] font-medium tracking-wider text-white/40 uppercase">
          Athlixir Powered
        </p>
      </div>
    </Card>
  );
}
