import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface WordPressPage {
  id: number;
  slug: string;

  title: {
    rendered: string;
  };

  content: {
    rendered: string;
  };

  date: string;

  modified: string;

  featured_media: number;

  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}


/* ==================================================
   GET WORDPRESS PAGE
================================================== */

async function getPage(
  slug: string
): Promise<WordPressPage | null> {

  try {

    const response = await fetch(
      `https://pas.akarmusic.com/wp-json/wp/v2/pages?slug=${encodeURIComponent(
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

    const data =
      await response.json();

    if (
      !Array.isArray(data) ||
      data.length === 0
    ) {
      return null;
    }

    return data[0];

  } catch (error) {

    console.error(
      "Gagal mengambil halaman profil:",
      error
    );

    return null;
  }
}


/* ==================================================
   CLEAN TITLE
================================================== */

function cleanTitle(
  text: string
) {

  return text
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, "&")
    .trim();
}


/* ==================================================
   PAGE
================================================== */

export default async function ProfilPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {

  const { slug } = await params;

  const page =
    await getPage(slug);


  /* ==================================================
      NOT FOUND
  ================================================== */

  if (!page) {

    return (

      <main className="
        min-h-screen
        bg-[#F5F7FA]
        text-[#0D2341]
      ">

        <Navbar />

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

              <div className="
                text-5xl
                mb-5
              ">
                📄
              </div>

              <h1 className="
                font-serif
                text-3xl
                lg:text-4xl
                font-bold
                text-[#0D2341]
              ">
                Halaman tidak ditemukan
              </h1>

              <p className="
                mt-3
                text-[#667085]
              ">
                Halaman profil yang Anda cari
                belum tersedia.
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
    cleanTitle(
      page.title.rendered
    );

  const image =
    page._embedded
      ?.["wp:featuredmedia"]
      ?. [0]
      ?.source_url;

  const imageAlt =
    page._embedded
      ?.["wp:featuredmedia"]
      ?. [0]
      ?.alt_text ||
    title;


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
          NAVBAR
      ================================================== */}

      <Navbar />


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


          {/* ==================================================
              BACK
          ================================================== */}

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


          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="
            max-w-5xl
            mx-auto
            mt-8
            lg:mt-10
          ">

            <p className="
              uppercase
              tracking-[0.25em]
              text-[#7A8599]
              font-medium
              text-sm
            ">
              Profil
            </p>

            <h1 className="
              font-serif
              text-[42px]
              sm:text-[52px]
              lg:text-[60px]
              leading-[1.08]
              font-bold
              text-[#0D2341]
              mt-4
            ">
              {title}
            </h1>

          </div>


          {/* ==================================================
              FEATURED IMAGE
          ================================================== */}

          {image && (

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

          )}


          {/* ==================================================
              ARTICLE
          ================================================== */}

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

            <article className="
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
            ">

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
                    page.content.rendered,
                }}
              />

            </article>

          </div>

        </div>

      </section>


      {/* ==================================================
          FOOTER
      ================================================== */}

      <Footer />

    </main>
  );
}