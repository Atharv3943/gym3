import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db";
import { env } from "@/lib/env";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string };

    const { weight, date } = await req.json();

    if (!weight || !date) {
      return NextResponse.json({ message: "Weight and date are required" }, { status: 400 });
    }

    const newProgress = await prisma.progress.create({
      data: {
        userId: decoded.userId,
        weight: Number(weight),
        date: new Date(date),
      }
    });

    return NextResponse.json(
      { message: "Progress logged successfully", progress: newProgress },
      { status: 201 }
    );
  } catch (error) {
    console.error("Log progress error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
