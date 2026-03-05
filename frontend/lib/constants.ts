// Navigation Links
export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Features", href: "/features" },
  { name: "Research", href: "/research" },
  { name: "For Athletes", href: "/for-athletes" },
  { name: "Contact", href: "/contact" },
] as const;

// Site Metadata
export const SITE_CONFIG = {
  name: "Athlixir",
  description:
    "Empowering grassroots athletes with verified digital profiles, injury tracking, performance analytics, and real career opportunities.",
  tagline: "AI-POWERED ATHLETE ECOSYSTEM",
  heroTitle: {
    line1: "Your Talent.",
    line2: "Your Data.",
    line3: "Your Future.",
  },
} as const;

// Statistics for Scouting Reach Card
export const SCOUTING_STATS = {
  manualProfile: 12,
  athlixirPowered: 94,
} as const;

// Color Palette
export const COLORS = {
  primary: "#FF5722", // Orange/Coral
  secondary: "#1A1A1A", // Dark background
  accent: "#FF6B35", // Lighter orange
  text: {
    primary: "#FFFFFF",
    secondary: "#A0A0A0",
    muted: "#6B7280",
  },
  background: {
    dark: "#0A0A0A",
    card: "rgba(26, 26, 26, 0.8)",
  },
} as const;
