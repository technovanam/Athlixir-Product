import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/types";

/**
 * Primary Button component with variants
 * Supports primary, secondary, outline, and ghost variants
 * Font: Poppins Medium (500) as per design system
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A0A0A] disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-[#FF5722] text-white hover:bg-[#FF6B35] focus:ring-[#FF5722] shadow-lg hover:shadow-xl hover:shadow-[#FF5722]/20",
      secondary:
        "bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] focus:ring-[#1A1A1A] border border-white/10",
      outline:
        "bg-transparent text-white border-2 border-white/30 hover:border-white/60 hover:bg-white/5 focus:ring-white/30",
      ghost:
        "bg-transparent text-white hover:bg-white/10 focus:ring-white/20",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-md gap-1.5",
      md: "px-6 py-3 text-base rounded-md gap-2",
      lg: "px-8 py-4 text-lg rounded-md gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
