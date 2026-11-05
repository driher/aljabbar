
import Link from "next/link";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  CalendarDays,
  Bell,
} from "lucide-react";

interface Announcement {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  featured_media: number;
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
    }>;
  };
}

const API_URL =
  "https://cms.masjidrayaaljabbar.id/wp-json/wp/v2/pengumuman";

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
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getImage(post: Announcement) {
  return (
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/news-placeholder.jpg"
  );
}

function getPriority(post: Announcement) {
  return post.acf?.prioritas === "penting";
}

async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const response = await fetch(
      `${API_URL}?per_page=100&_embed=1`,
      { cache: "no-store" }
    );

    if (!response.ok) return [];

    const data = await response.json();

    if (!Array.isArray(data)) return [];

    return data
      .filter(
        (item: Announcement) =>
          item.acf?.status_pengumuman !== "nonaktif"
      )
      .sort((a: Announcement, b: Announcement) => {
        const priority =
          Number(getPriority(b)) - Number(getPriority(a));

        if (priority !== 0) return priority;

        return (
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
        );
      });
  } catch (error) {
    console.error("PENGUMUMAN ERROR:", error);
    return [];
  }
}

function PriorityLabel({ important }: { important: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        important
          ? "bg-[#FFF1D6] text-[#946B20]"
          : "bg-[#EAF0F6] text-[#45617E]"
      }`}
    >
      {important ? "Pengumuman Penting" : "Informasi"}
    </span>
  );
}

export default async function PengumumanPage() {
  const posts = await getAnnouncements();

  const headline = posts[0];
  const secondary = posts.slice(1, 4);
  const listNews = posts.slice(4);

  return (
    <main className="min-h-screen bg-[#F5F7FA] overflow-x-hidden text-[#0D2341]">
      <section className="pt-28 lg:pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <header className="max-w-5xl mx-auto mb-10 lg:mb-14">
            <p className="uppercase tracking-[0.25em] text-[#7A8599] font-medium text-sm">
              Informasi Resmi
            </p>

            <h1 className="font-serif text-[42px] sm:text-[52px] lg:text-[60px] leading-tight font-bold text-[#0D2341] mt-4">
              Pengumuman
            </h1>

            <p className="text-[#667085] text-lg mt-4 max-w-2xl leading-relaxed">
              Informasi, pemberitahuan, dan pengumuman resmi
              Masjid Raya Al-Jabbar.
            </p>
          </header>

          {!headline ? (
            <div className="max-w-5xl mx-auto bg-white rounded-[28px] border border-[#E8EDF3] p-10 lg:p-14 text-center">
              <Bell size={42} className="mx-auto text-[#A17B35] mb-5" />
              <h2 className="font-serif text-3xl font-bold">
                Belum Ada Pengumuman
              </h2>
              <p className="mt-3 text-[#667085]">
                Saat ini belum ada informasi yang dapat ditampilkan.
              </p>
            </div>
          ) : (
            <>
              <Link
                href={`/pengumuman/${headline.slug}`}
                className="group block max-w-5xl mx-auto"
              >
                <article className="relative overflow-hidden rounded-[32px] min-h-[420px] lg:min-h-[520px] bg-[#0D2341] shadow-[0_15px_50px_rgba(13,35,65,0.12)]">
                  <img
                    src={getImage(headline)}
                    alt={
                      headline._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
                      cleanText(headline.title.rendered)
                    }
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" />

                  <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10 lg:p-12 text-white">
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/70">
                      <span>Pengumuman Terbaru</span>
                      <span>•</span>
                      <span>
                        {formatDate(
                          headline.acf?.tanggal_pengumuman || headline.date
                        )}
                      </span>
                    </div>

                    <div className="mt-4">
                      <PriorityLabel important={getPriority(headline)} />
                    </div>

                    <h2 className="font-serif text-[32px] sm:text-[42px] lg:text-[52px] leading-[1.05] font-bold mt-4 max-w-4xl">
                      {cleanText(headline.title.rendered)}
                    </h2>

                    <p className="mt-5 text-white/80 text-base lg:text-lg leading-relaxed max-w-3xl line-clamp-2">
                      {cleanText(headline.excerpt?.rendered || headline.content.rendered)}
                    </p>

                    <div className="inline-flex items-center gap-2 mt-6 font-semibold">
                      Baca Pengumuman
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </article>
              </Link>

              {secondary.length > 0 && (
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {secondary.map((post) => (
                    <Link
                      key={post.id}
                      href={`/pengumuman/${post.slug}`}
                      className="group block"
                    >
                      <article className="h-full overflow-hidden rounded-[28px] bg-white border border-[#E8EDF3] shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="relative h-[220px] overflow-hidden bg-[#E9EDF3]">
                          <img
                            src={getImage(post)}
                            alt={cleanText(post.title.rendered)}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <div className="p-6">
                          <div className="flex items-center gap-2 text-xs text-[#8A95A7]">
                            <CalendarDays size={14} />
                            {formatDate(
                              post.acf?.tanggal_pengumuman || post.date
                            )}
                          </div>

                          <div className="mt-3">
                            <PriorityLabel important={getPriority(post)} />
                          </div>

                          <h3 className="font-serif text-[25px] leading-tight font-bold text-[#0D2341] mt-3 group-hover:text-[#A17B35] transition-colors">
                            {cleanText(post.title.rendered)}
                          </h3>

                          <p className="mt-4 text-sm text-[#68758A] leading-6 line-clamp-3">
                            {cleanText(post.excerpt?.rendered || post.content.rendered)}
                          </p>

                          <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#123A63]">
                            Baca selengkapnya
                            <ArrowRight size={17} />
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              )}

              {listNews.length > 0 && (
                <section className="max-w-5xl mx-auto mt-20">
                  <div className="mb-8">
                    <p className="uppercase tracking-[0.25em] text-[#7A8599] font-medium text-sm">
                      Informasi Lainnya
                    </p>
                    <h2 className="font-serif text-[36px] lg:text-[44px] leading-tight font-bold mt-3 text-[#0D2341]">
                      Pengumuman Lainnya
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    {listNews.map((post) => (
                      <Link
                        key={post.id}
                        href={`/pengumuman/${post.slug}`}
                        className="group block"
                      >
                        <article className="flex flex-col sm:flex-row gap-5 bg-white rounded-[24px] border border-[#E8EDF3] p-4 hover:shadow-[0_12px_35px_rgba(13,35,65,0.08)] transition-all duration-300">
                          <div className="w-full sm:w-[220px] h-[200px] sm:h-[145px] shrink-0 rounded-2xl overflow-hidden bg-[#E9EDF3]">
                            <img
                              src={getImage(post)}
                              alt={cleanText(post.title.rendered)}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          <div className="min-w-0 flex-1 py-1">
                            <div className="flex items-center gap-2 text-xs text-[#8A95A7]">
                              <CalendarDays size={14} />
                              {formatDate(
                                post.acf?.tanggal_pengumuman || post.date
                              )}
                            </div>

                            <div className="mt-2">
                              <PriorityLabel important={getPriority(post)} />
                            </div>

                            <h3 className="font-serif text-[22px] sm:text-[27px] leading-tight font-bold text-[#0D2341] mt-2 line-clamp-2 group-hover:text-[#A17B35] transition-colors">
                              {cleanText(post.title.rendered)}
                            </h3>

                            <p className="text-sm sm:text-base text-[#68758A] mt-3 leading-relaxed line-clamp-2">
                              {cleanText(post.excerpt?.rendered || post.content.rendered)}
                            </p>

                            <div className="hidden sm:inline-flex items-center gap-2 mt-3 text-sm font-semibold text-[#123A63]">
                              Baca pengumuman
                              <ArrowRight size={16} />
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
