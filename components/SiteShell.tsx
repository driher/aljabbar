"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingAds from "@/components/FloatingAds";


export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();


  // ==================================================
  // AI CHATBOT WIDGET
  // ==================================================

  const isAIWidget =
    pathname === "/widget-tanya-ai";


  // ==================================================
  // KHUSUS CHATBOT
  //
  // TANPA:
  // - Navbar
  // - Footer
  // - Floating Ads
  // - Scale website
  // ==================================================

  if (isAIWidget) {

    return (
      <main
        className="
          min-h-screen
          w-full
          bg-white
          overflow-hidden
        "
      >
        {children}
      </main>
    );

  }


  // ==================================================
  // WEBSITE NORMAL
  // ==================================================

  return (
    <>

      {/* ==================================================
          WEBSITE CONTENT
      ================================================== */}

      <div
        className="
          origin-top-left

          lg:scale-[0.8]
          lg:w-[125%]
        "
      >

        {/* ==================================================
            NAVBAR
        ================================================== */}

        <Navbar />


        {/* ==================================================
            PAGE CONTENT
        ================================================== */}

        {children}


        {/* ==================================================
            FOOTER
        ================================================== */}

        <Footer />

      </div>


      {/* ==================================================
          FLOATING ADS
          DI LUAR SCALE
      ================================================== */}

      <FloatingAds />

    </>
  );
}