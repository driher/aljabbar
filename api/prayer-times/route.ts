import { NextResponse } from "next/server";

export async function GET() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const url = `https://api.myquran.com/v2/sholat/jadwal/1219/${year}/${month}/${day}`;

  try {
    const response = await fetch(url);

    const data = await response.json();

    return NextResponse.json(data);

  } catch (error) {

    return NextResponse.json(
      {
        status: false,
        message: "Failed fetch API",
      },
      {
        status: 500,
      }
    );
  }
}