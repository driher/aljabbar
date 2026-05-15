import { NextResponse } from "next/server";

import fs from "fs";
import path from "path";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    // folder data
    const dirPath = path.join(
      process.cwd(),
      "data"
    );

    // file json
    const filePath = path.join(
      dirPath,
      "reservasi.json"
    );

    // buat folder jika belum ada
    if (!fs.existsSync(dirPath)) {

      fs.mkdirSync(dirPath, {
        recursive: true,
      });
    }

    let data = [];

    // baca file lama
    if (fs.existsSync(filePath)) {

      const fileContent = fs.readFileSync(
        filePath,
        "utf-8"
      );

      data = JSON.parse(
        fileContent || "[]"
      );
    }

    // data baru
    const newData = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...body,
    };

    // push data
    data.push(newData);

    // simpan file
    fs.writeFileSync(
      filePath,
      JSON.stringify(data, null, 2)
    );

    return NextResponse.json({
      success: true,
      message: "Reservasi berhasil",
    });

  } catch (error) {

    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal menyimpan",
      },
      {
        status: 500,
      }
    );
  }
}