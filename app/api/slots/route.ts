import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db";
import { env } from "@/lib/env";

const DEFAULT_SLOTS = [
    { id: "06:00 AM", session: "morning", slotNumber: 1, time: "06:00 AM - 07:00 AM", capacity: 30 },
    { id: "07:00 AM", session: "morning", slotNumber: 2, time: "07:00 AM - 08:00 AM", capacity: 30 },
    { id: "08:00 AM", session: "morning", slotNumber: 3, time: "08:00 AM - 09:00 AM", capacity: 30 },
    { id: "04:00 PM", session: "evening", slotNumber: 4, time: "04:00 PM - 05:00 PM", capacity: 30 },
    { id: "05:00 PM", session: "evening", slotNumber: 5, time: "05:00 PM - 06:00 PM", capacity: 30 },
    { id: "06:00 PM", session: "evening", slotNumber: 6, time: "06:00 PM - 07:00 PM", capacity: 30 },
    { id: "07:00 PM", session: "evening", slotNumber: 7, time: "07:00 PM - 08:00 PM", capacity: 30 },
];

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        jwt.verify(token, env.JWT_SECRET);

        const { searchParams } = new URL(req.url);
        const dateQuery = searchParams.get("date");
        const dateStr = dateQuery ? new Date(dateQuery).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

        // Build UTC start/end range to query today's bookings
        const startOfDay = new Date(dateStr);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(dateStr);
        endOfDay.setUTCHours(23, 59, 59, 999);

        const activeBookings = await prisma.booking.findMany({
            where: {
                date: { gte: startOfDay, lte: endOfDay },
                status: "active",
            },
        });

        const slots = DEFAULT_SLOTS.map((s) => {
            const bookedCount = activeBookings.filter((b) => b.slotTime === s.id).length;
            return {
                ...s,
                booked: bookedCount,
                date: dateStr,
            };
        });

        return NextResponse.json({ slots }, { status: 200 });
    } catch (error) {
        console.error("Fetch slots error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
