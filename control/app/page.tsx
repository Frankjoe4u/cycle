"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import InputCard from "@/components/InputCard";
import ResultsSection from "@/components/ResultsSection";
import HistorySection from "@/components/HistorySection";
import { CycleResult } from "@/components/cycleUtils";
import {
  saveToHistory,
  getHistory,
  HistoryEntry,
} from "@/components/historyUtils";

export default function Home() {
  const [result, setResult] = useState<CycleResult | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"tracker" | "history">("tracker");

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  function handleCalculate(
    res: CycleResult,
    lastPeriod: string,
    cycleLength: number,
    periodDur: number,
  ) {
    setResult(res);
    saveToHistory(lastPeriod, cycleLength, periodDur, res);
    setHistory(getHistory());
  }

  function refreshHistory() {
    setHistory(getHistory());
  }

  return (
    <main className="max-w-xl mx-auto px-4 pb-16">
      <Navbar />

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab("tracker")}
          className={
            "flex-1 py-3 rounded-xl font-semibold text-sm transition " +
            (activeTab === "tracker"
              ? "bg-gradient-to-r from-[#c084fc] to-[#818cf8] text-white shadow-lg shadow-purple-900/40"
              : "bg-white/5 border border-white/10 text-[#c084fc] hover:bg-white/10")
          }
        >
          🩸 Tracker
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={
            "flex-1 py-3 rounded-xl font-semibold text-sm transition " +
            (activeTab === "history"
              ? "bg-gradient-to-r from-[#c084fc] to-[#818cf8] text-white shadow-lg shadow-purple-900/40"
              : "bg-white/5 border border-white/10 text-[#c084fc] hover:bg-white/10")
          }
        >
          {"📋 History" +
            (history.length > 0 ? " (" + history.length + ")" : "")}
        </button>
      </div>

      {activeTab === "tracker" && (
        <>
          <InputCard onCalculate={handleCalculate} />
          {result && <ResultsSection result={result} />}
        </>
      )}

      {activeTab === "history" && (
        <HistorySection history={history} onUpdate={refreshHistory} />
      )}
    </main>
  );
}