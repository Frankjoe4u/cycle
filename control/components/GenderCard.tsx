"use client";

import { useState } from "react";
import { CycleResult } from "@/components/cycleUtils";
import DateBands from "@/components/DateBands";

interface Props {
  result: CycleResult;
}

export default function GenderCard({ result }: Props) {
  const [activeTab, setActiveTab] = useState<"boy" | "girl">("boy");

  const {
    boyPct,
    girlPct,
    boyOptimalStart,
    boyOptimalEnd,
    girlOptimalStart,
    girlOptimalEnd,
  } = result;

  const boyOffset = 157 - (boyPct / 100) * 157;
  const girlOffset = 157 - (girlPct / 100) * 157;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
      <h3 className="text-lg font-bold text-[#f0e6ff] mb-1">
        👶 Gender Likelihood
      </h3>
      <p className="text-xs text-[#c084fc] mb-4">
        Based on the Shettles Method — timing of conception within the fertile
        window
      </p>

      {/* Tabs */}
      <div className="flex gap-3 mb-5">
        <button
          onClick={() => setActiveTab("boy")}
          className={
            "flex-1 py-2 rounded-xl font-semibold text-sm transition " +
            (activeTab === "boy"
              ? "bg-blue-500/30 border border-blue-400/50 text-blue-200"
              : "bg-white/5 border border-white/10 text-[#c084fc] hover:bg-white/10")
          }
        >
          👦 Boy
        </button>
        <button
          onClick={() => setActiveTab("girl")}
          className={
            "flex-1 py-2 rounded-xl font-semibold text-sm transition " +
            (activeTab === "girl"
              ? "bg-pink-500/30 border border-pink-400/50 text-pink-200"
              : "bg-white/5 border border-white/10 text-[#c084fc] hover:bg-white/10")
          }
        >
          👧 Girl
        </button>
      </div>

      {/* Boy Panel */}
      {activeTab === "boy" && (
        <div>
          {/* Percentage */}
          <div className="flex flex-col items-center mb-4">
            <div className="text-5xl font-bold text-blue-300">{boyPct}%</div>
            <div className="text-xs text-[#c084fc] mt-1">likelihood</div>
          </div>

          {/* Arc */}
          <div className="flex justify-center mb-4">
            <svg
              viewBox="0 0 120 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-40"
            >
              <path
                d="M10,60 A50,50 0 0,1 110,60"
                stroke="#1e293b"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M10,60 A50,50 0 0,1 110,60"
                stroke="#60a5fa"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="157"
                strokeDashoffset={boyOffset}
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
              />
            </svg>
          </div>

          {/* Tip */}
          <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-4 mb-4 text-sm text-[#f0e6ff]">
            <strong>Best window for a boy:</strong> Conceive as close to
            ovulation as possible (1 day before or on ovulation day). Y-sperm
            are faster but shorter-lived.
          </div>

          <div className="text-xs text-[#c084fc] mb-2">Optimal days:</div>
          <DateBands
            windows={[[boyOptimalStart, boyOptimalEnd]]}
            type="fertile"
          />
        </div>
      )}

      {/* Girl Panel */}
      {activeTab === "girl" && (
        <div>
          {/* Percentage */}
          <div className="flex flex-col items-center mb-4">
            <div className="text-5xl font-bold text-pink-300">{girlPct}%</div>
            <div className="text-xs text-[#c084fc] mt-1">likelihood</div>
          </div>

          {/* Arc */}
          <div className="flex justify-center mb-4">
            <svg
              viewBox="0 0 120 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-40"
            >
              <path
                d="M10,60 A50,50 0 0,1 110,60"
                stroke="#1e293b"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M10,60 A50,50 0 0,1 110,60"
                stroke="#f472b6"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="157"
                strokeDashoffset={girlOffset}
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
              />
            </svg>
          </div>

          {/* Tip */}
          <div className="bg-pink-500/10 border border-pink-400/20 rounded-xl p-4 mb-4 text-sm text-[#f0e6ff]">
            <strong>Best window for a girl:</strong> Conceive 3–5 days before
            ovulation. X-sperm are slower but survive longer, so they'll still
            be waiting when the egg is released.
          </div>

          <div className="text-xs text-[#c084fc] mb-2">Optimal days:</div>
          <DateBands
            windows={[[girlOptimalStart, girlOptimalEnd]]}
            type="safe"
          />
        </div>
      )}

      {/* Shettles Note */}
      <div className="mt-5 text-xs text-[#c084fc]/70 border-t border-white/10 pt-4">
        📖 Based on the <em>Shettles Method</em>. This is a popular theory — not
        a medically guaranteed outcome. The actual probability of any conception
        resulting in a boy or girl is approximately 50/50.
      </div>
    </div>
  );
}
