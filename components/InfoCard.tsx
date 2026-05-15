// ===============================
// components/InfoCard.tsx
// ===============================

import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface Props {
  icon: ReactNode;
  title: string;
  desc: string;
}

export default function InfoCard({
  icon,
  title,
  desc,
}: Props) {
  return (
    <div className="flex gap-5 px-0 xl:px-8 py-5 xl:py-0">
      <div className="w-16 h-16 rounded-2xl bg-[#F3F7FB] flex items-center justify-center text-[#123A63]">
        {icon}
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-[#0D2341]">
          {title}
        </h3>

        <p className="mt-1 text-[#667085] text-lg">
          {desc}
        </p>

        <button className="mt-5 text-[#123A63] font-semibold flex items-center gap-2">
          Lihat Detail
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}