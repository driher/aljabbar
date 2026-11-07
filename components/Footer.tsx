import Link from "next/link";
import {
  Globe,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";

const menuLinks = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil/profil-dkm" },
  { label: "Berita", href: "/berita" },
  { label: "Pengumuman", href: "/pengumuman" },
  { label: "Jadwal Salat", href: "/jadwal-shalat" },

];

export default function Footer() {
  return (
    <footer className="bg-[#0D2341] text-white pt-24 pb-12 rounded-t-[48px]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-14">

          {/* BRAND */}
          <div>
            <Link href="/" className="inline-block group">
              <h2 className="font-serif text-4xl font-bold group-hover:text-blue-200 transition">
                Masjid Raya
                <br />
                Al-Jabbar
              </h2>
            </Link>

            <p className="mt-6 text-white/70 leading-relaxed">
              Simbol persatuan dan kemajuan
              Islam modern di Jawa Barat.
            </p>
          </div>

          {/* MENU */}
          <div>
            <h3 className="text-xl font-semibold">
              Menu
            </h3>

            <ul className="mt-6 space-y-4 text-white/70">
              {menuLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-300"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KONTAK */}
          <div>
            <h3 className="text-xl font-semibold">
              Kontak
            </h3>

            <ul className="mt-6 space-y-5 text-white/70">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="shrink-0" />
                Gedebage, Bandung
              </li>

              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0" />
                <a
                  href="tel:+6281200000000"
                  className="hover:text-white transition"
                >
                  +62 812 0000 0000
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0" />
                <a
                  href="mailto:info@aljabbar.id"
                  className="hover:text-white transition"
                >
                  info@aljabbar.id
                </a>
              </li>
            </ul>
          </div>

          {/* WEBSITE */}
          <div>
            <h3 className="text-xl font-semibold">
              Website
            </h3>

            <p className="mt-6 text-white/70 leading-relaxed">
              Kunjungi portal resmi Masjid Raya Al-Jabbar.
            </p>

            <div className="flex gap-4 mt-6">
              <Link
                href="/"
                aria-label="Kunjungi website Masjid Raya Al-Jabbar"
                className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#0D2341] transition duration-300"
              >
                <Globe size={22} />
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col lg:flex-row gap-4 justify-between text-white/50 text-sm">
          <p>
            © {new Date().getFullYear()} Masjid Raya Al-Jabbar.
            All rights reserved.
          </p>

          <p>
          
          </p>
        </div>
      </div>
    </footer>
  );
}