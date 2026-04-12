import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import CycleEntry from "../../../models/CycleEntry";

// Save a new cycle entry
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const entry = await CycleEntry.create(body);
    return NextResponse.json({ success: true, entry });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

// Get all cycle entries
export async function GET() {
  try {
    await connectDB();
    const entries = await CycleEntry.find().sort({ createdAt: -1 });
    const total = await CycleEntry.countDocuments();
    return NextResponse.json({ success: true, entries, total });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
