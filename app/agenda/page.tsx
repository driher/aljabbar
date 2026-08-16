// ============================================
// app/agendas/page.tsx
// INDEX AGENDA - MASJID RAYA AL-JABBAR
// ============================================

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Loader2,
} from "lucide-react";


// ==================================================
// TYPE
// ==================================================

interface AgendaPost {
  id: number;

  date: string;

  slug: string;

  title: {
    rendered: string;
  };

  content: {
    rendered: string;
  };

  excerpt: {
    rendered: string;
  };

  featured_media: number;

  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };

  acf?: {
    tanggal_agenda?: string;
    waktu_mulai?: string;
    waktu_selesai?: string;
    lokasi?: string;
    penyelenggara?: string;
    status_agenda?: string;
    link_pendaftaran?: string;
  };
}


// ==================================================
// API
// ==================================================

const API_URL = "/api/agenda";


// ==================================================
// CLEAN HTML
// ==================================================

function cleanText(
  value: string
): string {

  if (!value) {
    return "";
  }

  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&#8230;/g, "...")
    .trim();
}


// ==================================================
// DATE
// ==================================================

function formatAgendaDate(
  value?: string
): string {

  if (!value) {
    return "";
  }

  let date: Date;

  /*
    ACF tanggal biasanya:
    20260718
  */

  if (
    /^\d{8}$/.test(value)
  ) {

    const year =
      Number(value.substring(0, 4));

    const month =
      Number(value.substring(4, 6)) - 1;

    const day =
      Number(value.substring(6, 8));

    date = new Date(
      year,
      month,
      day
    );

  } else {

    date = new Date(value);

  }

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return date.toLocaleDateString(
    "id-ID",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
}


// ==================================================
// SHORT DATE
// ==================================================

function getDay(
  value?: string
): string {

  if (!value) {
    return "--";
  }

  let date: Date;

  if (
    /^\d{8}$/.test(value)
  ) {

    date = new Date(
      Number(value.substring(0, 4)),
      Number(value.substring(4, 6)) - 1,
      Number(value.substring(6, 8))
    );

  } else {

    date = new Date(value);

  }

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "--";
  }

  return String(
    date.getDate()
  );
}


// ==================================================
// MONTH
// ==================================================

function getMonth(
  value?: string
): string {

  if (!value) {
    return "";
  }

  let date: Date;

  if (
    /^\d{8}$/.test(value)
  ) {

    date = new Date(
      Number(value.substring(0, 4)),
      Number(value.substring(4, 6)) - 1,
      Number(value.substring(6, 8))
    );

  } else {

    date = new Date(value);

  }

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  return date
    .toLocaleDateString(
      "id-ID",
      {
        month: "short",
      }
    )
    .toUpperCase();
}


// ==================================================
// TIME
// ==================================================

function formatTime(
  value?: string
): string {

  if (!value) {
    return "";
  }

  return value.substring(
    0,
    5
  );
}


// ==================================================
// IMAGE
// ==================================================

function getImage(
  agenda: AgendaPost
): string {

  return (
    agenda._embedded
      ?.["wp:featuredmedia"]
      ?. [0]
      ?.source_url ||
    "/agenda-placeholder.jpg"
  );
}


// ==================================================
// STATUS
// ==================================================

function getStatus(
  agenda: AgendaPost
): {
  label: string;
  className: string;
} {

  const status =
    (
      agenda.acf
        ?.status_agenda ||
      ""
    ).toLowerCase();


  if (
    status.includes(
      "selesai"
    )
  ) {

    return {
      label: "Selesai",
      className:
        "bg-gray-100 text-gray-600",
    };

  }


  if (
    status.includes(
      "berlangsung"
    )
  ) {

    return {
      label: "Berlangsung",
      className:
        "bg-green-100 text-green-700",
    };

  }


  return {
    label: "Akan Datang",
    className:
      "bg-[#EAF2FA] text-[#123A63]",
  };
}


// ==================================================
// PAGE
// ==================================================

