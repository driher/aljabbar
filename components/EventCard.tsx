// ===============================
// components/EventCard.tsx
// ===============================

import { ArrowRight } from "lucide-react";

interface Props {
  image: string;
  title: string;
  date: string;
  category: string;
  desc: string;
}

export default function EventCard({
  image,
  title,
  date,
  category,
  desc,
}: Props) {
  return (
    <article className="bg-white rounded-[32px] overflow-hidden border border-[#E8EDF3] shadow-sm">
      <div className="relative h-[280px]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-5 left-5 bg-white rounded-xl px-4 py-3 shadow-lg">
          <p className="text-xs uppercase tracking-widest text-[#667085]">
            JULI
          </p>

          <h4 className="text-3xl font-bold text-[#0D2341]">
            {date}
          </h4>
        </div>
      </div>

      <div className="p-8">
        <p className="text-[#667085]">
          {category}
        </p>

        <h3 className="font-serif text-[36px] leading-tight mt-3 font-bold text-[#0D2341]">
          {title}
        </h3>

        <p className="mt-5 text-[#667085] leading-relaxed">
          {desc}
        </p>

        <button className="mt-8 flex items-center gap-2 font-semibold text-[#123A63]">
          Detail Kegiatan
          <ArrowRight size={18} />
        </button>
      </div>
    </article>
  );
}