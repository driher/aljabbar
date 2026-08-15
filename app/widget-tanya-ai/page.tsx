"use client";

import { useState } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function WidgetTanyaAI() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Assalamu'alaikum. 👋\n\nSaya adalah Asisten AI Masjid Raya Al-Jabbar. Silakan tanyakan informasi seputar masjid, kegiatan, fasilitas, layanan, dan informasi lainnya.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    const text = message.trim();

    if (!text || loading) return;

    // Tambahkan pesan user
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: text,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Gagal menghubungi AI"
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Maaf, terjadi kesalahan saat menghubungi layanan AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  }

  return (
    <main className="h-screen bg-white flex flex-col">

      {/* HEADER */}

      <header className="bg-[#123A63] text-white px-5 py-4">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
            <Bot size={21} />
          </div>

          <div>
            <h1 className="font-semibold">
              Tanya AI
            </h1>

            <p className="text-xs text-white/70">
              Masjid Raya Al-Jabbar
            </p>
          </div>

        </div>

      </header>


      {/* CHAT */}

      <div className="flex-1 overflow-y-auto p-5 space-y-4">

        {messages.map((item, index) => (

          <div
            key={index}
            className={
              item.role === "user"
                ? "flex justify-end"
                : "flex justify-start"
            }
          >

            <div
              className={
                item.role === "user"
                  ? `
                    max-w-[85%]
                    bg-[#123A63]
                    text-white
                    rounded-2xl
                    rounded-br-sm
                    px-4
                    py-3
                    text-sm
                    whitespace-pre-line
                  `
                  : `
                    max-w-[85%]
                    bg-[#F2F4F7]
                    text-[#344054]
                    rounded-2xl
                    rounded-tl-sm
                    px-4
                    py-3
                    text-sm
                    whitespace-pre-line
                  `
              }
            >

              <div className="flex gap-2">

                {item.role === "assistant" && (
                  <Bot
                    size={16}
                    className="mt-0.5 shrink-0"
                  />
                )}

                {item.role === "user" && (
                  <User
                    size={16}
                    className="mt-0.5 shrink-0"
                  />
                )}

                <span>
                  {item.content}
                </span>

              </div>

            </div>

          </div>

        ))}


        {/* LOADING */}

        {loading && (

          <div className="flex justify-start">

            <div className="
              bg-[#F2F4F7]
              text-[#667085]
              rounded-2xl
              px-4
              py-3
            ">

              <div className="flex items-center gap-2">

                <Loader2
                  size={16}
                  className="animate-spin"
                />

                <span className="text-sm">
                  AI sedang berpikir...
                </span>

              </div>

            </div>

          </div>

        )}

      </div>


      {/* INPUT */}

      <div className="border-t border-[#E8EDF3] p-4">

        <div className="flex items-center gap-2">

          <input
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Tulis pertanyaan..."
            className="
              flex-1
              h-12
              rounded-xl
              border
              border-[#D0D5DD]
              px-4
              outline-none
              text-[#101828]
              focus:border-[#123A63]
              disabled:bg-gray-100
            "
          />

          <button
            type="button"
            onClick={sendMessage}
            disabled={
              loading ||
              !message.trim()
            }
            className="
              w-12
              h-12
              rounded-xl
              bg-[#123A63]
              text-white
              flex
              items-center
              justify-center
              transition
              hover:bg-[#0f3153]
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >

            {loading ? (
              <Loader2
                size={19}
                className="animate-spin"
              />
            ) : (
              <Send size={19} />
            )}

          </button>

        </div>

        <p className="text-[10px] text-[#98A2B3] mt-2 text-center">
          Asisten AI Masjid Raya Al-Jabbar
        </p>

      </div>

    </main>
  );
}