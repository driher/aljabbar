// ============================================
// app/infaq/page.tsx
// PREMIUM INFAQ & SHADAQAH
// MASJID RAYA AL-JABBAR
//
// FEATURES:
// - Premium responsive UI
// - Mobile first
// - Hero donation
// - Program pilihan
// - Nominal donasi
// - QRIS placeholder
// - Rekening placeholder
// - Copy rekening
// - WhatsApp confirmation
// - Transparansi
// - FAQ accordion
// ============================================

"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useState,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  Heart,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ============================================
// DATA RESMI
// ============================================
//
// GANTI DATA DI BAWAH INI DENGAN DATA RESMI
// DKM MASJID RAYA AL-JABBAR.
//
// JANGAN menggunakan data contoh untuk produksi.
//

const DONATION_INFO = {
  bankName:
    "BANK RESMI DKM",

  accountNumber:
    "000000000000",

  accountName:
    "NAMA RESMI PENGELOLA",

  whatsapp:
    "62800000000000",

  qrisImage:
    "/qris-infaq.png",
};

// ============================================
// PROGRAM
// ============================================

const PROGRAMS = [
  {
    id: "umum",
    title: "Infaq Umum",
    description:
      "Mendukung kemakmuran dan kebutuhan umum Masjid Raya Al-Jabbar.",
    icon: Heart,
  },

  {
    id: "dakwah",
    title: "Dakwah & Pendidikan",
    description:
      "Mendukung kajian, pendidikan Al-Qur'an, dan kegiatan dakwah.",
    icon: Sparkles,
  },

  {
    id: "sosial",
    title: "Sosial & Kemanusiaan",
    description:
      "Mendukung kegiatan sosial dan kepedulian kepada masyarakat.",
    icon: WalletCards,
  },

  {
    id: "pemeliharaan",
    title: "Pemeliharaan Masjid",
    description:
      "Mendukung pemeliharaan fasilitas dan lingkungan masjid.",
    icon: ShieldCheck,
  },
];

// ============================================
// NOMINAL
// ============================================

const NOMINALS = [
  50000,
  100000,
  250000,
  500000,
];

// ============================================
// FAQ
// ============================================

const FAQS = [
  {
    question:
      "Apakah saya harus mencantumkan nama saat melakukan infaq?",

    answer:
      "Tidak. Donatur dapat memberikan infaq sesuai dengan ketentuan dan mekanisme yang ditetapkan oleh pengelola Masjid Raya Al-Jabbar.",
  },

  {
    question:
      "Bagaimana cara melakukan infaq?",

    answer:
      "Pilih program dan nominal infaq, kemudian gunakan metode pembayaran resmi yang disediakan oleh pengelola masjid. Pastikan selalu menggunakan rekening atau QRIS resmi.",
  },

  {
    question:
      "Bagaimana melakukan konfirmasi setelah transfer?",

    answer:
      "Setelah melakukan transfer, donatur dapat melakukan konfirmasi melalui kanal WhatsApp resmi pengelola masjid apabila layanan tersebut telah tersedia.",
  },

  {
    question:
      "Untuk apa dana infaq digunakan?",

    answer:
      "Dana infaq digunakan sesuai dengan program dan ketentuan pengelolaan yang ditetapkan oleh pengelola Masjid Raya Al-Jabbar.",
  },

  {
    question:
      "Apakah tersedia laporan penggunaan dana?",

    answer:
      "Informasi dan laporan penggunaan dana dapat ditampilkan pada halaman transparansi apabila data resmi dari pengelola telah tersedia.",
  },
];

// ============================================
// FORMAT RUPIAH
// ============================================

function formatRupiah(
  value: number
) {
  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }
  ).format(value);
}

// ============================================
// PAGE
// ============================================

