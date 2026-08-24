"use client";

import { useState } from "react";

import {
  MessageCircle,
  PlayCircle,
  X,
} from "lucide-react";


export default function Hero() {

  // ==================================================
  // STATE MODAL
  // ==================================================

  const [openAI, setOpenAI] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);


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
          BLUE OVERLAY
          BUKAN GRADIENT
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
                AI BUTTON
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
                VIDEO BUTTON
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
          AI MODAL
      ================================================== */}

      {openAI && (

        <div
          className="
            fixed

            inset-0

            z-[9999]

            flex

            items-center
            justify-center

            bg-black/60

            p-4
          "

          onClick={() =>
            setOpenAI(false)
          }
        >

          <div
            className="
              relative

              w-full

              max-w-lg

              rounded-3xl

              bg-white

              p-6

              shadow-2xl

              sm:p-8
            "

            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              type="button"

              onClick={() =>
                setOpenAI(false)
              }

              className="
                absolute

                right-4
                top-4

                flex

                h-10
                w-10

                items-center
                justify-center

                rounded-full

                bg-[#F5F7FA]

                text-[#0D2341]

                transition

                hover:bg-[#E8EDF3]
              "
            >

              <X size={20} />

            </button>


            {/* TITLE */}

            <div className="pr-10">

              <p
                className="
                  text-xs

                  font-semibold

                  uppercase

                  tracking-[0.2em]

                  text-[#7A8599]
                "
              >
                Asisten Digital
              </p>

              <h2
                className="
                  mt-2

                  font-serif

                  text-2xl

                  font-bold

                  text-[#0D2341]

                  sm:text-3xl
                "
              >
                Chat dengan AI
              </h2>

            </div>


            <p
              className="
                mt-5

                leading-relaxed

                text-[#667085]
              "
            >
              Asisten AI Masjid Raya Al-Jabbar
              siap membantu memberikan informasi
              mengenai masjid, layanan, kegiatan,
              agenda, dan informasi lainnya.
            </p>


            <div
              className="
                mt-6

                rounded-2xl

                bg-[#F5F7FA]

                p-5

                text-sm

                leading-relaxed

                text-[#516176]
              "
            >
              Silakan gunakan layanan Chat AI
              untuk mendapatkan informasi
              seputar Masjid Raya Al-Jabbar.
            </div>


            <button
              type="button"

              onClick={() =>
                setOpenAI(false)
              }

              className="
                mt-6

                rounded-xl

                bg-[#123A63]

                px-5
                py-3

                text-sm

                font-semibold

                text-white

                transition

                hover:bg-[#0F3153]
              "
            >
              Tutup
            </button>

          </div>

        </div>

      )}


      {/* ==================================================
          VIDEO MODAL
      ================================================== */}

      {openVideo && (

        <div
          className="
            fixed

            inset-0

            z-[9999]

            flex

            items-center
            justify-center

            bg-black/75

            p-4
          "

          onClick={() =>
            setOpenVideo(false)
          }
        >

          <div
            className="
              relative

              w-full

              max-w-5xl

              overflow-hidden

              rounded-3xl

              bg-black

              shadow-2xl
            "

            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              type="button"

              onClick={() =>
                setOpenVideo(false)
              }

              className="
                absolute

                right-4
                top-4

                z-20

                flex

                h-10
                w-10

                items-center
                justify-center

                rounded-full

                bg-black/60

                text-white

                backdrop-blur-md

                transition

                hover:bg-black/80
              "
            >

              <X size={20} />

            </button>


            {/* VIDEO */}

            <div
              className="
                aspect-video

                w-full
              "
            >

              <iframe
                className="
                  h-full
                  w-full
                "

                src="https://www.youtube.com/embed/"

                title="Video Profil Masjid Raya Al-Jabbar"

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

          </div>

        </div>

      )}

    </section>
  );
}