/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all attendances or statistics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const stats = searchParams.get('stats')

    // If stats=true, return sum of jumlahTamu
    if (stats === 'true') {
      const result = await prisma.attendance.aggregate({
        _sum: {
          jumlahTamu: true,
        },
        _count: {
          id: true,
        },
      })

      // Get counts by konfirmasi type
      const akadCount = await prisma.attendance.count({
        where: { konfirmasi: 'Akad' },
      })

      const resepsiCount = await prisma.attendance.count({
        where: { konfirmasi: 'Resepsi' },
      })

      const akadResepsiCount = await prisma.attendance.count({
        where: { konfirmasi: 'Akad dan Resepsi' },
      })

      const tidakHadirCount = await prisma.attendance.count({
        where: { konfirmasi: 'Maaf, Saya belum bisa hadir' },
      })

      // Get sum of jumlahTamu by konfirmasi type
      const akadTamuSum = await prisma.attendance.aggregate({
        where: { konfirmasi: 'Akad' },
        _sum: { jumlahTamu: true },
      })

      const resepsiTamuSum = await prisma.attendance.aggregate({
        where: { konfirmasi: 'Resepsi' },
        _sum: { jumlahTamu: true },
      })

      const akadResepsiTamuSum = await prisma.attendance.aggregate({
        where: { konfirmasi: 'Akad dan Resepsi' },
        _sum: { jumlahTamu: true },
      })

      const tidakHadirTamuSum = await prisma.attendance.aggregate({
        where: { konfirmasi: 'Maaf, Saya belum bisa hadir' },
        _sum: { jumlahTamu: true },
      })

      return NextResponse.json({
        totalTamu: result._sum.jumlahTamu || 0,
        totalResponses: result._count.id || 0,
        breakdown: {
          akad: {
            count: akadCount,
            totalTamu: akadTamuSum._sum.jumlahTamu || 0,
          },
          resepsi: {
            count: resepsiCount,
            totalTamu: resepsiTamuSum._sum.jumlahTamu || 0,
          },
          akadResepsi: {
            count: akadResepsiCount,
            totalTamu: akadResepsiTamuSum._sum.jumlahTamu || 0,
          },
          tidakHadir: {
            count: tidakHadirCount,
            totalTamu: tidakHadirTamuSum._sum.jumlahTamu || 0,
          },
        },
      })
    }

    // Default: return all attendances
    const attendances = await prisma.attendance.findMany({
      include: {
        guest: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(attendances)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch attendances' },
      { status: 500 }
    )
  }
}

// POST create new attendance
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { guestId, nama, konfirmasi, jumlahTamu } = body

    const attendance = await prisma.attendance.create({
      data: {
        guestId,
        nama,
        konfirmasi,
        jumlahTamu,
      },
      include: {
        guest: true,
      },
    })

    return NextResponse.json(attendance, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create attendance' },
      { status: 500 }
    )
  }
}
