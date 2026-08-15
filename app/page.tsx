// ============================================
// app/page.tsx
// FINAL PREMIUM UI - MASJID AL JABBAR
// ============================================

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

import InfoCard from "@/components/InfoCard";
import StatsCard from "@/components/StatsCard";
import EventCard from "@/components/EventCard";
import NewsCard from "@/components/NewsCard";
import PrayerTimes from "@/components/PrayerTimes";

import {
  Building2,
  CalendarDays,
  Heart,
  Users,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
     {/* ==================================================
    FLOATING LEFT PILLAR AD
    Desktop only
================================================== */}
<aside
  className="
    hidden
    xl:flex
    fixed
    left-[clamp(16px,calc(50%-650px),280px)]
    top-[90px]
    z-[999]
    w-[130px]
    h-[450px]
    items-center
    justify-center
  "
>
  <div
    className="
      w-full
      h-full
      rounded-2xl
      overflow-hidden
      bg-white/90
      backdrop-blur-md
      border
      border-[#E8EDF3]
      shadow-[0_10px_35px_rgba(0,0,0,0.10)]
    "
  >
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center text-[#AAB2BE]">
        <p className="text-[9px] uppercase tracking-[0.2em]">
          Advertisement
        </p>

        <p className="text-[10px] mt-2">
          130 × 450 px
        </p>
      </div>
    </div>
  </div>
</aside>


{/* ==================================================
    FLOATING RIGHT PILLAR AD
    Desktop only
================================================== */}
<aside
  className="
    hidden
    xl:flex
    fixed
    right-[clamp(16px,calc(50%-650px),250px)]
    top-[90px]
    z-[999]
    w-[130px]
    h-[450px]
    items-center
    justify-center
  "
>
  <div
    className="
      w-full
      h-full
      rounded-2xl
      overflow-hidden
      bg-white/90
      backdrop-blur-md
      border
      border-[#E8EDF3]
      shadow-[0_10px_35px_rgba(0,0,0,0.10)]
    "
  >
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center text-[#AAB2BE]">
        <p className="text-[9px] uppercase tracking-[0.2em]">
          Advertisement
        </p>

        <p className="text-[10px] mt-2">
          130 × 450 px
        </p>
      </div>
    </div>
  </div>
</aside>


      {/* ==================================================
          MAIN WEBSITE
      ================================================== */}
      <main
        className="
          bg-[#F5F7FA]
          overflow-x-hidden
          text-[#0D2341]
          origin-top-left
          scale-[0.8]
          w-[125%]
        "
      >

        {/* ==================================================
            NAVBAR
        ================================================== */}
        <Navbar />


        {/* ==================================================
            HERO
        ================================================== */}
        <Hero />


        {/* ==================================================
            FLOATING INFO SECTION
        ================================================== */}
        <section className="-mt-32 relative z-20">

          <div className="max-w-7xl mx-auto px-4 sm:px-6">

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
              <section className="relative z-10 py-2">

                <div className="max-w-6xl mx-auto">

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

                    {/* LABEL */}
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


                    {/* AD SPACE */}
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

                      <div className="text-center text-[#B0B7C3]">

                        <p className="text-xs uppercase tracking-[0.2em]">
                          Ruang Iklan
                        </p>

                        <p className="text-[11px] mt-1">
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

                <div className="max-w-6xl mx-auto px-4 sm:px-6">

                  {/* HEADER */}
                  <div className="flex items-end justify-between">

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


                  {/* NEWS FROM WORDPRESS */}
                  <NewsCard />

                </div>

              </section>


              {/* ==================================================
                  PRAYER + INFO CARDS
              ================================================== */}
              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  xl:grid-cols-4
                  gap-6
                "
              >

                {/* PRAYER TIMES */}
                <div className="xl:col-span-2">

                  <PrayerTimes />

                </div>


                {/* INFO CARD */}
                <InfoCard
                  icon={<CalendarDays className="w-7 h-7" />}
                  title="Jadwal Kegiatan"
                  desc="Kajian dan kegiatan masjid"
                />


                {/* DONASI */}
                <InfoCard
                  icon={<Heart className="w-7 h-7" />}
                  title="Donasi"
                  desc="Bersama membangun umat"
                />

              </div>

            </div>

          </div>

        </section>


        {/* ==================================================
            ABOUT SECTION
        ================================================== */}
        <section className="pt-24 pb-24">

          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">

              {/* LEFT */}
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


              {/* RIGHT */}
              <div className="grid sm:grid-cols-3 gap-5">

                <StatsCard
                  icon={<Users className="w-10 h-10" />}
                  title="33K"
                  desc="Kapasitas Jamaah"
                />

                <StatsCard
                  icon={<Building2 className="w-10 h-10" />}
                  title="99K"
                  desc="Luas Bangunan"
                />

                <StatsCard
                  icon={<CalendarDays className="w-10 h-10" />}
                  title="2022"
                  desc="Peresmian"
                />

              </div>

            </div>

          </div>

        </section>


        {/* ==================================================
            EVENT SECTION
        ================================================== */}
        <section className="pb-24">

          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            {/* HEADER */}
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

                <p
                  className="
                    uppercase
                    tracking-[0.25em]
                    text-[#7A8599]
                    font-medium
                    text-sm
                  "
                >
                  Kegiatan
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
                  Jadwal Kegiatan
                </h2>

              </div>


              <button
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


            {/* GRID */}
            <div
              className="
                grid
                md:grid-cols-2
                xl:grid-cols-3
                gap-6
                mt-14
              "
            >

              <EventCard
                image="/kajian-1.jpg"
                title="Kajian Subuh Bersama Ustadz Nasional"
                date="25"
                category="Kajian Rutin"
                desc="Kajian terbuka untuk masyarakat umum setiap pekan."
              />


              <EventCard
                image="/kajian-2.jpg"
                title="Tabligh Akbar Akhir Pekan"
                date="27"
                category="Tabligh Akbar"
                desc="Menghadirkan pembicara nasional dan internasional."
              />


              <EventCard
                image="/kajian-3.jpg"
                title="Kajian Muslimah & Parenting"
                date="30"
                category="Kajian Muslimah"
                desc="Program edukasi keluarga Islami modern."
              />

            </div>

          </div>

        </section>


        {/* ==================================================
            GALLERY SECTION
        ================================================== */}
        <section className="pb-24">

          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            {/* HEADER */}
            <div className="flex items-end justify-between">

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
                  Galeri
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
                  Dokumentasi
                </h2>

              </div>

            </div>


            {/* GRID */}
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


                  <div
                    className="
                      absolute
                      bottom-5
                      left-5
                      text-white
                    "
                  >

                    <p className="text-xs uppercase tracking-widest">
                      Kegiatan
                    </p>


                    <h3 className="text-lg lg:text-xl font-semibold mt-2">
                      Kajian Akbar
                    </h3>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* ==================================================
            CTA SECTION
        ================================================== */}
        <section className="pb-24">

          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            <div
              className="
                relative
                overflow-hidden
                rounded-[36px]
                bg-[#123A63]
                px-8
                lg:px-12
                py-14
                lg:py-16
                text-white
              "
            >

              {/* BACKGROUND EFFECT */}
              <div
                className="
                  absolute
                  right-0
                  top-0
                  w-[500px]
                  h-[500px]
                  rounded-full
                  bg-white/5
                  blur-3xl
                "
              />


              <div className="relative z-10 max-w-3xl">

                <p
                  className="
                    uppercase
                    tracking-[0.25em]
                    text-white/70
                    text-sm
                  "
                >
                  Donasi
                </p>


                <h2
                  className="
                    font-serif
                    text-[42px]
                    lg:text-[56px]
                    leading-tight
                    font-bold
                    mt-6
                  "
                >
                  Bersama Memakmurkan
                  <br />
                  Masjid
                </h2>


                <p
                  className="
                    mt-6
                    text-white/80
                    text-lg
                    leading-relaxed
                    max-w-2xl
                  "
                >
                  Dukungan Anda membantu kegiatan dakwah,
                  pendidikan, sosial, dan pengembangan
                  fasilitas Masjid Raya Al-Jabbar.
                </p>


                <div className="flex flex-wrap gap-4 mt-10">

                  <button
                    className="
                      bg-white
                      text-[#123A63]
                      px-7
                      py-4
                      rounded-2xl
                      font-semibold
                    "
                  >
                    Donasi Sekarang
                  </button>


                  <button
                    className="
                      border
                      border-white/30
                      px-7
                      py-4
                      rounded-2xl
                      font-semibold
                    "
                  >
                    Pelajari Program
                  </button>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ==================================================
            FOOTER
        ================================================== */}
        <Footer />

      </main>
    </>
  );
}