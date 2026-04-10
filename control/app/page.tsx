"use client";

import { useState } from "react";
import { CycleResult, calculateCycle } from "@/components/cycleUtils";

interface Props {
  onCalculate: (
    res: CycleResult,
    lastPeriod: string,
    cycleLength: number,
    periodDur: number,
  ) => void;
}

export default function InputCard({ onCalculate }: Props) {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [periodDur, setPeriodDur] = useState(5);

  function handleCalculate() {
    if (!lastPeriod) {
      alert("Please select the first day of your last period.");
      return;
    }
    const result = calculateCycle(lastPeriod, cycleLength, periodDur);
    onCalculate(result, lastPeriod, cycleLength, periodDur);
  }

  return (
    <section
      className="rounded-2xl p-6 mb-6"
      style={{ backgroundColor: "rgba(20, 10, 40, 0.85)" }}
    >
      <h2
        className="text-2xl font-bold mb-6 text-[#f472b6]"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Tell me about your cycle
      </h2>

      <div className="mb-6">
        <label className="block text-xs font-semibold tracking-widest text-[#c084fc] mb-2 uppercase">
          First Day of Last Period
        </label>
        <input
          type="date"
          value={lastPeriod}
          onChange={(e) => setLastPeriod(e.target.value)}
          className="w-full rounded-xl px-4 py-3 text-[#f0e6ff] outline-none focus:border-[#c084fc] transition"
          style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "none" }}
        />
      </div>

      <div className="mb-6">
        <label className="block text-xs font-semibold tracking-widest text-[#c084fc] mb-2 uppercase">
          Average Cycle Length
        </label>
        <div
          className="flex items-center justify-between rounded-xl px-4 py-3"
          style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
        >
          <button
            onClick={() => setCycleLength((v) => Math.max(21, v - 1))}
            className="w-9 h-9 rounded-full flex items-center justify-center text-xl text-[#f0e6ff] hover:bg-[#c084fc]/30 transition"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            −
          </button>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-[#a78bfa]">
              {cycleLength}
            </span>
            <span className="text-sm text-[#c084fc]">days</span>
          </div>
          <button
            onClick={() => setCycleLength((v) => Math.min(40, v + 1))}
            className="w-9 h-9 rounded-full flex items-center justify-center text-xl text-[#f0e6ff] hover:bg-[#c084fc]/30 transition"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            +
          </button>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-xs font-semibold tracking-widest text-[#c084fc] mb-2 uppercase">
          Period Duration
        </label>
        <div
          className="flex items-center justify-between rounded-xl px-4 py-3"
          style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
        >
          <button
            onClick={() => setPeriodDur((v) => Math.max(2, v - 1))}
            className="w-9 h-9 rounded-full flex items-center justify-center text-xl text-[#f0e6ff] hover:bg-[#c084fc]/30 transition"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            −
          </button>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-[#a78bfa]">
              {periodDur}
            </span>
            <span className="text-sm text-[#c084fc]">days</span>
          </div>
          <button
            onClick={() => setPeriodDur((v) => Math.min(10, v + 1))}
            className="w-9 h-9 rounded-full flex items-center justify-center text-xl text-[#f0e6ff] hover:bg-[#c084fc]/30 transition"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full py-4 rounded-xl text-white font-semibold text-lg hover:opacity-90 transition"
        style={{ background: "linear-gradient(to right, #ec4899, #8b5cf6)" }}
      >
        Calculate my cycle →
      </button>
    </section>
  );
}
