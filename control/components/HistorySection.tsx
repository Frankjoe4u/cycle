"use client";

import { useState } from "react";
import {
  HistoryEntry,
  deleteEntry,
  clearHistory,
} from "@/components/historyUtils";

interface Props {
  history: HistoryEntry[];
  onUpdate: () => void;
}

function formatShort(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function HistorySection({ history, onUpdate }: Props) {
  const [confirmClear, setConfirmClear] = useState(false);

  if (!history.length) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-sm">
        <div className="text-3xl mb-2">📭</div>
        <p className="text-sm text-[#c084fc]">
          No history yet. Calculate your first cycle above!
        </p>
      </div>
    );
  }

  function handleDelete(id: string) {
    deleteEntry(id);
    onUpdate();
  }

  function handleClear() {
    if (confirmClear) {
      clearHistory();
      onUpdate();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#f0e6ff]">📋 Cycle History</h3>
        <button
          onClick={handleClear}
          className={
            "text-xs px-3 py-1 rounded-lg border transition " +
            (confirmClear
              ? "bg-red-500/30 border-red-400/50 text-red-300"
              : "bg-white/5 border-white/10 text-[#c084fc] hover:bg-white/10")
          }
        >
          {confirmClear ? "Tap again to confirm" : "Clear all"}
        </button>
      </div>

      {history.map((entry) => (
        <div
          key={entry.id}
          className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-xs text-[#c084fc]/60 mb-1">
                Saved {formatShort(entry.savedAt)}
              </div>
              <div className="text-sm text-[#f0e6ff] font-semibold">
                Last Period: {formatShort(entry.lastPeriod + "T12:00:00")}
              </div>
            </div>
            <button
              onClick={() => handleDelete(entry.id)}
              className="text-[#c084fc]/40 hover:text-red-400 transition text-lg leading-none"
            >
              ✕
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <div className="text-xs text-[#c084fc] mb-1">Next Period</div>
              <div className="text-sm font-bold text-red-300">
                {formatShort(entry.nextPeriodStart)}
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <div className="text-xs text-[#c084fc] mb-1">Ovulation</div>
              <div className="text-sm font-bold text-pink-300">
                {formatShort(entry.ovulationDay)}
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <div className="text-xs text-[#c084fc] mb-1">Cycle Length</div>
              <div className="text-sm font-bold text-[#f0e6ff]">
                {entry.cycleLength} days
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <div className="text-xs text-[#c084fc] mb-1">Period Duration</div>
              <div className="text-sm font-bold text-[#f0e6ff]">
                {entry.periodDur} days
              </div>
            </div>
          </div>

          {/* Gender */}
          <div className="flex gap-2">
            <div className="flex-1 bg-blue-500/10 border border-blue-400/20 rounded-xl p-2 text-center">
              <div className="text-xs text-blue-300 mb-1">👦 Boy</div>
              <div className="text-sm font-bold text-blue-200">
                {entry.boyPct}%
              </div>
            </div>
            <div className="flex-1 bg-pink-500/10 border border-pink-400/20 rounded-xl p-2 text-center">
              <div className="text-xs text-pink-300 mb-1">👧 Girl</div>
              <div className="text-sm font-bold text-pink-200">
                {entry.girlPct}%
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
