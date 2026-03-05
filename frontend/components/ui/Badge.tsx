import { cn } from "@/lib/utils";
import type { BadgeProps } from "@/types";

/**
 * Badge component for labels and tags
 */
export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const variants = {
    default:
      "bg-[#FF5722]/10 text-[#FF5722] border-[#FF5722]/30",
    success:
      "bg-green-500/10 text-green-400 border-green-500/30",
    warning:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    error:
      "bg-red-500/10 text-red-400 border-red-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
