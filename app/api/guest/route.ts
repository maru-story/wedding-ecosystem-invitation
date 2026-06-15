/* eslint-disable @typescript-eslint/no-explicit-any */
// Update your app/api/guest/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all guests
export async function GET() {
  try {
    const guests = await prisma.guest.findMany({
      include: {
        attendances: true,
        messages: true,
      },
      orderBy: {
        id: 'desc',
      },
    })

    return NextResponse.json(guests)
  } catch (error) {
    console.error('GET /api/guest error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guests' },
      { status: 500 }
    )
  }
}

// POST create new guest
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { nama, nickname, id } = body

    // Validation
    if (!nama || !nickname) {
      return NextResponse.json(
        { error: 'Nama and nickname are required' },
        { status: 400 }
      )
    }

    // Check if nickname already exists
    const existingGuest = await prisma.guest.findUnique({
      where: { nickname: nickname.trim() },
    })

    if (existingGuest) {
      return NextResponse.json(
        { error: 'Nickname already exists' },
        { status: 409 }
      )
    }

    // Create the guest
    const guest = await prisma.guest.create({
      data: {
        nama: nama.trim(),
        nickname: nickname.trim(),
        id,
      },
    })

    console.log('Created guest:', guest) // Debug log

    return NextResponse.json(guest, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/guest error:', error)

    // Handle Prisma unique constraint error
    if (error.code === 'P2002') {
      console.log(error)

      return NextResponse.json(
        { error: 'Nickname must be unique' },
        { status: 409 }
      )
    }

    // Handle other database errors
    if (error.code?.startsWith('P')) {
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create guest' },
      { status: 500 }
    )
  }
}
