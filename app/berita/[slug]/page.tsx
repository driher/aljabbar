// ============================================
// app/berita/[slug]/page.tsx
//
// DETAIL BERITA - MASJID RAYA AL-JABBAR
//
// FEATURES:
// - SEO Metadata
// - Open Graph
// - WhatsApp / Facebook / X Thumbnail
// - Feature Image
// - Feature Image Caption
// - Share Buttons
// - WordPress Article
// - Premium Responsive UI
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ShareButtons from "@/components/ShareButtons";

import {
  ArrowLeft,
  CalendarDays,
} from "lucide-react";

// ============================================
// CONFIG
// ============================================

const WORDPRESS_API =
  "https://pas.akarmusic.com/wp-json/wp/v2/posts";

// ============================================
// GANTI DENGAN DOMAIN PRODUCTION
// ============================================

const SITE_URL =
  "https://aljabbar-eosin.vercel.app";

// ============================================
// SITE NAME
// ============================================

const SITE_NAME =
  "Masjid Raya Al-Jabbar";

// ============================================
// TYPE
// ============================================

interface NewsPost {
  id: number;

  date: string;

  modified?: string;

  slug: string;

  title: {
    rendered: string;
  };

  content: {
    rendered: string;
  };

  excerpt?: {
    rendered: string;
  };

  featured_media: number;

  _embedded?: {
    "wp:featuredmedia"?: Array<{
      id?: number;

      source_url: string;

      alt_text?: string;

      caption?: {
        rendered: string;
      };

      media_details?: {
        width?: number;
        height?: number;
      };
    }>;

    author?: Array<{
      name: string;
    }>;
  };
}

// ============================================
// CLEAN HTML → TEXT
// ============================================

function cleanText(
  value: string
): string {
  if (!value) {
    return "";
  }

  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&#8230;/g, "...")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/\s+/g, " ")
    .trim();
}

// ============================================
// FORMAT DATE
// ============================================

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

// ============================================
// GET FEATURE IMAGE
// ============================================

function getImage(
  post: NewsPost
): string {
  return (
    post._embedded
      ?.["wp:featuredmedia"]
      ?. [0]
      ?.source_url ||
    `${SITE_URL}/news-placeholder.jpg`
  );
}

// ============================================
// GET FEATURE IMAGE CAPTION
// ============================================
//
// HANYA dari:
//
// WordPress
// → Media
// → Feature Image
// → Caption
//
// Tidak mengambil caption dari artikel.
//

function getCaption(
  post: NewsPost
): string {
  const caption =
    post._embedded
      ?.["wp:featuredmedia"]
      ?. [0]
      ?.caption
      ?.rendered || "";

  return cleanText(
    caption
  );
}

// ============================================
// GET IMAGE ALT
// ============================================

function getAlt(
  post: NewsPost
): string {
  return (
    post._embedded
      ?.["wp:featuredmedia"]
      ?. [0]
      ?.alt_text ||
    cleanText(
      post.title.rendered
    ) ||
    "Foto berita"
  );
}

// ============================================
// GET AUTHOR
// ============================================

function getAuthor(
  post: NewsPost
): string {
  return (
    post._embedded
      ?.author
      ?. [0]
      ?.name || ""
  );
}

// ============================================
// CLEAN ARTICLE CONTENT
// ============================================
//
// WordPress dapat mengirim:
//
// <figure>
//   <img>
//   <figcaption>Caption...</figcaption>
// </figure>
//
// Caption tersebut tidak kita tampilkan.
//
// Feature Image caption ditampilkan terpisah
// tepat di bawah foto utama.
//

function cleanArticleContent(
  html: string
): string {
  if (!html) {
    return "";
  }

  return html
    .replace(
      /<figcaption\b[^>]*>[\s\S]*?<\/figcaption>/gi,
      ""
    )
    .replace(
      /<figure\b[^>]*>\s*<\/figure>/gi,
      ""
    )
    .trim();
}

// ============================================
// FETCH NEWS
// ============================================

async function getNews(
  slug: string
): Promise<NewsPost | null> {
  try {
    const url =
      `${WORDPRESS_API}?slug=${encodeURIComponent(
        slug
      )}&_embed`;

    const response =
      await fetch(
        url,
        {
          headers: {
            Accept:
              "application/json",
          },

          cache:
            "no-store",
        }
      );

    if (!response.ok) {
      return null;
    }

    const data =
      await response.json();

    if (
      !Array.isArray(data) ||
      data.length === 0
    ) {
      return null;
    }

    return data[0] as NewsPost;

  } catch (error) {

    console.error(
      "DETAIL NEWS ERROR:",
      error
    );

    return null;
  }
}

