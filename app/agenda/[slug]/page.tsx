import Footer from "@/components/Footer";

import {
  CalendarDays,
  Clock,
  MapPin,
  UserRound,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";

import Link from "next/link";

interface AgendaPost {
  id: number;
  slug: string;

  title: {
    rendered: string;
  };

  content: {
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


/* ==================================================
   GET AGENDA
================================================== */

async function getAgenda(
  slug: string
): Promise<AgendaPost | null> {

  try {

    const response = await fetch(
      `https://pas.akarmusic.com/wp-json/wp/v2/agenda?slug=${encodeURIComponent(
        slug
      )}&_embed`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return data[0];

  } catch (error) {

    console.error(
      "Gagal mengambil agenda:",
      error
    );

    return null;
  }
}


/* ==================================================
   CLEAN HTML
================================================== */

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


/* ==================================================
   FORMAT DATE
================================================== */

function formatDate(
  date?: string
) {

  if (!date) {
    return "-";
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

  const result = new Date(
    year,
    month - 1,
    day
  );

  return result.toLocaleDateString(
    "id-ID",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
}


/* ==================================================
   FORMAT TIME
================================================== */

function formatTime(
  time?: string
) {

  if (!time) {
    return "";
  }

  return time.substring(0, 5);
}


/* ==================================================
   PAGE
================================================== */

export default async function AgendaDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {

  const { slug } = await params;

  const post = await getAgenda(slug);


  /* ==================================================
      NOT FOUND
  ================================================== */

  if (!post) {

    return (
      <main className="bg-[#F5F7FA] min-h-screen text-[#0D2341]">

        <section className="pt-28 lg:pt-32 pb-24">

          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            <div className="
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
            ">

              <div className="text-5xl mb-5">
                📅
              </div>

              <h1 className="
                font-serif
                text-3xl
                lg:text-4xl
                font-bold
                text-[#0D2341]
              ">
                Agenda tidak ditemukan
              </h1>

              <p className="
                mt-3
                text-[#667085]
              ">
                Agenda yang Anda cari tidak tersedia
                atau sudah dihapus.
              </p>

              <Link
                href="/"
                className="
                  inline-flex
                  items-center
                  gap-2
                  mt-8
                  bg-[#123A63]
                  text-white
                  px-6
                  py-3
                  rounded-2xl
                  font-semibold
                "
              >
                <ArrowLeft size={18} />
                Kembali ke Beranda
              </Link>

            </div>

          </div>

        </section>

        <Footer />

      </main>
    );
  }


  /* ==================================================
      DATA
  ================================================== */

  const title =
    cleanText(
      post.title.rendered
    );

  const image =
    post._embedded
      ?.["wp:featuredmedia"]
      ?. [0]
      ?.source_url ||
    "/event-placeholder.jpg";

  const imageAlt =
    post._embedded
      ?.["wp:featuredmedia"]
      ?. [0]
      ?.alt_text ||
    title;

  const tanggal =
    formatDate(
      post.acf?.tanggal_agenda
    );

  const waktuMulai =
    formatTime(
      post.acf?.waktu_mulai
    );

  const waktuSelesai =
    formatTime(
      post.acf?.waktu_selesai
    );

  const lokasi =
    post.acf?.lokasi ||
    "";

  const penyelenggara =
    post.acf?.penyelenggara ||
    "";

  const status =
    post.acf?.status_agenda ||
    "";

  const linkPendaftaran =
    post.acf?.link_pendaftaran ||
    "";


  /* ==================================================
      MAIN
  ================================================== */

  return (
    <main className="
  min-h-screen
  bg-[#F5F7FA]
  overflow-x-hidden
  text-[#0D2341]
">



      {/* ==================================================
          CONTENT
      ================================================== */}

      <section className="
        pt-28
        lg:pt-32
        pb-24
      ">

        <div className="
          max-w-6xl
          mx-auto
          px-4
          sm:px-6
        ">


          {/* ==============================================
              BACK
          ============================================== */}

          <Link
            href="/"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-[#123A63]
              hover:text-[#A17B35]
              transition
            "
          >
            <ArrowLeft size={18} />
            Kembali ke Beranda
          </Link>


          {/* ==============================================
              HEADER
          ============================================== */}

          <div className="
            max-w-5xl
            mx-auto
            mt-8
            lg:mt-10
          ">

            <div className="
              flex
              flex-wrap
              items-center
              gap-3
            ">

              <span className="
                inline-flex
                items-center
                rounded-full
                bg-[#123A63]
                text-white
                px-4
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-wider
              ">
                Agenda Kegiatan
              </span>


              {status && (

                <span className="
                  inline-flex
                  items-center
                  rounded-full
                  bg-[#A17B35]/10
                  text-[#8B682B]
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                ">
                  {status}
                </span>

              )}

            </div>


            <h1 className="
              font-serif
              text-[42px]
              sm:text-[52px]
              lg:text-[60px]
              leading-[1.08]
              font-bold
              text-[#0D2341]
              mt-5
            ">
              {title}
            </h1>

          </div>


          {/* ==============================================
              FEATURED IMAGE
          ============================================== */}

          <div className="
            max-w-5xl
            mx-auto
            mt-8
            lg:mt-10
            overflow-hidden
            rounded-[28px]
            bg-[#E9EDF3]
            shadow-[0_10px_40px_rgba(0,0,0,0.06)]
          ">

            <img
              src={image}
              alt={imageAlt}
              className="
                w-full
                max-h-[560px]
                object-cover
              "
            />

          </div>


          {/* ==============================================
              AGENDA META
          ============================================== */}

          <div className="
            max-w-5xl
            mx-auto
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4
            mt-6
          ">


            {/* TANGGAL */}

            <div className="
              bg-white
              rounded-2xl
              border
              border-[#E8EDF3]
              p-5
            ">

              <div className="
                w-10
                h-10
                rounded-xl
                bg-[#123A63]/10
                text-[#123A63]
                flex
                items-center
                justify-center
              ">
                <CalendarDays size={20} />
              </div>

              <p className="
                text-xs
                text-[#8A95A7]
                uppercase
                tracking-wider
                mt-4
              ">
                Tanggal
              </p>

              <p className="
                font-semibold
                text-[#0D2341]
                mt-1
                leading-6
              ">
                {tanggal}
              </p>

            </div>


            {/* WAKTU */}

            <div className="
              bg-white
              rounded-2xl
              border
              border-[#E8EDF3]
              p-5
            ">

              <div className="
                w-10
                h-10
                rounded-xl
                bg-[#123A63]/10
                text-[#123A63]
                flex
                items-center
                justify-center
              ">
                <Clock size={20} />
              </div>

              <p className="
                text-xs
                text-[#8A95A7]
                uppercase
                tracking-wider
                mt-4
              ">
                Waktu
              </p>

              <p className="
                font-semibold
                text-[#0D2341]
                mt-1
              ">

                {waktuMulai}

                {waktuSelesai &&
                  ` – ${waktuSelesai}`}

                {" WIB"}

              </p>

            </div>


            {/* LOKASI */}

            <div className="
              bg-white
              rounded-2xl
              border
              border-[#E8EDF3]
              p-5
            ">

              <div className="
                w-10
                h-10
                rounded-xl
                bg-[#123A63]/10
                text-[#123A63]
                flex
                items-center
                justify-center
              ">
                <MapPin size={20} />
              </div>

              <p className="
                text-xs
                text-[#8A95A7]
                uppercase
                tracking-wider
                mt-4
              ">
                Lokasi
              </p>

              <p className="
                font-semibold
                text-[#0D2341]
                mt-1
                leading-6
              ">
                {lokasi || "-"}
              </p>

            </div>


            {/* PENYELENGGARA */}

            <div className="
              bg-white
              rounded-2xl
              border
              border-[#E8EDF3]
              p-5
            ">

              <div className="
                w-10
                h-10
                rounded-xl
                bg-[#123A63]/10
                text-[#123A63]
                flex
                items-center
                justify-center
              ">
                <UserRound size={20} />
              </div>

              <p className="
                text-xs
                text-[#8A95A7]
                uppercase
                tracking-wider
                mt-4
              ">
                Penyelenggara
              </p>

              <p className="
                font-semibold
                text-[#0D2341]
                mt-1
                leading-6
              ">
                {penyelenggara || "-"}
              </p>

            </div>

          </div>


          {/* ==============================================
              ARTICLE CONTENT
          ============================================== */}

          <div
            className="
              max-w-5xl
              mx-auto
              px-6
              sm:px-8
              lg:px-10
              mt-12
              lg:mt-16
            "
          >

            <div
              className="
                bg-white
                rounded-[28px]
                border
                border-[#E8EDF3]
                shadow-[0_10px_40px_rgba(0,0,0,0.05)]
                px-7
                sm:px-10
                lg:px-14
                py-10
                lg:py-14
              "
            >

              <div
                className="
                  prose
                  prose-lg
                  lg:prose-xl
                  max-w-none

                  prose-headings:font-serif
                  prose-headings:text-[#0D2341]

                  prose-p:text-[#46566D]
                  prose-p:leading-[1.95]
                  prose-p:mb-8

                  prose-a:text-[#123A63]
                  prose-a:font-semibold

                  prose-strong:text-[#0D2341]

                  prose-blockquote:border-[#A17B35]
                  prose-blockquote:text-[#516176]

                  prose-img:rounded-3xl
                  prose-img:shadow-lg
                  prose-img:my-10
                "
                dangerouslySetInnerHTML={{
                  __html:
                    post.content.rendered,
                }}
              />


              {/* ==========================================
                  PENDAFTARAN
              ========================================== */}

              {linkPendaftaran && (

                <div className="
                  mt-12
                  pt-8
                  border-t
                  border-[#E8EDF3]
                ">

                  <div className="
                    rounded-2xl
                    bg-[#123A63]
                    p-6
                    sm:p-7
                    text-white
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-5
                  ">

                    <div>

                      <p className="
                        text-xs
                        uppercase
                        tracking-[0.2em]
                        text-white/60
                      ">
                        Pendaftaran
                      </p>

                      <h3 className="
                        text-xl
                        font-bold
                        mt-1
                      ">
                        Daftar Kegiatan
                      </h3>

                      <p className="
                        text-sm
                        text-white/70
                        mt-1
                      ">
                        Silakan lakukan pendaftaran
                        melalui tautan resmi kegiatan.
                      </p>

                    </div>


                    <a
                      href={linkPendaftaran}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        shrink-0
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        bg-white
                        text-[#123A63]
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                        hover:bg-[#F5F7FA]
                        transition
                      "
                    >

                      Daftar Sekarang

                      <ExternalLink size={17} />

                    </a>

                  </div>

                </div>

              )}

            </div>

          </div>

        </div>

      </section>



    </main>
  );
}