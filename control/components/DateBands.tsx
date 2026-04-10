import { formatDateShort, isSameDay, dayDiff } from "@/components/cycleUtils";

interface Props {
  windows: [Date, Date][];
  type: "safe" | "fertile" | "period";
}

const colorMap = {
  safe: "bg-green-500/10 border-green-500/30 text-green-300",
  fertile: "bg-pink-500/10 border-pink-500/30 text-pink-300",
  period: "bg-red-500/10 border-red-500/30 text-red-300",
};

export default function DateBands({ windows, type }: Props) {
  if (!windows.length) {
    return <p className="text-sm text-[#c084fc]/60">No days in this window</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {windows.map(([s, e], i) => {
        const same = isSameDay(s, e);
        return (
          <div
            key={i}
            className={
              "flex justify-between items-center border rounded-xl px-4 py-3 " +
              colorMap[type]
            }
          >
            <span className="font-medium text-sm">
              {formatDateShort(s)}
              {!same && " — " + formatDateShort(e)}
            </span>
            <span className="text-xs opacity-70">
              {same ? "1 day" : dayDiff(s, e) + " days"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