// ============================================
// SEO + OPEN GRAPH METADATA
// ============================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata> {

  const {
    slug,
  } = await params;

  const post =
    await getNews(slug);

  // ==========================================
  // NOT FOUND
  // ==========================================

  if (!post) {
    return {
      title:
        `Berita Tidak Ditemukan | ${SITE_NAME}`,

      description:
        `Berita ${SITE_NAME} tidak ditemukan.`,
    };
  }

  // ==========================================
  // DATA
  // ==========================================

  const title =
    cleanText(
      post.title.rendered
    );

  const description =
    cleanText(
      post.excerpt
        ?.rendered || ""
    ).slice(0, 160);

  const image =
    getImage(post);

  const pageUrl =
    `${SITE_URL}/berita/${post.slug}`;

  // ==========================================
  // METADATA
  // ==========================================

  return {

    title:
      `${title} | ${SITE_NAME}`,

    description,

    keywords: [
      "Masjid Raya Al-Jabbar",
      "Masjid Al-Jabbar",
      "Bandung",
      "berita masjid",
      "berita Islam",
      title,
    ],

    authors: [
      {
        name:
          getAuthor(post) ||
          SITE_NAME,
      },
    ],

    alternates: {
      canonical:
        pageUrl,
    },

    openGraph: {

      type:
        "article",

      locale:
        "id_ID",

      url:
        pageUrl,

      title,

      description,

      siteName:
        SITE_NAME,

      publishedTime:
        post.date,

      modifiedTime:
        post.modified ||
        post.date,

      authors:
        getAuthor(post)
          ? [
              getAuthor(post),
            ]
          : undefined,

      images: [
        {
          url:
            image,

          width:
            1200,

          height:
            630,

          alt:
            title,
        },
      ],
    },

    twitter: {

      card:
        "summary_large_image",

      title,

      description,

      images: [
        image,
      ],
    },

    robots: {
      index:
        true,

      follow:
        true,
    },
  };
}

