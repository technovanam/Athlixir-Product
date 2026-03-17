"use client";

import { Check } from "lucide-react";
import { Card } from "@/components/ui";

export default function VerifiedBadge() {
  return (
    <Card
      className="w-[230px] text-center animate-float"
      glassmorphism
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
          <Check className="w-3 h-3 text-success" />
        </div>
        <span className="text-[10px] font-semibold tracking-wider text-white/80 uppercase">
          Verified Athlete ID
        </span>
      </div>

      {/* Avatar Circle with Dots */}
      <div className="relative flex items-center justify-center">
        {/* Decorative Dots */}
        <div className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-primary/60" />
        <div className="absolute top-0 right-4 w-1.5 h-1.5 rounded-full bg-primary/40" />
        <div className="absolute -top-1 right-8 w-1 h-1 rounded-full bg-primary/30" />

        {/* Main Avatar Circle */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF5722] to-[#FF8A50] flex items-center justify-center shadow-lg shadow-primary/25">
          {/* Person Icon */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
              fill="white"
            />
          </svg>
        </div>

        {/* More Decorative Dots */}
        <div className="absolute -bottom-1 -left-2 w-1.5 h-1.5 rounded-full bg-primary/40" />
      </div>
    </Card>
  );
}
