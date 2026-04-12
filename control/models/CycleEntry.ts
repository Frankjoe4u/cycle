import mongoose, { Schema, Document } from "mongoose";

export interface ICycleEntry extends Document {
  lastPeriod: string;
  cycleLength: number;
  periodDur: number;
  nextPeriodStart: string;
  ovulationDay: string;
  boyPct: number;
  girlPct: number;
  createdAt: Date;
}

const CycleEntrySchema = new Schema<ICycleEntry>({
  lastPeriod: { type: String, required: true },
  cycleLength: { type: Number, required: true },
  periodDur: { type: Number, required: true },
  nextPeriodStart: { type: String, required: true },
  ovulationDay: { type: String, required: true },
  boyPct: { type: Number, required: true },
  girlPct: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.CycleEntry ||
  mongoose.model<ICycleEntry>("CycleEntry", CycleEntrySchema);