export default function AgendaIndexPage() {

  const [agendas, setAgendas] =
    useState<AgendaPost[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [hasMore, setHasMore] =
    useState(true);

  const [error, setError] =
    useState(false);


  // ==================================================
  // LOAD INITIAL
  // ==================================================

  useEffect(() => {

    async function loadAgenda() {

      try {

        setLoading(true);

        setError(false);

        const response =
          await fetch(
            `${API_URL}?per_page=14&page=1`
          );

        if (!response.ok) {
          throw new Error(
            "Gagal mengambil agenda"
          );
        }

        const data =
          await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "Format agenda tidak valid"
          );
        }

        setAgendas(data);

        setCurrentPage(1);

        const totalPages =
          Number(
            response.headers.get(
              "X-WP-TotalPages"
            ) || "1"
          );

        setHasMore(
          totalPages > 1
        );

      } catch (err) {

        console.error(
          "AGENDA ERROR:",
          err
        );

        setError(true);

      } finally {

        setLoading(false);

      }

    }

    loadAgenda();

  }, []);


  // ==================================================
  // LOAD MORE
  // ==================================================

  async function loadMoreAgenda() {

    if (
      loadingMore ||
      !hasMore
    ) {
      return;
    }

    try {

      setLoadingMore(true);

      const nextPage =
        currentPage + 1;

      const response =
        await fetch(
          `${API_URL}?per_page=10&page=${nextPage}`
        );

      if (!response.ok) {

        if (
          response.status === 400
        ) {

          setHasMore(false);

          return;
        }

        throw new Error(
          "Gagal mengambil agenda berikutnya"
        );
      }

      const data =
        await response.json();

      if (
        !Array.isArray(data) ||
        data.length === 0
      ) {

        setHasMore(false);

        return;
      }

      setAgendas(
        previous => [
          ...previous,
          ...data,
        ]
      );

      setCurrentPage(
        nextPage
      );

      const totalPages =
        Number(
          response.headers.get(
            "X-WP-TotalPages"
          ) || "1"
        );

      setHasMore(
        nextPage < totalPages
      );

    } catch (err) {

      console.error(
        "LOAD MORE AGENDA ERROR:",
        err
      );

    } finally {

      setLoadingMore(false);

    }

  }


  // ==================================================
  // GROUP
  // ==================================================

  const featured =
    agendas[0];

  const secondary =
    agendas.slice(1, 4);

  const list =
    agendas.slice(4);


  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {

    return (

      <main
        className="
          min-h-screen
          bg-[#F5F7FA]
          overflow-x-hidden
          text-[#0D2341]
        "
      >

        <Navbar />

        <section
          className="
            pt-[105px]
            lg:pt-[115px]
            pb-24
          "
        >

          <div
            className="
              max-w-[1280px]
              mx-auto
              px-6
              lg:px-8
            "
          >

            <div
              className="
                max-w-5xl
                mx-auto
              "
            >

              <div
                className="
                  h-4
                  w-24
                  rounded
                  bg-[#E3E8EF]
                  animate-pulse
                "
              />

              <div
                className="
                  mt-5
                  h-12
                  w-72
                  rounded-xl
                  bg-[#E3E8EF]
                  animate-pulse
                "
              />

              <div
                className="
                  mt-4
                  h-5
                  w-full
                  max-w-2xl
                  rounded
                  bg-[#E3E8EF]
                  animate-pulse
                "
              />

              <div
                className="
                  mt-10
                  h-[420px]
                  lg:h-[500px]
                  rounded-[32px]
                  bg-[#E3E8EF]
                  animate-pulse
                "
              />

              <div
                className="
                  grid
                  md:grid-cols-3
                  gap-6
                  mt-8
                "
              >

                {[1, 2, 3].map(
                  item => (

                    <div
                      key={item}
                      className="
                        h-[360px]
                        rounded-[28px]
                        bg-[#E3E8EF]
                        animate-pulse
                      "
                    />

                  )
                )}

              </div>

            </div>

          </div>

        </section>

        <Footer />

      </main>
    );
  }


  // ==================================================
  // ERROR / EMPTY
  // ==================================================

  if (
    error ||
    !featured
  ) {

    return (

      <main
        className="
          min-h-screen
          bg-[#F5F7FA]
          overflow-x-hidden
          text-[#0D2341]
        "
      >

        <Navbar />

        <section
          className="
            pt-[105px]
            lg:pt-[115px]
            pb-24
          "
        >

          <div
            className="
              max-w-[1280px]
              mx-auto
              px-6
              lg:px-8
            "
          >

            <div
              className="
                max-w-4xl
                mx-auto
                bg-white
                rounded-[28px]
                border
                border-[#E8EDF3]
                shadow-[0_10px_40px_rgba(0,0,0,0.05)]
                p-10
                lg:p-14
                text-center
              "
            >

              <div
                className="
                  text-5xl
                  mb-5
                "
              >
                📅
              </div>

              <h1
                className="
                  font-serif
                  text-3xl
                  lg:text-4xl
                  font-bold
                "
              >
                Agenda belum tersedia
              </h1>

              <p
                className="
                  mt-3
                  text-[#667085]
                "
              >
                Belum ada agenda kegiatan
                yang diterbitkan melalui
                WordPress CMS.
              </p>

              <Link
                href="/"
                className="
                  inline-flex
                  items-center
                  gap-2
                  mt-8
                  bg-[#123A63]
                  hover:bg-[#0F3153]
                  text-white
                  px-6
                  py-3
                  rounded-2xl
                  font-semibold
                  transition
                "
              >

                <ArrowLeft
                  size={18}
                />

                Kembali ke Beranda

              </Link>

            </div>

          </div>

        </section>

        <Footer />

      </main>
    );
  }


  // ==================================================
  // MAIN
  // ==================================================

  return (

    <main
      className="
        min-h-screen
        bg-[#F5F7FA]
        overflow-x-hidden
        text-[#0D2341]
      "
    >

      <Navbar />


      {/* ==================================================
          CONTENT
      ================================================== */}

      <section
        className="
          pt-[105px]
          lg:pt-[115px]
          pb-24
        "
      >

        <div
          className="
            max-w-[1280px]
            mx-auto
            px-6
            lg:px-8
          "
        >


          {/* ==================================================
              HEADER
          ================================================== */}

          <div
            className="
              max-w-5xl
              mx-auto
              mb-10
              lg:mb-14
            "
          >

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

            <h1
              className="
                font-serif
                text-[42px]
                sm:text-[52px]
                lg:text-[60px]
                leading-tight
                font-bold
                mt-4
              "
            >
              Agenda Kegiatan
            </h1>

            <p
              className="
                text-[#667085]
                text-lg
                mt-4
                max-w-2xl
                leading-relaxed
              "
            >
              Informasi agenda kegiatan,
              kajian, tabligh akbar,
              kegiatan sosial, pendidikan,
              dan berbagai aktivitas
              di Masjid Raya Al-Jabbar.
            </p>

          </div>


          {/* ==================================================
              FEATURED AGENDA
          ================================================== */}

          <Link
            href={`/agendas/${featured.slug}`}
            className="
              group
              block
              max-w-5xl
              mx-auto
            "
          >

            <article
              className="
                relative
                overflow-hidden
                rounded-[32px]
                min-h-[430px]
                lg:min-h-[500px]
                bg-[#0D2341]
                shadow-[0_15px_50px_rgba(13,35,65,0.12)]
              "
            >

              <img
                src={getImage(featured)}
                alt={
                  featured._embedded
                    ?.["wp:featuredmedia"]
                    ?. [0]
                    ?.alt_text ||
                  cleanText(
                    featured.title.rendered
                  )
                }
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />


              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/85
                  via-black/40
                  to-black/10
                "
              />


              <div
                className="
                  absolute
                  top-6
                  left-6
                  lg:top-8
                  lg:left-8
                "
              >

                <div
                  className="
                    bg-white
                    rounded-2xl
                    px-5
                    py-3
                    shadow-xl
                    text-center
                    min-w-[82px]
                  "
                >

                  <p
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      text-[#7A8599]
                    "
                  >
                    {getMonth(
                      featured.acf
                        ?.tanggal_agenda
                    )}
                  </p>

                  <p
                    className="
                      text-3xl
                      font-bold
                      text-[#0D2341]
                    "
                  >
                    {getDay(
                      featured.acf
                        ?.tanggal_agenda
                    )}
                  </p>

                </div>

              </div>


              <div
                className="
                  absolute
                  bottom-0
                  inset-x-0
                  p-7
                  sm:p-10
                  lg:p-12
                  text-white
                "
              >

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-3
                    text-xs
                    uppercase
                    tracking-[0.18em]
                    text-white/70
                  "
                >

                  <span
                    className="
                      bg-white/15
                      backdrop-blur
                      rounded-full
                      px-3
                      py-1.5
                    "
                  >
                    Agenda Utama
                  </span>

                  <span>
                    {getStatus(
                      featured
                    ).label}
                  </span>

                </div>


                <h2
                  className="
                    font-serif
                    text-[32px]
                    sm:text-[42px]
                    lg:text-[50px]
                    leading-[1.05]
                    font-bold
                    mt-4
                    max-w-4xl
                  "
                >
                  {cleanText(
                    featured.title.rendered
                  )}
                </h2>


                <div
                  className="
                    flex
                    flex-wrap
                    gap-x-6
                    gap-y-2
                    mt-5
                    text-white/80
                    text-sm
                  "
                >

                  <span
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <CalendarDays
                      size={16}
                    />

                    {formatAgendaDate(
                      featured.acf
                        ?.tanggal_agenda
                    )}

                  </span>


                  {featured.acf
                    ?.waktu_mulai && (

                    <span
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <Clock3
                        size={16}
                      />

                      {formatTime(
                        featured.acf
                          ?.waktu_mulai
                      )}

                      {featured.acf
                        ?.waktu_selesai && (
                        <>
                          {" - "}
                          {formatTime(
                            featured.acf
                              ?.waktu_selesai
                          )}
                        </>
                      )}

                      {" WIB"}

                    </span>

                  )}


                  {featured.acf
                    ?.lokasi && (

                    <span
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <MapPin
                        size={16}
                      />

                      {featured.acf.lokasi}

                    </span>

                  )}

                </div>


                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    mt-6
                    font-semibold
                  "
                >

                  Lihat Detail Agenda

                  <ArrowRight
                    size={18}
                    className="
                      transition-transform
                      group-hover:translate-x-1
                    "
                  />

                </div>

              </div>

            </article>

          </Link>


          {/* ==================================================
              3 AGENDA BERIKUTNYA
          ================================================== */}

          {secondary.length > 0 && (

            <div
              className="
                max-w-5xl
                mx-auto
                grid
                grid-cols-1
                md:grid-cols-3
                gap-6
                mt-8
              "
            >

              {secondary.map(
                agenda => {

                  const status =
                    getStatus(
                      agenda
                    );

                  return (

                    <Link
                      key={agenda.id}
                      href={`/agendas/${agenda.slug}`}
                      className="
                        group
                        block
                      "
                    >

                      <article
                        className="
                          h-full
                          overflow-hidden
                          rounded-[28px]
                          bg-white
                          border
                          border-[#E8EDF3]
                          shadow-sm
                          hover:shadow-xl
                          transition-all
                          duration-300
                        "
                      >

                        {/* IMAGE */}

                        <div
                          className="
                            relative
                            h-[220px]
                            overflow-hidden
                            bg-[#E9EDF3]
                          "
                        >

                          <img
                            src={getImage(agenda)}
                            alt={
                              agenda._embedded
                                ?.["wp:featuredmedia"]
                                ?. [0]
                                ?.alt_text ||
                              cleanText(
                                agenda.title.rendered
                              )
                            }
                            className="
                              w-full
                              h-full
                              object-cover
                              transition-transform
                              duration-500
                              group-hover:scale-105
                            "
                          />


                          {/* DATE */}

                          <div
                            className="
                              absolute
                              top-4
                              left-4
                              bg-white
                              rounded-xl
                              px-3
                              py-2
                              shadow-lg
                              text-center
                              min-w-[58px]
                            "
                          >

                            <p
                              className="
                                text-[9px]
                                uppercase
                                tracking-widest
                                text-[#7A8599]
                              "
                            >
                              {getMonth(
                                agenda.acf
                                  ?.tanggal_agenda
                              )}
                            </p>

                            <p
                              className="
                                text-2xl
                                font-bold
                                text-[#0D2341]
                              "
                            >
                              {getDay(
                                agenda.acf
                                  ?.tanggal_agenda
                              )}
                            </p>

                          </div>


                          {/* STATUS */}

                          <div
                            className="
                              absolute
                              top-4
                              right-4
                            "
                          >

                            <span
                              className={`
                                inline-flex
                                rounded-full
                                px-3
                                py-1.5
                                text-[10px]
                                font-semibold
                                ${status.className}
                              `}
                            >
                              {status.label}
                            </span>

                          </div>

                        </div>


                        {/* CONTENT */}

                        <div
                          className="
                            p-6
                          "
                        >

                          <div
                            className="
                              flex
                              items-center
                              gap-2
                              text-xs
                              text-[#8A95A7]
                            "
                          >

                            <CalendarDays
                              size={14}
                            />

                            {formatAgendaDate(
                              agenda.acf
                                ?.tanggal_agenda
                            )}

                          </div>


                          <h3
                            className="
                              font-serif
                              text-[25px]
                              leading-tight
                              font-bold
                              text-[#0D2341]
                              mt-3
                              group-hover:text-[#A17B35]
                              transition-colors
                            "
                          >
                            {cleanText(
                              agenda.title.rendered
                            )}
                          </h3>


                          {agenda.acf
                            ?.lokasi && (

                            <p
                              className="
                                flex
                                items-center
                                gap-2
                                mt-4
                                text-sm
                                text-[#68758A]
                              "
                            >

                              <MapPin
                                size={15}
                              />

                              <span
                                className="
                                  line-clamp-1
                                "
                              >
                                {agenda.acf.lokasi}
                              </span>

                            </p>

                          )}


                          {agenda.acf
                            ?.waktu_mulai && (

                            <p
                              className="
                                flex
                                items-center
                                gap-2
                                mt-2
                                text-sm
                                text-[#68758A]
                              "
                            >

                              <Clock3
                                size={15}
                              />

                              {formatTime(
                                agenda.acf
                                  .waktu_mulai
                              )}

                              {agenda.acf
                                ?.waktu_selesai && (
                                <>
                                  {" - "}
                                  {formatTime(
                                    agenda.acf
                                      .waktu_selesai
                                  )}
                                </>
                              )}

                              {" WIB"}

                            </p>

                          )}


                          <div
                            className="
                              mt-5
                              inline-flex
                              items-center
                              gap-2
                              text-sm
                              font-semibold
                              text-[#123A63]
                            "
                          >

                            Detail Kegiatan

                            <ArrowRight
                              size={17}
                              className="
                                transition-transform
                                group-hover:translate-x-1
                              "
                            />

                          </div>

                        </div>

                      </article>

                    </Link>

                  );
                }
              )}

            </div>

          )}


          {/* ==================================================
              AGENDA LAINNYA
          ================================================== */}

          {list.length > 0 && (

            <section
              className="
                max-w-5xl
                mx-auto
                mt-20
              "
            >

              <div
                className="
                  mb-8
                "
              >

                <p
                  className="
                    uppercase
                    tracking-[0.25em]
                    text-[#7A8599]
                    font-medium
                    text-sm
                  "
                >
                  Agenda
                </p>


                <h2
                  className="
                    font-serif
                    text-[36px]
                    lg:text-[44px]
                    leading-tight
                    font-bold
                    mt-3
                  "
                >
                  Agenda Lainnya
                </h2>

              </div>


              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                "
              >

                {list.map(
                  agenda => {

                    const status =
                      getStatus(
                        agenda
                      );

                    return (

                      <Link
                        key={agenda.id}
                        href={`/agendas/${agenda.slug}`}
                        className="
                          group
                          block
                        "
                      >

                        <article
                          className="
                            flex
                            flex-col
                            sm:flex-row
                            gap-5
                            bg-white
                            rounded-[24px]
                            border
                            border-[#E8EDF3]
                            p-4
                            hover:shadow-[0_12px_35px_rgba(13,35,65,0.08)]
                            transition-all
                            duration-300
                          "
                        >

                          {/* IMAGE */}

                          <div
                            className="
                              relative
                              w-full
                              sm:w-[220px]
                              h-[200px]
                              sm:h-[145px]
                              shrink-0
                              rounded-2xl
                              overflow-hidden
                              bg-[#E9EDF3]
                            "
                          >

                            <img
                              src={getImage(agenda)}
                              alt={
                                agenda._embedded
                                  ?.["wp:featuredmedia"]
                                  ?. [0]
                                  ?.alt_text ||
                                cleanText(
                                  agenda.title.rendered
                                )
                              }
                              className="
                                w-full
                                h-full
                                object-cover
                                transition-transform
                                duration-500
                                group-hover:scale-105
                              "
                            />


                            <div
                              className="
                                absolute
                                top-3
                                left-3
                              "
                            >

                              <span
                                className="
                                  bg-white
                                  rounded-xl
                                  px-3
                                  py-2
                                  shadow-md
                                  text-center
                                  inline-block
                                "
                              >

                                <span
                                  className="
                                    block
                                    text-[9px]
                                    uppercase
                                    tracking-widest
                                    text-[#7A8599]
                                  "
                                >
                                  {getMonth(
                                    agenda.acf
                                      ?.tanggal_agenda
                                  )}
                                </span>

                                <span
                                  className="
                                    block
                                    text-xl
                                    font-bold
                                    text-[#0D2341]
                                  "
                                >
                                  {getDay(
                                    agenda.acf
                                      ?.tanggal_agenda
                                  )}
                                </span>

                              </span>

                            </div>

                          </div>


                          {/* CONTENT */}

                          <div
                            className="
                              min-w-0
                              flex-1
                              py-1
                            "
                          >

                            <div
                              className="
                                flex
                                flex-wrap
                                items-center
                                gap-3
                              "
                            >

                              <span
                                className={`
                                  inline-flex
                                  rounded-full
                                  px-3
                                  py-1.5
                                  text-[10px]
                                  font-semibold
                                  ${status.className}
                                `}
                              >
                                {status.label}
                              </span>


                              <span
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  text-xs
                                  text-[#8A95A7]
                                "
                              >

                                <CalendarDays
                                  size={14}
                                />

                                {formatAgendaDate(
                                  agenda.acf
                                    ?.tanggal_agenda
                                )}

                              </span>

                            </div>


                            <h3
                              className="
                                font-serif
                                text-[22px]
                                sm:text-[27px]
                                leading-tight
                                font-bold
                                text-[#0D2341]
                                mt-3
                                line-clamp-2
                                group-hover:text-[#A17B35]
                                transition-colors
                              "
                            >
                              {cleanText(
                                agenda.title.rendered
                              )}
                            </h3>


                            <div
                              className="
                                flex
                                flex-wrap
                                gap-x-6
                                gap-y-2
                                mt-3
                                text-sm
                                text-[#68758A]
                              "
                            >

                              {agenda.acf
                                ?.waktu_mulai && (

                                <span
                                  className="
                                    flex
                                    items-center
                                    gap-2
                                  "
                                >

                                  <Clock3
                                    size={15}
                                  />

                                  {formatTime(
                                    agenda.acf
                                      .waktu_mulai
                                  )}

                                  {agenda.acf
                                    ?.waktu_selesai && (
                                    <>
                                      {" - "}
                                      {formatTime(
                                        agenda.acf
                                          .waktu_selesai
                                      )}
                                    </>
                                  )}

                                  {" WIB"}

                                </span>

                              )}


                              {agenda.acf
                                ?.lokasi && (

                                <span
                                  className="
                                    flex
                                    items-center
                                    gap-2
                                  "
                                >

                                  <MapPin
                                    size={15}
                                  />

                                  <span
                                    className="
                                      line-clamp-1
                                    "
                                  >
                                    {agenda.acf.lokasi}
                                  </span>

                                </span>

                              )}

                            </div>


                            <div
                              className="
                                hidden
                                sm:inline-flex
                                items-center
                                gap-2
                                mt-4
                                text-sm
                                font-semibold
                                text-[#123A63]
                              "
                            >

                              Lihat Detail

                              <ArrowRight
                                size={16}
                                className="
                                  transition-transform
                                  group-hover:translate-x-1
                                "
                              />

                            </div>

                          </div>

                        </article>

                      </Link>

                    );
                  }
                )}

              </div>


              {/* ==================================================
                  LOAD MORE
              ================================================== */}

              {hasMore && (

                <div
                  className="
                    flex
                    justify-center
                    mt-10
                  "
                >

                  <button
                    type="button"
                    onClick={loadMoreAgenda}
                    disabled={loadingMore}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-3
                      min-w-[190px]
                      bg-[#123A63]
                      hover:bg-[#0F3153]
                      disabled:opacity-60
                      disabled:cursor-not-allowed
                      text-white
                      px-7
                      py-3.5
                      rounded-2xl
                      font-semibold
                      shadow-lg
                      transition
                    "
                  >

                    {loadingMore ? (

                      <>
                        <Loader2
                          size={18}
                          className="
                            animate-spin
                          "
                        />

                        Memuat agenda...

                      </>

                    ) : (

                      <>
                        Load More

                        <ArrowRight
                          size={18}
                        />

                      </>

                    )}

                  </button>

                </div>

              )}


              {!hasMore && (

                <div
                  className="
                    text-center
                    mt-10
                    text-sm
                    text-[#8A95A7]
                  "
                >
                  Semua agenda sudah
                  ditampilkan.
                </div>

              )}

            </section>

          )}

        </div>

      </section>


      {/* ==================================================
          FOOTER
      ================================================== */}

      <Footer />

    </main>
  );
}