import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db";
import { env } from "@/lib/env";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string, role: string };

        // Only admins or the actual user can fetch their progress
        if (decoded.role !== "admin" && decoded.userId !== params.userId) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        const progressData = await prisma.progress.findMany({
            where: { userId: params.userId },
            orderBy: { date: 'asc' }, // Ascending for typical charting
        });

        return NextResponse.json(progressData, { status: 200 });
    } catch (error) {
        console.error("Fetch progress error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
