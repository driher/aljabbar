"use client";

import {
  MessageCircle,
  PlayCircle,
} from "lucide-react";

interface HeroProps {
  setOpenAI: (open: boolean) => void;
  setOpenVideo: (open: boolean) => void;
}

export default function Hero({
  setOpenAI,
  setOpenVideo,
}: HeroProps) {
  return (
    <section
      className="
        relative
        z-[40]
        min-h-[680px]
        overflow-hidden

        sm:min-h-[720px]

        lg:min-h-[760px]
      "
    >

      {/* ==================================================
          BACKGROUND IMAGE
      ================================================== */}

      <div className="absolute inset-0">

        <img
          src="/hero-masjid.jpg"
          alt="Masjid Raya Al-Jabbar"
          className="
            h-full
            w-full
            object-cover
            object-center
          "
        />

      </div>


      {/* ==================================================
          DARK OVERLAY
      ================================================== */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-t
          from-[#06182D]/95
          via-[#0D2341]/45
          to-[#0D2341]/10
        "
      />


      {/* ==================================================
          EXTRA MOBILE OVERLAY
          supaya teks lebih terbaca
      ================================================== */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-r
          from-[#0D2341]/35
          via-transparent
          to-transparent

          sm:from-[#0D2341]/40
        "
      />


      {/* ==================================================
          HERO CONTENT
      ================================================== */}

      <div
        className="
          absolute
          inset-0
          z-[50]
        "
      >

        <div
          className="
            absolute

            left-6
            right-6

            top-[22%]

            sm:left-8
            sm:right-auto
            sm:top-[25%]

            lg:left-[calc(8%+3rem)]
            lg:right-auto
            lg:top-[25%]

            w-auto

            sm:w-[650px]

            lg:w-[700px]
          "
        >

          {/* ==================================================
              LABEL
          ================================================== */}

          <p
            className="
              uppercase
              tracking-[0.25em]

              text-[10px]
              font-semibold

              text-white/75

              sm:text-xs

              lg:text-sm
            "
          >
            MASJID RAYA AL-JABBAR
          </p>


          {/* ==================================================
              TITLE
          ================================================== */}

          <h1
            className="
              mt-3

              font-serif
              font-bold
              leading-[1.02]

              text-[38px]
              text-white

              sm:mt-4
              sm:text-[52px]

              lg:text-[72px]
            "
          >
            Masjid Raya
            <br />
            Al-Jabbar
          </h1>


          {/* ==================================================
              DESCRIPTION
          ================================================== */}

          <p
            className="
              mt-4

              max-w-[340px]

              text-[14px]
              leading-relaxed

              text-white/80

              sm:mt-6
              sm:max-w-[400px]
              sm:text-lg

              lg:text-xl
            "
          >
            Masjid kebanggaan Jawa Barat,
            simbol persatuan, keberkahan,
            dan peradaban Islam modern.
          </p>


         {/* ==================================================
    BUTTONS
================================================== */}

<div
  className="
    relative
    z-[100]

    mt-20

    flex
    flex-col
    gap-3

    sm:mt-24
    sm:flex-row
    sm:gap-4

    lg:mt-28
  "
>
            {/* ==================================================
                AI BUTTON
            ================================================== */}

            <button
              type="button"
              onClick={() => setOpenAI(true)}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2.5

                rounded-2xl

                bg-[#123A63]

                px-5
                py-3.5

                text-sm
                font-semibold
                text-white

                shadow-[0_10px_30px_rgba(18,58,99,0.3)]

                transition-all

                hover:bg-[#0F3153]

                active:scale-[0.98]

                sm:w-auto
                sm:px-7
                sm:py-4
                sm:text-base
              "
            >

              <MessageCircle
                size={19}
                strokeWidth={2}
              />

              <span>
                Chat dengan AI
              </span>

            </button>


            {/* ==================================================
                VIDEO BUTTON
            ================================================== */}

            <button
              type="button"
              onClick={() => setOpenVideo(true)}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2.5

                rounded-2xl

                border
                border-white

                bg-white/95

                px-5
                py-3.5

                text-sm
                font-semibold
                text-[#123A63]

                shadow-[0_10px_30px_rgba(0,0,0,0.15)]

                backdrop-blur-md

                transition-all

                hover:bg-white

                active:scale-[0.98]

                sm:w-auto
                sm:px-7
                sm:py-4
                sm:text-base
              "
            >

              <PlayCircle
                size={20}
                strokeWidth={2}
              />

              <span>
                Video Profil Masjid
              </span>

            </button>

          </div>

        </div>

      </div>


     

    </section>
  );
}