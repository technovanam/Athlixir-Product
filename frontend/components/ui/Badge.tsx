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
      "bg-primary/10 text-primary border-primary/30",
    success:
      "bg-success/10 text-success border-success/30",
    warning:
      "bg-warning/10 text-warning border-warning/30",
    error:
      "bg-error/10 text-error border-error/30",
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
