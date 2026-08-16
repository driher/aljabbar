// ============================================
// app/berita/[slug]/page.tsx
// DETAIL BERITA - MASJID RAYA AL-JABBAR
// PREMIUM UI
// CAPTION FOTO WORDPRESS
// ============================================

import Link from "next/link";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/ShareButtons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  ArrowLeft,
  CalendarDays,
} from "lucide-react";

// ============================================
// TYPE
// ============================================

interface NewsPost {
  id: number;

  date: string;

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

  photo_caption?: string;

  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;

      alt_text: string;

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
// INTERNAL API
// ============================================

const API_URL =
  "https://pas.akarmusic.com/wp-json/wp/v2/posts";

// ============================================
// CLEAN HTML
// ============================================

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

// ============================================
// FORMAT DATE
// ============================================

function formatDate(date: string): string {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleDateString(
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
// GET IMAGE
// ============================================

function getImage(post: NewsPost): string {
  return (
    post._embedded
      ?.["wp:featuredmedia"]
      ?. [0]
      ?.source_url ||
    "/news-placeholder.jpg"
  );
}

// ============================================
// GET CAPTION
// ============================================

function getCaption(post: NewsPost): string {
  // PRIORITAS 1
  // Caption hasil normalisasi route.ts

  if (post.photo_caption) {
    return cleanText(
      post.photo_caption
    );
  }

  // PRIORITAS 2
  // Caption dari featured media

  const embeddedCaption =
    post._embedded
      ?.["wp:featuredmedia"]
      ?. [0]
      ?.caption?.rendered;

  if (embeddedCaption) {
    return cleanText(
      embeddedCaption
    );
  }

  return "";
}

// ============================================
// GET ALT
// ============================================

function getAlt(post: NewsPost): string {
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

function getAuthor(post: NewsPost): string {
  return (
    post._embedded
      ?.author
      ?. [0]
      ?.name || ""
  );
}

// ============================================
// FETCH NEWS
// ============================================

async function getNews(
  slug: string
): Promise<NewsPost | null> {
  try {
    const url =
      `${API_URL}?slug=${encodeURIComponent(
        slug
      )}&_embed`;

    const response =
      await fetch(url, {
        headers: {
          Accept: "application/json",
        },

        cache: "no-store",
      });

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

    const post =
      data[0] as NewsPost;

    // ========================================
    // FALLBACK:
    // JIKA API POST LANGSUNG BELUM MEMILIKI
    // photo_caption, AMBIL MEDIA SECARA LANGSUNG
    // ========================================

    if (
      !post.photo_caption &&
      post.featured_media
    ) {
      try {
        const mediaResponse =
          await fetch(
            `https://pas.akarmusic.com/wp-json/wp/v2/media/${post.featured_media}`,
            {
              headers: {
                Accept:
                  "application/json",
              },
              cache: "no-store",
            }
          );

        if (mediaResponse.ok) {
          const media =
            await mediaResponse.json();

          if (
            media?.caption?.rendered
          ) {
            post.photo_caption =
              media.caption.rendered;
          }

          // Update image jika diperlukan
          if (
            media?.source_url &&
            !post._embedded
              ?.["wp:featuredmedia"]
              ?. [0]
          ) {
            post._embedded = {
              ...post._embedded,

              "wp:featuredmedia": [
                {
                  source_url:
                    media.source_url,

                  alt_text:
                    media.alt_text ||
                    "",

                  caption: {
                    rendered:
                      media.caption
                        ?.rendered || "",
                  },
                },
              ],
            };
          }
        }
      } catch (error) {
        console.error(
          "MEDIA CAPTION ERROR:",
          error
        );
      }
    }

    return post;

  } catch (error) {
    console.error(
      "DETAIL NEWS ERROR:",
      error
    );

    return null;
  }
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
  const { slug } =
    await params;

  const post =
    await getNews(slug);

  // ==========================================
  // NOT FOUND
  // ==========================================

  if (!post) {
    notFound();
  }

  const image =
    getImage(post);

  const caption =
    getCaption(post);

  const alt =
    getAlt(post);

  const author =
    getAuthor(post);

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
          NAVBAR
      ======================================= */}

      <Navbar />

      {/* ======================================
          CONTENT
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

          <div className="mb-8">

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

            {author && (
              <p
                className="
                  mt-5
                  text-sm
                  text-[#7A8599]
                "
              >
                Penulis: {" "}
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


<ShareButtons
  title={cleanText(
    post.title.rendered
  )}
/>
          </header>

          {/* ==================================
              FEATURED IMAGE
          =================================== */}

          <figure
            className="
              max-w-5xl
              mx-auto
              mt-10
            "
          >

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
                CAPTION FOTO
            ================================== */}

            {caption && (
              <figcaption
                className="
                  mt-3
                  px-2
                  text-xs
                  sm:text-sm
                  leading-relaxed
                  text-[#667085]
                  italic
                "
              >
                {caption}
              </figcaption>
            )}

          </figure>

          {/* ==================================
              ARTICLE CONTENT
          =================================== */}

          <div
            className="
              max-w-4xl
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
                    post.content.rendered,
                }}
              />

            </div>

          </div>

          {/* ==================================
              BACK BUTTON
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
          FOOTER
      ======================================= */}

      <Footer />

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

            .news-content figcaption {
              color: #7A8599;
              font-size: 0.8rem;
              line-height: 1.5;
              font-style: italic;
              margin-top: -1.5rem;
              margin-bottom: 2rem;
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