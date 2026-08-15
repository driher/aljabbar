// ============================================
// components/VideoCard.tsx
// 3 VIDEO TERBARU - YOUTUBE
// POPUP PLAYER
// ============================================

"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";

interface YouTubeVideo {
  id: string;
  title: string;
  published: string;
  author: string;
}

export default function VideoCard() {

  const [videos, setVideos] =
    useState<YouTubeVideo[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedVideo, setSelectedVideo] =
    useState<YouTubeVideo | null>(null);


  // ==========================================
  // FETCH INTERNAL API
  // ==========================================

  useEffect(() => {

    async function loadVideos() {

      try {

        const response =
          await fetch("/api/youtube", {
            cache: "no-store",
          });

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}`
          );
        }

        const result =
          await response.json();

        if (
          result.success &&
          Array.isArray(result.videos)
        ) {

          setVideos(
            result.videos.slice(0, 3)
          );

        } else {

          setVideos([]);

        }

      } catch (error) {

        console.error(
          "Gagal mengambil video:",
          error
        );

        setVideos([]);

      } finally {

        setLoading(false);

      }

    }

    loadVideos();

  }, []);


  // ==========================================
  // FORMAT DATE
  // ==========================================

  function formatDate(date: string) {

    if (!date) return "";

    return new Date(date).toLocaleDateString(
      "id-ID",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  }


  // ==========================================
  // CLOSE MODAL
  // ==========================================

  function closeVideo() {

    setSelectedVideo(null);

  }


  // ==========================================
  // ESC
  // ==========================================

  useEffect(() => {

    function handleKeyDown(
      event: KeyboardEvent
    ) {

      if (event.key === "Escape") {
        closeVideo();
      }

    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, []);


  // ==========================================
  // LOCK SCROLL
  // ==========================================

  useEffect(() => {

    if (selectedVideo) {

      document.body.style.overflow =
        "hidden";

    } else {

      document.body.style.overflow =
        "";

    }

    return () => {

      document.body.style.overflow =
        "";

    };

  }, [selectedVideo]);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div
        className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >

        {[1, 2, 3].map((item) => (

          <div
            key={item}
            className="
              overflow-hidden
              rounded-3xl
              bg-white
              border
              border-[#E8EDF3]
              animate-pulse
            "
          >

            <div
              className="
                aspect-video
                bg-[#E9EDF3]
              "
            />

            <div className="p-6">

              <div
                className="
                  h-3
                  w-28
                  bg-[#E9EDF3]
                  rounded
                  mb-4
                "
              />

              <div
                className="
                  h-6
                  w-full
                  bg-[#E9EDF3]
                  rounded
                  mb-2
                "
              />

              <div
                className="
                  h-6
                  w-4/5
                  bg-[#E9EDF3]
                  rounded
                "
              />

            </div>

          </div>

        ))}

      </div>

    );

  }


  // ==========================================
  // EMPTY
  // ==========================================

  if (videos.length === 0) {

    return (

      <div
        className="
          rounded-3xl
          border
          border-[#E8EDF3]
          bg-white
          p-10
          text-center
        "
      >

        <div className="text-4xl mb-4">
          🎬
        </div>

        <h3
          className="
            font-serif
            text-2xl
            font-bold
            text-[#0D2341]
          "
        >
          Video belum tersedia
        </h3>

        <p
          className="
            text-[#7A8599]
            mt-2
          "
        >
          Video terbaru akan tampil
          otomatis di sini.
        </p>

      </div>

    );

  }


  // ==========================================
  // VIDEO GRID
  // ==========================================

  return (
    <>
      <div
        className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >

        {videos.map((video) => (

          <article
            key={video.id}
            className="
              group
              overflow-hidden
              rounded-3xl
              bg-white
              border
              border-[#E8EDF3]
              shadow-sm
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            {/* THUMBNAIL */}

            <button
              type="button"
              onClick={() =>
                setSelectedVideo(video)
              }
              className="
                block
                w-full
                text-left
              "
            >

              <div
                className="
                  relative
                  aspect-video
                  overflow-hidden
                  bg-[#E9EDF3]
                "
              >

                <img
                  src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
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
                    bg-black/10
                    group-hover:bg-black/30
                    transition
                  "
                />

                {/* PLAY */}

                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                  "
                >

                  <div
                    className="
                      w-16
                      h-16
                      rounded-full
                      bg-white/95
                      shadow-2xl
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-300
                      group-hover:scale-110
                    "
                  >

                    <Play
                      size={27}
                      fill="currentColor"
                      className="
                        ml-1
                        text-[#C62828]
                      "
                    />

                  </div>

                </div>


                {/* LABEL */}

                <div
                  className="
                    absolute
                    left-4
                    top-4
                    bg-[#C62828]
                    text-white
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    px-3
                    py-1.5
                    rounded-full
                  "
                >
                  YouTube
                </div>

              </div>

            </button>


            {/* CONTENT */}

            <div className="p-6">

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-[#8A95A7]
                  font-medium
                "
              >
                {formatDate(video.published)}
              </p>


              <button
                type="button"
                onClick={() =>
                  setSelectedVideo(video)
                }
                className="
                  text-left
                  w-full
                "
              >

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
                  {video.title}
                </h3>

              </button>


              <button
                type="button"
                onClick={() =>
                  setSelectedVideo(video)
                }
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

                Tonton video

                <span
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>

              </button>

            </div>

          </article>

        ))}

      </div>


{/* ========================================
    POPUP VIDEO
======================================== */}

{selectedVideo && (
  <div
    className="
      fixed
      inset-0
      z-[9999]
      bg-black/85
      backdrop-blur-md
      flex
      items-center
      justify-center
      p-4
      sm:p-6
    "
    onClick={closeVideo}
  >

    {/* PLAYER WRAPPER */}
    <div
      className="
        relative
        w-full
        max-w-6xl
      "
      onClick={(event) =>
        event.stopPropagation()
      }
    >

      {/* VIDEO */}
<div
  className="
    relative
    top-[-60px]
    w-full
    max-w-6xl
    aspect-video
    overflow-hidden
    rounded-2xl
    lg:rounded-3xl
    bg-black
    shadow-[0_25px_80px_rgba(0,0,0,0.55)]
  "
>

        <iframe
          key={selectedVideo.id}
          src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`}
          title={selectedVideo.title}
          className="
            absolute
            inset-0
            w-full
            h-full
            border-0
          "
          allow="
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture;
            web-share
          "
          allowFullScreen
        />

        {/* CLOSE */}
        <button
          type="button"
          onClick={closeVideo}
          aria-label="Tutup video"
          className="
            absolute
            top-4
            right-4
            z-20
            w-11
            h-11
            rounded-full
            bg-black/60
            hover:bg-black/80
            text-white
            flex
            items-center
            justify-center
            transition
          "
        >
          <X size={24} />
        </button>

      </div>

      {/* TITLE */}
      <div className="mt-4 text-white">

        <p
          className="
            text-xs
            uppercase
            tracking-[0.18em]
            text-white/60
          "
        >
          Video Terbaru
        </p>

        <h3
          className="
            font-serif
            text-xl
            sm:text-2xl
            font-bold
            mt-1
          "
        >
          {selectedVideo.title}
        </h3>

      </div>

    </div>

  </div>
)}
    </>
  );
}