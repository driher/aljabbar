// ============================================
// components/Navbar.tsx
// NAVBAR PREMIUM - MASJID RAYA AL-JABBAR
//
// FEATURES:
// - Desktop navigation
// - Desktop dropdown
// - Mobile navigation
// - Mobile accordion
// - Search desktop
// - Search mobile
// - Search → /berita?search=...
// - Infaq / Shadaqah
// ============================================

"use client";

import Image from "next/image";
import Link from "next/link";

import {
  FormEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  X,
} from "lucide-react";

// ============================================
// MENU DATA
// ============================================

const profilMenu = [
  {
    label: "Sejarah Masjid",
    href: "/profil/sejarah-masjid",
  },
  {
    label: "Visi & Misi",
    href: "/profil/visi-misi",
  },
  {
    label: "Struktur DKM",
    href: "/profil/struktur-dkm",
  },
  {
    label: "Arsitektur Masjid",
    href: "/profil/arsitektur-masjid",
  },
  {
    label: "Fasilitas",
    href: "/profil/fasilitas",
  },
  {
    label: "Imam & Dewan Pembina",
    href: "/profil/imam-dan-pembina",
  },
  {
    label: "Legalitas",
    href: "/profil/legalitas",
  },
  {
    label: "FAQ",
    href: "/profil/faq",
  },
];

const informasiMenu = [
  {
    label: "Berita Masjid",
    href: "/berita",
  },
  {
    label: "Artikel Islami",
    href: "/informasi/artikel-islami",
  },
  {
    label: "Pengumuman",
    href: "/informasi/pengumuman",
  },
  {
    label: "Layanan Jamaah",
    href: "/informasi/layanan-jamaah",
  },
  {
    label: "Tata Tertib Masjid",
    href: "/informasi/tata-tertib",
  },
  {
    label: "Parkir & Akses",
    href: "/informasi/parkir-dan-akses",
  },
];

const kegiatanMenu = [
  {
    label: "Agenda Kegiatan",
    href: "/agenda",
  },
  {
    label: "Kajian Rutin",
    href: "/kegiatan/kajian-rutin",
  },
  {
    label: "Tabligh Akbar",
    href: "/kegiatan/tabligh-akbar",
  },
  {
    label: "Kajian Muslimah",
    href: "/kegiatan/kajian-muslimah",
  },
  {
    label: "Program Ramadhan",
    href: "/kegiatan/program-ramadhan",
  },
  {
    label: "Kegiatan Sosial",
    href: "/kegiatan/kegiatan-sosial",
  },
  {
    label: "Pendidikan & TPQ",
    href: "/kegiatan/pendidikan-tpq",
  },
  {
    label: "Remaja Masjid",
    href: "/kegiatan/remaja-masjid",
  },
  {
    label: "Pelatihan & Seminar",
    href: "/kegiatan/pelatihan-seminar",
  },
];

const galeriMenu = [
  {
    label: "Foto Kegiatan",
    href: "/galeri/foto-kegiatan",
  },
  {
    label: "Video Kajian",
    href: "/galeri/video-kajian",
  },
  {
    label: "Dokumentasi Event",
    href: "/galeri/dokumentasi-event",
  },
  {
    label: "Arsitektur Masjid",
    href: "/galeri/arsitektur",
  },
  {
    label: "Galeri Ramadhan",
    href: "/galeri/ramadhan",
  },
  {
    label: "Galeri Jamaah",
    href: "/galeri/jamaah",
  },
  {
    label: "Virtual Tour",
    href: "/galeri/virtual-tour",
  },
];

const kontakMenu = [
  {
    label: "Lokasi Masjid",
    href: "/kontak/lokasi",
  },
  {
    label: "Kontak DKM",
    href: "/kontak/dkm",
  },
  {
    label: "Form Pertanyaan",
    href: "/kontak/form-pertanyaan",
  },
  {
    label: "Donasi & Kerjasama",
    href: "/kontak/donasi-kerjasama",
  },
  {
    label: "Media Sosial",
    href: "/kontak/media-sosial",
  },
  {
    label: "Google Maps",
    href: "/kontak/google-maps",
  },
  {
    label: "Jam Operasional",
    href: "/kontak/jam-operasional",
  },
  {
    label: "Hotline Informasi",
    href: "/kontak/hotline",
  },
];

// ============================================
// DESKTOP DROPDOWN
// ============================================

