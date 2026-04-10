import { formatDateShort } from "@/components/cycleUtils";

interface Props {
  nextPeriodStart: Date;
  ovulationDay: Date;
}

export default function MiniCards({ nextPeriodStart, ovulationDay }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
        <div className="text-2xl mb-1">🩸</div>
        <div className="text-xs text-[#c084fc] mb-1">Next Period</div>
        <div className="text-lg font-bold text-[#f0e6ff]">
          {formatDateShort(nextPeriodStart)}
        </div>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
        <div className="text-2xl mb-1">✨</div>
        <div className="text-xs text-[#c084fc] mb-1">Ovulation</div>
        <div className="text-lg font-bold text-[#f0e6ff]">
          {formatDateShort(ovulationDay)}
        </div>
      </div>
    </div>
  );
}
