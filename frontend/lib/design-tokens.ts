/**
 * Athlixir Design System - v1.0
 * 
 * Color system built for high contrast dark UI, performance & energy,
 * sports-tech identity, dashboard readability, and accessibility compliance.
 * Visual tone: Aggressive, Modern, AI-driven, Athletic, Premium dark SaaS.
 */

// ============================================
// COLOR TOKENS
// ============================================

export const COLORS = {
  // Brand Primary (use < 10% of total UI area)
  primary: {
    DEFAULT: "#FF5722",
    hover: "#E64A19",
    active: "#D84315",
    soft: "rgba(255,87,34,0.12)",
  },

  // Background & Surfaces (never use pure black #000000)
  background: "#050505",
  surface: {
    1: "#0F0F0F",
    2: "#161616",
    3: "#1E1E1E",
  },

  // Text Hierarchy
  text: {
    primary: "#FFFFFF",      // 100% opacity - Main Heading / UI Text
    secondary: "#B3B3B3",    // 70% opacity - Secondary / Body Copy
    muted: "#808080",        // 50% opacity - Muted / Metadata Labels
  },

  // Semantic States
  semantic: {
    success: "#22C55E",
    error: "#EF4444",
    warning: "#F59E0B",
    info: "#3B82F6",
  },
} as const;

// ============================================
// TYPOGRAPHY TOKENS
// ============================================

export const TYPOGRAPHY = {
  fontFamily: {
    primary: "'Poppins', sans-serif",
  },

  // Font Weights
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Font Sizes with Line Heights
  fontSize: {
    heroXL: { size: "56px", weight: 700, lineHeight: 1.1 },    // Unlock Peak
    heroL: { size: "48px", weight: 700, lineHeight: 1.1 },     // Train Smarter
    h1: { size: "36px", weight: 700, lineHeight: 1.2 },        // Dashboard
    h2: { size: "28px", weight: 700, lineHeight: 1.2 },        // Performance
    h3: { size: "22px", weight: 600, lineHeight: 1.3 },        // Weekly Stats
    h4: { size: "18px", weight: 600, lineHeight: 1.3 },        // Session Details
    h5: { size: "16px", weight: 600, lineHeight: 1.4 },        // Card Title
    h6: { size: "14px", weight: 600, lineHeight: 1.4 },        // Label
    bodyLarge: { size: "18px", weight: 400, lineHeight: 1.7 }, // Track every rep
    bodyDefault: { size: "16px", weight: 400, lineHeight: 1.6 }, // AI coach adapts
    bodyMedium: { size: "15px", weight: 400, lineHeight: 1.6 }, // Optimize
    bodySmall: { size: "14px", weight: 400, lineHeight: 1.5 }, // Secondary text
    caption: { size: "13px", weight: 400, lineHeight: 1.4 },   // Helper text
    micro: { size: "12px", weight: 400, lineHeight: 1.4 },     // Timestamps
    legal: { size: "11px", weight: 400, lineHeight: 1.4 },     // Terms
  },

  // Letter Spacing
  letterSpacing: {
    hero: "-0.5px",
    heading: "-0.25px",
    body: "0",
    button: "0.3px",
    caps: "1px",
  },
} as const;

// ============================================
// SPACING TOKENS (8px Grid System)
// ============================================

export const SPACING = {
  // Core Scale (multiples of 8px)
  0: "0px",
  0.5: "4px",    // 0.5 unit - micro spacing
  1: "8px",      // 1 unit
  2: "16px",     // 2 units
  3: "24px",     // 3 units
  4: "32px",     // 4 units
  5: "40px",     // 5 units
  6: "48px",     // 6 units
  8: "64px",     // 8 units
  10: "80px",    // 10 units
  12: "96px",    // 12 units
  16: "128px",   // 16 units

  // Extended Layout Spacing
  20: "160px",   // Hero sections
  24: "192px",   // Landing pages
  32: "256px",   // Marketing layouts
} as const;

// ============================================
// COMPONENT SPACING
// ============================================

export const COMPONENT_SPACING = {
  card: {
    padding: "24px",
  },
  button: {
    medium: { vertical: "10px", horizontal: "20px" },
  },
  form: {
    labelToInput: "8px",
    inputToError: "4px",
  },
  navbar: {
    height: "64px",
  },
  sidebar: {
    width: "240px",
  },
  table: {
    cell: { vertical: "12px", horizontal: "16px" },
  },
} as const;

// ============================================
// SPACING HIERARCHY
// ============================================

export const SPACING_HIERARCHY = {
  titleToSubtitle: "8px",
  subtitleToBody: "16px",
  bodyToButton: "24px",
  sectionToSection: "80px",
} as const;

// ============================================
// CSS CUSTOM PROPERTIES (for use in CSS/Tailwind)
// ============================================

export const CSS_VARIABLES = `
:root {
  /* Primary */
  --color-primary: #FF5722;
  --color-primary-hover: #E64A19;
  --color-primary-active: #D84315;
  --color-primary-soft: rgba(255,87,34,0.12);

  /* Background & Surfaces */
  --color-background: #050505;
  --color-surface-1: #0F0F0F;
  --color-surface-2: #161616;
  --color-surface-3: #1E1E1E;

  /* Text */
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #B3B3B3;
  --color-text-muted: #808080;

  /* Semantic */
  --color-success: #22C55E;
  --color-error: #EF4444;
  --color-warning: #F59E0B;
  --color-info: #3B82F6;

  /* Typography */
  --font-family: 'Poppins', sans-serif;

  /* Spacing */
  --spacing-unit: 8px;
}
`;
