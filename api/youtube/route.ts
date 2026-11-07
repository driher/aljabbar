import { NextResponse } from "next/server";

const CHANNEL_ID = "UCgHZM_C779ojZkyR6NHegpg";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const MAX_VIDEOS = 3;

// Best-effort fallback for requests handled by the same server process.
// The Next.js fetch cache below provides caching across requests as well.
type YouTubeVideo = {
  id: string;
  title: string;
  published: string;
  author: string;
};

let lastGoodVideos: YouTubeVideo[] = [];

function decodeHtml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCodePoint(Number(code))
    )
    .replace(/&#x([\da-f]+);/gi, (_, code: string) =>
      String.fromCodePoint(parseInt(code, 16))
    );
}

function getTag(entry: string, tag: string): string {
  const escapedTag = tag.replace(":", "\\:");
  const match = entry.match(
    new RegExp(`<${escapedTag}[^>]*>([\\s\\S]*?)<\\/${escapedTag}>`)
  );
  return match?.[1] ? decodeHtml(match[1].trim()) : "";
}

function parseVideos(xml: string): YouTubeVideo[] {
  const entries = xml.match(/<entry(?:\s[^>]*)?>[\s\S]*?<\/entry>/g) || [];

  return entries
    .map((entry) => ({
      id: getTag(entry, "yt:videoId"),
      title: getTag(entry, "title"),
      published: getTag(entry, "published"),
      author: getTag(entry, "name"),
    }))
    .filter((video) => video.id && video.title)
    .slice(0, MAX_VIDEOS);
}

function jsonResponse(
  body: { success: boolean; videos: YouTubeVideo[]; stale?: boolean; error?: string },
  status = 200
) {
  return NextResponse.json(body, {
    status,
    headers: {
      // Allow CDN/browser caching; stale content can be served during refreshes.
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}

export async function GET() {
  try {
    const response = await fetch(FEED_URL, {
      // Cache the upstream RSS feed for five minutes instead of contacting
      // YouTube on every page visit.
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(10_000),
      headers: {
        Accept: "application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
        "User-Agent": "Mozilla/5.0 (compatible; AlJabbarWebsite/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`YouTube RSS HTTP ${response.status}`);
    }

    const xml = await response.text();
    const videos = parseVideos(xml);

    if (videos.length === 0) {
      throw new Error("YouTube RSS feed tidak berisi video yang dapat dibaca");
    }

    lastGoodVideos = videos;
    return jsonResponse({ success: true, videos });
  } catch (error) {
    console.error("YouTube RSS fetch failed:", error);

    // Do not break the video section if YouTube is temporarily unavailable.
    if (lastGoodVideos.length > 0) {
      return jsonResponse({
        success: true,
        videos: lastGoodVideos,
        stale: true,
      });
    }

    return jsonResponse(
      {
        success: false,
        videos: [],
        error: "Video YouTube sementara tidak dapat dimuat. Silakan coba lagi.",
      },
      503
    );
  }
}
