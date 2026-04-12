export function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateShort(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function dateInSet(date: Date, set: Date[]): boolean {
  return set.some((d) => isSameDay(d, date));
}

export function dateRange(start: Date, end: Date): Date[] {
  const days: Date[] = [];
  let cur = new Date(start);
  while (cur <= end) {
    days.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return days;
}

export function dayDiff(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

export function groupContiguous(dates: Date[]): [Date, Date][] {
  if (!dates.length) return [];
  const sorted = [...dates].sort((a, b) => a.getTime() - b.getTime());
  const groups: [Date, Date][] = [];
  let start = sorted[0];
  let end = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    const diff = (sorted[i].getTime() - end.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      end = sorted[i];
    } else {
      groups.push([new Date(start), new Date(end)]);
      start = sorted[i];
      end = sorted[i];
    }
  }
  groups.push([new Date(start), new Date(end)]);
  return groups;
}

export interface CycleResult {
  lastPeriod: Date;
  nextPeriodStart: Date;
  nextPeriodEnd: Date;
  ovulationDay: Date;
  periodDates: Date[];
  fertileDates: Date[];
  safeDates: Date[];
  safeWindows: [Date, Date][];
  fertileWindows: [Date, Date][];
  boyPct: number;
  girlPct: number;
  boyOptimalStart: Date;
  boyOptimalEnd: Date;
  girlOptimalStart: Date;
  girlOptimalEnd: Date;
}

export function calculateCycle(
  lastPeriodInput: string,
  cycleLength: number,
  periodDur: number,
): CycleResult {
  const lastPeriod = new Date(lastPeriodInput);

  // ── Current period (what user entered)
  const currentPeriodEnd = addDays(lastPeriod, periodDur - 1);
  const currentPeriodDates = dateRange(lastPeriod, currentPeriodEnd);

  // ── Next period
  const nextPeriodStart = addDays(lastPeriod, cycleLength);
  const nextPeriodEnd = addDays(nextPeriodStart, periodDur - 1);
  const nextPeriodDates = dateRange(nextPeriodStart, nextPeriodEnd);

  // ── Combine both periods
  const periodDates = [...currentPeriodDates, ...nextPeriodDates];

  // ── Ovulation (14 days before next period)
  const ovulationDay = addDays(nextPeriodStart, -14);

  // ── Fertile window
  const fertileStart = addDays(ovulationDay, -5);
  const fertileEnd = addDays(ovulationDay, 1);
  const fertileDates = dateRange(fertileStart, fertileEnd);

  // ── Safe days
  const cycleStart = addDays(lastPeriod, periodDur);
  const cycleEnd = addDays(nextPeriodStart, -1);
  const allCycleDays = dateRange(cycleStart, cycleEnd);
  const safeDates = allCycleDays.filter((d) => !dateInSet(d, fertileDates));

  const safeWindows = groupContiguous(safeDates);
  const fertileWindows = groupContiguous(fertileDates);

  const boyOptimalStart = addDays(ovulationDay, -1);
  const boyOptimalEnd = new Date(ovulationDay);
  const girlOptimalStart = addDays(ovulationDay, -5);
  const girlOptimalEnd = addDays(ovulationDay, -3);

  let boyScore = 0;
  let girlScore = 0;

  fertileDates.forEach((d) => {
    const daysFromOv = Math.round(
      (d.getTime() - ovulationDay.getTime()) / (1000 * 60 * 60 * 24),
    );
    const b = Math.max(0, 1 - Math.abs(daysFromOv) * 0.35);
    const g = Math.max(0, 1 - Math.abs(daysFromOv + 4) * 0.25);
    boyScore += b;
    girlScore += g;
  });

  const total = boyScore + girlScore || 1;
  const boyPct = Math.round((boyScore / total) * 100);
  const girlPct = Math.round((girlScore / total) * 100);

  return {
    lastPeriod,
    nextPeriodStart,
    nextPeriodEnd,
    ovulationDay,
    periodDates,
    fertileDates,
    safeDates,
    safeWindows,
    fertileWindows,
    boyPct,
    girlPct,
    boyOptimalStart,
    boyOptimalEnd,
    girlOptimalStart,
    girlOptimalEnd,
  };
}
