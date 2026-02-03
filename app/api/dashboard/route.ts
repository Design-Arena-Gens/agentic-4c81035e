import { NextResponse } from "next/server";
import { generateDashboardSnapshot } from "@/lib/notifications";

export async function GET() {
  const snapshot = generateDashboardSnapshot();
  return NextResponse.json(snapshot);
}

export const runtime = "nodejs";
