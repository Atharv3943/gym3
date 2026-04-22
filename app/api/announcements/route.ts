export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    // 🔥 Prevent build-time execution
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return NextResponse.json([]);
    }

    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(announcements);
  } catch (error) {
    console.error("Fetch announcements error:", error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    return NextResponse.json(
      { message: "POST disabled during build" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}