import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import bcrypt from "bcrypt"

export async function GET() {
  try {
    const email = "admin@ritindia.edu"
    const password = "admin123"
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role: "admin",
        name: "Sangramsinh Patil",
      },
      create: {
        email,
        password: hashedPassword,
        role: "admin",
        name: "Sangramsinh Patil",
      },
    })

    return NextResponse.json({ message: "Admin user set up successfully", email: user.email })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
