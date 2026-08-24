// ============================================
// app/layout.tsx
// GLOBAL LAYOUT - MASJID RAYA AL-JABBAR
// ============================================

import type { Metadata } from "next";

import {
  Playfair_Display,
  Inter,
} from "next/font/google";

import "./globals.css";

import SiteShell from "@/components/SiteShell";


// ==================================================
// FONT
// ==================================================

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


// ==================================================
// METADATA
// ==================================================

export const metadata: Metadata = {
  title: "Masjid Raya Al-Jabbar",

  description:
    "Website resmi Masjid Raya Al-Jabbar Jawa Barat",
};


// ==================================================
// ROOT LAYOUT
// ==================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="id">

      <body
        className={`
          ${playfair.variable}
          ${inter.variable}

          bg-[#F5F7FA]

          text-[#0D2341]

          overflow-x-hidden
        `}
      >

        <SiteShell>
          {children}
        </SiteShell>

      </body>

    </html>
  );
}