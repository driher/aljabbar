"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  Ticket,
  X,
} from "lucide-react";


// ==================================================
// TYPES
// ==================================================

type DropdownItem = {
  label: string;
  href: string;
};


// ==================================================
// DATA MENU
// ==================================================

const profilMenu: DropdownItem[] = [
  {
    label: "Profil Masjid",
    href: "/profil",
  },
  {
    label: "Sejarah",
    href: "/profil/sejarah",
  },
  {
    label: "Visi & Misi",
    href: "/profil/visi-misi",
  },
];


const informasiMenu: DropdownItem[] = [
  {
    label: "Berita",
    href: "/berita",
  },
  {
    label: "Pengumuman",
    href: "/informasi/pengumuman",
  },
  {
    label: "Jadwal Salat",
    href: "/informasi/jadwal-shalat",
  },
];


const kegiatanMenu: DropdownItem[] = [
  {
    label: "Agenda Kegiatan",
    href: "/agenda",
  },
  {
    label: "Kajian",
    href: "/kegiatan/kajian",
  },
  {
    label: "Akad Nikah",
    href: "/kegiatan/akad-nikah",
  },
];


const galeriMenu: DropdownItem[] = [
  {
    label: "Galeri Foto",
    href: "/galeri",
  },
  {
    label: "Galeri Rasulullah ﷺ",
    href: "/reservasi-galeri",
  },
];


const kontakMenu: DropdownItem[] = [
  {
    label: "Kontak",
    href: "/kontak",
  },
  {
    label: "Lokasi Masjid",
    href: "/kontak/lokasi",
  },
];


// ==================================================
// COMPONENT
// ==================================================

