// ============================================
// components/NewsCard.tsx
// PREMIUM NEWS CARD - MASJID RAYA AL-JABBAR
// ============================================

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface NewsPost {
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

  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export default function NewsCard() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH BERITA WORDPRESS
  // ==========================================

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(
          "https://pas.akarmusic.com/wp-json/wp/v2/posts?_embed&per_page=4"
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data: NewsPost[] = await response.json();

        setPosts(data);
      } catch (err) {
        console.error("Gagal mengambil berita:", err);

        setError("Berita belum tersedia.");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  // ==========================================
  // FORMAT TANGGAL
  // ==========================================

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // ==========================================
  // CLEAN HTML
  // ==========================================

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

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="mt-14 space-y-6">

        {/* HEADLINE SKELETON */}
        <div className="overflow-hidden rounded-3xl bg-white border border-[#E8ECF2] animate-pulse">

          <div className="h-[420px] lg:h-[500px] bg-[#E9EDF3]" />

          <div className="p-8">

            <div className="h-3 w-32 bg-[#E9EDF3] rounded mb-5" />

            <div className="h-10 w-4/5 bg-[#E9EDF3] rounded mb-3" />

            <div className="h-10 w-3/5 bg-[#E9EDF3] rounded mb-6" />

            <div className="h-4 w-full bg-[#E9EDF3] rounded mb-2" />

            <div className="h-4 w-3/4 bg-[#E9EDF3] rounded" />

          </div>

        </div>


        {/* THREE CARD SKELETON */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="
                overflow-hidden
                rounded-2xl
                bg-white
                border
                border-[#E8ECF2]
                animate-pulse
              "
            >

              <div className="h-52 bg-[#E9EDF3]" />

              <div className="p-6">

                <div className="h-3 w-28 bg-[#E9EDF3] rounded mb-4" />

                <div className="h-6 w-full bg-[#E9EDF3] rounded mb-2" />

                <div className="h-6 w-4/5 bg-[#E9EDF3] rounded mb-5" />

                <div className="h-4 w-full bg-[#E9EDF3] rounded mb-2" />

                <div className="h-4 w-3/4 bg-[#E9EDF3] rounded" />

              </div>

            </div>
          ))}

        </div>

      </div>
    );
  }

  // ==========================================
  // ERROR / EMPTY
  // ==========================================

  if (error || posts.length === 0) {
    return (
      <div className="mt-14 rounded-2xl border border-[#E8ECF2] bg-white p-10 text-center">

        <div className="text-4xl mb-4">
          📰
        </div>

        <h3 className="font-serif text-2xl font-bold text-[#0D2341]">
          Berita belum tersedia
        </h3>

        <p className="text-[#7A8599] mt-2">
          Terbitkan berita dari WordPress CMS dan berita akan tampil otomatis
          di sini.
        </p>

      </div>
    );
  }

  // ==========================================
  // HEADLINE
  // ==========================================

  const headline = posts[0];

  const headlineImage =
    headline._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/news-placeholder.jpg";

  const headlineAlt =
    headline._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
    cleanText(headline.title.rendered);

  const headlineTitle =
    cleanText(headline.title.rendered);

  const headlineDescription =
    cleanText(headline.excerpt.rendered);

  // ==========================================
  // 3 BERITA KECIL
  // ==========================================

  const smallPosts = posts.slice(1, 4);

  // ==========================================
  // URL DETAIL BERITA
  // ==========================================

  function getNewsUrl(slug: string) {
    return `/berita/${slug}`;
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="mt-14">

      {/* ==================================================
          HEADLINE
      ================================================== */}

      <article
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          bg-[#0D2341]
          shadow-lg
        "
      >

        <Link
          href={getNewsUrl(headline.slug)}
          className="block"
        >

          <div className="relative h-[420px] lg:h-[500px] overflow-hidden">

            {/* IMAGE */}

            <img
              src={headlineImage}
              alt={headlineAlt}
              className="
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
                from-[#07182D]
                via-[#07182D]/60
                to-transparent
              "
            />


            {/* CONTENT */}

            <div
              className="
                absolute
                inset-x-0
                bottom-0
                p-6
                sm:p-8
                lg:p-12
              "
            >

              {/* LABEL + DATE */}

              <div className="flex flex-wrap items-center gap-3 mb-4">

                <span
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    bg-[#A17B35]
                    px-4
                    py-1.5
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-white
                  "
                >
                  Berita Utama
                </span>

                <span className="text-white/80 text-sm">
                  {formatDate(headline.date)}
                </span>

              </div>


              {/* TITLE */}

              <h3
                className="
                  max-w-5xl
                  font-serif
                  text-[32px]
                  sm:text-[40px]
                  lg:text-[52px]
                  leading-[1.08]
                  font-bold
                  text-white
                  group-hover:text-[#E8D4A5]
                  transition-colors
                "
              >
                {headlineTitle}
              </h3>


              {/* DESCRIPTION */}

              <p
                className="
                  max-w-3xl
                  text-white/80
                  text-sm
                  sm:text-base
                  leading-7
                  mt-5
                  line-clamp-2
                "
              >
                {headlineDescription}
              </p>


              {/* READ MORE */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  mt-6
                  text-sm
                  font-semibold
                  text-white
                  group-hover:text-[#E8D4A5]
                  transition-colors
                "
              >

                Baca selengkapnya

                <span
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>

              </div>

            </div>

          </div>

        </Link>

      </article>


      {/* ==================================================
          3 BERITA TERBARU
      ================================================== */}

      <div
        className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
          mt-6
        "
      >

        {smallPosts.map((post) => {

          const image =
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "/news-placeholder.jpg";

          const alt =
            post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
            cleanText(post.title.rendered);

          const title =
            cleanText(post.title.rendered);

          const description =
            cleanText(post.excerpt.rendered);

          return (
            <article
              key={post.id}
              className="
                group
                overflow-hidden
                rounded-2xl
                bg-white
                border
                border-[#E8ECF2]
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >

              {/* IMAGE */}

              <Link
                href={getNewsUrl(post.slug)}
                className="block overflow-hidden"
              >

                <div
                  className="
                    relative
                    h-52
                    overflow-hidden
                    bg-[#EEF1F5]
                  "
                >

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

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/30
                      via-transparent
                      to-transparent
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-300
                    "
                  />

                </div>

              </Link>


              {/* CONTENT */}

              <div className="p-6">

                {/* DATE */}

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.18em]
                    text-[#8A95A7]
                    font-medium
                  "
                >
                  {formatDate(post.date)}
                </p>


                {/* TITLE */}

                <Link href={getNewsUrl(post.slug)}>

                  <h3
                    className="
                      font-serif
                      text-[24px]
                      leading-tight
                      font-bold
                      text-[#0D2341]
                      mt-3
                      line-clamp-2
                      group-hover:text-[#A17B35]
                      transition-colors
                    "
                  >
                    {title}
                  </h3>

                </Link>


                {/* DESCRIPTION */}

                <p
                  className="
                    text-[#68758A]
                    text-sm
                    leading-6
                    mt-4
                    line-clamp-3
                  "
                >
                  {description}
                </p>


                {/* READ MORE */}

                <Link
                  href={getNewsUrl(post.slug)}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    mt-6
                    text-sm
                    font-semibold
                    text-[#0D2341]
                    hover:text-[#A17B35]
                    transition-colors
                  "
                >

                  Baca selengkapnya

                  <span
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </span>

                </Link>

              </div>

            </article>
          );
        })}

      </div>

    </div>
  );
}