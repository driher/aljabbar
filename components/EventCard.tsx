"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";

interface AgendaPost {
  id: number;
  date: string;
  slug: string;
  link: string;

  title: {
    rendered: string;
  };

  excerpt: {
    rendered: string;
  };

  featured_media: number;

  acf?: {
    tanggal_agenda?: string;
    waktu_mulai?: string;
    waktu_selesai?: string;
    lokasi?: string;
    penyelenggara?: string;
    status_agenda?: string;
    link_pendaftaran?: string;
  };

  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export default function EventCard() {
  const [agendas, setAgendas] = useState<AgendaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAgenda() {
      try {
        const response = await fetch(
          "https://pas.akarmusic.com/wp-json/wp/v2/agenda?_embed&per_page=3"
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        setAgendas(data);
      } catch (err) {
        console.error(
          "Gagal mengambil agenda:",
          err
        );

        setError(
          "Agenda belum tersedia."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchAgenda();
  }, []);

  /* ======================================
      CLEAN HTML
  ====================================== */

  function cleanText(html: string) {
    return html
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&#8217;/g, "'")
      .replace(/&#8220;/g, '"')
      .replace(/&#8221;/g, '"')
      .replace(/&amp;/g, "&")
      .trim();
  }

  /* ======================================
      FORMAT TANGGAL
  ====================================== */

  function formatDate(date?: string) {
    if (!date) {
      return {
        day: "--",
        month: "---",
      };
    }

    const year = Number(
      date.substring(0, 4)
    );

    const month = Number(
      date.substring(4, 6)
    );

    const day = Number(
      date.substring(6, 8)
    );

    const formatted =
      new Date(
        year,
        month - 1,
        day
      );

    return {
      day: formatted.toLocaleDateString(
        "id-ID",
        {
          day: "2-digit",
        }
      ),

      month: formatted
        .toLocaleDateString(
          "id-ID",
          {
            month: "long",
          }
        )
        .toUpperCase(),
    };
  }

  /* ======================================
      FORMAT JAM
  ====================================== */

  function formatTime(time?: string) {
    if (!time) return "";

    return time.substring(0, 5);
  }

  /* ======================================
      LOADING
  ====================================== */

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-14">

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="
              overflow-hidden
              rounded-[32px]
              bg-white
              border
              border-[#E8EDF3]
              shadow-sm
              animate-pulse
            "
          >

            <div className="h-[280px] bg-[#E9EDF3]" />

            <div className="p-8">

              <div className="h-4 w-24 bg-[#E9EDF3] rounded mb-4" />

              <div className="h-8 w-full bg-[#E9EDF3] rounded mb-2" />

              <div className="h-8 w-4/5 bg-[#E9EDF3] rounded mb-5" />

              <div className="h-4 w-full bg-[#E9EDF3] rounded mb-2" />

              <div className="h-4 w-3/4 bg-[#E9EDF3] rounded" />

            </div>

          </div>
        ))}

      </div>
    );
  }

  /* ======================================
      ERROR / KOSONG
  ====================================== */

  if (error || agendas.length === 0) {
    return (
      <div
        className="
          mt-14
          rounded-[32px]
          border
          border-[#E8EDF3]
          bg-white
          p-10
          text-center
        "
      >

        <div className="text-4xl mb-4">
          📅
        </div>

        <h3 className="
          font-serif
          text-2xl
          font-bold
          text-[#0D2341]
        ">
          Agenda belum tersedia
        </h3>

        <p className="
          text-[#7A8599]
          mt-2
        ">
          Belum ada agenda kegiatan
          yang diterbitkan.
        </p>

      </div>
    );
  }

  /* ======================================
      RENDER
  ====================================== */

  return (
    <div className="
      grid
      md:grid-cols-2
      xl:grid-cols-3
      gap-6
      mt-14
    ">

      {agendas.map((agenda) => {

        const tanggal =
          formatDate(
            agenda.acf?.tanggal_agenda
          );

        const image =
          agenda._embedded
            ?.["wp:featuredmedia"]
            ?. [0]
            ?.source_url ||
          "/event-placeholder.jpg";

        const alt =
          agenda._embedded
            ?.["wp:featuredmedia"]
            ?. [0]
            ?.alt_text ||
          cleanText(
            agenda.title.rendered
          );

        const title =
          cleanText(
            agenda.title.rendered
          );

        const description =
          cleanText(
            agenda.excerpt.rendered
          );

        const status =
          agenda.acf?.status_agenda ||
          "";

        return (
          <article
            key={agenda.id}
            className="
              group
              bg-white
              rounded-[32px]
              overflow-hidden
              border
              border-[#E8EDF3]
              shadow-sm
              hover:shadow-xl
              transition-all
              duration-300
            "
          >

            {/* =========================
                IMAGE
            ========================= */}

            <Link
              href={`/agenda/${agenda.slug}`}
              target="_self"
              rel="noopener noreferrer"
              className="block"
            >

              <div className="
                relative
                h-[280px]
                overflow-hidden
                bg-[#EEF1F5]
              ">

                <img
                  src={image}
                  alt={alt}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />

                {/* OVERLAY */}

                <div className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/40
                  via-transparent
                  to-transparent
                " />


                {/* DATE */}

                <div className="
                  absolute
                  top-5
                  left-5
                  bg-white
                  rounded-xl
                  px-4
                  py-3
                  shadow-lg
                  text-center
                  min-w-[72px]
                ">

                  <p className="
                    text-[10px]
                    uppercase
                    tracking-widest
                    text-[#667085]
                  ">
                    {tanggal.month}
                  </p>

                  <h4 className="
                    text-3xl
                    leading-none
                    font-bold
                    text-[#0D2341]
                    mt-1
                  ">
                    {tanggal.day}
                  </h4>

                </div>


                {/* STATUS */}

                {status && (
                  <div className="
                    absolute
                    top-5
                    right-5
                    bg-[#0D2341]/85
                    backdrop-blur-sm
                    text-white
                    rounded-full
                    px-3
                    py-1.5
                    text-[10px]
                    uppercase
                    tracking-wider
                  ">
                    {status}
                  </div>
                )}

              </div>

            </Link>


            {/* =========================
                CONTENT
            ========================= */}

            <div className="p-8">

              {/* CATEGORY */}

              <p className="
                text-[#A17B35]
                text-xs
                uppercase
                tracking-[0.18em]
                font-semibold
              ">
                Agenda Kegiatan
              </p>


              {/* TITLE */}

              <Link
                href={`/agenda/${agenda.slug}`}
                target="_self"
                rel="noopener noreferrer"
              >

                <h3 className="
                  font-serif
                  text-[30px]
                  leading-tight
                  mt-3
                  font-bold
                  text-[#0D2341]
                  group-hover:text-[#A17B35]
                  transition-colors
                ">
                  {title}
                </h3>

              </Link>


              {/* META */}

              <div className="
                mt-5
                space-y-2
              ">

                {/* JAM */}

                {(agenda.acf?.waktu_mulai ||
                  agenda.acf?.waktu_selesai) && (

                  <div className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-[#667085]
                  ">

                    <Clock
                      size={16}
                      className="text-[#123A63]"
                    />

                    <span>
                      {formatTime(
                        agenda.acf?.waktu_mulai
                      )}

                      {agenda.acf?.waktu_selesai &&
                        ` – ${formatTime(
                          agenda.acf
                            ?.waktu_selesai
                        )}`}

                      {" WIB"}
                    </span>

                  </div>
                )}


                {/* LOKASI */}

                {agenda.acf?.lokasi && (

                  <div className="
                    flex
                    items-start
                    gap-2
                    text-sm
                    text-[#667085]
                  ">

                    <MapPin
                      size={16}
                      className="
                        text-[#123A63]
                        mt-0.5
                        shrink-0
                      "
                    />

                    <span>
                      {agenda.acf.lokasi}
                    </span>

                  </div>

                )}

              </div>


              {/* DESCRIPTION */}

              {description && (

                <p className="
                  mt-5
                  text-[#667085]
                  leading-relaxed
                  line-clamp-3
                ">
                  {description}
                </p>

              )}


              {/* DETAIL */}

              <Link
                href={`/agenda/${agenda.slug}`}
                rel="noopener noreferrer"
                className="
                  mt-7
                  inline-flex
                  items-center
                  gap-2
                  font-semibold
                  text-[#123A63]
                  hover:text-[#A17B35]
                  transition-colors
                "
              >

                Detail Kegiatan

                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    group-hover:translate-x-1
                  "
                />

              </Link>

            </div>

          </article>
        );
      })}

    </div>
  );
}