function DesktopDropdown({
  label,
  items,
  align = "left",
}: {
  label: string;

  items: {
    label: string;
    href: string;
  }[];

  align?: "left" | "right";
}) {
  return (
    <div className="relative group">

      <button
        type="button"
        className="
          flex
          items-center
          gap-1.5
          whitespace-nowrap
          text-[15px]
          font-medium
          text-[#0D2341]
          hover:text-[#123A63]
          transition
        "
      >

        {label}

        <ChevronDown
          size={15}
          strokeWidth={1.8}
          className="
            transition-transform
            duration-200
            group-hover:rotate-180
          "
        />

      </button>

      <div
        className={`
          absolute
          top-full
          pt-3
          hidden
          group-hover:block
          z-[300]
          ${
            align === "right"
              ? "right-0"
              : "left-0"
          }
        `}
      >

        <div
          className="
            w-[290px]
            max-h-[70vh]
            overflow-y-auto
            rounded-2xl
            border
            border-[#E8EDF3]
            bg-white/95
            backdrop-blur-xl
            shadow-[0_20px_50px_rgba(13,35,65,0.14)]
            p-3
          "
        >

          {items.map(
            (item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  block
                  rounded-xl
                  px-4
                  py-3
                  text-[14px]
                  text-[#344054]
                  hover:bg-[#F5F7FA]
                  hover:text-[#123A63]
                  transition
                "
              >
                {item.label}
              </Link>
            )
          )}

        </div>

      </div>

    </div>
  );
}

// ============================================
// MOBILE ACCORDION
// ============================================

function MobileAccordion({
  label,
  items,
  open,
  onToggle,
  onNavigate,
}: {
  label: string;

  items: {
    label: string;
    href: string;
  }[];

  open: boolean;

  onToggle: () => void;

  onNavigate: () => void;
}) {
  return (
    <div
      className="
        border-t
        border-[#E8EDF3]
      "
    >

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="
          w-full
          flex
          items-center
          justify-between
          py-4
          text-left
          text-[15px]
          font-medium
          text-[#0D2341]
        "
      >

        <span>
          {label}
        </span>

        <ChevronDown
          size={18}
          className={`
            transition-transform
            duration-200
            ${
              open
                ? "rotate-180"
                : ""
            }
          `}
        />

      </button>

      <div
        className={`
          overflow-hidden
          transition-all
          duration-200
          ${
            open
              ? "max-h-[700px] pb-3"
              : "max-h-0"
          }
        `}
      >

        <div
          className="
            pl-4
            flex
            flex-col
            gap-1
          "
        >

          {items.map(
            (item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={
                  onNavigate
                }
                className="
                  rounded-xl
                  px-3
                  py-2.5
                  text-[14px]
                  text-[#667085]
                  hover:bg-[#F5F7FA]
                  hover:text-[#123A63]
                  transition
                "
              >
                {item.label}
              </Link>
            )
          )}

        </div>

      </div>

    </div>
  );
}

// ============================================
// NAVBAR
// ============================================

export default function Navbar() {

  const router =
    useRouter();

  // ==========================================
  // MOBILE
  // ==========================================

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const [
    mobileMenu,
    setMobileMenu,
  ] = useState<
    string | null
  >(null);

  // ==========================================
  // SEARCH
  // ==========================================

  const [
    searchOpen,
    setSearchOpen,
  ] = useState(false);

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");

  // ==========================================
  // CLOSE MOBILE
  // ==========================================

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileMenu(null);
  };

  // ==========================================
  // TOGGLE MOBILE MENU
  // ==========================================

  const toggleMobileMenu = (
    menu: string
  ) => {

    setMobileMenu(
      mobileMenu === menu
        ? null
        : menu
    );
  };

  // ==========================================
  // SEARCH SUBMIT
  // ==========================================

  const submitSearch = (
    event: FormEvent
  ) => {

    event.preventDefault();

    const query =
      searchQuery.trim();

    if (!query) {
      return;
    }

    setSearchOpen(false);
    setSearchQuery("");

    closeMobile();

    router.push(
      `/berita?search=${encodeURIComponent(
        query
      )}`
    );
  };

  // ==========================================
  // OPEN SEARCH
  // ==========================================

  const openSearch = () => {
    setSearchOpen(true);
  };

  // ==========================================
  // CLOSE SEARCH
  // ==========================================

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <header
      className="
        absolute
        top-0
        left-0
        right-0
        z-[100]
        bg-white/80
        backdrop-blur-xl
        border-b
        border-white/50
        shadow-[0_4px_20px_rgba(0,0,0,0.04)]
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

        {/* ======================================
            NAVBAR BAR
        ======================================= */}

        <div
          className="
            h-[76px]
            lg:h-[80px]
            flex
            items-center
            justify-between
          "
        >

          {/* ====================================
              LOGO
          ===================================== */}

          <Link
            href="/"
            onClick={() => {
              closeMobile();
              closeSearch();
            }}
            className="
              flex
              items-center
              shrink-0
            "
          >

            <Image
              src="/lgoweb_masjid_aljabbar.png"
              alt="Masjid Raya Al-Jabbar"
              width={220}
              height={60}
              priority
              className="
                w-auto
                h-[42px]
                lg:h-[46px]
                object-contain
              "
            />

          </Link>

          {/* ====================================
              DESKTOP NAVIGATION
          ===================================== */}

          <nav
            className="
              hidden
              lg:flex
              items-center
              gap-7
              xl:gap-9
              ml-auto
              mr-7
            "
          >

            <Link
              href="/"
              className="
                text-[15px]
                font-medium
                text-[#0D2341]
                hover:text-[#123A63]
                transition
              "
            >
              Beranda
            </Link>

            <DesktopDropdown
              label="Profil"
              items={profilMenu}
            />

            <Link
              href="/berita"
              className="
                text-[15px]
                font-medium
                text-[#0D2341]
                hover:text-[#123A63]
                transition
              "
            >
              Berita
            </Link>

            <Link
              href="/agenda"
              className="
                text-[15px]
                font-medium
                text-[#0D2341]
                hover:text-[#123A63]
                transition
              "
            >
              Agenda Kegiatan
            </Link>

            <DesktopDropdown
              label="Galeri"
              items={galeriMenu}
            />

            <DesktopDropdown
              label="Kontak"
              items={kontakMenu}
              align="right"
            />

          </nav>

          {/* ====================================
              RIGHT AREA
          ===================================== */}

          <div
            className="
              flex
              items-center
              gap-3
              shrink-0
            "
          >

            {/* ==================================
                SEARCH DESKTOP
            =================================== */}

            {searchOpen ? (

              <form
                onSubmit={
                  submitSearch
                }
                className="
                  hidden
                  lg:flex
                  items-center
                  gap-2
                  w-[290px]
                  h-10
                  rounded-xl
                  border
                  border-[#D9E0E8]
                  bg-white
                  px-3
                  shadow-sm
                  animate-in
                  fade-in
                  slide-in-from-right-2
                  duration-200
                "
              >

                <Search
                  size={18}
                  strokeWidth={1.8}
                  className="
                    text-[#667085]
                    shrink-0
                  "
                />

                <input
                  type="search"
                  autoFocus
                  value={
                    searchQuery
                  }
                  onChange={(
                    event
                  ) =>
                    setSearchQuery(
                      event.target.value
                    )
                  }
                  placeholder="Cari berita..."
                  aria-label="Cari berita"
                  className="
                    flex-1
                    min-w-0
                    bg-transparent
                    outline-none
                    text-[14px]
                    text-[#0D2341]
                    placeholder:text-[#98A2B3]
                  "
                />

                <button
                  type="button"
                  onClick={
                    closeSearch
                  }
                  aria-label="Tutup pencarian"
                  className="
                    w-7
                    h-7
                    flex
                    items-center
                    justify-center
                    rounded-lg
                    text-[#667085]
                    hover:bg-[#F5F7FA]
                    transition
                  "
                >

                  <X
                    size={16}
                  />

                </button>

              </form>

            ) : (

              <button
                type="button"
                aria-label="Pencarian"
                onClick={
                  openSearch
                }
                className="
                  hidden
                  lg:flex
                  w-9
                  h-9
                  items-center
                  justify-center
                  rounded-xl
                  text-[#0D2341]
                  hover:bg-[#F5F7FA]
                  transition
                "
              >

                <Search
                  size={19}
                  strokeWidth={1.8}
                />

              </button>

            )}

            {/* ==================================
                INFAQ DESKTOP
            =================================== */}

            <button
              type="button"
              className="
                hidden
                lg:flex
                items-center
                gap-2
                bg-[#123A63]
                hover:bg-[#0F3153]
                text-white
                px-4
                py-2.5
                rounded-xl
                text-[14px]
                font-semibold
                shadow-md
                transition
              "
            >

              <Heart
                size={17}
                fill="currentColor"
              />

              Infaq/Shadaqah

            </button>

            {/* ==================================
                MOBILE MENU BUTTON
            =================================== */}

            <button
              type="button"
              aria-label={
                mobileOpen
                  ? "Tutup menu"
                  : "Buka menu"
              }
              aria-expanded={
                mobileOpen
              }
              onClick={() =>
                setMobileOpen(
                  !mobileOpen
                )
              }
              className="
                lg:hidden
                w-10
                h-10
                flex
                items-center
                justify-center
                rounded-xl
                text-[#0D2341]
                hover:bg-black/5
                active:bg-black/10
                transition
              "
            >

              {mobileOpen ? (
                <X
                  size={24}
                />
              ) : (
                <Menu
                  size={24}
                />
              )}

            </button>

          </div>

        </div>

        {/* ======================================
            MOBILE MENU
        ======================================= */}

        {mobileOpen && (

          <div
            className="
              lg:hidden
              -mx-4
              sm:-mx-6
              border-t
              border-[#E8EDF3]
              bg-white/95
              backdrop-blur-xl
            "
          >

            <div
              className="
                px-4
                sm:px-6
                py-3
                max-h-[calc(100vh-76px)]
                overflow-y-auto
              "
            >

              {/* =================================
                  MOBILE SEARCH
              ================================== */}

              <form
                onSubmit={
                  submitSearch
                }
                className="
                  flex
                  items-center
                  gap-2
                  mb-3
                  rounded-xl
                  border
                  border-[#E8EDF3]
                  bg-[#F8FAFC]
                  px-3
                  h-11
                "
              >

                <Search
                  size={18}
                  strokeWidth={1.8}
                  className="
                    text-[#667085]
                    shrink-0
                  "
                />

                <input
                  type="search"
                  value={
                    searchQuery
                  }
                  onChange={(
                    event
                  ) =>
                    setSearchQuery(
                      event.target.value
                    )
                  }
                  placeholder="Cari berita..."
                  aria-label="Cari berita"
                  className="
                    flex-1
                    min-w-0
                    bg-transparent
                    outline-none
                    text-[14px]
                    text-[#0D2341]
                    placeholder:text-[#98A2B3]
                  "
                />

                {searchQuery && (

                  <button
                    type="button"
                    onClick={() =>
                      setSearchQuery(
                        ""
                      )
                    }
                    aria-label="Hapus pencarian"
                    className="
                      w-7
                      h-7
                      flex
                      items-center
                      justify-center
                      rounded-lg
                      text-[#667085]
                      hover:bg-white
                      transition
                    "
                  >

                    <X
                      size={16}
                    />

                  </button>

                )}

              </form>

              {/* =================================
                  BERANDA
              ================================== */}

              <Link
                href="/"
                onClick={
                  closeMobile
                }
                className="
                  block
                  py-4
                  text-[15px]
                  font-medium
                  text-[#0D2341]
                  hover:text-[#123A63]
                "
              >
                Beranda
              </Link>

              {/* =================================
                  PROFIL
              ================================== */}

              <MobileAccordion
                label="Profil"
                items={profilMenu}
                open={
                  mobileMenu ===
                  "profil"
                }
                onToggle={() =>
                  toggleMobileMenu(
                    "profil"
                  )
                }
                onNavigate={
                  closeMobile
                }
              />

              {/* =================================
                  BERITA
              ================================== */}

              <Link
                href="/berita"
                onClick={
                  closeMobile
                }
                className="
                  block
                  py-4
                  text-[15px]
                  font-medium
                  text-[#0D2341]
                  hover:text-[#123A63]
                "
              >
                Berita
              </Link>

              {/* =================================
                  AGENDA
              ================================== */}

              <Link
                href="/agenda"
                onClick={
                  closeMobile
                }
                className="
                  block
                  py-4
                  text-[15px]
                  font-medium
                  text-[#0D2341]
                  hover:text-[#123A63]
                "
              >
                Agenda Kegiatan
              </Link>

              {/* =================================
                  GALERI
              ================================== */}

              <MobileAccordion
                label="Galeri"
                items={galeriMenu}
                open={
                  mobileMenu ===
                  "galeri"
                }
                onToggle={() =>
                  toggleMobileMenu(
                    "galeri"
                  )
                }
                onNavigate={
                  closeMobile
                }
              />

              {/* =================================
                  KONTAK
              ================================== */}

              <MobileAccordion
                label="Kontak"
                items={kontakMenu}
                open={
                  mobileMenu ===
                  "kontak"
                }
                onToggle={() =>
                  toggleMobileMenu(
                    "kontak"
                  )
                }
                onNavigate={
                  closeMobile
                }
              />

              {/* =================================
                  INFAQ MOBILE
              ================================== */}

              <div
                className="
                  border-t
                  border-[#E8EDF3]
                  mt-2
                  pt-4
                  pb-3
                "
              >

                <button
                  type="button"
                  className="
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-[#123A63]
                    hover:bg-[#0F3153]
                    text-white
                    px-5
                    py-3
                    rounded-xl
                    text-[14px]
                    font-semibold
                    shadow-md
                    transition
                  "
                >

                  <Heart
                    size={17}
                    fill="currentColor"
                  />

                  Infaq / Shadaqah

                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </header>
  );
}