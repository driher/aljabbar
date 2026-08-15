import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const message = body?.message?.trim();

    if (!message) {
      return NextResponse.json(
        { error: "Pesan kosong." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "GEMINI_API_KEY belum terbaca oleh server.",
        },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    const interaction =
      await ai.interactions.create({
        model: "gemini-3.6-flash",

        input: message,

        system_instruction: `
Anda adalah Asisten AI resmi Masjid Raya Al-Jabbar Jawa Barat.

Jawab menggunakan bahasa Indonesia yang sopan,
ramah, jelas, dan mudah dipahami.

Prioritaskan informasi mengenai:

- Masjid Raya Al-Jabbar
- sejarah masjid
- fasilitas
- kegiatan
- kajian
- layanan pengunjung
- wisata religi
- reservasi
- informasi jamaah
- berita dan informasi Masjid Raya Al-Jabbar

Jangan mengarang informasi.

Jika informasi tidak diketahui atau tidak tersedia,
katakan dengan jujur bahwa informasi tersebut
belum tersedia.

Jangan mengaku sebagai manusia.
Anda adalah asisten virtual Masjid Raya Al-Jabbar.
        `,
      });

    // Ambil output teks dari interaction
    const reply =
      interaction.output_text ||
      interaction.outputText ||
      "";

    if (!reply) {
      console.error(
        "Interaction Gemini:",
        JSON.stringify(interaction, null, 2)
      );

      throw new Error(
        "Gemini tidak mengembalikan jawaban teks."
      );
    }

    return NextResponse.json({
      success: true,
      reply,
    });

  } catch (error: any) {

    console.error(
      "========== GEMINI ERROR =========="
    );

    console.error(error);

    console.error(
      "=================================="
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Gagal menghubungi Gemini AI.",
      },
      { status: 500 }
    );
  }
}