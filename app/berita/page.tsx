// ============================================
// app/berita/page.tsx
// INDEX BERITA - MASJID RAYA AL-JABBAR
// ============================================

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Loader2,
} from "lucide-react";


// ==================================================
// TYPE
// ==================================================

interface NewsPost {
  id: number;

  date: string;

  slug: string;

  title: {
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
}


// ==================================================
// WORDPRESS API
// ==================================================

const API_URL =
  "/api/berita";


// ==================================================
// CLEAN HTML
// ==================================================

function cleanText(value: string): string {

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
// FORMAT DATE
// ==================================================

function formatDate(
  date: string
): string {

  if (!date) {
    return "";
  }

  return new Date(
    date
  ).toLocaleDateString(
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
// GET IMAGE
// ==================================================

function getImage(
  post: NewsPost
): string {

  return (
    post._embedded
      ?.["wp:featuredmedia"]
      ?. [0]
      ?.source_url ||
    "/news-placeholder.jpg"
  );

}


// ==================================================
// NEWS INDEX PAGE
// ==================================================

export default function NewsIndexPage() {

  const [posts, setPosts] =
    useState<NewsPost[]>([]);

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
  // LOAD INITIAL NEWS
  // ==================================================

  useEffect(() => {

    async function loadInitialNews() {

      try {

        setLoading(true);

        setError(false);

const response =
  await fetch(
    `${API_URL}?per_page=14&page=1`
  );

        if (!response.ok) {
          throw new Error(
            "Gagal mengambil berita"
          );
        }

        const data =
          await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "Format data berita tidak valid"
          );
        }

        setPosts(data);

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

      } catch (error) {

        console.error(
          "NEWS ERROR:",
          error
        );

        setError(true);

      } finally {

        setLoading(false);

      }

    }


    loadInitialNews();

  }, []);


  // ==================================================
  // LOAD MORE
  // ==================================================

  async function loadMoreNews() {

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
          "Gagal mengambil berita berikutnya"
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

      setPosts(
        previousPosts => [
          ...previousPosts,
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

    } catch (error) {

      console.error(
        "LOAD MORE ERROR:",
        error
      );

    } finally {

      setLoadingMore(false);

    }

  }


  // ==================================================
  // LOADING SCREEN
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
            pt-28
            lg:pt-32
            pb-24
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

            {/* HEADER SKELETON */}

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
                  bg-[#E3E8EF]
                  rounded
                  animate-pulse
                "
              />

              <div
                className="
                  mt-5
                  h-12
                  w-72
                  bg-[#E3E8EF]
                  rounded-xl
                  animate-pulse
                "
              />

              <div
                className="
                  mt-4
                  h-5
                  w-full
                  max-w-2xl
                  bg-[#E3E8EF]
                  rounded
                  animate-pulse
                "
              />

            </div>


            {/* HERO SKELETON */}

            <div
              className="
                max-w-5xl
                mx-auto
                mt-10
                h-[420px]
                lg:h-[520px]
                rounded-[32px]
                bg-[#E3E8EF]
                animate-pulse
              "
            />


            {/* THREE CARDS */}

            <div
              className="
                max-w-5xl
                mx-auto
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
                      h-[380px]
                      rounded-[28px]
                      bg-[#E3E8EF]
                      animate-pulse
                    "
                  />

                )
              )}

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
    posts.length === 0
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
            pt-28
            lg:pt-32
            pb-24
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
                📰
              </div>


              <h1
                className="
                  font-serif
                  text-3xl
                  lg:text-4xl
                  font-bold
                  text-[#0D2341]
                "
              >
                Berita belum tersedia
              </h1>


              <p
                className="
                  mt-3
                  text-[#667085]
                "
              >
                Belum ada berita yang
                diterbitkan melalui
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
  // SPLIT NEWS
  // ==================================================

  const headline =
    posts[0];

  const secondary =
    posts.slice(1, 4);

  const listNews =
    posts.slice(4);


  // ==================================================
  // MAIN PAGE
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

      {/* ==================================================
          NAVBAR
      ================================================== */}

      <Navbar />


      {/* ==================================================
          PAGE CONTENT
      ================================================== */}

      <section
        className="
          pt-28
          lg:pt-32
          pb-24
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


          {/* ==================================================
              PAGE HEADER
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
              Informasi
            </p>


            <h1
              className="
                font-serif
                text-[42px]
                sm:text-[52px]
                lg:text-[60px]
                leading-tight
                font-bold
                text-[#0D2341]
                mt-4
              "
            >
              Berita Masjid
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
              Informasi terbaru seputar
              kegiatan, pelayanan, dakwah,
              dan aktivitas Masjid Raya
              Al-Jabbar.
            </p>

          </div>


          {/* ==================================================
              HEADLINE
          ================================================== */}

          <Link
            href={`/berita/${headline.slug}`}
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
                min-h-[420px]
                lg:min-h-[520px]
                bg-[#0D2341]
                shadow-[0_15px_50px_rgba(13,35,65,0.12)]
              "
            >

              <img
                src={getImage(headline)}
                alt={
                  headline._embedded
                    ?.["wp:featuredmedia"]
                    ?. [0]
                    ?.alt_text ||
                  cleanText(
                    headline.title.rendered
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


              {/* OVERLAY */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/85
                  via-black/35
                  to-black/5
                "
              />


              {/* CONTENT */}

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
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

                  <span>
                    Berita Utama
                  </span>

                  <span>
                    •
                  </span>

                  <span>
                    {formatDate(
                      headline.date
                    )}
                  </span>

                </div>


                <h2
                  className="
                    font-serif
                    text-[32px]
                    sm:text-[42px]
                    lg:text-[52px]
                    leading-[1.05]
                    font-bold
                    mt-4
                    max-w-4xl
                  "
                >
                  {cleanText(
                    headline.title.rendered
                  )}
                </h2>


                <p
                  className="
                    mt-5
                    text-white/80
                    text-base
                    lg:text-lg
                    leading-relaxed
                    max-w-3xl
                    line-clamp-2
                  "
                >
                  {cleanText(
                    headline.excerpt.rendered
                  )}
                </p>


                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    mt-6
                    font-semibold
                  "
                >

                  Baca Berita

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
              3 BERITA KECIL
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
                post => (

                  <Link
                    key={post.id}
                    href={`/berita/${post.slug}`}
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

                      {/* FOTO */}

                      <div
                        className="
                          relative
                          h-[220px]
                          overflow-hidden
                          bg-[#E9EDF3]
                        "
                      >

                        <img
                          src={getImage(post)}
                          alt={
                            post._embedded
                              ?.["wp:featuredmedia"]
                              ?. [0]
                              ?.alt_text ||
                            cleanText(
                              post.title.rendered
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

                      </div>


                      {/* TEXT */}

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

                          {formatDate(
                            post.date
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
                            post.title.rendered
                          )}
                        </h3>


                        <p
                          className="
                            mt-4
                            text-sm
                            text-[#68758A]
                            leading-6
                            line-clamp-3
                          "
                        >
                          {cleanText(
                            post.excerpt.rendered
                          )}
                        </p>


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

                          Baca selengkapnya

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

                )
              )}

            </div>

          )}


          {/* ==================================================
              DAFTAR 10 BERITA
          ================================================== */}

          {listNews.length > 0 && (

            <section
              className="
                max-w-5xl
                mx-auto
                mt-20
              "
            >

              {/* HEADER */}

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
                  Berita Terbaru
                </p>


                <h2
                  className="
                    font-serif
                    text-[36px]
                    lg:text-[44px]
                    leading-tight
                    font-bold
                    mt-3
                    text-[#0D2341]
                  "
                >
                  Berita Lainnya
                </h2>

              </div>


              {/* NEWS LIST */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                "
              >

                {listNews.map(
                  post => (

                    <Link
                      key={post.id}
                      href={`/berita/${post.slug}`}
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

                        {/* FOTO */}

                        <div
                          className="
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
                            src={getImage(post)}
                            alt={
                              post._embedded
                                ?.["wp:featuredmedia"]
                                ?. [0]
                                ?.alt_text ||
                              cleanText(
                                post.title.rendered
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

                        </div>


                        {/* CONTENT */}

                        <div
                          className="
                            min-w-0
                            flex-1
                            py-1
                          "
                        >

                          {/* DATE */}

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

                            <span>
                              {formatDate(
                                post.date
                              )}
                            </span>

                          </div>


                          {/* TITLE */}

                          <h3
                            className="
                              font-serif
                              text-[22px]
                              sm:text-[27px]
                              leading-tight
                              font-bold
                              text-[#0D2341]
                              mt-2
                              line-clamp-2
                              group-hover:text-[#A17B35]
                              transition-colors
                            "
                          >

                            {cleanText(
                              post.title.rendered
                            )}

                          </h3>


                          {/* EXCERPT */}

                          <p
                            className="
                              text-sm
                              sm:text-base
                              text-[#68758A]
                              mt-3
                              leading-relaxed
                              line-clamp-2
                            "
                          >

                            {cleanText(
                              post.excerpt.rendered
                            )}

                          </p>


                          {/* READ MORE */}

                          <div
                            className="
                              hidden
                              sm:inline-flex
                              items-center
                              gap-2
                              mt-3
                              text-sm
                              font-semibold
                              text-[#123A63]
                            "
                          >

                            Baca berita

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

                  )
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
                    onClick={loadMoreNews}
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

                        Memuat berita...

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


              {/* END */}

              {!hasMore && (

                <div
                  className="
                    text-center
                    mt-10
                    text-sm
                    text-[#8A95A7]
                  "
                >
                  Semua berita sudah
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