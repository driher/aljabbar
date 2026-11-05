
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/ShareButtons";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
} from "lucide-react";

const WORDPRESS_API =
  "https://cms.masjidrayaaljabbar.id/wp-json/wp/v2/pengumuman";

const SITE_URL = "https://masjidrayaljabbar.id";
const SITE_NAME = "Masjid Raya Al-Jabbar";

interface Announcement {
  id: number;
  date: string;
  modified?: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  acf?: {
    tanggal_pengumuman?: string | null;
    status_pengumuman?: string;
    tanggal_berakhir?: string | null;
    prioritas?: string;
    link_terkait?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
      caption?: { rendered: string };
    }>;
  };
}

function cleanText(value: string) {
  if (!value) return "";

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

function formatDate(value?: string | null) {
  if (!value) return "";

  let date: Date;

  if (/^\d{8}$/.test(value)) {
    date = new Date(
      Number(value.slice(0, 4)),
      Number(value.slice(4, 6)) - 1,
      Number(value.slice(6, 8))
    );
  } else {
    date = new Date(value);
  }

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getImage(post: Announcement) {
  return (
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    `${SITE_URL}/news-placeholder.jpg`
  );
}

function getCaption(post: Announcement) {
  return cleanText(
    post._embedded?.["wp:featuredmedia"]?.[0]?.caption?.rendered || ""
  );
}

function getAlt(post: Announcement) {
  return (
    post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
    cleanText(post.title.rendered) ||
    "Pengumuman Masjid Raya Al-Jabbar"
  );
}

async function getAnnouncement(
  slug: string
): Promise<Announcement | null> {
  try {
    const response = await fetch(
      `${WORDPRESS_API}?slug=${encodeURIComponent(slug)}&_embed`,
      {
        headers: { Accept: "application/json" },
        cache: "no-store",
      }
    );

    if (!response.ok) return null;

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) return null;

    return data[0] as Announcement;
  } catch (error) {
    console.error("DETAIL PENGUMUMAN ERROR:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getAnnouncement(slug);

  if (!post) {
    return {
      title: `Pengumuman Tidak Ditemukan | ${SITE_NAME}`,
      description: `Pengumuman ${SITE_NAME} tidak ditemukan.`,
    };
  }

  const title = cleanText(post.title.rendered);
  const description = cleanText(
    post.excerpt?.rendered || post.content.rendered
  ).slice(0, 160);

  const image = getImage(post);
  const pageUrl = `${SITE_URL}/pengumuman/${post.slug}`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords: [
      "Masjid Raya Al-Jabbar",
      "Pengumuman Masjid Al-Jabbar",
      "Informasi Masjid",
      "Bandung",
      title,
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "article",
      locale: "id_ID",
      url: pageUrl,
      title,
      description,
      siteName: SITE_NAME,
      publishedTime: post.date,
      modifiedTime: post.modified || post.date,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PengumumanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getAnnouncement(slug);

  if (!post) notFound();

  const image = getImage(post);
  const caption = getCaption(post);
  const alt = getAlt(post);

  const title = cleanText(post.title.rendered);
  const pageUrl = `${SITE_URL}/pengumuman/${post.slug}`;

  const important = post.acf?.prioritas === "penting";
  const status = post.acf?.status_pengumuman;

  const articleContent = post.content.rendered || "";

  return (
    <main className="min-h-screen bg-[#F5F7FA] overflow-x-hidden text-[#0D2341]">
      <article className="pt-28 lg:pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          <div className="mb-8">
            <Link
              href="/pengumuman"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#123A63] hover:text-[#A17B35] transition-colors"
            >
              <ArrowLeft size={17} />
              Kembali ke Pengumuman
            </Link>
          </div>

          <header className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-[#7A8599]">
              <span>Pengumuman Masjid</span>
              <span>•</span>

              <span className="inline-flex items-center gap-2">
                <CalendarDays size={14} />
                {formatDate(
                  post.acf?.tanggal_pengumuman || post.date
                )}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-5">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  important
                    ? "bg-[#FFF1D6] text-[#946B20]"
                    : "bg-[#EAF0F6] text-[#45617E]"
                }`}
              >
                {important ? "Pengumuman Penting" : "Informasi"}
              </span>

              {status && (
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-[#E8F5ED] text-[#28734B]">
                  {status === "aktif" ? "Aktif" : "Nonaktif"}
                </span>
              )}
            </div>

            <h1 className="font-serif text-[36px] sm:text-[46px] lg:text-[58px] leading-[1.08] font-bold text-[#0D2341] mt-5">
              {title}
            </h1>

            {post.acf?.tanggal_berakhir && (
              <p className="mt-5 flex items-center gap-2 text-sm text-[#7A8599]">
                <Clock3 size={16} />
                Berlaku sampai{" "}
                {formatDate(post.acf.tanggal_berakhir)}
              </p>
            )}

            <ShareButtons title={title} />
          </header>

          <figure className="max-w-5xl mx-auto mt-10">
            <div className="relative overflow-hidden rounded-[28px] lg:rounded-[32px] bg-[#E9EDF3] shadow-[0_15px_50px_rgba(13,35,65,0.12)]">
              <img
                src={image}
                alt={alt}
                className="block w-full h-auto max-h-[650px] object-cover"
              />
            </div>

            {caption && (
              <figcaption className="mt-3 px-4 text-center text-xs sm:text-sm leading-relaxed text-[#7A8599] italic">
                {caption}
              </figcaption>
            )}
          </figure>

          <div
            id="floating-info"
            className="h-px w-full"
            aria-hidden="true"
          />

          <div className="max-w-5xl mx-auto mt-12">
            <div className="bg-white rounded-[28px] border border-[#E8EDF3] shadow-[0_10px_40px_rgba(13,35,65,0.05)] px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-14">
              <div
                className="announcement-content text-[#344054] text-[17px] sm:text-[18px] leading-[1.9]"
                dangerouslySetInnerHTML={{
                  __html: articleContent,
                }}
              />

              {post.acf?.link_terkait && (
                <div className="mt-8 pt-6 border-t border-[#E8EDF3]">
                  <a
                    href={post.acf.link_terkait}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-semibold text-[#123A63] hover:text-[#A17B35]"
                  >
                    Informasi terkait
                    <ArrowLeft size={16} className="rotate-180" />
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-10">
            <Link
              href="/pengumuman"
              className="inline-flex items-center gap-2 bg-[#123A63] hover:bg-[#0F3153] text-white px-6 py-3 rounded-2xl font-semibold transition shadow-lg"
            >
              <ArrowLeft size={18} />
              Kembali ke Daftar Pengumuman
            </Link>
          </div>
        </div>
      </article>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .announcement-content p {
              margin-bottom: 1.35rem;
            }

            .announcement-content h2 {
              font-family: Georgia, serif;
              font-size: 1.8rem;
              line-height: 1.25;
              font-weight: 700;
              color: #0D2341;
              margin-top: 2.5rem;
              margin-bottom: 1rem;
            }

            .announcement-content h3 {
              font-family: Georgia, serif;
              font-size: 1.45rem;
              line-height: 1.3;
              font-weight: 700;
              color: #0D2341;
              margin-top: 2rem;
              margin-bottom: 0.8rem;
            }

            .announcement-content strong {
              font-weight: 700;
              color: #0D2341;
            }

            .announcement-content a {
              color: #123A63;
              font-weight: 600;
              text-decoration: underline;
            }

            .announcement-content ul {
              list-style: disc;
              padding-left: 1.5rem;
              margin-bottom: 1.5rem;
            }

            .announcement-content ol {
              list-style: decimal;
              padding-left: 1.5rem;
              margin-bottom: 1.5rem;
            }

            .announcement-content li {
              margin-bottom: 0.5rem;
            }

            .announcement-content blockquote {
              margin: 2rem 0;
              padding: 1.2rem 1.5rem;
              border-left: 4px solid #A17B35;
              background: #F5F7FA;
              border-radius: 0 16px 16px 0;
              color: #475467;
              font-style: italic;
            }

            .announcement-content img {
              display: block;
              width: 100%;
              max-width: 100%;
              height: auto;
              margin: 2rem auto;
              border-radius: 20px;
            }

            .announcement-content iframe {
              width: 100%;
              aspect-ratio: 16 / 9;
              border: 0;
              border-radius: 20px;
              margin: 2rem 0;
            }

            .announcement-content table {
              display: block;
              width: 100%;
              overflow-x: auto;
              border-collapse: collapse;
              margin: 2rem 0;
            }

            .announcement-content th,
            .announcement-content td {
              border: 1px solid #E8EDF3;
              padding: 0.75rem;
              text-align: left;
            }

            .announcement-content th {
              background: #F5F7FA;
              font-weight: 700;
              color: #0D2341;
            }

            @media (max-width: 640px) {
              .announcement-content {
                font-size: 16px;
                line-height: 1.8;
              }

              .announcement-content h2 {
                font-size: 1.5rem;
              }

              .announcement-content h3 {
                font-size: 1.25rem;
              }

              .announcement-content blockquote {
                padding: 1rem;
              }

              .announcement-content img {
                border-radius: 16px;
              }
            }
          `,
        }}
      />
    </main>
  );
}
