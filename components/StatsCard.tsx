// ===============================
// components/StatsCard.tsx
// ===============================

import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  desc: string;
}

export default function StatsCard({
  icon,
  title,
  desc,
}: Props) {
  return (
    <div className="bg-white rounded-[32px] border border-[#E8EDF3] p-10 shadow-sm">
      <div className="text-[#123A63]">
        {icon}
      </div>

      <h3 className="font-serif text-[56px] leading-none mt-10 font-bold text-[#0D2341]">
        {title}
      </h3>

      <p className="mt-4 text-[#667085] text-lg">
        {desc}
      </p>
    </div>
  );
}