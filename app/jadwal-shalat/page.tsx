
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const API_URL = "https://api.myquran.com/v2/sholat/jadwal/1219";
const TIME_ZONE = "Asia/Jakarta";

type PrayerData = {
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
  tanggal?: string;
};

type PrayerItem = {
  key: keyof PrayerData;
  name: string;
  time: string;
  type: "info" | "prayer";
};

function getDateInJakarta(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value || "";

  return `${get("year")}-${get("month")}-${get("day")}`;
}

function getTomorrow(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const next = new Date(Date.UTC(year, month - 1, day + 1));

  return [
    next.getUTCFullYear(),
    String(next.getUTCMonth() + 1).padStart(2, "0"),
    String(next.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  return new Intl.DateTimeFormat("id-ID", {
    timeZone: TIME_ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(Date.UTC(year, month - 1, day, 12)));
}

function formatClock(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function getPrayerTimestamp(date: string, time: string) {
  return new Date(`${date}T${time}:00+07:00`).getTime();
}

function formatCountdown(milliseconds: number) {
  const seconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(remainingSeconds).padStart(2, "0"),
  ].join(":");
}

async function fetchPrayerData(date: string): Promise<PrayerData> {
  const [year, month, day] = date.split("-");

  const response = await fetch(
    `${API_URL}/${year}/${month}/${day}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(`Gagal mengambil jadwal (HTTP ${response.status})`);
  }

  const json = await response.json();

  if (!json?.data?.jadwal) {
    throw new Error("Data jadwal salat tidak ditemukan.");
  }

  return json.data.jadwal as PrayerData;
}

const PRAYER_LIST: {
  key: keyof PrayerData;
  name: string;
  type: "info" | "prayer";
}[] = [
  { key: "imsak", name: "Imsak", type: "info" },
  { key: "subuh", name: "Subuh", type: "prayer" },
  { key: "terbit", name: "Terbit", type: "info" },
  { key: "dhuha", name: "Duha", type: "info" },
  { key: "dzuhur", name: "Dzuhur", type: "prayer" },
  { key: "ashar", name: "Ashar", type: "prayer" },
  { key: "maghrib", name: "Maghrib", type: "prayer" },
  { key: "isya", name: "Isya", type: "prayer" },
];

const MAIN_PRAYERS = PRAYER_LIST.filter(
  (item) => item.type === "prayer"
);

export default function JadwalShalatPage() {
  const [now, setNow] = useState(new Date());
  const [todayData, setTodayData] = useState<PrayerData | null>(null);
  const [tomorrowData, setTomorrowData] = useState<PrayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const today = getDateInJakarta(now);
  const tomorrow = getTomorrow(today);

  const loadSchedule = useCallback(async () => {
    try {
      setError("");

      const [todayResult, tomorrowResult] = await Promise.all([
        fetchPrayerData(today),
        fetchPrayerData(tomorrow),
      ]);

      setTodayData(todayResult);
      setTomorrowData(tomorrowResult);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      console.error("Jadwal salat:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Gagal memuat jadwal salat."
      );
    } finally {
      setLoading(false);
    }
  }, [today, tomorrow]);

  // Jam realtime
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Ambil data hari ini dan besok.
  // Otomatis mengambil ulang saat tanggal berganti.
  useEffect(() => {
    setLoading(true);
    loadSchedule();

    const refresh = setInterval(() => {
      loadSchedule();
    }, 6 * 60 * 60 * 1000);

    return () => clearInterval(refresh);
  }, [loadSchedule]);

  // Muat ulang ketika pengguna kembali membuka tab.
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        loadSchedule();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, [loadSchedule]);

  const prayers: PrayerItem[] = useMemo(() => {
    if (!todayData) return [];

    return PRAYER_LIST
      .filter((item) => todayData[item.key])
      .map((item) => ({
        ...item,
        time: todayData[item.key] as string,
      }));
  }, [todayData]);

  const nextPrayer = useMemo(() => {
    if (!todayData) return null;

    const upcoming = MAIN_PRAYERS
      .map((item) => ({
        ...item,
        time: todayData[item.key] as string,
        date: today,
      }))
      .filter((item) => item.time)
      .map((item) => ({
        ...item,
        timestamp: getPrayerTimestamp(today, item.time),
      }))
      .find((item) => item.timestamp > now.getTime());

    if (upcoming) return upcoming;

    if (!tomorrowData?.subuh) return null;

    return {
      key: "subuh",
      name: "Subuh",
      time: tomorrowData.subuh,
      date: tomorrow,
      timestamp: getPrayerTimestamp(
        tomorrow,
        tomorrowData.subuh
      ),
    };
  }, [todayData, tomorrowData, today, tomorrow, now]);

  const countdown = nextPrayer
    ? formatCountdown(nextPrayer.timestamp - now.getTime())
    : "--:--:--";

  const clock = formatClock(now);

  return (
    <main className="min-h-screen bg-[#F5F7FA] text-[#0D2341]">

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0D2948] text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full border border-white/30" />
          <div className="absolute -right-10 -top-20 h-72 w-72 rounded-full border border-white/30" />
          <div className="absolute -bottom-48 -left-20 h-96 w-96 rounded-full border border-white/20" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">

          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-2xl">
              ☪
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D8BC83]">
                Masjid Raya Al-Jabbar
              </p>
              <p className="text-sm text-white/70">
                Bandung · Jawa Barat
              </p>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-2 md:items-center">

            <div>
              <p className="mb-3 text-sm font-medium text-[#D8BC83]">
                JADWAL SHALAT HARI INI
              </p>

              <h1 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
                Waktu Shalat
                <br />
                Kota Bandung
              </h1>

              <p className="mt-4 text-sm text-white/65">
                {formatDate(today)}
              </p>

              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                Pembaruan otomatis
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/[0.08] p-7 backdrop-blur-sm md:p-9">

              <p className="text-sm text-white/65">
                Waktu sekarang · WIB
              </p>

              <div className="mt-2 font-mono text-5xl font-semibold tracking-tight md:text-6xl tabular-nums">
                {clock}
              </div>

              <div className="my-7 h-px bg-white/15" />

              <p className="text-sm text-[#D8BC83]">
                {nextPrayer
                  ? `Menuju waktu ${nextPrayer.name}`
                  : "Menunggu jadwal berikutnya"}
              </p>

              <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {nextPrayer?.name || "—"}
                  </h2>
                  <p className="mt-1 text-sm text-white/60">
                    Pukul {nextPrayer?.time || "--:--"} WIB
                  </p>
                  {nextPrayer?.date !== today && nextPrayer && (
                    <p className="mt-1 text-xs text-white/50">
                      {formatDate(nextPrayer.date)}
                    </p>
                  )}
                </div>

                <div className="font-mono text-3xl font-semibold tracking-wider text-[#E6C98F] md:text-4xl tabular-nums">
                  {countdown}
                </div>
              </div>

              <p className="mt-3 text-xs text-white/45">
                Hitung mundur diperbarui setiap detik
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">

        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A17B35]">
              Jadwal Harian
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold">
              Waktu Ibadah
            </h2>
            <p className="mt-2 text-sm text-[#7A8599]">
              Kota Bandung, Jawa Barat
            </p>
          </div>

          <div className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#52647B] shadow-sm">
            Zona waktu: WIB (UTC+7)
          </div>
        </div>

        {loading && !todayData ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#D8DFE8] border-t-[#123A63]" />
            <p className="text-sm text-[#7A8599]">
              Mengambil jadwal salat...
            </p>
          </div>
        ) : error && !todayData ? (
          <div className="rounded-3xl border border-red-100 bg-white p-10 text-center">
            <p className="font-semibold text-red-600">
              Jadwal belum dapat dimuat
            </p>
            <p className="mt-2 text-sm text-[#7A8599]">
              {error}
            </p>
            <button
              onClick={loadSchedule}
              className="mt-5 rounded-full bg-[#123A63] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0D2948]"
            >
              Coba Lagi
            </button>
          </div>
        ) : !todayData ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            Jadwal salat belum tersedia.
          </div>
        ) : (
          <>
            {/* KARTU JADWAL */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-5">
              {prayers.map((prayer) => {
                const isNext =
                  prayer.type === "prayer" &&
                  prayer.key === nextPrayer?.key &&
                  nextPrayer?.date === today;

                return (
                  <div
                    key={prayer.key}
                    className={`relative overflow-hidden rounded-2xl border p-5 transition md:rounded-3xl md:p-7 ${
                      isNext
                        ? "border-[#123A63] bg-[#123A63] text-white shadow-lg shadow-[#123A63]/15"
                        : "border-[#E8ECF1] bg-white text-[#0D2341] shadow-sm"
                    }`}
                  >
                    {isNext && (
                      <span className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#E6C98F]">
                        Berikutnya
                      </span>
                    )}

                    {!isNext && (
                      <p className="mb-3 text-xs font-medium text-[#7A8599]">
                        Waktu Shalat
                      </p>
                    )}

                    <p className={`text-sm font-medium ${
                      isNext ? "text-white/75" : "text-[#7A8599]"
                    }`}>
                      {prayer.name}
                    </p>

                    <p className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                      {prayer.time}
                    </p>

                    <p className={`mt-2 text-xs ${
                      isNext ? "text-white/55" : "text-[#A0A9B6]"
                    }`}>
                      WIB
                    </p>
                  </div>
                );
              })}
            </div>

            {/* JADWAL LENGKAP */}
            <div className="mt-8 rounded-3xl border border-[#E8ECF1] bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">
                    Jadwal Lengkap Hari Ini
                  </h3>
                  <p className="mt-1 text-sm text-[#7A8599]">
                    {formatDate(today)}
                  </p>
                </div>

                <span className="rounded-full bg-[#F5F7FA] px-4 py-2 text-xs font-medium text-[#52647B]">
                  Kota Bandung
                </span>
              </div>

              <div className="mt-6 divide-y divide-[#EDF0F4]">
                {prayers.map((prayer) => (
                  <div
                    key={prayer.key}
                    className="flex items-center justify-between py-4"
                  >
                    <span className="text-sm font-medium text-[#52647B]">
                      {prayer.name}
                    </span>
                    <span className="font-mono text-lg font-semibold text-[#0D2341]">
                      {prayer.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* INFORMASI */}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl bg-[#EAF0F6] p-6 md:p-7">
            <div className="text-2xl">☪</div>
            <h3 className="mt-3 font-semibold text-[#0D2948]">
              Menjaga Ketepatan Waktu
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#52647B]">
              Jadwal salat menjadi pengingat bagi kita untuk
              senantiasa menjaga ibadah dan memakmurkan masjid.
            </p>
          </div>

          <div className="rounded-3xl border border-[#E8ECF1] bg-white p-6 md:p-7">
            <div className="text-2xl">◷</div>
            <h3 className="mt-3 font-semibold text-[#0D2948]">
              Pembaruan Otomatis
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#7A8599]">
              Jam dan hitung mundur diperbarui setiap detik.
              Jadwal dimuat ulang setiap enam jam dan ketika
              tanggal berganti.
            </p>
          </div>
        </div>

        {/* SUMBER DATA */}
        <div className="mt-8 border-t border-[#E2E7ED] pt-6">
          <p className="text-xs leading-relaxed text-[#8A94A3]">
            Sumber data jadwal salat: API MyQuran.
            ID wilayah: 1219 — Bandung.
          </p>

          <p className="mt-2 text-xs text-[#A0A9B6]">
            {lastUpdated
              ? `Data terakhir dimuat: ${new Intl.DateTimeFormat(
                  "id-ID",
                  {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: TIME_ZONE,
                  }
                ).format(new Date(lastUpdated))} WIB`
              : "Menunggu pembaruan data..."}
          </p>

          <a
            href="https://api.myquran.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-xs font-semibold text-[#123A63] hover:text-[#A17B35]"
          >
            Sumber API MyQuran →
          </a>
        </div>
      </section>
    </main>
  );
}
