"use client";

import { isSameDay, dateInSet } from "@/components/cycleUtils";

interface Props {
  lastPeriod: Date;
  periodDates: Date[];
  fertileDates: Date[];
  safeDates: Date[];
}

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function CalendarMonth({
  year,
  month,
  periodDates,
  fertileDates,
  safeDates,
  today,
}: {
  year: number;
  month: number;
  periodDates: Date[];
  fertileDates: Date[];
  safeDates: Date[];
  today: Date;
}) {
  const monthName = new Date(year, month).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  function getDayClass(date: Date): string {
    if (dateInSet(date, periodDates))
      return "bg-red-500/40 text-red-200 font-semibold";
    if (dateInSet(date, fertileDates))
      return "bg-pink-500/40 text-pink-200 font-semibold";
    if (dateInSet(date, safeDates))
      return "bg-green-500/30 text-green-200 font-semibold";
    return "text-[#f0e6ff]/50";
  }

  return (
    <div className="mb-6">
      <div className="text-center font-bold text-[#c084fc] mb-3 text-sm tracking-wide uppercase">
        {monthName}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {DAY_NAMES.map((d) => (
          <div
            key={d}
            className="text-center text-xs text-[#c084fc]/60 font-medium py-1"
          >
            {d}
          </div>
        ))}

        {/* Empty cells */}
        {Array.from({ length: firstDow }).map((_, i) => (
          <div key={"e" + i} />
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(year, month, day);
          const isToday = isSameDay(date, today);

          return (
            <div
              key={day}
              className={
                "flex items-center justify-center rounded-full w-8 h-8 mx-auto text-xs transition " +
                getDayClass(date) +
                (isToday
                  ? " ring-2 ring-[#c084fc] ring-offset-1 ring-offset-[#0d0d1a]"
                  : "")
              }
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CalendarView({
  lastPeriod,
  periodDates,
  fertileDates,
  safeDates,
}: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const months = [0, 1].map((offset) => {
    const d = new Date(
      lastPeriod.getFullYear(),
      lastPeriod.getMonth() + offset,
      1,
    );
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
      <h3 className="text-lg font-bold text-[#f0e6ff] mb-4">📅 Monthly View</h3>

      {/* Legend */}
      <div className="flex gap-4 mb-5 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <span className="text-[#f0e6ff]/70">Period</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-pink-500/60" />
          <span className="text-[#f0e6ff]/70">Fertile</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
          <span className="text-[#f0e6ff]/70">Safe</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-[#c084fc]" />
          <span className="text-[#f0e6ff]/70">Today</span>
        </div>
      </div>

      {/* Months */}
      {months.map(({ year, month }) => (
        <CalendarMonth
          key={year + "-" + month}
          year={year}
          month={month}
          periodDates={periodDates}
          fertileDates={fertileDates}
          safeDates={safeDates}
          today={today}
        />
      ))}
    </div>
  );
}
