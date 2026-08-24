"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function FloatingAds() {
  const pathname = usePathname();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    const checkPosition = () => {
      const target =
        document.getElementById("floating-info");

      if (!target) {
        setVisible(false);

        return;
      }

      const rect =
        target.getBoundingClientRect();

      /*
       * LOGIKA:
       *
       * floating-info masih di bawah viewport
       * → iklan belum tampil
       *
       * floating-info sudah mencapai viewport
       * → iklan tampil
       *
       * ketika kembali ke atas dan floating-info
       * berada jauh di bawah viewport
       * → iklan hilang
       */

      const triggerPoint = window.innerHeight * 0.9;

      if (rect.top <= triggerPoint) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };


    const start = () => {
      checkPosition();

      window.addEventListener(
        "scroll",
        checkPosition,
        {
          passive: true,
        }
      );

      window.addEventListener(
        "resize",
        checkPosition
      );
    };


    /*
     * Next.js client navigation kadang membutuhkan
     * sedikit waktu sampai halaman selesai dirender.
     */

    timer = setTimeout(
      start,
      100
    );


    return () => {

      if (timer) {
        clearTimeout(timer);
      }

      window.removeEventListener(
        "scroll",
        checkPosition
      );

      window.removeEventListener(
        "resize",
        checkPosition
      );

    };

  }, [pathname]);


  return (
    <>
      {/* ==================================================
          IKLAN KIRI
      ================================================== */}

      <div
        className={`
          fixed
          left-[24px]
          top-1/2
          -translate-y-1/2

          z-[900]

          hidden
          xl:block

          transition-all
          duration-500
          ease-out

          ${
            visible
              ? "translate-x-0 opacity-100"
              : "pointer-events-none -translate-x-6 opacity-0"
          }
        `}
      >

        <div
          className="
            flex
            h-[450px]
            w-[130px]

            items-center
            justify-center

            rounded-[22px]

            border
            border-[#E8EDF3]

            bg-white/95

            text-center

            shadow-[0_10px_35px_rgba(0,0,0,0.12)]

            backdrop-blur-sm
          "
        >

          <div>

            <p
              className="
                text-[11px]
                font-medium
                tracking-[0.2em]
                text-[#A5AFBE]
              "
            >
              ADVERTISEMENT
            </p>

            <p
              className="
                mt-2
                text-xs
                text-[#A5AFBE]
              "
            >
              130 × 450 px
            </p>

          </div>

        </div>

      </div>


      {/* ==================================================
          IKLAN KANAN
      ================================================== */}

      <div
        className={`
          fixed
          right-[24px]
          top-1/2
          -translate-y-1/2

          z-[900]

          hidden
          xl:block

          transition-all
          duration-500
          ease-out

          ${
            visible
              ? "translate-x-0 opacity-100"
              : "pointer-events-none translate-x-6 opacity-0"
          }
        `}
      >

        <div
          className="
            flex
            h-[450px]
            w-[130px]

            items-center
            justify-center

            rounded-[22px]

            border
            border-[#E8EDF3]

            bg-white/95

            text-center

            shadow-[0_10px_35px_rgba(0,0,0,0.12)]

            backdrop-blur-sm
          "
        >

          <div>

            <p
              className="
                text-[11px]
                font-medium
                tracking-[0.2em]
                text-[#A5AFBE]
              "
            >
              ADVERTISEMENT
            </p>

            <p
              className="
                mt-2
                text-xs
                text-[#A5AFBE]
              "
            >
              130 × 450 px
            </p>

          </div>

        </div>

      </div>
    </>
  );
}