// ===============================
// components/Hero.tsx
// ===============================

"use client";

import { useState } from "react";

import {
  CalendarDays,
  PlayCircle,
  X,
} from "lucide-react";

export default function Hero() {

  const [openReservasi, setOpenReservasi] =
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

          <div className="max-w-[650px]">

            <h1 className="font-serif text-[88px] leading-[0.95] font-bold text-[#0D2341]">
              Masjid Raya
              <br />
              Al-Jabbar
            </h1>

            <p className="mt-10 text-[30px] leading-relaxed text-[#344054]">
              Masjid kebanggaan Jawa Barat,
              simbol persatuan, keberkahan,
              dan peradaban Islam modern.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-5 mt-12">

              {/* BUTTON RESERVASI */}
              <button
                onClick={() =>
                  setOpenReservasi(true)
                }
                className="bg-[#123A63] hover:bg-[#0f3153] transition text-white rounded-2xl px-8 py-5 flex items-center gap-3 shadow-xl"
              >
                <CalendarDays />

                Form Reservasi
              </button>

              {/* BUTTON PROFIL */}
              <button
                onClick={() =>
                  setOpenVideo(true)
                }
                className="bg-white rounded-2xl px-8 py-5 flex items-center gap-3 border border-white shadow-xl hover:bg-gray-50 transition"
              >
                <PlayCircle />

                Profil Masjid
              </button>

            </div>
          </div>
        </div>

        {/* =========================
            MODAL RESERVASI
        ========================= */}
        {openReservasi && (

          <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 p-6 overflow-y-auto">

            <div className="relative bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl">

              {/* CLOSE */}
              <button
                onClick={() =>
                  setOpenReservasi(false)
                }
                className="absolute top-5 right-5 w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-[#0D2341]"
              >
                <X size={22} />
              </button>

              {/* CONTENT */}
              <div className="p-10">

                <p className="uppercase tracking-[0.25em] text-[#7A8599] text-sm">
                  Reservasi
                </p>

                <h2 className="text-4xl font-bold mt-4 text-[#0D2341]">
                  Form Kunjungan
                </h2>

                <p className="text-[#667085] mt-4 leading-relaxed text-lg">
                  Reservasikan jadwal
                  kunjungan rombongan,
                  wisata religi, edukasi
                  sekolah, dan kegiatan
                  komunitas di Masjid Raya
                  Al-Jabbar.
                </p>

                <div className="flex flex-wrap gap-4 mt-10">

                  {/* FORM */}
                  <a
                    href="/reservasi-kunjungan"
                    className="bg-[#123A63] hover:bg-[#0f3153] transition text-white px-7 py-4 rounded-2xl"
                  >
                    Buka Form Reservasi
                  </a>

                  {/* LIHAT */}
                  <a
                    href="/jadwal-kunjungan"
                    className="border border-[#D0D5DD] hover:bg-gray-50 transition px-7 py-4 rounded-2xl text-[#0D2341]"
                  >
                    Lihat Reservasi
                  </a>

                  {/* CLOSE */}
                  <button
                    onClick={() =>
                      setOpenReservasi(false)
                    }
                    className="border border-[#D0D5DD] px-7 py-4 rounded-2xl"
                  >
                    Tutup
                  </button>

                </div>
              </div>
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