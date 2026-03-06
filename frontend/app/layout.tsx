import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

/**
 * Primary Font: Poppins
 * Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
 * Usage: All UI elements - headings, body, buttons, navigation, forms, etc.
 */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Athlixir | AI-Powered Athlete Ecosystem",
  description:
    "Empowering grassroots athletes with verified digital profiles, injury tracking, performance analytics, and real career opportunities.",
  keywords: [
    "athlete",
    "sports",
    "performance analytics",
    "injury tracking",
    "digital profile",
    "scouting",
    "career opportunities",
  ],
  authors: [{ name: "Athlixir" }],
  openGraph: {
    title: "Athlixir | AI-Powered Athlete Ecosystem",
    description:
      "Empowering grassroots athletes with verified digital profiles, injury tracking, performance analytics, and real career opportunities.",
    type: "website",
    locale: "en_US",
    siteName: "Athlixir",
  },
  twitter: {
    card: "summary_large_image",
    title: "Athlixir | AI-Powered Athlete Ecosystem",
    description:
      "Empowering grassroots athletes with verified digital profiles, injury tracking, performance analytics, and real career opportunities.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.variable} antialiased bg-[#0A0A0A] text-white font-sans min-h-screen flex flex-col overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
