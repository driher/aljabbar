"use client";
import Footer from "@/components/Footer";
import {
  Smartphone,
  ExternalLink,
  MapPin,
  Ticket,
  Info,
  ArrowRight,
  Globe,
} from "lucide-react";

export default function ReservasiGaleriPage() {
  return (
    <main className="bg-[#F5F7FA] text-[#0D2341]">

      {/* ==================================================
          HERO GALERI
      ================================================== */}

      <section className="relative overflow-hidden bg-[#0D2341]">



        {/* Background decoration */}

        <div
          className="
            absolute
            -top-40
            -right-40
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#B08A45]/20
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-40
            -left-40
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#1B4A78]/40
            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-6
            py-14
            sm:px-8
            sm:py-18
            lg:px-12
            lg:py-20
          "
        >

          <div
            className="
              grid
              grid-cols-1
              items-center
              gap-10
              lg:grid-cols-2
              lg:gap-16
            "
          >

            {/* ==================================================
                TEXT
            ================================================== */}

            <div>

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#D2B77A]
                  sm:text-sm
                "
              >
                MASJID RAYA AL-JABBAR
              </p>


              <h1
                className="
                  mt-4
                  font-serif
                  text-[42px]
                  font-bold
                  leading-[1.05]
                  text-white
                  sm:text-[54px]
                  lg:text-[64px]
                "
              >
                Galeri
                <br />
                Rasulullah ﷺ
              </h1>


              <p
                className="
                  mt-6
                  max-w-xl
                  text-base
                  leading-relaxed
                  text-white/75
                  sm:text-lg
                "
              >
                Menelusuri kisah, perjalanan dakwah,
                keteladanan, dan kehidupan Rasulullah ﷺ
                melalui pengalaman edukatif di Masjid Raya
                Al-Jabbar Jawa Barat.
              </p>


              {/* ==================================================
                  GRATIS BESAR
              ================================================== */}

              <div className="mt-8">

                <div
                  className="
                    inline-flex
                    animate-pulse
                    items-center
                    gap-3
                    rounded-2xl
                    border-2
                    border-[#E2C77C]
                    bg-[#B08A45]
                    px-7
                    py-4
                    shadow-[0_0_40px_rgba(176,138,69,0.55)]
                  "
                >

                  <Ticket
                    size={28}
                    strokeWidth={2.5}
                    className="text-white"
                  />

                  <span
                    className="
                      text-3xl
                      font-black
                      tracking-[0.12em]
                      text-white
                      sm:text-4xl
                    "
                  >
                    GRATIS
                  </span>

                </div>

                <p
                  className="
                    mt-3
                    text-sm
                    font-semibold
                    text-white/60
                  "
                >
                  Tiket kunjungan tidak dipungut biaya
                </p>

              </div>


              {/* ==================================================
                  VIRTUAL TOUR
              ================================================== */}

              <div className="mt-8">

                <a
                  href="https://masjidraya-aljabbar.jabarprov.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-3
                    rounded-2xl
                    bg-white
                    px-6
                    py-3.5
                    font-semibold
                    text-[#123A63]
                    shadow-lg
                    transition
                    hover:bg-[#F5F7FA]
                    hover:shadow-xl
                  "
                >

                  <Globe size={21} />

                  <span>
                    Virtual Tour
                  </span>

                  <ArrowRight size={18} />

                </a>

              </div>

            </div>


            {/* ==================================================
                HERO PHOTO
            ================================================== */}

            <div className="relative">

              <div
                className="
                  absolute
                  -inset-3
                  rounded-[34px]
                  bg-[#B08A45]/20
                  blur-2xl
                "
              />

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[32px]
                  border
                  border-white/20
                  bg-white/10
                  p-2
                  shadow-[0_25px_80px_rgba(0,0,0,0.35)]
                "
              >

                <img
                  src="/images/galeri-rasulullah/galeri-1.jpg"
                  alt="Galeri Rasulullah Masjid Raya Al-Jabbar"
                  className="
                    h-[430px]
                    w-full
                    rounded-[26px]
                    object-cover
                    sm:h-[520px]
                  "
                />

                {/* Caption */}

                <div
                  className="
                    absolute
                    bottom-6
                    left-6
                    right-6
                    rounded-2xl
                    bg-black/55
                    p-4
                    backdrop-blur-md
                  "
                >

                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-[#D2B77A]
                    "
                  >
                    Galeri Rasulullah ﷺ
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-white/85
                    "
                  >
                    Ruang edukasi dan wisata religi
                    Masjid Raya Al-Jabbar
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          PHOTO GALLERY
      ================================================== */}

      <section
        className="
          mx-auto
          max-w-7xl
          px-6
          py-14
          sm:px-8
          sm:py-18
          lg:px-12
          lg:py-20
        "
      >

        <div className="text-center">

          <p
            className="
              text-[11px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-[#A17B35]
            "
          >
            JEJAK SEJARAH
          </p>

          <h2
            className="
              mt-3
              font-serif
              text-3xl
              font-bold
              text-[#0D2341]
              sm:text-4xl
              lg:text-5xl
            "
          >
            Menjelajah Galeri Rasulullah ﷺ
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-[#667085]
              leading-relaxed
            "
          >
            Saksikan berbagai koleksi dan visualisasi
            yang menghadirkan suasana perjalanan sejarah
            Islam secara edukatif dan menarik.
          </p>

        </div>


        {/* PHOTOS */}

        <div
          className="
            mt-10
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >

          <div
            className="
              group
              overflow-hidden
              rounded-[28px]
              bg-white
              shadow-sm
            "
          >

            <img
              src="/images/galeri-rasulullah/galeri-1.jpg"
              alt="Interior Galeri Rasulullah"
              className="
                h-[380px]
                w-full
                object-cover
                transition
                duration-500
                group-hover:scale-105
              "
            />

          </div>


          <div
            className="
              group
              overflow-hidden
              rounded-[28px]
              bg-white
              shadow-sm
            "
          >

            <img
              src="/images/galeri-rasulullah/galeri-2.jpg"
              alt="Koleksi Galeri Rasulullah"
              className="
                h-[380px]
                w-full
                object-cover
                transition
                duration-500
                group-hover:scale-105
              "
            />

          </div>


          <div
            className="
              group
              overflow-hidden
              rounded-[28px]
              bg-white
              shadow-sm
              sm:col-span-2
              lg:col-span-1
            "
          >

            <img
              src="/images/galeri-rasulullah/galeri-3.jpg"
              alt="Ruang Galeri Rasulullah"
              className="
                h-[380px]
                w-full
                object-cover
                transition
                duration-500
                group-hover:scale-105
              "
            />

          </div>

        </div>

      </section>


      {/* ==================================================
          INFORMATION
      ================================================== */}

      <section
        className="
          mx-auto
          max-w-5xl
          px-6
          pb-14
          sm:px-8
          sm:pb-20
          lg:px-10
        "
      >

        <div
          className="
            rounded-[32px]
            border
            border-[#E8EDF3]
            bg-white
            p-7
            shadow-sm
            sm:p-10
            lg:p-14
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-[#0D2341]
                text-white
              "
            >
              <Info size={26} />
            </div>

            <div>

              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#A17B35]
                "
              >
                INFORMASI
              </p>

              <h2
                className="
                  mt-1
                  font-serif
                  text-2xl
                  font-bold
                  sm:text-3xl
                "
              >
                Tentang Galeri Rasulullah ﷺ
              </h2>

            </div>

          </div>


          <div
            className="
              mt-7
              space-y-5
              text-base
              leading-[1.9]
              text-[#526176]
              sm:text-lg
            "
          >

            <p>
              Galeri Rasulullah ﷺ merupakan fasilitas
              edukasi dan wisata religi di lingkungan
              Masjid Raya Al-Jabbar, Jawa Barat.
            </p>

            <p>
              Galeri ini menghadirkan pengalaman untuk
              mengenal sejarah, perjalanan dakwah,
              keteladanan, serta kehidupan Rasulullah ﷺ
              melalui berbagai tampilan visual dan koleksi
              yang disusun secara edukatif.
            </p>

            <p>
              Galeri Rasulullah ﷺ dapat menjadi ruang
              pembelajaran bagi masyarakat, keluarga,
              pelajar, dan generasi muda untuk memperkaya
              wawasan serta menumbuhkan kecintaan kepada
              Rasulullah ﷺ.
            </p>

          </div>


          {/* LOCATION */}

          <div
            className="
              mt-8
              flex
              items-start
              gap-4
              rounded-2xl
              border
              border-[#E8EDF3]
              bg-[#F5F7FA]
              p-5
            "
          >

            <MapPin
              size={23}
              className="
                mt-1
                shrink-0
                text-[#A17B35]
              "
            />

            <div>

              <h3 className="font-semibold">
                Lokasi
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  leading-relaxed
                  text-[#667085]
                  sm:text-base
                "
              >
                Masjid Raya Al-Jabbar,
                Gedebage, Kota Bandung,
                Jawa Barat.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          RESERVATION
      ================================================== */}

      <section
        className="
          bg-[#0D2341]
        "
      >

        <div
          className="
            mx-auto
            max-w-5xl
            px-6
            py-14
            sm:px-8
            sm:py-18
            lg:px-10
            lg:py-20
          "
        >

          <div className="text-center">

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[#D2B77A]
              "
            >
              RESERVASI KUNJUNGAN
            </p>

            <h2
              className="
                mt-3
                font-serif
                text-3xl
                font-bold
                text-white
                sm:text-4xl
              "
            >
              Pesan Tiket Melalui Sapawarga
            </h2>

            {/* GRATIS SEKALI LAGI */}

            <div className="mt-6 flex justify-center">

              <div
                className="
                  animate-pulse
                  rounded-full
                  border-2
                  border-[#E2C77C]
                  bg-[#B08A45]
                  px-8
                  py-3
                  text-2xl
                  font-black
                  tracking-[0.15em]
                  text-white
                  shadow-[0_0_30px_rgba(176,138,69,0.45)]
                "
              >
                GRATIS
              </div>

            </div>

            <p
              className="
                mx-auto
                mt-5
                max-w-2xl
                text-white/65
                leading-relaxed
              "
            >
              Reservasi kunjungan dilakukan melalui
              aplikasi Sapawarga. Pilih layanan yang
              tersedia untuk melakukan reservasi.
            </p>

          </div>


          {/* APP LINKS */}

          <div
            className="
              mt-9
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
            "
          >

            {/* GOOGLE PLAY */}

            <a
              href="https://play.google.com/store/apps/details?id=com.sapawarga.jds&hl=id&gl=US"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                gap-4
                rounded-2xl
                bg-white
                p-5
                text-[#0D2341]
                transition
                hover:bg-[#F5F7FA]
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#F5F7FA]
                "
              >
                <Smartphone size={24} />
              </div>

              <div className="flex-1">

                <p className="text-xs text-[#667085]">
                  Download aplikasi
                </p>

                <p className="font-bold">
                  Sapawarga — Google Play
                </p>

              </div>

              <ExternalLink size={18} />

            </a>


            {/* APP STORE */}

            <a
              href="https://apps.apple.com/id/app/sapawarga-jabar-super-apps/id6443805562"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                gap-4
                rounded-2xl
                bg-white
                p-5
                text-[#0D2341]
                transition
                hover:bg-[#F5F7FA]
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#F5F7FA]
                "
              >
                <Smartphone size={24} />
              </div>

              <div className="flex-1">

                <p className="text-xs text-[#667085]">
                  Download aplikasi
                </p>

                <p className="font-bold">
                  Sapawarga — App Store
                </p>

              </div>

              <ExternalLink size={18} />

            </a>

          </div>


          {/* VIRTUAL TOUR */}

          <div className="mt-8 text-center">

            <a
              href="https://masjidraya-aljabbar.jabarprov.go.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/20
                bg-white/10
                px-7
                py-4
                font-semibold
                text-white
                backdrop-blur
                transition
                hover:bg-white/20
              "
            >

              <Globe size={20} />

              Virtual Tour Galeri Rasulullah

              <ArrowRight size={18} />

            </a>

          </div>


          {/* NOTE */}

          <div
            className="
              mt-9
              flex
              items-start
              gap-3
              border-t
              border-white/10
              pt-6
            "
          >

            <Info
              size={20}
              className="
                mt-0.5
                shrink-0
                text-[#D2B77A]
              "
            />

            <p
              className="
                text-sm
                leading-relaxed
                text-white/55
              "
            >
              Tiket Galeri Rasulullah ﷺ
              <strong className="text-white">
                {" "}GRATIS
              </strong>
              . Silakan mengikuti ketentuan dan
              informasi kunjungan melalui aplikasi
              Sapawarga.
            </p>

          </div>

        </div>

      </section>



    </main>
  );
}