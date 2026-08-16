import { NextResponse } from "next/server";

const WORDPRESS_API =
  "https://pas.akarmusic.com/wp-json/wp/v2/posts";

export async function GET(request: Request) {
  try {
    const { searchParams } =
      new URL(request.url);

    const page =
      searchParams.get("page") || "1";

    const perPage =
      searchParams.get("per_page") || "14";

    const url =
      `${WORDPRESS_API}?_embed&per_page=${perPage}&page=${page}`;

    const response =
      await fetch(url, {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      });

    const text =
      await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            "WordPress gagal memberikan data",
          status: response.status,
          detail: text,
        },
        {
          status: response.status,
        }
      );
    }

    const data =
      JSON.parse(text);

    const result =
      NextResponse.json(data);

    const total =
      response.headers.get(
        "X-WP-Total"
      );

    const totalPages =
      response.headers.get(
        "X-WP-TotalPages"
      );

    if (total) {
      result.headers.set(
        "X-WP-Total",
        total
      );
    }

    if (totalPages) {
      result.headers.set(
        "X-WP-TotalPages",
        totalPages
      );
    }

    return result;

  } catch (error) {

    console.error(
      "WORDPRESS NEWS API ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Gagal menghubungi WordPress",
      },
      {
        status: 500,
      }
    );
  }
}