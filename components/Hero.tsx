// ===============================
// components/Hero.tsx
// ===============================

"use client";

import { useState } from "react";

import {
  MessageCircle,
  PlayCircle,
  X,
} from "lucide-react";

export default function Hero() {

const [openAI, setOpenAI] =
  useState(false);

  const [openVideo, setOpenVideo] =
    useState(false);

  return (
    <>
      <section className="relative h-[960px] overflow-hidden">

        {/* BACKGROUND */}
        <img
          src="/hero-masjid.jpg"
          alt="Masjid"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/40 to-transparent" />

       {/* CONTENT */}
<div className="relative z-10 max-w-7xl mx-auto px-6 pt-44">

  <div className="max-w-[700px] ml-[8%]">

    <h1 className="font-serif text-[88px] leading-[0.95] font-bold text-[#0D2341]">
      Masjid Raya
      <br />
      Al-Jabbar
    </h1>

    <p className="mt-10 text-[30px] leading-relaxed text-[#344054] max-w-[680px]">
      Masjid kebanggaan Jawa Barat,
      simbol persatuan, keberkahan,
      dan peradaban Islam modern.
    </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-5 mt-12">

<button
  type="button"
  onClick={() => setOpenAI(true)}
  className="
    bg-[#123A63]
    hover:bg-[#0f3153]
    transition
    text-white
    rounded-2xl
    px-8
    py-5
    flex
    items-center
    gap-3
    shadow-xl
  "
>
  <MessageCircle size={22} />
  Chat dengan AI
</button>

              {/* BUTTON PROFIL */}
              <button
                onClick={() =>
                  setOpenVideo(true)
                }
                className="bg-white rounded-2xl px-8 py-5 flex items-center gap-3 border border-white shadow-xl hover:bg-gray-50 transition"
              >
                <PlayCircle />

                Video Profil Masjid
              </button>

            </div>
          </div>
        </div>

{/* =========================
    MODAL CHAT AI
========================= */}

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
    p-4
    sm:p-6
    pt-20
    lg:pt-24
    overflow-y-auto
  "
  onClick={() => setOpenAI(false)}
>
<div
  className="
    relative
    w-full
    max-w-[500px]
    h-[700px]
    sm:h-[720px]
    bg-white
    rounded-[28px]
    overflow-hidden
    shadow-[0_25px_80px_rgba(0,0,0,0.45)]
  "
  onClick={(event) =>
    event.stopPropagation()
  }
>
      {/* CLOSE */}

      <button
        type="button"
        onClick={() => setOpenAI(false)}
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
        <X size={22} />
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
        {/* =========================
            MODAL VIDEO
        ========================= */}
        {openVideo && (

          <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-6">

            <div className="relative w-full max-w-5xl">

              {/* CLOSE */}
              <button
                onClick={() =>
                  setOpenVideo(false)
                }
                className="absolute -top-14 right-0 text-white hover:text-gray-300 transition"
              >
                <X size={34} />
              </button>

              {/* VIDEO */}
              <div className="relative w-full overflow-hidden rounded-[32px] shadow-2xl bg-black aspect-video">

                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/ud62Pr9jzfg?autoplay=1"
                  title="Profil Masjid Raya Al-Jabbar"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

              </div>
            </div>
          </div>
        )}

      </section>
    </>
  );
}