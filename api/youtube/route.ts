// ============================================
// app/api/youtube/route.ts
// YOUTUBE LATEST VIDEOS
// ============================================

import { NextResponse } from "next/server";

const CHANNEL_ID = "UCgHZM_C779ojZkyR6NHegpg";

const FEED_URL =
  `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

function decodeHtml(text: string) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

const response = await fetch(FEED_URL, {
  cache: "no-store",
  headers: {
    Accept: "application/atom+xml",
  },
});

    if (!response.ok) {
      throw new Error(
        `YouTube RSS HTTP ${response.status}`
      );
    }

    const xml = await response.text();

    const entries =
      xml.match(
        /<entry>[\s\S]*?<\/entry>/g
      ) || [];

    const videos = entries
      .slice(0, 3)
      .map((entry) => {

        const id =
          entry.match(
            /<yt:videoId>(.*?)<\/yt:videoId>/
          )?.[1] || "";

        const title =
          entry.match(
            /<title>([\s\S]*?)<\/title>/
          )?.[1] || "";

        const published =
          entry.match(
            /<published>(.*?)<\/published>/
          )?.[1] || "";

        const author =
          entry.match(
            /<name>(.*?)<\/name>/
          )?.[1] || "";

        return {
          id,
          title: decodeHtml(title),
          published,
          author,
        };
      })
      .filter((video) => video.id);

    return NextResponse.json(
      {
        success: true,
        videos,
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );

  } catch (error) {

    console.error(
      "YouTube API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        videos: [],
        error: "Gagal mengambil video YouTube",
      },
      {
        status: 500,
      }
    );
  }
}