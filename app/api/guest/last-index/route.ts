import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const lastGuest = await prisma.guest.findFirst({
      orderBy: {
        id: 'desc',
      },
    })
    return NextResponse.json(lastGuest?.id || 0)
  } catch (error) {
    console.error('GET /api/guest/last-index error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guests' },
      { status: 500 }
    )
  }
}
