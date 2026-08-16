// ============================================
// components/Hero.tsx
// PREMIUM HERO - MASJID RAYA AL-JABBAR
//
// FINAL MOBILE REVISION
// ============================================

"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  MessageCircle,
  PlayCircle,
  X,
} from "lucide-react";

export default function Hero() {

  // ==========================================
  // STATE
  // ==========================================

  const [
    openAI,
    setOpenAI,
  ] = useState(false);

  const [
    openVideo,
    setOpenVideo,
  ] = useState(false);

  // ==========================================
  // VIDEO PLAYER REF
  // ==========================================

  const videoRef =
    useRef<HTMLDivElement | null>(
      null
    );

  // ==========================================
  // FOCUS VIDEO PLAYER
  // ==========================================

  useEffect(() => {

    if (!openVideo) {
      return;
    }

    const timer =
      window.setTimeout(() => {

        videoRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

      }, 150);

    return () => {
      window.clearTimeout(timer);
    };

  }, [openVideo]);

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <>
      {/* ======================================
          HERO
      ======================================= */}

      <section
        className="
          relative
          h-[680px]
          sm:h-[760px]
          lg:h-[960px]
          overflow-hidden
        "
      >

        {/* ====================================
            BACKGROUND IMAGE
        ===================================== */}

        <img
          src="/hero-masjid.jpg"
          alt="Masjid Raya Al-Jabbar"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            object-[62%_center]
            sm:object-center
          "
        />

        {/* ====================================
            DESKTOP OVERLAY
        ===================================== */}

        <div
          className="
            absolute
            inset-0
            hidden
            md:block
            bg-gradient-to-r
            from-white/95
            via-white/55
            to-transparent
          "
        />

        {/* ====================================
            MOBILE OVERLAY
        ===================================== */}

        <div
          className="
            absolute
            inset-0
            md:hidden
            bg-gradient-to-b
            from-black/10
            via-black/15
            to-[#06182B]/95
          "
        />

        {/* ====================================
            MOBILE TOP GRADIENT
        ===================================== */}

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-44
            md:hidden
            bg-gradient-to-b
            from-black/20
            to-transparent
          "
        />

        {/* ====================================
            CONTENT
        ===================================== */}

        <div
          className="
            relative
            z-10
            max-w-7xl
            mx-auto
            h-full
            px-5
            sm:px-6
            lg:px-8
            pt-32
            sm:pt-40
            lg:pt-44
            flex
            items-end
            md:items-start
          "
        >

          <div
            className="
              w-full
              max-w-[700px]
              ml-0
              lg:ml-[8%]
              pb-10
              sm:pb-20
              md:pb-0
            "
          >

            {/* ==================================
                EYEBROW
            =================================== */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                mb-5
                px-3
                py-1.5
                rounded-full
                bg-black/20
                md:bg-white/80
                backdrop-blur-md
                border
                border-white/30
                md:border-white/70
                text-white
                md:text-[#123A63]
                text-[10px]
                sm:text-xs
                font-semibold
                uppercase
                tracking-[0.18em]
                shadow-sm
              "
            >

              <span
                className="
                  w-1.5
                  h-1.5
                  rounded-full
                  bg-[#D6B46A]
                "
              />

              Masjid Raya Jawa Barat

            </div>

            {/* ==================================
                TITLE
            =================================== */}

            <h1
              className="
                font-serif
                text-[48px]
                leading-[0.94]
                sm:text-[64px]
                md:text-[76px]
                lg:text-[88px]
                lg:leading-[0.95]
                font-bold
                text-white
                md:text-[#0D2341]
                drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]
                md:drop-shadow-[0_2px_8px_rgba(255,255,255,0.35)]
              "
            >

              Masjid Raya
              <br />
              Al-Jabbar

            </h1>

            {/* ==================================
                DESCRIPTION
            =================================== */}

            <p
              className="
                mt-5
                sm:mt-7
                lg:mt-10
                text-[17px]
                sm:text-[21px]
                lg:text-[30px]
                leading-[1.55]
                lg:leading-relaxed
                text-white
                md:text-[#344054]
                max-w-[680px]
                font-medium
                lg:font-normal
                drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]
                md:drop-shadow-[0_1px_5px_rgba(255,255,255,0.45)]
              "
            >
              Masjid kebanggaan Jawa Barat,
              simbol persatuan, keberkahan,
              dan peradaban Islam modern.
            </p>

            {/* ==================================
                BUTTONS
            =================================== */}

            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-3
                sm:gap-4
                mt-7
                sm:mt-9
                lg:mt-12
              "
            >

              {/* =================================
                  AI BUTTON
              ================================== */}

              <button
                type="button"
                onClick={() =>
                  setOpenAI(true)
                }
                className="
                  w-full
                  sm:w-auto
                  bg-[#123A63]
                  hover:bg-[#0F3153]
                  active:scale-[0.98]
                  transition-all
                  text-white
                  rounded-2xl
                  px-6
                  sm:px-7
                  py-3.5
                  sm:py-4
                  flex
                  items-center
                  justify-center
                  gap-3
                  shadow-[0_10px_30px_rgba(18,58,99,0.3)]
                  font-semibold
                  text-sm
                  sm:text-base
                "
              >

                <MessageCircle
                  size={20}
                />

                Chat dengan AI

              </button>

              {/* =================================
                  VIDEO BUTTON
              ================================== */}

              <button
                type="button"
                onClick={() =>
                  setOpenVideo(true)
                }
                className="
                  w-full
                  sm:w-auto
                  bg-white/95
                  hover:bg-white
                  active:scale-[0.98]
                  backdrop-blur-md
                  rounded-2xl
                  px-6
                  sm:px-7
                  py-3.5
                  sm:py-4
                  flex
                  items-center
                  justify-center
                  gap-3
                  border
                  border-white
                  shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                  text-[#123A63]
                  font-semibold
                  text-sm
                  sm:text-base
                  transition-all
                "
              >

                <PlayCircle
                  size={21}
                />

                Video Profil Masjid

              </button>

            </div>

            {/* ==================================
                MOBILE SCROLL HINT
            =================================== */}

            <div
              className="
                mt-7
                sm:mt-9
                flex
                items-center
                gap-3
                text-white/80
                md:hidden
              "
            >

              <span
                className="
                  block
                  w-8
                  h-px
                  bg-white/70
                "
              />

              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                "
              >
                Jelajahi Masjid
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* ======================================
          MODAL CHAT AI
      ======================================= */}

      {openAI && (

        <div
          className="
            fixed
            inset-0
            z-[9999]
            bg-black/70
            backdrop-blur-sm
            flex
            items-start
            justify-center
            p-3
            sm:p-6
            pt-16
            sm:pt-20
            lg:pt-24
            overflow-y-auto
          "
          onClick={() =>
            setOpenAI(false)
          }
        >

          <div
            className="
              relative
              w-full
              max-w-[500px]
              h-[calc(100vh-80px)]
              sm:h-[720px]
              max-h-[720px]
              bg-white
              rounded-[24px]
              sm:rounded-[28px]
              overflow-hidden
              shadow-[0_25px_80px_rgba(0,0,0,0.45)]
            "
            onClick={(
              event
            ) =>
              event.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              type="button"
              onClick={() =>
                setOpenAI(false)
              }
              aria-label="Tutup Chat AI"
              className="
                absolute
                top-3
                right-3
                z-20
                w-10
                h-10
                rounded-full
                bg-black/60
                hover:bg-black/80
                text-white
                flex
                items-center
                justify-center
                transition
              "
            >

              <X
                size={22}
              />

            </button>

            {/* AI WIDGET */}

            <iframe
              src="/widget-tanya-ai"
              title="Tanya AI — Masjid Raya Al-Jabbar"
              className="
                w-full
                h-full
                border-0
              "
              allow="microphone"
            />

          </div>

        </div>

      )}

      {/* ======================================
          MODAL VIDEO
      ======================================= */}

      {openVideo && (

        <div
          className="
            fixed
            inset-0
            z-[9999]
            bg-black/90
            backdrop-blur-md
            flex
            items-start
            justify-center
            overflow-y-auto
            px-3
            sm:px-6
            py-16
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
              scroll-mt-10
            "
            onClick={(
              event
            ) =>
              event.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              type="button"
              onClick={() =>
                setOpenVideo(false)
              }
              aria-label="Tutup video"
              className="
                absolute
                -top-12
                sm:-top-14
                right-0
                w-10
                h-10
                rounded-full
                bg-white/10
                hover:bg-white/20
                text-white
                flex
                items-center
                justify-center
                transition
                z-20
              "
            >

              <X
                size={26}
              />

            </button>

            {/* VIDEO PLAYER */}

            <div
              className="
                relative
                w-full
                overflow-hidden
                rounded-[20px]
                sm:rounded-[28px]
                shadow-[0_25px_80px_rgba(0,0,0,0.55)]
                bg-black
                aspect-video
              "
            >

              <iframe
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
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

            {/* VIDEO TITLE */}

            <div
              className="
                mt-4
                text-white
                text-center
                px-4
              "
            >

              <p
                className="
                  text-xs
                  sm:text-sm
                  text-white/60
                  uppercase
                  tracking-[0.2em]
                "
              >
                Video Profil
              </p>

              <h2
                className="
                  font-serif
                  text-xl
                  sm:text-2xl
                  font-semibold
                  mt-1
                "
              >
                Masjid Raya Al-Jabbar
              </h2>

            </div>

          </div>

        </div>

      )}

    </>
  );
}