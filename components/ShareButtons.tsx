// ============================================
// components/ShareButtons.tsx
// SHARE BUTTONS
// WHATSAPP - FACEBOOK - X
// ============================================

"use client";

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({
  title,
}: ShareButtonsProps) {

  // ==========================================
  // GET CURRENT URL
  // ==========================================

  function getUrl() {
    return window.location.href;
  }

  // ==========================================
  // WHATSAPP
  // ==========================================

  function shareWhatsApp() {
    const url = getUrl();

    const shareUrl =
      `https://wa.me/?text=${encodeURIComponent(
        `${title}\n\n${url}`
      )}`;

    window.open(
      shareUrl,
      "_blank",
      "noopener,noreferrer"
    );
  }

  // ==========================================
  // FACEBOOK
  // ==========================================

  function shareFacebook() {
    const url = getUrl();

    const shareUrl =
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`;

    window.open(
      shareUrl,
      "_blank",
      "noopener,noreferrer,width=700,height=600"
    );
  }

  // ==========================================
  // X
  // ==========================================

  function shareX() {
    const url = getUrl();

    const shareUrl =
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`;

    window.open(
      shareUrl,
      "_blank",
      "noopener,noreferrer,width=700,height=600"
    );
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="mt-4">

      <p
        className="
          text-xs
          uppercase
          tracking-[0.18em]
          font-semibold
          text-[#7A8599]
          mb-3
        "
      >
        Bagikan berita
      </p>

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-2.5
        "
      >

        {/* ==================================
            WHATSAPP
        =================================== */}

        <button
          type="button"
          onClick={shareWhatsApp}
          aria-label="Bagikan ke WhatsApp"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#25D366]
            hover:bg-[#20bd5a]
            text-white
            px-4
            py-2.5
            text-sm
            font-semibold
            shadow-sm
            hover:shadow-md
            transition-all
            duration-200
          "
        >

          <span
            className="
              text-base
              font-bold
              leading-none
            "
          >
            WA
          </span>

          WhatsApp

        </button>

        {/* ==================================
            FACEBOOK
        =================================== */}

        <button
          type="button"
          onClick={shareFacebook}
          aria-label="Bagikan ke Facebook"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#1877F2]
            hover:bg-[#166fe5]
            text-white
            px-4
            py-2.5
            text-sm
            font-semibold
            shadow-sm
            hover:shadow-md
            transition-all
            duration-200
          "
        >

          <span
            className="
              flex
              items-center
              justify-center
              w-5
              h-5
              rounded-full
              bg-white
              text-[#1877F2]
              font-bold
              text-xs
            "
          >
            f
          </span>

          Facebook

        </button>

        {/* ==================================
            X
        =================================== */}

        <button
          type="button"
          onClick={shareX}
          aria-label="Bagikan ke X"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-black
            hover:bg-[#222222]
            text-white
            px-4
            py-2.5
            text-sm
            font-semibold
            shadow-sm
            hover:shadow-md
            transition-all
            duration-200
          "
        >

          <span
            className="
              text-base
              font-bold
              leading-none
            "
          >
            𝕏
          </span>

          X

        </button>

      </div>

    </div>
  );
}