import { CycleResult } from "@/components/cycleUtils";
import MiniCards from "@/components/MiniCards";
import DateBands from "@/components/DateBands";
import GenderCard from "@/components/GenderCard";
import CalendarView from "@/components/CalendarView";

interface Props {
  result: CycleResult;
}

export default function ResultsSection({ result }: Props) {
  const {
    nextPeriodStart,
    nextPeriodEnd,
    ovulationDay,
    safeWindows,
    fertileWindows,
    periodDates,
    fertileDates,
    safeDates,
  } = result;

  return (
    <div className="flex flex-col gap-6">
      <MiniCards
        nextPeriodStart={nextPeriodStart}
        ovulationDay={ovulationDay}
      />

      <div className="bg-white/5 h-29 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-[#f0e6ff] mb-1">🛡️ Safe Days</h3>
        <p className="text-xs text-[#c084fc] mb-4">
          Lower likelihood of conception
        </p>
        <DateBands windows={safeWindows} type="safe" />
      </div>

      <div className="bg-white/5 border border-pink-500/20 rounded-2xl p-5 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-[#f0e6ff] mb-1">
          🌸 Fertile Window
        </h3>
        <p className="text-xs h-7 text-[#c084fc] mb-4">
          Higher likelihood of conception
        </p>
        <DateBands windows={fertileWindows} type="fertile" />
      </div>

      <GenderCard result={result} />

      <div className="bg-white/5 border border-red-500/20 rounded-2xl p-5 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-[#f0e6ff] mb-1">
          📅 Period Days
        </h3>
        <p className="text-xs h-7 text-[#c084fc] mb-4">
          Expected menstruation window
        </p>
        <DateBands windows={[[nextPeriodStart, nextPeriodEnd]]} type="period" />
      </div>

      {/* Calendar */}
      <CalendarView
        lastPeriod={nextPeriodStart}
        periodDates={periodDates}
        fertileDates={fertileDates}
        safeDates={safeDates}
      />

      {/* Disclaimer */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-[#c084fc]/70">
        ⚠️ <strong className="text-[#f0e6ff]">Disclaimer:</strong> This
        calculator provides an estimate based on average cycle patterns. It is{" "}
        <em>not</em> a reliable contraceptive method. For family planning or
        medical concerns, consult a healthcare professional.
      </div>
    </div>
  );
}
