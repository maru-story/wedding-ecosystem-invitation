/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all messages
export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      include: {
        guest: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

// POST create new message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { guestId, message, name } = body

    const newMessage = await prisma.message.create({
      data: {
        guestId,
        message,
        name,
      },
      include: {
        guest: true,
      },
    })

    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    )
  }
}
