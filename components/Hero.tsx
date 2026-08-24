"use client";

import { useRef, useState } from "react";

import {
  MessageCircle,
  PlayCircle,
  X,
} from "lucide-react";


export default function Hero() {

  // ==================================================
  // STATE
  // ==================================================

  const [openAI, setOpenAI] = useState(false);

  const [openVideo, setOpenVideo] =
    useState(false);


  // ==================================================
  // VIDEO REF
  // ==================================================

  const videoRef =
    useRef<HTMLDivElement>(null);


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
          HERO IMAGE
      ================================================== */}

      <div
        className="
          absolute
          inset-0
        "
      >

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
          BLUE OVERLAY
          TANPA GRADIENT
      ================================================== */}

      <div
        className="
          absolute
          inset-0

          bg-[#0D2341]/45
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

              text-white

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

              text-white

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
                CHAT AI
            ================================================== */}

            <button
              type="button"

              onClick={() =>
                setOpenAI(true)
              }

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
                VIDEO PROFIL
            ================================================== */}

            <button
              type="button"

              onClick={() =>
                setOpenVideo(true)
              }

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


      {/* ==================================================
          MODAL CHAT AI
      ================================================== */}

      {openAI && (

        <div
          className="
            fixed
            inset-0

            z-[9999]

            flex
            items-start
            justify-center

            overflow-y-auto

            bg-black/70

            p-3

            pt-16

            backdrop-blur-sm

            sm:p-6
            sm:pt-20

            lg:pt-24
          "

          onClick={() =>
            setOpenAI(false)
          }
        >

          <div
            className="
              relative

              h-[calc(100vh-80px)]

              max-h-[720px]

              w-full

              max-w-[500px]

              overflow-hidden

              rounded-[24px]

              bg-white

              shadow-[0_25px_80px_rgba(0,0,0,0.45)]

              sm:h-[720px]

              sm:rounded-[28px]
            "

            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* ==================================================
                CLOSE CHAT
            ================================================== */}

            <button
              type="button"

              onClick={() =>
                setOpenAI(false)
              }

              aria-label="Tutup Chat AI"

              className="
                absolute

                right-3
                top-3

                z-20

                flex

                h-10
                w-10

                items-center
                justify-center

                rounded-full

                bg-black/60

                text-white

                transition

                hover:bg-black/80
              "
            >

              <X size={22} />

            </button>


            {/* ==================================================
                AI WIDGET
            ================================================== */}

            <iframe
              src="/widget-tanya-ai"

              title="Tanya AI — Masjid Raya Al-Jabbar"

              className="
                h-full
                w-full

                border-0
              "

              allow="microphone"
            />

          </div>

        </div>

      )}


      {/* ==================================================
          MODAL VIDEO
      ================================================== */}

      {openVideo && (

        <div
          className="
            fixed
            inset-0

            z-[9999]

            flex
            items-start
            justify-center

            overflow-y-auto

            bg-black/90

            px-3
            py-16

            backdrop-blur-md

            sm:px-6
            sm:py-20
          "

          onClick={() =>
            setOpenVideo(false)
          }
        >

          <div
            ref={videoRef}

            className="
              relative

              w-full

              max-w-5xl
            "

            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* ==================================================
                CLOSE VIDEO
            ================================================== */}

            <button
              type="button"

              onClick={() =>
                setOpenVideo(false)
              }

              aria-label="Tutup video"

              className="
                absolute

                right-0

                -top-12

                z-20

                flex

                h-10
                w-10

                items-center
                justify-center

                rounded-full

                bg-white/10

                text-white

                transition

                hover:bg-white/20

                sm:-top-14
              "
            >

              <X size={26} />

            </button>


            {/* ==================================================
                VIDEO PLAYER
            ================================================== */}

            <div
              className="
                relative

                aspect-video

                w-full

                overflow-hidden

                rounded-[20px]

                bg-black

                shadow-[0_25px_80px_rgba(0,0,0,0.55)]

                sm:rounded-[28px]
              "
            >

              <iframe
                className="
                  absolute
                  inset-0

                  h-full
                  w-full
                "

                src="https://www.youtube.com/embed/ud62Pr9jzfg?autoplay=1&rel=0"

                title="Profil Masjid Raya Al-Jabbar"

                allow="
                  accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture;
                  web-share
                "

                allowFullScreen
              />

            </div>


            {/* ==================================================
                VIDEO TITLE
            ================================================== */}

            <div
              className="
                mt-4

                px-4

                text-center

                text-white
              "
            >

              <p
                className="
                  text-xs

                  uppercase

                  tracking-[0.2em]

                  text-white/60

                  sm:text-sm
                "
              >
                Video Profil
              </p>


              <h2
                className="
                  mt-1

                  font-serif

                  text-xl

                  font-semibold

                  sm:text-2xl
                "
              >
                Masjid Raya Al-Jabbar
              </h2>

            </div>

          </div>

        </div>

      )}

    </section>
  );
}