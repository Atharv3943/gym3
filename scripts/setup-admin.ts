import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
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

  console.log("Admin user set up successfully:", user.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
