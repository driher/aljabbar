// ===============================
// components/Navbar.tsx
// ===============================

"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ChevronDown,
  Heart,
  Menu,
  Search,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">

        <div className="h-24 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/lgoweb_masjid_aljabbar.png"
                alt="Masjid Raya Al Jabbar"
                width={220}
                height={60}
                priority
                className="w-auto h-12 lg:h-14 object-contain"
              />
            </Link>
          </div>

          {/* MENU */}
          <nav className="hidden lg:flex items-center gap-10 font-medium text-[#0D2341]">

            {/* BERANDA */}
            <Link
              href="/"
              className="hover:text-[#123A63] transition"
            >
              Beranda
            </Link>

            {/* PROFIL */}
            <div className="relative group">

              <button className="flex items-center gap-1 hover:text-[#123A63] transition">
                Profil <ChevronDown size={16} />
              </button>

              <div className="absolute top-full left-0 pt-3 hidden group-hover:block z-50">

                <div className="w-[320px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#E8EDF3] p-6">

                  <div className="flex flex-col gap-4 text-[#0D2341]">

                    <Link href="/profil/sejarah-masjid" className="hover:text-[#123A63] transition">
                      Sejarah Masjid
                    </Link>

                    <Link href="/profil/visi-misi" className="hover:text-[#123A63] transition">
                      Visi & Misi
                    </Link>

                    <Link href="/profil/struktur-dkm" className="hover:text-[#123A63] transition">
                      Struktur DKM
                    </Link>

                    <Link href="/profil/arsitektur-masjid" className="hover:text-[#123A63] transition">
                      Arsitektur Masjid
                    </Link>

                    <Link href="/profil/fasilitas" className="hover:text-[#123A63] transition">
                      Fasilitas
                    </Link>

                    <Link href="/profil/imam-dan-pembina" className="hover:text-[#123A63] transition">
                      Imam & Dewan Pembina
                    </Link>

                    <Link href="/profil/legalitas" className="hover:text-[#123A63] transition">
                      Legalitas
                    </Link>

                    <Link href="/profil/faq" className="hover:text-[#123A63] transition">
                      FAQ
                    </Link>

                  </div>
                </div>
              </div>
            </div>

            {/* INFORMASI */}
            <div className="relative group">

              <button className="flex items-center gap-1 hover:text-[#123A63] transition">
                Informasi <ChevronDown size={16} />
              </button>

              <div className="absolute top-full left-0 pt-3 hidden group-hover:block z-50">

                <div className="w-[340px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#E8EDF3] p-6">

                  <div className="flex flex-col gap-4 text-[#0D2341]">

                    <Link href="/informasi/berita-masjid" className="hover:text-[#123A63] transition">
                      Berita Masjid
                    </Link>

                    <Link href="/informasi/pengumuman" className="hover:text-[#123A63] transition">
                      Pengumuman
                    </Link>

                    <Link href="/informasi/artikel-islami" className="hover:text-[#123A63] transition">
                      Artikel Islami
                    </Link>

                    <Link href="/informasi/jadwal-salat" className="hover:text-[#123A63] transition">
                      Jadwal Salat
                    </Link>

                    <Link href="/informasi/kalender-hijriah" className="hover:text-[#123A63] transition">
                      Kalender Hijriah
                    </Link>

                    <Link href="/informasi/informasi-kajian" className="hover:text-[#123A63] transition">
                      Informasi Kajian
                    </Link>

                    <Link href="/informasi/layanan-jamaah" className="hover:text-[#123A63] transition">
                      Layanan Jamaah
                    </Link>

                    <Link href="/informasi/tata-tertib" className="hover:text-[#123A63] transition">
                      Tata Tertib Masjid
                    </Link>

                    <Link href="/informasi/parkir-dan-akses" className="hover:text-[#123A63] transition">
                      Informasi Parkir & Akses
                    </Link>

                  </div>
                </div>
              </div>
            </div>

            {/* KEGIATAN */}
            <div className="relative group">

              <button className="flex items-center gap-1 hover:text-[#123A63] transition">
                Kegiatan <ChevronDown size={16} />
              </button>

              <div className="absolute top-full left-0 pt-3 hidden group-hover:block z-50">

                <div className="w-[340px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#E8EDF3] p-6">

                  <div className="flex flex-col gap-4 text-[#0D2341]">

                    <Link href="/kegiatan/kajian-rutin" className="hover:text-[#123A63] transition">
                      Kajian Rutin
                    </Link>

                    <Link href="/kegiatan/tabligh-akbar" className="hover:text-[#123A63] transition">
                      Tabligh Akbar
                    </Link>

                    <Link href="/kegiatan/kajian-muslimah" className="hover:text-[#123A63] transition">
                      Kajian Muslimah
                    </Link>

                    <Link href="/kegiatan/program-ramadhan" className="hover:text-[#123A63] transition">
                      Program Ramadhan
                    </Link>

                    <Link href="/kegiatan/kegiatan-sosial" className="hover:text-[#123A63] transition">
                      Kegiatan Sosial
                    </Link>

                    <Link href="/kegiatan/pendidikan-tpq" className="hover:text-[#123A63] transition">
                      Pendidikan & TPQ
                    </Link>

                    <Link href="/kegiatan/remaja-masjid" className="hover:text-[#123A63] transition">
                      Kegiatan Remaja Masjid
                    </Link>

                    <Link href="/kegiatan/pelatihan-seminar" className="hover:text-[#123A63] transition">
                      Pelatihan & Seminar
                    </Link>

                    <Link href="/kegiatan/event-nasional" className="hover:text-[#123A63] transition">
                      Event Nasional
                    </Link>

                    <Link href="/kegiatan/agenda-bulanan" className="hover:text-[#123A63] transition">
                      Agenda Bulanan
                    </Link>

                  </div>
                </div>
              </div>
            </div>

            {/* GALERI */}
            <div className="relative group">

              <button className="flex items-center gap-1 hover:text-[#123A63] transition">
                Galeri <ChevronDown size={16} />
              </button>

              <div className="absolute top-full left-0 pt-3 hidden group-hover:block z-50">

                <div className="w-[320px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#E8EDF3] p-6">

                  <div className="flex flex-col gap-4 text-[#0D2341]">

                    <Link href="/galeri/foto-kegiatan" className="hover:text-[#123A63] transition">
                      Foto Kegiatan
                    </Link>

                    <Link href="/galeri/video-kajian" className="hover:text-[#123A63] transition">
                      Video Kajian
                    </Link>

                    <Link href="/galeri/dokumentasi-event" className="hover:text-[#123A63] transition">
                      Dokumentasi Event
                    </Link>

                    <Link href="/galeri/arsitektur" className="hover:text-[#123A63] transition">
                      Arsitektur Masjid
                    </Link>

                    <Link href="/galeri/ramadhan" className="hover:text-[#123A63] transition">
                      Galeri Ramadhan
                    </Link>

                    <Link href="/galeri/jamaah" className="hover:text-[#123A63] transition">
                      Galeri Jamaah
                    </Link>

                    <Link href="/galeri/virtual-tour" className="hover:text-[#123A63] transition">
                      Virtual Tour
                    </Link>

                  </div>
                </div>
              </div>
            </div>

            {/* KONTAK */}
            <div className="relative group">

              <button className="flex items-center gap-1 hover:text-[#123A63] transition">
                Kontak <ChevronDown size={16} />
              </button>

              <div className="absolute top-full right-0 pt-3 hidden group-hover:block z-50">

                <div className="w-[320px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#E8EDF3] p-6">

                  <div className="flex flex-col gap-4 text-[#0D2341]">

                    <Link href="/kontak/lokasi" className="hover:text-[#123A63] transition">
                      Lokasi Masjid
                    </Link>

                    <Link href="/kontak/dkm" className="hover:text-[#123A63] transition">
                      Kontak DKM
                    </Link>

                    <Link href="/kontak/form-pertanyaan" className="hover:text-[#123A63] transition">
                      Form Pertanyaan
                    </Link>

                    <Link href="/kontak/donasi-kerjasama" className="hover:text-[#123A63] transition">
                      Donasi & Kerjasama
                    </Link>

                    <Link href="/kontak/media-sosial" className="hover:text-[#123A63] transition">
                      Media Sosial
                    </Link>

                    <Link href="/kontak/google-maps" className="hover:text-[#123A63] transition">
                      Google Maps
                    </Link>

                    <Link href="/kontak/jam-operasional" className="hover:text-[#123A63] transition">
                      Jam Operasional
                    </Link>

                    <Link href="/kontak/hotline" className="hover:text-[#123A63] transition">
                      Hotline Informasi
                    </Link>

                  </div>
                </div>
              </div>
            </div>

          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-5">

            <Search className="hidden lg:block text-[#111]" />

            <button className="hidden lg:flex items-center gap-2 bg-[#123A63] hover:bg-[#0f3153] transition text-white px-5 py-3 rounded-xl shadow-lg">
              <Heart size={18} />
              Donasi
            </button>

            <button className="lg:hidden text-[#0D2341]">
              <Menu />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}