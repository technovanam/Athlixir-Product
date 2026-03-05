import { cn } from "@/lib/utils";
import type { CardProps } from "@/types";

/**
 * Card component with glassmorphism support
 * Features backdrop blur to show background image through
 */
export default function Card({
  children,
  className,
  glassmorphism = true,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6",
        glassmorphism
          ? "bg-black/20 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/20"
          : "bg-[#1A1A1A] border border-white/5",
        className
      )}
    >
      {children}
    </div>
  );
}
