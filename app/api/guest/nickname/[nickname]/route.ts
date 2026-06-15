/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface Params {
  params: Promise<{
    nickname: string
  }>
}

// GET guest by nickname (for invitation URLs)
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { nickname } = await params

    const guest = await prisma.guest.findUnique({
      where: {
        nickname: nickname,
      },
      include: {
        attendances: true,
        messages: true,
      },
    })

    if (!guest) {
      return NextResponse.json({ error: 'Guest not found' }, { status: 404 })
    }

    return NextResponse.json(guest)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch guest' },
      { status: 500 }
    )
  }
}
