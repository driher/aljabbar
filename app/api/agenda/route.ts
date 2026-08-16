import { NextResponse } from "next/server";

const WORDPRESS_API =
  "https://pas.akarmusic.com/wp-json/wp/v2/agenda";

export async function GET(
  request: Request
) {
  try {

    const { searchParams } =
      new URL(request.url);

    const page =
      searchParams.get("page") || "1";

    const perPage =
      searchParams.get("per_page") || "14";


    const url =
      `${WORDPRESS_API}?_embed&per_page=${perPage}&page=${page}`;


    console.log(
      "REQUEST WORDPRESS:",
      url
    );


    const response =
      await fetch(url, {
        method: "GET",

        headers: {
          Accept:
            "application/json",
          "User-Agent":
            "Mozilla/5.0",
        },

        cache: "no-store",
      });


    const text =
      await response.text();


    console.log(
      "WORDPRESS STATUS:",
      response.status
    );


    // ==========================================
    // WORDPRESS ERROR
    // ==========================================

    if (!response.ok) {

      return NextResponse.json(
        {
          success: false,

          error:
            "WordPress gagal memberikan data agenda",

          status:
            response.status,

          wordpress_url:
            url,

          detail:
            text.substring(0, 2000),
        },

        {
          status:
            response.status,
        }
      );

    }


    // ==========================================
    // PARSE JSON
    // ==========================================

    let data;

    try {

      data =
        JSON.parse(text);

    } catch {

      return NextResponse.json(
        {
          success: false,

          error:
            "WordPress tidak mengembalikan JSON",

          status:
            response.status,

          detail:
            text.substring(0, 2000),
        },

        {
          status: 502,
        }
      );

    }


    // ==========================================
    // RESPONSE
    // ==========================================

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
      "AGENDA API ERROR:",
      error
    );


    return NextResponse.json(
      {
        success: false,

        error:
          "Gagal menghubungi WordPress",

        detail:
          error instanceof Error
            ? error.message
            : String(error),
      },

      {
        status: 500,
      }
    );

  }
}