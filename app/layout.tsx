// ============================================
// app/layout.tsx
// GLOBAL LAYOUT - MASJID RAYA AL-JABBAR
// ============================================

import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";

import "./globals.css";


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

        {/* ==================================================
            WEBSITE
            SCALE HANYA UNTUK DESKTOP
        ================================================== */}

        <div
          className="
            origin-top-left
            lg:scale-[0.8]
            lg:w-[125%]
          "
        >
          {children}
        </div>

       {/* ==============================
            IKLAN PILAR — DI LUAR SCALE
        ============================== */}

        <div
          className="
            fixed
            left-[24px]
            top-[125px]
            z-[900]
            hidden
            xl:block
          "
        >
          <div
            className="
              w-[130px]
              h-[450px]
              rounded-[22px]
              bg-white/95
              shadow-lg
              flex
              items-center
              justify-center
              text-center
            "
          >
            <div>
	    
              <p className="
                text-[11px]
                tracking-[0.2em]
                text-[#A5AFBE]
              ">
                ADVERTISEMENT
              </p>

              <p className="
                text-xs
                text-[#A5AFBE]
                mt-2
              ">
                130 × 450 px
              </p>
            </div>
          </div>
        </div>


        {/* IKLAN KANAN */}

        <div
          className="
            fixed
            right-[24px]
            top-[125px]
            z-[900]
            hidden
            xl:block
          "
        >
          <div
            className="
              w-[130px]
              h-[450px]
              rounded-[22px]
              bg-white/95
              shadow-lg
              flex
              items-center
              justify-center
              text-center
            "
          >
            <div>
              <p className="
                text-[11px]
                tracking-[0.2em]
                text-[#A5AFBE]
              ">
                ADVERTISEMENT
              </p>

              <p className="
                text-xs
                text-[#A5AFBE]
                mt-2
              ">
                130 × 450 px
              </p>
            </div>
          </div>
        </div>
      </body>

    </html>
  );
}