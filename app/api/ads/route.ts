import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const WORDPRESS_ADS_ENDPOINT =
  process.env.WORDPRESS_ADS_ENDPOINT ||
  "https://cms.masjidrayaaljabbar.id/wp-json/mra-ads/v1/ads";

export async function GET() {
  try {
    const response = await fetch(WORDPRESS_ADS_ENDPOINT, {
      method: "GET",
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: "Gagal mengambil data iklan dari WordPress." },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("WordPress Ads API error:", error);
    return NextResponse.json(
      { success: false, message: "Server iklan WordPress tidak dapat dihubungi." },
      { status: 502 }
    );
  }
}
