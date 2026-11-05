// ============================================
// app/layout.tsx
// GLOBAL LAYOUT - MASJID RAYA AL-JABBAR
// ============================================

import type { Metadata } from "next";

import localFont from "next/font/local";

import "./globals.css";

import SiteShell from "@/components/SiteShell";


// ==================================================
// FONT
// ==================================================

const playfair = localFont({
  src: "../public/fonts/PlayfairDisplay-Variable.ttf",
  variable: "--font-playfair",
  display: "swap",
});

const inter = localFont({
  src: "../public/fonts/Inter-Variable.ttf",
  variable: "--font-inter",
  display: "swap",
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