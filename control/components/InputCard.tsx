"use client";

import { useState } from "react";
import { CycleResult, calculateCycle } from "@/components/cycleUtils";

interface Props {
  onCalculate: (
    result: CycleResult,
    lastPeriod: string,
    cycleLength: number,
    periodDur: number,
  ) => void;
}

export default function InputCard({ onCalculate }: Props) {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [periodDur, setPeriodDur] = useState(5);
  const [loading, setLoading] = useState(false);

  function handleCalculate() {
    if (!lastPeriod) {
      alert("Please select the first day of your last period.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = calculateCycle(lastPeriod, cycleLength, periodDur);
      onCalculate(result, lastPeriod, cycleLength, periodDur);
      setLoading(false);
    }, 1500);
  }

  return (
    <section
      className="rounded-2xl w-full"
      style={{
        backgroundColor: "rgba(20, 10, 40, 0.85)",
        padding: "32px 24px",
      }}
    >
      {/* Title */}
      <h2
        className="text-2xl font-bold text-[#f472b6]"
        style={{ fontFamily: "var(--font-serif)", marginBottom: "40px" }}
      >
        Tell me about your cycle
      </h2>

      {/* Date Input */}
      <div style={{ marginBottom: "40px" }}>
        <label
          className="block text-xs  font-semibold tracking-widest text-[#c084fc] uppercase"
          style={{ marginBottom: "12px" }}
        >
          First Day of Last Period
        </label>
        <input
          type="date"
          value={lastPeriod}
          onChange={(e) => setLastPeriod(e.target.value)}
          className="w-full h-13 rounded-xl px-4 py-3 text-[#f0e6ff] outline-none transition"
          style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "none" }}
        />
      </div>

      {/* Cycle Length */}
      <div style={{ marginBottom: "40px" }}>
        <label
          className=" block text-xs font-semibold tracking-widest text-[#c084fc] uppercase"
          style={{ marginBottom: "12px" }}
        >
          Average Cycle Length
        </label>
        <div
          className="flex h-13 items-center justify-between rounded-xl px-4 py-3"
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

      {/* Period Duration */}
      <div style={{ marginBottom: "48px" }}>
        <label
          className="block text-xs font-semibold tracking-widest text-[#c084fc] uppercase"
          style={{ marginBottom: "12px" }}
        >
          Period Duration
        </label>
        <div
          className="flex h-13 items-center justify-between rounded-xl px-4 py-3"
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

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        disabled={loading}
        className="w-full py-4 h-16 rounded-xl text-white font-semibold text-lg transition flex items-center justify-center gap-3"
        style={{
          background: loading
            ? "linear-gradient(to right, #9333ea, #6366f1)"
            : "linear-gradient(to right, #ec4899, #8b5cf6)",
          opacity: loading ? 0.85 : 1,
        }}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
              />
            </svg>
            Calculating...
          </>
        ) : (
          "Calculate my cycle →"
        )}
      </button>
    </section>
  );
}
