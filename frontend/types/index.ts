// Navigation Types
export interface NavLink {
  name: string;
  href: string;
}

// Button Variants
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

// Component Props Types
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error";
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  glassmorphism?: boolean;
}

// Stats Types
export interface StatItem {
  label: string;
  value: number;
  unit?: string;
  color?: string;
}
