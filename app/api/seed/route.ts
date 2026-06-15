// app/api/seed/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import guestData from '@/prisma/guest.json'

export async function POST() {
  try {
    // Check if guests already exist
    const existingGuests = await prisma.guest.count()
    if (existingGuests > 0) {
      return NextResponse.json(
        { message: 'Database already seeded' },
        { status: 400 }
      )
    }

    // Seed guests
    for (const guest of guestData) {
      await prisma.guest.create({
        data: {
          nama: guest.nama,
          nickname: guest.nickname,
        },
      })
    }

    return NextResponse.json({ message: 'Database seeded successfully' })
  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    )
  }
}
