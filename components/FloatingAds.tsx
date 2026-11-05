"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type AdItem = {
  active?: boolean;
  type?: "image" | "html";
  target_url?: string;
  alt?: string;
  image_url?: string;
  html?: string;
};

type AdPosition = "left" | "right" | "top" | "bottom";

type AdsResponse = {
  success?: boolean;
  dimensions?: {
    width?: number;
    height?: number;
  };
  ads?: {
    left?: AdItem;
    right?: AdItem;
    top?: AdItem;
    bottom?: AdItem;
  };
};

const AD_API = "/api/ads";

function AdCreative({
  ad,
  position,
  width,
  height,
  onClose,
}: {
  ad?: AdItem;
  position: AdPosition;
  width: number;
  height: number;
  onClose: () => void;
}) {
  if (!ad?.active) return null;

  const isHorizontal = position === "top" || position === "bottom";
  const targetUrl = ad.target_url?.trim();

  const creative =
    ad.type === "html" ? (
      <div
        className="h-full w-full overflow-hidden bg-white"
        dangerouslySetInnerHTML={{ __html: ad.html || "" }}
      />
    ) : ad.image_url ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={ad.image_url}
        alt={ad.alt || "Materi iklan"}
        className="block h-full w-full object-contain"
        loading="lazy"
      />
    ) : null;

  if (!creative) return null;

  const frameStyle = isHorizontal
    ? {
        width: "min(970px, calc(100vw - 24px))",
        height: "auto",
        minHeight: 60,
      }
    : {
        width,
        height: `min(${height}px, 70vh)`,
      };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onClose}
        aria-label={`Tutup iklan ${position}`}
        title="Tutup iklan"
        className="absolute -right-2 -top-2 z-30 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#0D2341] text-lg font-bold leading-none text-white shadow-lg transition hover:scale-110 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <span aria-hidden="true">×</span>
      </button>

      <div
        className="overflow-hidden rounded-xl border border-[#E8EDF3] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.14)]"
        style={frameStyle}
      >
        {targetUrl ? (
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            aria-label={ad.alt || "Buka iklan"}
            className="block h-full w-full"
          >
            {creative}
          </a>
        ) : (
          creative
        )}
      </div>
    </div>
  );
}

export default function FloatingAds() {
  const pathname = usePathname();
  const [data, setData] = useState<AdsResponse | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState<Record<AdPosition, boolean>>({
    left: false,
    right: false,
    top: false,
    bottom: false,
  });

  const closeAd = (position: AdPosition) => {
    setDismissed((previous) => ({
      ...previous,
      [position]: true,
    }));
  };

  // Setiap pindah halaman, buka kembali slot iklan dan muat ulang data.
  useEffect(() => {
    let cancelled = false;

    setDismissed({
      left: false,
      right: false,
      top: false,
      bottom: false,
    });

    async function loadAds() {
      try {
        const response = await fetch(AD_API, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Ads API HTTP ${response.status}`);
        }

        const result: AdsResponse = await response.json();
        if (!cancelled && result.success) {
          setData(result);
        }
      } catch (error) {
        console.error("Gagal memuat iklan Masjid Al-Jabbar:", error);
      }
    }

    loadAds();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  // Perilaku lama dipertahankan: iklan baru muncul setelah melewati banner atas.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const checkPosition = () => {
      const target = document.getElementById("floating-info");

      if (!target) {
        setVisible(window.scrollY > 250);
        return;
      }

      setVisible(
        target.getBoundingClientRect().top <= window.innerHeight * 0.9
      );
    };

    timer = setTimeout(checkPosition, 100);
    window.addEventListener("scroll", checkPosition, { passive: true });
    window.addEventListener("resize", checkPosition);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, [pathname]);

  if (!visible || !data?.success || !data.ads) {
    return null;
  }

  const width = Math.max(50, Math.min(600, data.dimensions?.width || 130));
  const height = Math.max(50, Math.min(1200, data.dimensions?.height || 450));
  const { left, right, top, bottom } = data.ads;

  return (
    <>
      {left?.active && !dismissed.left && (
        <div className="fixed left-3 top-1/2 z-[900] hidden -translate-y-1/2 xl:block">
          <AdCreative
            ad={left}
            position="left"
            width={width}
            height={height}
            onClose={() => closeAd("left")}
          />
        </div>
      )}

      {right?.active && !dismissed.right && (
        <div className="fixed right-3 top-1/2 z-[900] hidden -translate-y-1/2 xl:block">
          <AdCreative
            ad={right}
            position="right"
            width={width}
            height={height}
            onClose={() => closeAd("right")}
          />
        </div>
      )}

      {top?.active && !dismissed.top && (
        <div className="fixed left-1/2 top-20 z-[910] -translate-x-1/2">
          <AdCreative
            ad={top}
            position="top"
            width={width}
            height={height}
            onClose={() => closeAd("top")}
          />
        </div>
      )}

      {bottom?.active && !dismissed.bottom && (
        <div className="fixed bottom-3 left-1/2 z-[910] -translate-x-1/2">
          <AdCreative
            ad={bottom}
            position="bottom"
            width={width}
            height={height}
            onClose={() => closeAd("bottom")}
          />
        </div>
      )}
    </>
  );
}
