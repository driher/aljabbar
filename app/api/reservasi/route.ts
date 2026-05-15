import { NextResponse } from "next/server";

import fs from "fs";
import path from "path";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const dirPath = path.join(
      process.cwd(),
      "data"
    );

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

    // tambah data baru
    data.push({
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...body,
    });

    // simpan
    fs.writeFileSync(
      filePath,
      JSON.stringify(data, null, 2)
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}