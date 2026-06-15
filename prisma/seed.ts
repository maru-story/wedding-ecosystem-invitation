import { PrismaClient } from '@prisma/client'
import guestData from './guest.json'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await prisma.guest.deleteMany()

  // Seed guests
  for (const guest of guestData) {
    await prisma.guest.create({
      data: {
        id: guest.id,
        nama: guest.nama,
        nickname: guest.nickname,
      },
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