export default function InfaqPage() {

  // ==========================================
  // STATE
  // ==========================================

  const [
    selectedProgram,
    setSelectedProgram,
  ] = useState("umum");

  const [
    selectedNominal,
    setSelectedNominal,
  ] = useState<number | null>(
    100000
  );

  const [
    customNominal,
    setCustomNominal,
  ] = useState("");

  const [
    copied,
    setCopied,
  ] = useState(false);

  const [
    openFAQ,
    setOpenFAQ,
  ] = useState<number | null>(
    null
  );

  // ==========================================
  // NOMINAL AKTIF
  // ==========================================

  const activeNominal =
    customNominal
      ? Number(
          customNominal.replace(
            /\D/g,
            ""
          )
        )
      : selectedNominal || 0;

  // ==========================================
  // COPY ACCOUNT
  // ==========================================

  async function copyAccountNumber() {

    try {

      await navigator.clipboard.writeText(
        DONATION_INFO.accountNumber
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (error) {

      console.error(
        "COPY ERROR:",
        error
      );

    }
  }

  // ==========================================
  // WHATSAPP
  // ==========================================

  function openWhatsApp() {

    const program =
      PROGRAMS.find(
        item =>
          item.id ===
          selectedProgram
      );

    const message = [
      "Assalamu'alaikum.",
      "",
      "Saya ingin melakukan infaq untuk Masjid Raya Al-Jabbar.",
      "",
      `Program: ${program?.title || "Infaq Umum"}`,
      `Nominal: ${formatRupiah(activeNominal)}`,
      "",
      "Mohon informasi mengenai tata cara dan konfirmasi infaq.",
      "",
      "Terima kasih.",
    ].join("\n");

    const url =
      `https://wa.me/${DONATION_INFO.whatsapp}?text=${encodeURIComponent(
        message
      )}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <main
      className="
        min-h-screen
        bg-[#F5F7FA]
        overflow-x-hidden
        text-[#0D2341]
      "
    >

      {/* ======================================
          NAVBAR
      ======================================= */}

      <Navbar />

      {/* ======================================
          HERO
      ======================================= */}

      <section
        className="
          relative
          min-h-[680px]
          sm:min-h-[720px]
          lg:min-h-[760px]
          overflow-hidden
        "
      >

        {/* BACKGROUND */}

        <img
          src="/hero-masjid.jpg"
          alt="Masjid Raya Al-Jabbar"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            object-center
          "
        />

        {/* OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-white/95
            via-white/70
            md:via-white/50
            to-transparent
          "
        />

        {/* MOBILE BOTTOM OVERLAY */}

        <div
          className="
            absolute
            inset-0
            md:hidden
            bg-gradient-to-t
            from-[#F5F7FA]/95
            via-transparent
            to-transparent
          "
        />

        {/* CONTENT */}

        <div
          className="
            relative
            z-10
            max-w-7xl
            mx-auto
            min-h-[680px]
            sm:min-h-[720px]
            lg:min-h-[760px]
            px-5
            sm:px-6
            lg:px-8
            pt-32
            sm:pt-36
            lg:pt-44
            flex
            items-end
            lg:items-center
          "
        >

          <div
            className="
              max-w-3xl
              lg:ml-[7%]
              pb-10
              sm:pb-14
              lg:pb-0
            "
          >

            {/* EYEBROW */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#D9E0E8]
                bg-white/80
                backdrop-blur-md
                px-3.5
                py-2
                text-[10px]
                sm:text-xs
                uppercase
                tracking-[0.2em]
                font-semibold
                text-[#123A63]
              "
            >

              <Heart
                size={14}
                className="
                  text-[#A17B35]
                "
              />

              Infaq & Shadaqah

            </div>

            {/* TITLE */}

            <h1
              className="
                font-serif
                text-[46px]
                sm:text-[60px]
                lg:text-[76px]
                leading-[0.98]
                font-bold
                text-[#0D2341]
                mt-6
              "
            >

              Mari Bersama
              <br />

              <span
                className="
                  text-[#123A63]
                "
              >
                Memakmurkan Masjid
              </span>

            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-6
                text-base
                sm:text-lg
                lg:text-xl
                leading-relaxed
                text-[#516176]
                max-w-2xl
              "
            >
              Setiap infaq dan shadaqah Anda
              menjadi bagian dari ikhtiar
              memakmurkan masjid, mendukung
              dakwah, pendidikan, pelayanan
              jamaah, dan kemaslahatan umat.
            </p>

            {/* CTA */}

            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-3
                mt-8
              "
            >

              <a
                href="#infaq-form"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-[#123A63]
                  hover:bg-[#0F3153]
                  text-white
                  px-6
                  py-4
                  font-semibold
                  shadow-lg
                  transition
                "
              >

                <Heart
                  size={19}
                  fill="currentColor"
                />

                Infaq Sekarang

              </a>

              <a
                href="#program"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-white/90
                  hover:bg-white
                  border
                  border-white
                  text-[#123A63]
                  px-6
                  py-4
                  font-semibold
                  shadow-md
                  transition
                "
              >

                Lihat Program

                <ArrowRight
                  size={18}
                />

              </a>

            </div>

          </div>

        </div>

      </section>

      {/* ======================================
          TRUST BAR
      ======================================= */}

      <section
        className="
          relative
          z-20
          -mt-8
          sm:-mt-12
          lg:-mt-16
          pb-8
        "
      >

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
              bg-white
              rounded-[28px]
              border
              border-[#E8EDF3]
              shadow-[0_15px_50px_rgba(13,35,65,0.08)]
              p-5
              sm:p-7
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-5
            "
          >

            {/* ITEM */}

            <div
              className="
                flex
                items-start
                gap-4
              "
            >

              <div
                className="
                  w-11
                  h-11
                  shrink-0
                  rounded-2xl
                  bg-[#EEF4F9]
                  text-[#123A63]
                  flex
                  items-center
                  justify-center
                "
              >

                <ShieldCheck
                  size={22}
                />

              </div>

              <div>

                <h3
                  className="
                    font-semibold
                    text-[#0D2341]
                  "
                >
                  Amanah
                </h3>

                <p
                  className="
                    text-sm
                    text-[#7A8599]
                    mt-1
                    leading-relaxed
                  "
                >
                  Dikelola sesuai
                  peruntukan resmi.
                </p>

              </div>

            </div>

            {/* ITEM */}

            <div
              className="
                flex
                items-start
                gap-4
              "
            >

              <div
                className="
                  w-11
                  h-11
                  shrink-0
                  rounded-2xl
                  bg-[#F8F2E7]
                  text-[#A17B35]
                  flex
                  items-center
                  justify-center
                "
              >

                <Sparkles
                  size={22}
                />

              </div>

              <div>

                <h3
                  className="
                    font-semibold
                    text-[#0D2341]
                  "
                >
                  Bermanfaat
                </h3>

                <p
                  className="
                    text-sm
                    text-[#7A8599]
                    mt-1
                    leading-relaxed
                  "
                >
                  Mendukung kemakmuran
                  dan kemaslahatan umat.
                </p>

              </div>

            </div>

            {/* ITEM */}

            <div
              className="
                flex
                items-start
                gap-4
              "
            >

              <div
                className="
                  w-11
                  h-11
                  shrink-0
                  rounded-2xl
                  bg-[#EEF4F9]
                  text-[#123A63]
                  flex
                  items-center
                  justify-center
                "
              >

                <WalletCards
                  size={22}
                />

              </div>

              <div>

                <h3
                  className="
                    font-semibold
                    text-[#0D2341]
                  "
                >
                  Mudah
                </h3>

                <p
                  className="
                    text-sm
                    text-[#7A8599]
                    mt-1
                    leading-relaxed
                  "
                >
                  Pilihan nominal dan
                  metode yang praktis.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ======================================
          PROGRAM
      ======================================= */}

      <section
        id="program"
        className="
          py-16
          sm:py-20
          lg:py-24
        "
      >

        <div
          className="
            max-w-6xl
            mx-auto
            px-4
            sm:px-6
          "
        >

          {/* HEADER */}

          <div
            className="
              max-w-3xl
              mb-10
              sm:mb-12
            "
          >

            <p
              className="
                uppercase
                tracking-[0.25em]
                text-[#7A8599]
                text-xs
                sm:text-sm
                font-medium
              "
            >
              Pilihan Program
            </p>

            <h2
              className="
                font-serif
                text-[36px]
                sm:text-[44px]
                lg:text-[52px]
                leading-tight
                font-bold
                text-[#0D2341]
                mt-4
              "
            >
              Salurkan Kebaikan
              <br />
              pada Program Pilihan
            </h2>

            <p
              className="
                mt-4
                text-[#667085]
                text-base
                sm:text-lg
                leading-relaxed
              "
            >
              Pilih program yang ingin Anda
              dukung. Peruntukan akhir dana
              mengikuti ketentuan pengelola
              Masjid Raya Al-Jabbar.
            </p>

          </div>

          {/* CARDS */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-5
            "
          >

            {PROGRAMS.map(
              (program) => {

                const Icon =
                  program.icon;

                const active =
                  selectedProgram ===
                  program.id;

                return (
                  <button
                    key={
                      program.id
                    }
                    type="button"
                    onClick={() =>
                      setSelectedProgram(
                        program.id
                      )
                    }
                    className={`
                      text-left
                      rounded-[26px]
                      border
                      p-6
                      transition-all
                      duration-300
                      ${
                        active
                          ? "bg-[#123A63] border-[#123A63] text-white shadow-[0_15px_40px_rgba(18,58,99,0.18)]"
                          : "bg-white border-[#E8EDF3] text-[#0D2341] hover:border-[#C9D3DE] hover:shadow-lg"
                      }
                    `}
                  >

                    <div
                      className={`
                        w-12
                        h-12
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        ${
                          active
                            ? "bg-white/10 text-white"
                            : "bg-[#EEF4F9] text-[#123A63]"
                        }
                      `}
                    >

                      <Icon
                        size={22}
                      />

                    </div>

                    <h3
                      className="
                        font-serif
                        text-xl
                        font-bold
                        mt-5
                      "
                    >
                      {program.title}
                    </h3>

                    <p
                      className={`
                        text-sm
                        leading-relaxed
                        mt-3
                        ${
                          active
                            ? "text-white/75"
                            : "text-[#7A8599]"
                        }
                      `}
                    >
                      {
                        program.description
                      }
                    </p>

                    {active && (

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          mt-5
                          text-xs
                          font-semibold
                          text-white
                        "
                      >

                        <Check
                          size={15}
                        />

                        Dipilih

                      </div>

                    )}

                  </button>
                );

              }
            )}

          </div>

        </div>

      </section>

      {/* ======================================
          INFAQ FORM
      ======================================= */}

      <section
        id="infaq-form"
        className="
          pb-20
          lg:pb-24
        "
      >

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
              lg:grid-cols-[1.05fr_0.95fr]
              gap-6
              items-start
            "
          >

            {/* =================================
                LEFT FORM
            ================================== */}

            <div
              className="
                bg-white
                rounded-[30px]
                border
                border-[#E8EDF3]
                shadow-[0_10px_40px_rgba(13,35,65,0.06)]
                p-6
                sm:p-8
                lg:p-10
              "
            >

              <p
                className="
                  uppercase
                  tracking-[0.25em]
                  text-[#7A8599]
                  text-xs
                  font-medium
                "
              >
                Mulai Berinfaq
              </p>

              <h2
                className="
                  font-serif
                  text-[34px]
                  sm:text-[42px]
                  font-bold
                  leading-tight
                  mt-3
                  text-[#0D2341]
                "
              >
                Pilih Nominal
                <br />
                Infaq Anda
              </h2>

              {/* NOMINAL */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                  mt-8
                "
              >

                {NOMINALS.map(
                  (nominal) => {

                    const active =
                      !customNominal &&
                      selectedNominal ===
                        nominal;

                    return (
                      <button
                        key={
                          nominal
                        }
                        type="button"
                        onClick={() => {
                          setSelectedNominal(
                            nominal
                          );

                          setCustomNominal(
                            ""
                          );
                        }}
                        className={`
                          rounded-2xl
                          border
                          px-4
                          py-3.5
                          text-sm
                          sm:text-base
                          font-semibold
                          transition
                          ${
                            active
                              ? "bg-[#123A63] border-[#123A63] text-white"
                              : "bg-white border-[#DDE4EC] text-[#344054] hover:border-[#123A63]"
                          }
                        `}
                      >
                        {formatRupiah(
                          nominal
                        )}
                      </button>
                    );

                  }
                )}

              </div>

              {/* CUSTOM */}

              <label
                className="
                  block
                  mt-6
                  text-sm
                  font-semibold
                  text-[#344054]
                "
              >
                Nominal lainnya

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    rounded-2xl
                    border
                    border-[#DDE4EC]
                    bg-white
                    overflow-hidden
                    focus-within:border-[#123A63]
                    transition
                  "
                >

                  <span
                    className="
                      pl-4
                      text-[#7A8599]
                      font-semibold
                    "
                  >
                    Rp
                  </span>

                  <input
                    type="text"
                    inputMode="numeric"
                    value={
                      customNominal
                    }
                    onChange={(
                      event
                    ) => {

                      const value =
                        event.target.value.replace(
                          /\D/g,
                          ""
                        );

                      setCustomNominal(
                        value
                      );

                      if (value) {
                        setSelectedNominal(
                          null
                        );
                      }

                    }}
                    placeholder="Masukkan nominal"
                    className="
                      w-full
                      h-14
                      px-3
                      bg-transparent
                      outline-none
                      text-[#0D2341]
                    "
                  />

                </div>

              </label>

              {/* SELECTED */}

              <div
                className="
                  mt-6
                  rounded-2xl
                  bg-[#F5F7FA]
                  p-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >

                  <span
                    className="
                      text-sm
                      text-[#667085]
                    "
                  >
                    Program
                  </span>

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-[#123A63]
                      text-right
                    "
                  >
                    {
                      PROGRAMS.find(
                        item =>
                          item.id ===
                          selectedProgram
                      )?.title
                    }
                  </span>

                </div>

                <div
                  className="
                    h-px
                    bg-[#E3E8EF]
                    my-4
                  "
                />

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >

                  <span
                    className="
                      text-sm
                      text-[#667085]
                    "
                  >
                    Nominal
                  </span>

                  <span
                    className="
                      text-lg
                      font-bold
                      text-[#0D2341]
                    "
                  >
                    {formatRupiah(
                      activeNominal
                    )}
                  </span>

                </div>

              </div>

              {/* CTA */}

              <a
                href="#cara-infaq"
                className="
                  mt-6
                  w-full
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  bg-[#123A63]
                  hover:bg-[#0F3153]
                  text-white
                  rounded-2xl
                  px-6
                  py-4
                  font-semibold
                  transition
                  shadow-lg
                "
              >

                Lanjutkan Infaq

                <ArrowRight
                  size={18}
                />

              </a>

            </div>

            {/* =================================
                RIGHT QRIS
            ================================== */}

            <div
              className="
                bg-[#123A63]
                rounded-[30px]
                text-white
                p-6
                sm:p-8
                lg:p-10
                overflow-hidden
                relative
              "
            >

              {/* DECORATION */}

              <div
                className="
                  absolute
                  -right-24
                  -top-24
                  w-64
                  h-64
                  rounded-full
                  bg-white/5
                  blur-2xl
                "
              />

              <div
                className="
                  relative
                  z-10
                "
              >

                <p
                  className="
                    uppercase
                    tracking-[0.25em]
                    text-white/60
                    text-xs
                  "
                >
                  Pembayaran
                </p>

                <h2
                  className="
                    font-serif
                    text-3xl
                    sm:text-4xl
                    font-bold
                    mt-3
                  "
                >
                  Infaq melalui QRIS
                </h2>

                <p
                  className="
                    text-white/70
                    text-sm
                    leading-relaxed
                    mt-4
                  "
                >
                  Gunakan QRIS resmi
                  pengelola Masjid Raya
                  Al-Jabbar untuk melakukan
                  infaq.
                </p>

                {/* QRIS */}

                <div
                  className="
                    bg-white
                    rounded-[24px]
                    p-5
                    mt-7
                    max-w-[300px]
                    mx-auto
                  "
                >

                  <div
                    className="
                      relative
                      aspect-square
                      w-full
                      overflow-hidden
                      rounded-xl
                      bg-[#F5F7FA]
                    "
                  >

                    <Image
                      src={
                        DONATION_INFO.qrisImage
                      }
                      alt="QRIS Infaq Masjid Raya Al-Jabbar"
                      fill
                      sizes="300px"
                      className="
                        object-contain
                      "
                    />

                  </div>

                </div>

                <p
                  className="
                    text-center
                    text-xs
                    text-white/50
                    mt-4
                  "
                >
                  Pastikan nama penerima
                  sesuai dengan informasi
                  resmi pengelola masjid.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ======================================
          CARA INFAQ + REKENING
      ======================================= */}

      <section
        id="cara-infaq"
        className="
          py-20
          lg:py-24
          bg-white
          border-y
          border-[#E8EDF3]
        "
      >

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
              lg:gap-16
              items-start
            "
          >

            {/* LEFT */}

            <div>

              <p
                className="
                  uppercase
                  tracking-[0.25em]
                  text-[#7A8599]
                  text-xs
                  sm:text-sm
                  font-medium
                "
              >
                Cara Infaq
              </p>

              <h2
                className="
                  font-serif
                  text-[36px]
                  sm:text-[46px]
                  lg:text-[52px]
                  leading-tight
                  font-bold
                  mt-4
                  text-[#0D2341]
                "
              >
                Mudah,
                <br />
                Aman & Nyaman
              </h2>

              <div
                className="
                  mt-8
                  space-y-6
                "
              >

                {[
                  {
                    number: "01",
                    title:
                      "Pilih program",
                    text:
                      "Tentukan program yang ingin Anda dukung.",
                  },
                  {
                    number: "02",
                    title:
                      "Pilih nominal",
                    text:
                      "Tentukan nominal infaq sesuai kemampuan.",
                  },
                  {
                    number: "03",
                    title:
                      "Lakukan pembayaran",
                    text:
                      "Gunakan QRIS atau rekening resmi pengelola.",
                  },
                  {
                    number: "04",
                    title:
                      "Konfirmasi",
                    text:
                      "Lakukan konfirmasi melalui kanal resmi jika diperlukan.",
                  },
                ].map(
                  (step) => (

                    <div
                      key={
                        step.number
                      }
                      className="
                        flex
                        gap-4
                      "
                    >

                      <div
                        className="
                          w-11
                          h-11
                          shrink-0
                          rounded-2xl
                          bg-[#123A63]
                          text-white
                          flex
                          items-center
                          justify-center
                          text-xs
                          font-bold
                        "
                      >
                        {step.number}
                      </div>

                      <div>

                        <h3
                          className="
                            font-semibold
                            text-[#0D2341]
                          "
                        >
                          {
                            step.title
                          }
                        </h3>

                        <p
                          className="
                            text-sm
                            text-[#7A8599]
                            leading-relaxed
                            mt-1
                          "
                        >
                          {
                            step.text
                          }
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* RIGHT ACCOUNT */}

            <div
              className="
                rounded-[30px]
                bg-[#F5F7FA]
                border
                border-[#E8EDF3]
                p-6
                sm:p-8
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    w-11
                    h-11
                    rounded-2xl
                    bg-[#123A63]
                    text-white
                    flex
                    items-center
                    justify-center
                  "
                >

                  <WalletCards
                    size={21}
                  />

                </div>

                <div>

                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.18em]
                      text-[#7A8599]
                    "
                  >
                    Transfer Bank
                  </p>

                  <h3
                    className="
                      font-serif
                      text-2xl
                      font-bold
                      text-[#0D2341]
                      mt-1
                    "
                  >
                    Rekening Resmi
                  </h3>

                </div>

              </div>

              <div
                className="
                  mt-7
                  rounded-2xl
                  bg-white
                  border
                  border-[#E8EDF3]
                  p-5
                "
              >

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.15em]
                    text-[#98A2B3]
                  "
                >
                  Bank
                </p>

                <p
                  className="
                    font-semibold
                    text-[#0D2341]
                    mt-1
                  "
                >
                  {
                    DONATION_INFO.bankName
                  }
                </p>

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.15em]
                    text-[#98A2B3]
                    mt-5
                  "
                >
                  Nomor Rekening
                </p>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    mt-1
                  "
                >

                  <p
                    className="
                      text-xl
                      sm:text-2xl
                      font-bold
                      tracking-wide
                      text-[#123A63]
                      break-all
                    "
                  >
                    {
                      DONATION_INFO.accountNumber
                    }
                  </p>

                  <button
                    type="button"
                    onClick={
                      copyAccountNumber
                    }
                    className="
                      shrink-0
                      w-10
                      h-10
                      rounded-xl
                      bg-[#F5F7FA]
                      text-[#123A63]
                      flex
                      items-center
                      justify-center
                      hover:bg-[#EAF0F6]
                      transition
                    "
                    aria-label="Salin nomor rekening"
                  >

                    {copied ? (
                      <Check
                        size={18}
                      />
                    ) : (
                      <Copy
                        size={18}
                      />
                    )}

                  </button>

                </div>

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.15em]
                    text-[#98A2B3]
                    mt-5
                  "
                >
                  Atas Nama
                </p>

                <p
                  className="
                    font-semibold
                    text-[#0D2341]
                    mt-1
                  "
                >
                  {
                    DONATION_INFO.accountName
                  }
                </p>

              </div>

              {/* WARNING */}

              <div
                className="
                  mt-5
                  flex
                  gap-3
                  rounded-2xl
                  bg-[#FFF9EC]
                  border
                  border-[#F1E2BC]
                  p-4
                  text-sm
                  text-[#7A5B20]
                  leading-relaxed
                "
              >

                <ShieldCheck
                  size={18}
                  className="
                    shrink-0
                    mt-0.5
                  "
                />

                Pastikan rekening tujuan
                merupakan rekening resmi
                pengelola Masjid Raya
                Al-Jabbar sebelum melakukan
                transfer.

              </div>

              {/* WHATSAPP */}

              <button
                type="button"
                onClick={
                  openWhatsApp
                }
                className="
                  mt-5
                  w-full
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-[#123A63]
                  hover:bg-[#0F3153]
                  text-white
                  px-5
                  py-4
                  font-semibold
                  transition
                  shadow-lg
                "
              >

                <MessageCircle
                  size={19}
                />

                Konfirmasi via WhatsApp

              </button>

            </div>

          </div>

        </div>

      </section>

      {/* ======================================
          TRANSPARENCY
      ======================================= */}

      <section
        className="
          py-20
          lg:py-24
        "
      >

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
              relative
              overflow-hidden
              rounded-[32px]
              bg-[#123A63]
              px-6
              py-12
              sm:px-10
              sm:py-14
              lg:px-14
              lg:py-16
              text-white
            "
          >

            <div
              className="
                absolute
                -right-32
                -top-32
                w-[420px]
                h-[420px]
                rounded-full
                bg-white/5
                blur-3xl
              "
            />

            <div
              className="
                relative
                z-10
                max-w-3xl
              "
            >

              <p
                className="
                  uppercase
                  tracking-[0.25em]
                  text-white/60
                  text-xs
                  sm:text-sm
                "
              >
                Amanah
              </p>

              <h2
                className="
                  font-serif
                  text-[36px]
                  sm:text-[46px]
                  lg:text-[54px]
                  leading-tight
                  font-bold
                  mt-5
                "
              >
                Amanah,
                <br />
                Transparan & Bermanfaat
              </h2>

              <p
                className="
                  mt-6
                  text-white/75
                  text-base
                  sm:text-lg
                  leading-relaxed
                  max-w-2xl
                "
              >
                Pengelolaan infaq dan shadaqah
                hendaknya dilakukan secara amanah
                dan sesuai dengan ketentuan
                pengelola Masjid Raya Al-Jabbar.
              </p>

              <div
                className="
                  grid
                  sm:grid-cols-3
                  gap-4
                  mt-10
                "
              >

                {[
                  "Amanah",
                  "Transparan",
                  "Bermanfaat",
                ].map(
                  item => (

                    <div
                      key={item}
                      className="
                        rounded-2xl
                        bg-white/10
                        border
                        border-white/10
                        px-4
                        py-4
                        text-sm
                        font-semibold
                      "
                    >

                      <Check
                        size={17}
                        className="
                          mb-2
                          text-[#D6B46A]
                        "
                      />

                      {item}

                    </div>

                  )
                )}

              </div>

              <Link
                href="/"
                className="
                  inline-flex
                  items-center
                  gap-2
                  mt-10
                  text-sm
                  font-semibold
                  text-white
                  hover:text-[#D6B46A]
                  transition
                "
              >

                Kembali ke Beranda

                <ArrowRight
                  size={17}
                />

              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* ======================================
          FAQ
      ======================================= */}

      <section
        className="
          pb-24
        "
      >

        <div
          className="
            max-w-4xl
            mx-auto
            px-4
            sm:px-6
          "
        >

          <div
            className="
              text-center
              mb-10
            "
          >

            <p
              className="
                uppercase
                tracking-[0.25em]
                text-[#7A8599]
                text-xs
                sm:text-sm
                font-medium
              "
            >
              FAQ
            </p>

            <h2
              className="
                font-serif
                text-[36px]
                sm:text-[46px]
                font-bold
                mt-4
                text-[#0D2341]
              "
            >
              Pertanyaan Umum
            </h2>

          </div>

          <div
            className="
              space-y-3
            "
          >

            {FAQS.map(
              (faq, index) => {

                const open =
                  openFAQ ===
                  index;

                return (
                  <div
                    key={
                      faq.question
                    }
                    className="
                      rounded-2xl
                      border
                      border-[#E8EDF3]
                      bg-white
                      overflow-hidden
                    "
                  >

                    <button
                      type="button"
                      onClick={() =>
                        setOpenFAQ(
                          open
                            ? null
                            : index
                        )
                      }
                      className="
                        w-full
                        flex
                        items-center
                        justify-between
                        gap-4
                        px-5
                        sm:px-6
                        py-5
                        text-left
                      "
                    >

                      <span
                        className="
                          font-semibold
                          text-[#0D2341]
                          text-sm
                          sm:text-base
                        "
                      >
                        {
                          faq.question
                        }
                      </span>

                      <ChevronDown
                        size={19}
                        className={`
                          shrink-0
                          text-[#123A63]
                          transition-transform
                          ${
                            open
                              ? "rotate-180"
                              : ""
                          }
                        `}
                      />

                    </button>

                    {open && (

                      <div
                        className="
                          px-5
                          sm:px-6
                          pb-5
                        "
                      >

                        <p
                          className="
                            text-sm
                            sm:text-base
                            text-[#667085]
                            leading-relaxed
                          "
                        >
                          {
                            faq.answer
                          }
                        </p>

                      </div>

                    )}

                  </div>
                );

              }
            )}

          </div>

        </div>

      </section>

      {/* ======================================
          FOOTER
      ======================================= */}

      <Footer />

    </main>
  );
}