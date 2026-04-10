import { CycleResult } from "@/components/cycleUtils";

export interface HistoryEntry {
  id: string;
  savedAt: string;
  lastPeriod: string;
  cycleLength: number;
  periodDur: number;
  nextPeriodStart: string;
  ovulationDay: string;
  boyPct: number;
  girlPct: number;
}

const STORAGE_KEY = "fj_tracker_history";

export function saveToHistory(
  lastPeriod: string,
  cycleLength: number,
  periodDur: number,
  result: CycleResult,
): void {
  const entry: HistoryEntry = {
    id: Date.now().toString(),
    savedAt: new Date().toISOString(),
    lastPeriod,
    cycleLength,
    periodDur,
    nextPeriodStart: result.nextPeriodStart.toISOString(),
    ovulationDay: result.ovulationDay.toISOString(),
    boyPct: result.boyPct,
    girlPct: result.girlPct,
  };

  const existing = getHistory();
  const updated = [entry, ...existing].slice(0, 20); // keep last 20
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function deleteEntry(id: string): void {
  const updated = getHistory().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
