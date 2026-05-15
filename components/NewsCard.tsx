// ===============================
// components/NewsCard.tsx
// ===============================

import { ArrowRight } from "lucide-react";

interface Props {
  image: string;
  title: string;
  date: string;
  desc: string;
}

export default function NewsCard({
  image,
  title,
  date,
  desc,
}: Props) {
  return (
    <article className="bg-white rounded-[32px] overflow-hidden border border-[#E8EDF3]">
      <div className="h-[260px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-110 transition duration-700"
        />
      </div>

      <div className="p-8">
        <p className="text-[#667085]">
          {date}
        </p>

        <h3 className="font-serif text-[34px] leading-tight mt-4 font-bold text-[#0D2341]">
          {title}
        </h3>

        <p className="mt-5 text-[#667085] leading-relaxed">
          {desc}
        </p>

        <button className="mt-8 flex items-center gap-2 text-[#123A63] font-semibold">
          Baca Artikel
          <ArrowRight size={18} />
        </button>
      </div>
    </article>
  );
}