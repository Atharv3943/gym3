import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db";
import { env } from "@/lib/env";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, env.JWT_SECRET) as { role: string; userId: string };

    let bookings;
    if (decoded.role === "admin") {
      bookings = await prisma.booking.findMany({
        include: { user: { select: { name: true, email: true } } },
        orderBy: { date: 'desc' },
      });
    } else {
      bookings = await prisma.booking.findMany({
        where: { userId: decoded.userId },
        orderBy: { date: 'desc' },
      });
    }

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string };

    const body = await req.json();
    const { slotTime, date } = body;

    if (!slotTime || !date) {
      return NextResponse.json({ message: "Missing slotTime or date" }, { status: 400 });
    }

    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const existingBooking = await prisma.booking.findFirst({
      where: {
        userId: decoded.userId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: "active",
      },
    });

    if (existingBooking) {
      return NextResponse.json({ message: "You already have an active booking for this date." }, { status: 409 });
    }

    const newBooking = await prisma.booking.create({
      data: {
        userId: decoded.userId,
        slotTime,
        date: new Date(date),
      },
      include: {
        user: { select: { name: true } }
      }
    });

    return NextResponse.json(
      { message: "Booking successful", booking: newBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
