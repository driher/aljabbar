// ============================================
// app/jadwal-kunjungan/page.tsx
// ============================================

import fs from "fs";
import path from "path";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function JadwalKunjunganPage() {

  const filePath = path.join(
    process.cwd(),
    "data",
    "reservasi.json"
  );

  let data = [];

  // BACA FILE JSON
  if (fs.existsSync(filePath)) {

    const fileContent = fs.readFileSync(
      filePath,
      "utf-8"
    );

    data = JSON.parse(
      fileContent || "[]"
    );
  }

  // TANGGAL HARI INI
  const today = new Date();

  // FILTER TANGGAL TERLEWAT
  const upcoming = data.filter((item: any) => {

    const visitDate = new Date(
      item.tanggal
    );

    return visitDate >= new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
  });

  // SORT TANGGAL TERDEKAT
  upcoming.sort((a: any, b: any) => {

    return (
      new Date(a.tanggal).getTime() -
      new Date(b.tanggal).getTime()
    );
  });

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <main className="min-h-screen bg-[#F5F7FA] pt-32 pb-24">

        <div className="max-w-5xl mx-auto px-6">

          {/* HEADER */}
          <div className="mb-12">

            <p className="uppercase tracking-[0.25em] text-[#7A8599] text-sm">
              Reservasi
            </p>

            <h1 className="text-5xl font-bold mt-4 text-[#0D2341]">
              Jadwal Kunjungan
            </h1>

            <p className="text-[#667085] mt-4 text-lg">
              Agenda reservasi pengunjung
              Masjid Raya Al-Jabbar
            </p>

          </div>

          {/* EMPTY */}
          {upcoming.length === 0 && (

            <div className="bg-white rounded-[32px] border border-[#E8EDF3] p-12 text-center shadow-lg">

              <h3 className="text-2xl font-bold text-[#0D2341]">
                Belum Ada Jadwal
              </h3>

              <p className="text-[#667085] mt-3">
                Belum ada reservasi kunjungan aktif.
              </p>

            </div>
          )}

          {/* LIST */}
          <div className="grid gap-6">

            {upcoming.map((item: any) => (

              <div
                key={item.id}
                className="bg-white rounded-[32px] border border-[#E8EDF3] shadow-lg p-8"
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                  {/* LEFT */}
                  <div>

                    <h2 className="text-3xl font-bold text-[#0D2341]">
                      {item.instansi}
                    </h2>

                    <div className="mt-5 grid sm:grid-cols-2 gap-x-10 gap-y-3 text-[#667085]">

                      <p>
                        <span className="font-semibold text-[#0D2341]">
                          Penanggung Jawab:
                        </span>
                        {" "}
                        {item.nama}
                      </p>

                      <p>
                        <span className="font-semibold text-[#0D2341]">
                          Jenis:
                        </span>
                        {" "}
                        {item.jenis}
                      </p>

                      <p>
                        <span className="font-semibold text-[#0D2341]">
                          Peserta:
                        </span>
                        {" "}
                        {item.peserta}
                        {" "}
                        orang
                      </p>

                      <p>
                        <span className="font-semibold text-[#0D2341]">
                          Tanggal:
                        </span>
                        {" "}
                        {item.tanggal}
                      </p>

                      <p>
                        <span className="font-semibold text-[#0D2341]">
                          Waktu:
                        </span>
                        {" "}
                        {item.waktu}
                      </p>

                      <p>
                        <span className="font-semibold text-[#0D2341]">
                          Telepon:
                        </span>
                        {" "}
                        {item.telepon}
                      </p>

                    </div>

                    {/* CATATAN */}
                    {item.catatan && (

                      <div className="mt-6 bg-[#F8FAFC] rounded-2xl p-5 border border-[#E8EDF3]">

                        <p className="text-sm font-semibold text-[#0D2341] mb-2">
                          Catatan
                        </p>

                        <p className="text-[#667085] leading-relaxed">
                          {item.catatan}
                        </p>

                      </div>
                    )}

                  </div>

                  {/* STATUS */}
                  <div className="bg-[#123A63] text-white px-8 py-6 rounded-3xl text-center min-w-[160px] shadow-xl">

                    <p className="text-sm text-white/70 uppercase tracking-wider">
                      Status
                    </p>

                    <h3 className="text-3xl font-bold mt-2">
                      Aktif
                    </h3>

                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}