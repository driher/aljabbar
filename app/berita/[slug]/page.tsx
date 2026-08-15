// ============================================
// app/berita/[slug]/page.tsx
// DETAIL BERITA - MASJID RAYA AL-JABBAR
// ============================================

import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface NewsPost {
  id: number;
  date: string;
  slug: string;
  link: string;

  title: {
    rendered: string;
  };

  content: {
    rendered: string;
  };

  excerpt: {
    rendered: string;
  };

  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
      caption?: {
        rendered: string;
      };
    }>;
  };
}


// ============================================
// WORDPRESS API
// ============================================

const API_URL =
  "https://pas.akarmusic.com/wp-json/wp/v2/posts";


// ============================================
// FETCH BERITA
// ============================================

async function getPost(slug: string): Promise<NewsPost | null> {
  try {
    const response = await fetch(
      `${API_URL}?slug=${encodeURIComponent(slug)}&_embed`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const posts: NewsPost[] = await response.json();

    if (!posts || posts.length === 0) {
      return null;
    }

    return posts[0];

  } catch (error) {

    console.error(
      "Gagal mengambil detail berita:",
      error
    );

    return null;
  }
}


// ============================================
// FORMAT TANGGAL
// ============================================

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
}


// ============================================
// CLEAN HTML
// ============================================

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


// ============================================
// METADATA
// ============================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Berita | Masjid Raya Al-Jabbar",
    };
  }

  return {
    title: `${cleanText(post.title.rendered)} | Masjid Raya Al-Jabbar`,

    description:
      cleanText(post.excerpt.rendered).slice(0, 160),

    openGraph: {
      title: cleanText(post.title.rendered),

      description:
        cleanText(post.excerpt.rendered).slice(0, 160),

      images:
        post._embedded?.["wp:featuredmedia"]?.[0]
          ?.source_url
          ? [
              {
                url:
                  post._embedded[
                    "wp:featuredmedia"
                  ][0].source_url,
              },
            ]
          : [],
    },
  };
}


// ============================================
// PAGE
// ============================================

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }


  // ==========================================
  // FEATURED IMAGE
  // ==========================================

  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]
      ?.source_url ||
    "/news-placeholder.jpg";


  const imageAlt =
    post._embedded?.["wp:featuredmedia"]?.[0]
      ?.alt_text ||
    cleanText(post.title.rendered);


  const imageCaption =
    post._embedded?.["wp:featuredmedia"]?.[0]
      ?.caption?.rendered || "";


  // ==========================================
  // TITLE
  // ==========================================

  const title =
    cleanText(post.title.rendered);


  return (
  <main
    className="
      bg-[#F5F7FA]
      overflow-x-hidden
      text-[#0D2341]
      origin-top-left
      scale-[0.8]
      w-[125%]
    "
  >
    {/* NAVBAR SAMA DENGAN HOMEPAGE */}
    <Navbar />


      {/* ========================================
          ARTICLE
      ======================================== */}

      <article className="pt-20 pb-24">


        {/* ======================================
            HEADER ARTICLE
        ====================================== */}


          <div
    className="
      max-w-5xl
      mx-auto
      px-4
      sm:px-6
      pt-8
      lg:pt-12
    "
  >

          {/* CATEGORY */}

          <div className="flex items-center gap-3">

            <span
              className="
                inline-flex
                items-center
                rounded-full
                bg-[#123A63]
                px-4
                py-2
                text-[11px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-white
              "
            >
              Berita
            </span>


            <span className="text-sm text-[#8A95A7]">
              Informasi Masjid
            </span>

          </div>


          {/* TITLE */}

          <h1
            className="
              font-serif
              text-[42px]
              sm:text-[52px]
              lg:text-[68px]
              leading-[1.05]
              font-bold
              text-[#0D2341]
              mt-7
              max-w-5xl
            "
          >
            {title}
          </h1>


          {/* DATE */}

          <div
            className="
              flex
              items-center
              gap-2
              mt-7
              text-[#7A8599]
              text-sm
            "
          >

            <CalendarDays size={17} />

            <span>
              {formatDate(post.date)}
            </span>

          </div>

        </div>


        {/* ======================================
            FEATURED IMAGE
        ====================================== */}

        <div
          className="
            max-w-6xl
            mx-auto
            px-4
            sm:px-6
            mt-12
            lg:mt-16
          "
        >

          <div
            className="
              relative
              overflow-hidden
              rounded-[28px]
              lg:rounded-[36px]
              bg-[#E9EDF3]
              shadow-[0_20px_60px_rgba(0,0,0,0.10)]
            "
          >

            <img
              src={featuredImage}
              alt={imageAlt}
              className="
                w-full
                h-auto
                max-h-[650px]
                object-cover
              "
            />

          </div>


          {/* IMAGE CAPTION */}

          {imageCaption && (

            <div
              className="
                mt-3
                text-xs
                text-[#8A95A7]
                text-center
              "
              dangerouslySetInnerHTML={{
                __html: imageCaption,
              }}
            />

          )}

        </div>


{/* ======================================
    CONTENT
====================================== */}

<div
  className="
    max-w-5xl
    mx-auto
    px-6
    sm:px-8
    lg:px-10
    mt-14
    lg:mt-20
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
        prose-p:leading-[1.9]

        [&>p]:mb-8
        [&>p]:leading-[1.9]

        [&>p+p]:mt-8

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
        __html: post.content.rendered,
      }}
    />

  </div>
</div>



        {/* ======================================
            BACK TO NEWS
        ====================================== */}

        <div
          className="
            max-w-3xl
            mx-auto
            px-4
            sm:px-6
            mt-16
          "
        >

          <div
            className="
              border-t
              border-[#DDE3EA]
              pt-8
            "
          >

            <Link
              href="/"
              className="
                inline-flex
                items-center
                gap-3
                bg-[#123A63]
                hover:bg-[#0f3153]
                text-white
                px-7
                py-4
                rounded-2xl
                font-semibold
                transition
                shadow-lg
              "
            >

              <ArrowLeft size={18} />

              Kembali ke Berita

            </Link>

          </div>

        </div>

      </article>

    {/* FOOTER SAMA DENGAN HOMEPAGE */}
    <Footer />

  </main>
);
}