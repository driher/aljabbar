"use client";

import {
  FileText,
  ExternalLink,
  Smartphone,
} from "lucide-react";

export default function ActivityPermitCard() {
  return (
    <div className="rounded-3xl bg-white border border-[#E8EDF3] shadow-sm p-6 h-full">

      {/* HEADER */}
      <div className="flex items-start gap-4">

        <div className="
          w-12
          h-12
          rounded-2xl
          bg-[#123A63]/10
          text-[#123A63]
          flex
          items-center
          justify-center
          shrink-0
        ">
          <FileText size={24} />
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#8A95A7]">
            Layanan Masjid
          </p>

          <h3 className="text-xl font-bold text-[#0D2341] mt-1 leading-tight">
            Permohonan Izin Kegiatan
          </h3>
        </div>

      </div>


      {/* DESCRIPTION */}

      <p className="text-sm text-[#667085] leading-6 mt-5">
        Permohonan izin kegiatan seperti pengajian
        dan sejenisnya di Masjid Raya Al-Jabbar
        <strong className="text-[#123A63]">
          {" "}GRATIS.
        </strong>
      </p>


      {/* GOOGLE FORM */}

      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSd4AKQl8rpxPBJ7SzexKPUrZtf085HqDsEoD2FDGPrIDulUOg/viewform"
        target="_blank"
        rel="noopener noreferrer"
        className="
          mt-5
          flex
          items-center
          justify-between
          gap-3
          rounded-2xl
          bg-[#123A63]
          hover:bg-[#0f3153]
          text-white
          px-4
          py-3
          transition
        "
      >

        <div className="flex items-center gap-3">

          <FileText size={19} />

          <div>
            <p className="text-sm font-semibold">
              Isi Google Form
            </p>

            <p className="text-[10px] text-white/60">
              Permohonan izin kegiatan
            </p>
          </div>

        </div>

        <ExternalLink size={17} />

      </a>


      {/* SAPAWARGA */}

      <div className="mt-5">

        <div className="flex items-center gap-2 mb-3">

          <Smartphone
            size={17}
            className="text-[#123A63]"
          />

          <p className="text-sm font-semibold text-[#0D2341]">
            Atau melalui Aplikasi Sapawarga
          </p>

        </div>


        <div className="flex gap-3">

          {/* PLAY STORE */}

          <a
            href="https://play.google.com/store/apps/details?id=com.sapawarga.jds&hl=id&gl=US"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src="/google-play.png"
              alt="Download Sapawarga di Google Play"
              className="
                h-10
                w-auto
                object-contain
              "
            />
          </a>


          {/* APP STORE */}

          <a
            href="https://apps.apple.com/id/app/sapawarga-jabar-super-apps/id6443805562?utm_campaign=button_list_SapawargaiOS&utm_medium=referral&utm_source=later-linkinbio"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src="/app-store.png"
              alt="Download Sapawarga di App Store"
              className="
                h-10
                w-auto
                object-contain
              "
            />
          </a>

        </div>

      </div>


      {/* AKAD NIKAH */}

      <div className="
        mt-6
        pt-5
        border-t
        border-[#E8EDF3]
      ">

        <p className="
          text-[10px]
          uppercase
          tracking-[0.18em]
          font-semibold
          text-[#A17B35]
        ">
          Catatan Akad Nikah
        </p>

        <p className="
          text-sm
          font-semibold
          text-[#0D2341]
          leading-6
          mt-2
        ">
          Akad Nikah
          <span className="font-normal">
            {" "}tanpa resepsi/walimah
          </span>
        </p>

        <ul className="
          mt-2
          space-y-1
          text-xs
          text-[#667085]
          leading-5
        ">

          <li>
            • Senin–Kamis pukul 07.00–09.00 WIB
          </li>

          <li>
            • Izin melalui Gform/Aplikasi Sapawarga
          </li>

          <li>
            • Pilih <strong>Taklim</strong>
          </li>

          <li>
            • Tidak dapat dilaksanakan pada hari
            libur nasional (tanggal merah) dan
            cuti bersama
          </li>

        </ul>

      </div>

    </div>
  );
}