import { NextResponse } from "next/server"
import prisma from "@/lib/db"

// Get settings
export async function GET() {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: "config" }
    })
    return NextResponse.json(settings || {})
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

// Update settings (In real app, add auth middleware)
export async function POST(req: Request) {
  try {
    const data = await req.json()
    const settings = await prisma.settings.upsert({
      where: { id: "config" },
      update: {
        aboutText: data.aboutText,
        timings: data.timings,
        contactPhone: data.contactPhone,
        contactEmail: data.contactEmail,
        address: data.address,
      },
      create: {
        id: "config",
        aboutText: data.aboutText,
        timings: data.timings,
        contactPhone: data.contactPhone,
        contactEmail: data.contactEmail,
        address: data.address,
      }
    })
    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
