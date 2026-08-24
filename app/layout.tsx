import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingAds from "@/components/FloatingAds";

import "./globals.css";


const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: "Masjid Raya Al-Jabbar",
  description:
    "Website resmi Masjid Raya Al-Jabbar Jawa Barat",
};


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

        <div
          className="
            origin-top-left
            lg:scale-[0.8]
            lg:w-[125%]
          "
        >

          <Navbar />

          {children}

          <Footer />

        </div>


        <FloatingAds />

      </body>

    </html>
  );
}