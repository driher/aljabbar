
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const WORDPRESS_API =
  "https://cms.masjidrayaaljabbar.id/wp-json/wp/v2/agenda";

const REQUEST_TIMEOUT = 15000;

// ==================================================
// HELPER: ERROR DETAIL
// ==================================================

function getErrorDetails(error: unknown) {
  if (!(error instanceof Error)) {
    return {
      message: String(error),
      cause: null,
      code: null,
    };
  }

  const cause = error.cause;

  const causeMessage =
    cause instanceof Error
      ? cause.message
      : cause
        ? String(cause)
        : null;

  const causeCode =
    cause && typeof cause === "object" && "code" in cause
      ? String(cause.code)
      : null;

  return {
    message: error.message,
    cause: causeMessage,
    code: causeCode,
  };
}

// ==================================================
// GET AGENDA
// ==================================================

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ==============================================
    // VALIDASI PAGINATION
    // ==============================================

    const requestedPage = Number(
      searchParams.get("page") || 1
    );

    const requestedPerPage = Number(
      searchParams.get("per_page") || 14
    );

    const page =
      Number.isInteger(requestedPage) && requestedPage > 0
        ? requestedPage
        : 1;

    const perPage =
      Number.isInteger(requestedPerPage) &&
      requestedPerPage > 0
        ? Math.min(requestedPerPage, 100)
        : 14;

    // ==============================================
    // SUSUN URL WORDPRESS
    // ==============================================

    const wordpressUrl = new URL(WORDPRESS_API);

    wordpressUrl.searchParams.set("_embed", "1");
    wordpressUrl.searchParams.set(
      "per_page",
      String(perPage)
    );
    wordpressUrl.searchParams.set(
      "page",
      String(page)
    );

    // ==============================================
    // LOG REQUEST
    // ==============================================

    console.log(
      "[AGENDA API] Request:",
      wordpressUrl.toString()
    );

    // ==============================================
    // FETCH WORDPRESS
    // ==============================================

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT);

    let response: Response;

    try {
      response = await fetch(wordpressUrl.toString(), {
        method: "GET",

        headers: {
          Accept: "application/json",
          "User-Agent": "MasjidRayaAlJabbar/1.0",
        },

        cache: "no-store",
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    console.log(
      "[AGENDA API] WordPress status:",
      response.status
    );

    // ==============================================
    // AMBIL RESPONSE
    // ==============================================

    const responseText = await response.text();

    // ==============================================
    // CEK STATUS WORDPRESS
    // ==============================================

    if (!response.ok) {
      console.error(
        "[AGENDA API] WordPress error:",
        response.status,
        responseText.substring(0, 1000)
      );

      return NextResponse.json(
        {
          success: false,
          error: "WordPress gagal memberikan data agenda",
          status: response.status,
          detail: responseText.substring(0, 2000),
        },
        {
          status: 502,
        }
      );
    }

    // ==============================================
    // PARSE JSON
    // ==============================================

    let data: unknown;

    try {
      data = JSON.parse(responseText);
    } catch {
      console.error(
        "[AGENDA API] Invalid JSON:",
        responseText.substring(0, 1000)
      );

      return NextResponse.json(
        {
          success: false,
          error: "WordPress tidak mengembalikan JSON valid",
          detail: responseText.substring(0, 2000),
        },
        {
          status: 502,
        }
      );
    }

    // ==============================================
    // VALIDASI FORMAT DATA
    // ==============================================

    if (!Array.isArray(data)) {
      return NextResponse.json(
        {
          success: false,
          error: "Format data agenda dari WordPress tidak valid",
          detail: data,
        },
        {
          status: 502,
        }
      );
    }

    // ==============================================
    // RESPONSE HEADER PAGINATION
    // ==============================================

    const headers = new Headers();

    headers.set(
      "Content-Type",
      "application/json; charset=utf-8"
    );

    headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate"
    );

    const total = response.headers.get("X-WP-Total");
    const totalPages = response.headers.get("X-WP-TotalPages");

    if (total !== null) {
      headers.set("X-WP-Total", total);
    }

    if (totalPages !== null) {
      headers.set("X-WP-TotalPages", totalPages);
    }

    // ==============================================
    // SUCCESS
    // ==============================================

    console.log(
      "[AGENDA API] Berhasil mengambil",
      data.length,
      "agenda"
    );

    return NextResponse.json(data, {
      status: 200,
      headers,
    });

  } catch (error: unknown) {
    const details = getErrorDetails(error);

    console.error(
      "[AGENDA API] Gagal menghubungi WordPress:",
      details
    );

    const isTimeout =
      error instanceof Error &&
      error.name === "AbortError";

    return NextResponse.json(
      {
        success: false,

        error: isTimeout
          ? "Koneksi ke WordPress mengalami timeout"
          : "Gagal menghubungi WordPress",

        detail: details.message,
        cause: details.cause,
        code: details.code,

        wordpress_api: WORDPRESS_API,
      },
      {
        status: isTimeout ? 504 : 502,
      }
    );
  }
}
