// ============================================
// app/page.tsx
// FINAL PREMIUM UI - MASJID AL JABBAR
// ============================================

"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

import StatsCard from "@/components/StatsCard";
import EventCard from "@/components/EventCard";
import NewsCard from "@/components/NewsCard";
import PrayerTimes from "@/components/PrayerTimes";
import ActivityPermitCard from "@/components/ActivityPermitCard";
import VideoCard from "@/components/VideoCard";

import {
  Building2,
  CalendarDays,
  Users,
  ArrowRight,
} from "lucide-react";


export default function HomePage() {

  return (
    <>
      {/* ==================================================
          MAIN WEBSITE
      ================================================== */}

      <main
        className="
          min-h-screen
          bg-[#F5F7FA]
          overflow-x-hidden
          text-[#0D2341]
        "
      >

        {/* ==================================================
            HERO
        ================================================== */}

        <Hero />


        {/* ==================================================
            FLOATING INFO SECTION
        ================================================== */}

        <section
          id="floating-info"
          className="
            relative
            z-20
            mt-6

            sm:mt-8

            lg:mt-10
          "
        >

          <div
            className="
              max-w-7xl
              mx-auto
              px-4
              sm:px-6
            "
          >

            <div
              className="
                bg-white
                rounded-3xl

                border
                border-[#E8EDF3]

                shadow-[0_10px_40px_rgba(0,0,0,0.06)]

                px-6
                lg:px-8

                py-6
                lg:py-8
              "
            >

              {/* ==================================================
                  HORIZONTAL ADVERTISEMENT
              ================================================== */}

              <section
                className="
                  relative
                  z-10
                  py-2
                "
              >

                <div
                  className="
                    max-w-6xl
                    mx-auto
                  "
                >

                  <div
                    className="
                      relative
                      w-full

                      min-h-[90px]
                      lg:min-h-[110px]

                      rounded-2xl

                      overflow-hidden

                      bg-white

                      border
                      border-[#E8EDF3]

                      shadow-sm
                    "
                  >

                    <span
                      className="
                        absolute
                        top-2
                        left-3

                        text-[9px]
                        uppercase
                        tracking-widest

                        text-[#A0A9B7]
                      "
                    >
                      Advertisement
                    </span>


                    <div
                      className="
                        flex
                        items-center
                        justify-center

                        min-h-[90px]
                        lg:min-h-[110px]

                        px-4
                      "
                    >

                      <div
                        className="
                          text-center
                          text-[#B0B7C3]
                        "
                      >

                        <p
                          className="
                            text-xs
                            uppercase
                            tracking-[0.2em]
                          "
                        >
                          Ruang Iklan
                        </p>

                        <p
                          className="
                            text-[11px]
                            mt-1
                          "
                        >
                          970 × 90 px
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </section>


              {/* ==================================================
                  NEWS SECTION
              ================================================== */}

              <section className="pb-24">

                <div
                  className="
                    max-w-6xl
                    mx-auto
                    px-4
                    sm:px-6
                  "
                >

                  <div
                    className="
                      flex
                      items-end
                      justify-between
                    "
                  >

                    <div>

                      <h2
                        className="
                          font-serif

                          text-[40px]
                          lg:text-[52px]

                          leading-tight

                          font-bold

                          text-[#0D2341]

                          mt-5
                        "
                      >
                        Berita & Artikel
                      </h2>

                    </div>

                  </div>


                  <NewsCard />

                </div>

              </section>


              {/* ==================================================
                  VIDEO SECTION
              ================================================== */}

              <section className="pb-24">

                <div
                  className="
                    max-w-6xl
                    mx-auto
                    px-4
                    sm:px-6
                  "
                >

                  <div
                    className="
                      flex
                      items-end
                      justify-between
                    "
                  >

                    <div>

                      <p
                        className="
                          uppercase
                          tracking-[0.25em]

                          text-[#7A8599]

                          font-medium
                          text-sm
                        "
                      >
                        Multimedia
                      </p>


                      <h2
                        className="
                          font-serif

                          text-[40px]
                          lg:text-[52px]

                          leading-tight

                          font-bold

                          text-[#0D2341]

                          mt-5
                        "
                      >
                        Video Terbaru
                      </h2>

                    </div>

                  </div>


                  <div className="mt-14">
                    <VideoCard />
                  </div>

                </div>

              </section>


              {/* ==================================================
                  PRAYER + ACTIVITY PERMIT
              ================================================== */}

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2

                  gap-6
                "
              >

                {/* PRAYER */}

                <div className="h-full">
                  <PrayerTimes />
                </div>


                {/* PERMOHONAN IZIN */}

                <div className="h-full">
                  <ActivityPermitCard />
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ==================================================
            EVENT SECTION
        ================================================== */}

        <section className="pb-24">

          <div
            className="
              max-w-6xl
              mx-auto
              px-4
              sm:px-6
            "
          >

            <div
              className="
                flex
                flex-col

                lg:flex-row
                lg:items-end
                lg:justify-between

                gap-6
              "
            >

              <div>

                <h2
                  className="
                    font-serif

                    text-[40px]
                    lg:text-[52px]

                    leading-tight

                    font-bold

                    text-[#0D2341]

                    mt-5
                  "
                >
                  Agenda Kegiatan
                </h2>

              </div>


              <button
                type="button"
                className="
                  flex
                  items-center
                  gap-2

                  text-[#123A63]

                  font-semibold
                "
              >
                Lihat Semua

                <ArrowRight size={18} />

              </button>

            </div>


            {/* AGENDA WORDPRESS */}

            <EventCard />

          </div>

        </section>


        {/* ==================================================
            GALLERY SECTION
        ================================================== */}

        <section className="pb-24">

          <div
            className="
              max-w-6xl
              mx-auto
              px-4
              sm:px-6
            "
          >

            <div
              className="
                flex
                items-end
                justify-between
              "
            >

              <div>

                <h2
                  className="
                    font-serif

                    text-[40px]
                    lg:text-[52px]

                    leading-tight

                    font-bold

                    text-[#0D2341]

                    mt-5
                  "
                >
                  Arsitektur
                </h2>

              </div>

            </div>


            {/* ==================================================
                GALLERY GRID
            ================================================== */}

            <div
              className="
                grid
                grid-cols-2
                md:grid-cols-4

                gap-5

                mt-14
              "
            >

              {[1, 2, 3, 4].map((item) => (

                <div
                  key={item}
                  className="
                    relative

                    rounded-3xl

                    overflow-hidden

                    h-[240px]
                    lg:h-[300px]

                    group
                  "
                >

                  <img
                    src={`/gallery-${item}.jpg`}
                    alt=""
                    className="
                      w-full
                      h-full

                      object-cover

                      group-hover:scale-110

                      transition
                      duration-700
                    "
                  />


                  <div
                    className="
                      absolute
                      inset-0

                      bg-gradient-to-t
                      from-black/70
                      via-black/10
                      to-transparent
                    "
                  />

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* ==================================================
            ABOUT SECTION
        ================================================== */}

        <section className="pt-24 pb-24">

          <div
            className="
              max-w-6xl
              mx-auto
              px-4
              sm:px-6
            "
          >

            <div
              className="
                grid
                lg:grid-cols-2

                gap-10
                lg:gap-14

                items-start
              "
            >

              {/* ==================================================
                  LEFT
              ================================================== */}

              <div>

                <p
                  className="
                    uppercase
                    tracking-[0.25em]

                    text-[#7A8599]

                    font-medium
                    text-sm
                  "
                >
                  Tentang Kami
                </p>


                <h2
                  className="
                    font-serif

                    text-[42px]
                    lg:text-[56px]

                    leading-tight

                    font-bold

                    text-[#0D2341]

                    mt-5
                  "
                >
                  Masjid Raya
                  <br />
                  Al-Jabbar
                </h2>


                <p
                  className="
                    mt-8

                    text-lg
                    lg:text-xl

                    leading-relaxed

                    text-[#516176]

                    max-w-xl
                  "
                >
                  Masjid Raya Al-Jabbar merupakan simbol
                  persatuan umat Islam modern dengan
                  arsitektur megah yang terinspirasi
                  dari nilai spiritual dan budaya Nusantara.
                </p>


                <button
                  type="button"
                  className="
                    mt-10

                    bg-[#123A63]

                    hover:bg-[#0f3153]

                    transition

                    text-white

                    px-7
                    py-4

                    rounded-2xl

                    flex
                    items-center
                    gap-3

                    shadow-lg
                  "
                >
                  Selengkapnya

                  <ArrowRight size={18} />

                </button>

              </div>


              {/* ==================================================
                  RIGHT - STATISTICS
              ================================================== */}

              <div
                className="
                  grid
                  sm:grid-cols-3
                  gap-5
                "
              >

                <StatsCard
                  icon={
                    <Users className="w-10 h-10" />
                  }
                  title="33K"
                  desc="Kapasitas Jamaah"
                />


                <StatsCard
                  icon={
                    <Building2 className="w-10 h-10" />
                  }
                  title="99K"
                  desc="Luas Bangunan"
                />


                <StatsCard
                  icon={
                    <CalendarDays className="w-10 h-10" />
                  }
                  title="2022"
                  desc="Peresmian"
                />

              </div>

            </div>

          </div>

        </section>


      </main>
    </>
  );
}