export default function Navbar() {

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [openDropdown, setOpenDropdown] =
    useState<string | null>(null);

  const [mobileDropdown, setMobileDropdown] =
    useState<string | null>(null);


  // ==================================================
  // DESKTOP DROPDOWN
  // ==================================================

  const toggleDropdown = (name: string) => {

    setOpenDropdown(
      openDropdown === name
        ? null
        : name
    );

  };


  // ==================================================
  // MOBILE DROPDOWN
  // ==================================================

  const toggleMobileDropdown = (
    name: string
  ) => {

    setMobileDropdown(
      mobileDropdown === name
        ? null
        : name
    );

  };


  // ==================================================
  // CLOSE MOBILE
  // ==================================================

  const closeMobile = () => {

    setMobileOpen(false);
    setMobileDropdown(null);

  };


  return (

    <header
      className="
        relative
        z-[1000]
        w-full
        bg-white
        border-b
        border-[#E8EDF3]
      "
    >

      {/* ==================================================
          NAVBAR UTAMA
      ================================================== */}

      <div
        className="
          mx-auto
          flex
          h-[88px]
          w-full
          max-w-[1440px]
          items-center
          justify-between
          px-6
          sm:px-8
          lg:px-10
          xl:px-12
        "
      >

        {/* ==================================================
            LOGO
        ================================================== */}

        <Link
          href="/"
          onClick={closeMobile}
          className="
            flex
            shrink-0
            items-center
          "
        >

          <Image
            src="/logo-aljabbar.png"
            alt="Masjid Raya Al-Jabbar"
            width={250}
            height={75}
            priority
            className="
              h-auto
              w-[190px]
              sm:w-[210px]
              lg:w-[225px]
              object-contain
            "
          />

        </Link>


        {/* ==================================================
            DESKTOP NAVIGATION
        ================================================== */}

        <nav
          className="
            hidden
            items-center
            gap-7
            xl:flex
          "
        >

          {/* BERANDA */}

          <Link
            href="/"
            className="
              whitespace-nowrap
              text-[16px]
              font-medium
              text-[#0D2341]
              transition-colors
              hover:text-[#123A63]
            "
          >
            Beranda
          </Link>


          {/* ==================================================
              PROFIL
          ================================================== */}

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                toggleDropdown("profil")
              }
              className="
                flex
                items-center
                gap-1.5
                whitespace-nowrap
                text-[16px]
                font-medium
                text-[#0D2341]
                transition-colors
                hover:text-[#123A63]
              "
            >

              Profil

              <ChevronDown
                size={16}
                className={`
                  transition-transform
                  ${
                    openDropdown === "profil"
                      ? "rotate-180"
                      : ""
                  }
                `}
              />

            </button>


            {openDropdown === "profil" && (

              <Dropdown
                items={profilMenu}
                onClose={() =>
                  setOpenDropdown(null)
                }
              />

            )}

          </div>


          {/* ==================================================
              INFORMASI
          ================================================== */}

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                toggleDropdown("informasi")
              }
              className="
                flex
                items-center
                gap-1.5
                whitespace-nowrap
                text-[16px]
                font-medium
                text-[#0D2341]
                transition-colors
                hover:text-[#123A63]
              "
            >

              Informasi

              <ChevronDown
                size={16}
                className={`
                  transition-transform
                  ${
                    openDropdown === "informasi"
                      ? "rotate-180"
                      : ""
                  }
                `}
              />

            </button>


            {openDropdown === "informasi" && (

              <Dropdown
                items={informasiMenu}
                onClose={() =>
                  setOpenDropdown(null)
                }
              />

            )}

          </div>


          {/* ==================================================
              KEGIATAN
          ================================================== */}

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                toggleDropdown("kegiatan")
              }
              className="
                flex
                items-center
                gap-1.5
                whitespace-nowrap
                text-[16px]
                font-medium
                text-[#0D2341]
                transition-colors
                hover:text-[#123A63]
              "
            >

              Kegiatan

              <ChevronDown
                size={16}
                className={`
                  transition-transform
                  ${
                    openDropdown === "kegiatan"
                      ? "rotate-180"
                      : ""
                  }
                `}
              />

            </button>


            {openDropdown === "kegiatan" && (

              <Dropdown
                items={kegiatanMenu}
                onClose={() =>
                  setOpenDropdown(null)
                }
              />

            )}

          </div>


          {/* ==================================================
              RESERVASI
          ================================================== */}

          <Link
            href="/reservasi-galeri"
            className="
              group
              relative
              flex
              items-center
              gap-2
              whitespace-nowrap
              rounded-xl
              px-2
              py-2
              font-semibold
              text-[#0D2341]
              transition-all
              hover:bg-[#F5F7FA]
              hover:text-[#123A63]
            "
          >

            <Ticket
              size={18}
              className="
                text-[#A17B35]
                transition-transform
                group-hover:scale-110
              "
            />

            <span>
              Reservasi
            </span>


            {/* BADGE GRATIS */}

           <span
  className="
    absolute
    -right-9
    -top-4

    animate-pulse

    rounded-full

    bg-red-600

    px-3
    py-1.5

    text-[11px]
    font-black
    leading-none

    tracking-wide

    text-white

    shadow-[0_0_16px_rgba(220,38,38,0.65)]

    border-2
    border-white
  "
>
  GRATIS
</span>

          </Link>


          {/* ==================================================
              GALERI
          ================================================== */}

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                toggleDropdown("galeri")
              }
              className="
                flex
                items-center
                gap-1.5
                whitespace-nowrap
                text-[16px]
                font-medium
                text-[#0D2341]
                transition-colors
                hover:text-[#123A63]
              "
            >

              Galeri

              <ChevronDown
                size={16}
                className={`
                  transition-transform
                  ${
                    openDropdown === "galeri"
                      ? "rotate-180"
                      : ""
                  }
                `}
              />

            </button>


            {openDropdown === "galeri" && (

              <Dropdown
                items={galeriMenu}
                onClose={() =>
                  setOpenDropdown(null)
                }
              />

            )}

          </div>


          {/* ==================================================
              KONTAK
          ================================================== */}

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                toggleDropdown("kontak")
              }
              className="
                flex
                items-center
                gap-1.5
                whitespace-nowrap
                text-[16px]
                font-medium
                text-[#0D2341]
                transition-colors
                hover:text-[#123A63]
              "
            >

              Kontak

              <ChevronDown
                size={16}
                className={`
                  transition-transform
                  ${
                    openDropdown === "kontak"
                      ? "rotate-180"
                      : ""
                  }
                `}
              />

            </button>


            {openDropdown === "kontak" && (

              <Dropdown
                items={kontakMenu}
                onClose={() =>
                  setOpenDropdown(null)
                }
              />

            )}

          </div>


          {/* ==================================================
              SEARCH
          ================================================== */}

          <Link
            href="/pencarian"
            aria-label="Pencarian"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              text-[#0D2341]
              transition
              hover:bg-[#F5F7FA]
            "
          >

            <Search size={22} />

          </Link>


          {/* ==================================================
              INFAQ
          ================================================== */}

          <Link
            href="/infaq"
            className="
              flex
              items-center
              gap-2
              whitespace-nowrap
              rounded-2xl
              bg-[#123A63]
              px-6
              py-3.5
              text-[15px]
              font-semibold
              text-white
              shadow-[0_8px_24px_rgba(18,58,99,0.22)]
              transition-all
              hover:bg-[#0F3153]
              hover:shadow-[0_10px_30px_rgba(18,58,99,0.3)]
            "
          >

            <Heart
              size={18}
              fill="currentColor"
            />

            Infaq/Shadaqah

          </Link>

        </nav>


        {/* ==================================================
            MOBILE BUTTON
        ================================================== */}

        <div
          className="
            flex
            items-center
            gap-2
            xl:hidden
          "
        >

          {/* MOBILE RESERVASI MINI */}

          <Link
            href="/reservasi-galeri"
            aria-label="Reservasi Gratis"
            className="
              relative
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-[#123A63]
              text-white
              shadow-sm
            "
          >

            <Ticket size={20} />

            <span
              className="
                absolute
                -right-2
                -top-2
                animate-pulse
                rounded-full
                bg-red-600
                px-1.5
                py-[2px]
                text-[7px]
                font-black
                leading-none
                text-white
              "
            >
              GRATIS
            </span>

          </Link>


          {/* MENU BUTTON */}

          <button
            type="button"
            aria-label={
              mobileOpen
                ? "Tutup menu"
                : "Buka menu"
            }
            aria-expanded={mobileOpen}
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-[#F5F7FA]
              text-[#0D2341]
              transition
              hover:bg-[#E9EDF2]
            "
          >

            {mobileOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}

          </button>

        </div>

      </div>


      {/* ==================================================
          MOBILE MENU
      ================================================== */}

      {mobileOpen && (

        <div
          className="
            absolute
            left-0
            right-0
            top-[88px]
            z-[1100]
            border-t
            border-[#E8EDF3]
            bg-white
            shadow-[0_20px_40px_rgba(0,0,0,0.12)]
            xl:hidden
          "
        >

          <nav
            className="
              mx-auto
              max-h-[calc(100vh-88px)]
              max-w-2xl
              overflow-y-auto
              px-5
              py-5
            "
          >

            {/* BERANDA */}

            <MobileLink
              href="/"
              label="Beranda"
              onClick={closeMobile}
            />


            {/* ==================================================
                PROFIL
            ================================================== */}

            <MobileDropdown
              label="Profil"
              items={profilMenu}
              open={
                mobileDropdown === "profil"
              }
              onToggle={() =>
                toggleMobileDropdown("profil")
              }
              onClose={closeMobile}
            />


            {/* ==================================================
                INFORMASI
            ================================================== */}

            <MobileDropdown
              label="Informasi"
              items={informasiMenu}
              open={
                mobileDropdown === "informasi"
              }
              onToggle={() =>
                toggleMobileDropdown(
                  "informasi"
                )
              }
              onClose={closeMobile}
            />


            {/* ==================================================
                KEGIATAN
            ================================================== */}

            <MobileDropdown
              label="Kegiatan"
              items={kegiatanMenu}
              open={
                mobileDropdown === "kegiatan"
              }
              onToggle={() =>
                toggleMobileDropdown(
                  "kegiatan"
                )
              }
              onClose={closeMobile}
            />


            {/* ==================================================
                RESERVASI MOBILE
            ================================================== */}

            <Link
              href="/reservasi-galeri"
              onClick={closeMobile}
              className="
                my-2
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-red-100
                bg-red-50
                px-4
                py-4
                text-[#0D2341]
                transition
                hover:bg-red-100
              "
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-red-600
                  text-white
                "
              >

                <Ticket size={20} />

              </div>

              <div className="flex-1">

                <p className="font-bold">
                  Reservasi
                </p>

                <p
                  className="
                    mt-0.5
                    text-xs
                    text-[#667085]
                  "
                >
                  Tiket Galeri Rasulullah ﷺ
                </p>

              </div>

              <span
                className="
                  animate-pulse
                  rounded-full
                  bg-red-600
                  px-3
                  py-1.5
                  text-[9px]
                  font-black
                  tracking-wide
                  text-white
                  shadow-[0_0_12px_rgba(220,38,38,0.35)]
                "
              >
                GRATIS
              </span>

            </Link>


            {/* ==================================================
                GALERI
            ================================================== */}

            <MobileDropdown
              label="Galeri"
              items={galeriMenu}
              open={
                mobileDropdown === "galeri"
              }
              onToggle={() =>
                toggleMobileDropdown("galeri")
              }
              onClose={closeMobile}
            />


            {/* ==================================================
                KONTAK
            ================================================== */}

            <MobileDropdown
              label="Kontak"
              items={kontakMenu}
              open={
                mobileDropdown === "kontak"
              }
              onToggle={() =>
                toggleMobileDropdown("kontak")
              }
              onClose={closeMobile}
            />


            {/* ==================================================
                SEARCH
            ================================================== */}

            <Link
              href="/pencarian"
              onClick={closeMobile}
              className="
                mt-2
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                font-medium
                text-[#0D2341]
                hover:bg-[#F5F7FA]
              "
            >

              <Search size={20} />

              Pencarian

            </Link>


            {/* ==================================================
                INFAQ
            ================================================== */}

            <Link
              href="/infaq"
              onClick={closeMobile}
              className="
                mt-3
                flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-[#123A63]
                px-5
                py-4
                font-semibold
                text-white
              "
            >

              <Heart
                size={19}
                fill="currentColor"
              />

              Infaq/Shadaqah

            </Link>

          </nav>

        </div>

      )}

    </header>

  );
}


// ==================================================
// DESKTOP DROPDOWN COMPONENT
// ==================================================

function Dropdown({
  items,
  onClose,
}: {
  items: DropdownItem[];
  onClose: () => void;
}) {

  return (

    <div
      className="
        absolute
        left-1/2
        top-full
        z-[1200]
        mt-3
        w-[230px]
        -translate-x-1/2
        rounded-2xl
        border
        border-[#E8EDF3]
        bg-white
        p-2
        shadow-[0_15px_40px_rgba(0,0,0,0.12)]
      "
    >

      {items.map((item) => (

        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="
            block
            rounded-xl
            px-4
            py-3
            text-sm
            font-medium
            text-[#0D2341]
            transition
            hover:bg-[#F5F7FA]
            hover:text-[#123A63]
          "
        >
          {item.label}
        </Link>

      ))}

    </div>

  );
}


// ==================================================
// MOBILE LINK
// ==================================================

function MobileLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {

  return (

    <Link
      href={href}
      onClick={onClick}
      className="
        flex
        items-center
        rounded-xl
        px-4
        py-3
        font-medium
        text-[#0D2341]
        transition
        hover:bg-[#F5F7FA]
      "
    >
      {label}
    </Link>

  );
}


// ==================================================
// MOBILE DROPDOWN
// ==================================================

function MobileDropdown({
  label,
  items,
  open,
  onToggle,
  onClose,
}: {
  label: string;
  items: DropdownItem[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {

  return (

    <div>

      <button
        type="button"
        onClick={onToggle}
        className="
          flex
          w-full
          items-center
          justify-between
          rounded-xl
          px-4
          py-3
          text-left
          font-medium
          text-[#0D2341]
          transition
          hover:bg-[#F5F7FA]
        "
      >

        <span>
          {label}
        </span>

        <ChevronDown
          size={18}
          className={`
            transition-transform
            ${open ? "rotate-180" : ""}
          `}
        />

      </button>


      {open && (

        <div
          className="
            ml-4
            border-l-2
            border-[#E8EDF3]
            pl-3
          "
        >

          {items.map((item) => (

            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="
                block
                rounded-xl
                px-4
                py-3
                text-sm
                text-[#526176]
                transition
                hover:bg-[#F5F7FA]
                hover:text-[#123A63]
              "
            >
              {item.label}
            </Link>

          ))}

        </div>

      )}

    </div>

  );
}