// ============================================
// PAGE
// ============================================

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {

  const {
    slug,
  } = await params;

  // ==========================================
  // GET NEWS
  // ==========================================

  const post =
    await getNews(slug);

  // ==========================================
  // NOT FOUND
  // ==========================================

  if (!post) {
    notFound();
  }

  // ==========================================
  // DATA
  // ==========================================

  const image =
    getImage(post);

  const caption =
    getCaption(post);

  const alt =
    getAlt(post);

  const author =
    getAuthor(post);

  const articleContent =
    cleanArticleContent(
      post.content.rendered
    );

  // ==========================================
  // PAGE URL
  // ==========================================

  const pageUrl =
    `${SITE_URL}/berita/${post.slug}`;

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <main
      className="
        min-h-screen
        bg-[#F5F7FA]
        overflow-x-hidden
        text-[#0D2341]
      "
    >

      {/* ======================================
          ARTICLE
      ======================================= */}

      <article
        className="
          pt-28
          lg:pt-32
          pb-24
        "
      >

        <div
          className="
            max-w-5xl
            mx-auto
            px-4
            sm:px-6
          "
        >

          {/* ==================================
              BACK BUTTON
          =================================== */}

          <div
            className="
              mb-8
            "
          >

            <Link
              href="/berita"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-[#123A63]
                hover:text-[#A17B35]
                transition-colors
              "
            >

              <ArrowLeft
                size={17}
              />

              Kembali ke Berita

            </Link>

          </div>

          {/* ==================================
              HEADER
          =================================== */}

          <header
            className="
              max-w-4xl
              mx-auto
            "
          >

            {/* META */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
                text-xs
                uppercase
                tracking-[0.18em]
                text-[#7A8599]
              "
            >

              <span>
                Berita Masjid
              </span>

              <span>
                •
              </span>

              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                "
              >

                <CalendarDays
                  size={14}
                />

                {formatDate(
                  post.date
                )}

              </span>

            </div>

            {/* TITLE */}

            <h1
              className="
                font-serif
                text-[36px]
                sm:text-[46px]
                lg:text-[58px]
                leading-[1.08]
                font-bold
                text-[#0D2341]
                mt-5
              "
            >

              {cleanText(
                post.title.rendered
              )}

            </h1>

            {/* AUTHOR */}

            {author && (
              <p
                className="
                  mt-5
                  text-sm
                  text-[#7A8599]
                "
              >

                Oleh{" "}

                <span
                  className="
                    font-semibold
                    text-[#123A63]
                  "
                >
                  {author}
                </span>

              </p>
            )}

            {/* =================================
                SHARE BUTTONS
            ================================== */}

            <ShareButtons
              title={cleanText(
                post.title.rendered
              )}
            />

          </header>


          {/* ==================================
              FEATURE IMAGE
          =================================== */}

          <figure
            className="
              max-w-5xl
              mx-auto
              mt-10
            "
          >

            {/* IMAGE */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[28px]
                lg:rounded-[32px]
                bg-[#E9EDF3]
                shadow-[0_15px_50px_rgba(13,35,65,0.12)]
              "
            >

              <img
                src={image}
                alt={alt}
                className="
                  block
                  w-full
                  h-auto
                  max-h-[650px]
                  object-cover
                "
              />

            </div>

            {/* =================================
                FEATURE IMAGE CAPTION
            ================================== */}

            {caption && (
              <figcaption
                className="
                  mt-3
                  px-4
                  text-center
                  text-xs
                  sm:text-sm
                  leading-relaxed
                  text-[#7A8599]
                  italic
                "
              >

                {caption}

              </figcaption>
            )}

          </figure>

{/* ==================================
    IKLAN PILAR TRIGGER
=================================== */}

<div
  id="floating-info"
  className="h-px w-full"
  aria-hidden="true"
/>

          {/* ==================================
              ARTICLE CONTENT
          =================================== */}

          <div
            className="
              max-w-5xl
              mx-auto
              mt-12
            "
          >

            <div
              className="
                bg-white
                rounded-[28px]
                border
                border-[#E8EDF3]
                shadow-[0_10px_40px_rgba(13,35,65,0.05)]
                px-6
                py-8
                sm:px-10
                sm:py-10
                lg:px-14
                lg:py-14
              "
            >

              <div
                className="
                  news-content
                  text-[#344054]
                  text-[17px]
                  sm:text-[18px]
                  leading-[1.9]
                "
                dangerouslySetInnerHTML={{
                  __html:
                    articleContent,
                }}
              />

            </div>

          </div>

          {/* ==================================
              BOTTOM BACK BUTTON
          =================================== */}

          <div
            className="
              max-w-4xl
              mx-auto
              mt-10
            "
          >

            <Link
              href="/berita"
              className="
                inline-flex
                items-center
                gap-2
                bg-[#123A63]
                hover:bg-[#0F3153]
                text-white
                px-6
                py-3
                rounded-2xl
                font-semibold
                transition
                shadow-lg
              "
            >

              <ArrowLeft
                size={18}
              />

              Kembali ke Daftar Berita

            </Link>

          </div>

        </div>

      </article>


      {/* ======================================
          ARTICLE STYLE
      ======================================= */}

      <style
        dangerouslySetInnerHTML={{
          __html: `

            .news-content p {
              margin-bottom: 1.35rem;
            }

            .news-content h2 {
              font-family: Georgia, serif;
              font-size: 1.8rem;
              line-height: 1.25;
              font-weight: 700;
              color: #0D2341;
              margin-top: 2.5rem;
              margin-bottom: 1rem;
            }

            .news-content h3 {
              font-family: Georgia, serif;
              font-size: 1.45rem;
              line-height: 1.3;
              font-weight: 700;
              color: #0D2341;
              margin-top: 2rem;
              margin-bottom: 0.8rem;
            }

            .news-content strong {
              font-weight: 700;
              color: #0D2341;
            }

            .news-content a {
              color: #123A63;
              font-weight: 600;
              text-decoration: underline;
            }

            .news-content ul {
              list-style: disc;
              padding-left: 1.5rem;
              margin-bottom: 1.5rem;
            }

            .news-content ol {
              list-style: decimal;
              padding-left: 1.5rem;
              margin-bottom: 1.5rem;
            }

            .news-content li {
              margin-bottom: 0.5rem;
            }

            .news-content blockquote {
              margin: 2rem 0;
              padding: 1.2rem 1.5rem;
              border-left: 4px solid #A17B35;
              background: #F5F7FA;
              border-radius: 0 16px 16px 0;
              color: #475467;
              font-style: italic;
            }

            .news-content img {
              display: block;
              width: 100%;
              max-width: 100%;
              height: auto;
              margin: 2rem auto;
              border-radius: 20px;
            }

            .news-content figure {
              margin: 2rem 0;
            }

            /*
             * CAPTION DARI GAMBAR
             * DI DALAM ISI ARTIKEL
             *
             * Dihilangkan agar hanya caption
             * Feature Image yang tampil.
             */

            .news-content figcaption {
              display: none !important;
            }

            .news-content iframe {
              width: 100%;
              aspect-ratio: 16 / 9;
              border: 0;
              border-radius: 20px;
              margin: 2rem 0;
            }

            .news-content table {
              display: block;
              width: 100%;
              overflow-x: auto;
              border-collapse: collapse;
              margin: 2rem 0;
            }

            .news-content th,
            .news-content td {
              border: 1px solid #E8EDF3;
              padding: 0.75rem;
              text-align: left;
            }

            .news-content th {
              background: #F5F7FA;
              font-weight: 700;
              color: #0D2341;
            }

            @media (max-width: 640px) {

              .news-content {
                font-size: 16px;
                line-height: 1.8;
              }

              .news-content h2 {
                font-size: 1.5rem;
              }

              .news-content h3 {
                font-size: 1.25rem;
              }

              .news-content blockquote {
                padding: 1rem;
              }

              .news-content img {
                border-radius: 16px;
              }

            }

          `,
        }}
      />

    </main>
  );
}