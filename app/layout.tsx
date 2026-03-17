import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
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
        className={`${archivo.variable} antialiased bg-background text-white font-sans min-h-screen flex flex-col overflow-x-hidden scrollbar-none`}
      >
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
