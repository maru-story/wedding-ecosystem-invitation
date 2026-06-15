import SectionAkad from '@/components/common/section-akad'
import SectionAttire from '@/components/common/section-attire'
import SectionBride from '@/components/common/section-bride'
import SectionCountdown from '@/components/common/section-countdown'
import SectionDoa from '@/components/common/section-doa'
import SectionGift from '@/components/common/section-gift'
import SectionGroom from '@/components/common/section-groom'
import SectionHome from '@/components/common/section-home-with-loading'
import SectionKonfirmasi from '@/components/common/section-konfirmasi'
import SectionMusic from '@/components/common/section-music'
import SectionPengantin from '@/components/common/section-pengantin'
import SectionPenutup from '@/components/common/section-penutup'
import SectionPesan from '@/components/common/section-pesan'
import SectionPhoto from '@/components/common/section-photo'
import SectionStory from '@/components/common/section-story'
import SectionVideo from '@/components/common/section-video'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FC } from 'react'

// Update the interface to use Promise for params
interface PageProps {
  params: Promise<{
    nama: string
  }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { nama } = await params

  try {
    const guest = await prisma.guest.findUnique({
      where: { nickname: nama },
    })

    if (guest) {
      const title = `Wedding Invitation for ${guest?.nama} | Gina & Panji`
      const description = `Personal wedding invitation for ${guest?.nama} - Gina & Panji's Wedding`
      return {
        title: title,
        description: description,
        openGraph: {
          title: title,
          description: description,
          type: 'website',
          images: ['/thumbnail.jpeg'],
        },
        twitter: {
          title: title,
          description: description,
          card: 'summary_large_image',
          images: ['/thumbnail.jpeg'],
        },
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
  }

  return {
    title: 'Wedding Invitation | Gina & Panji',
    description: 'Wedding invitation for Gina & Panji',
    openGraph: {
      title: 'Wedding Invitation | Gina & Panji',
      description: 'Wedding invitation for Gina & Panji',
      type: 'website',
      images: ['/thumbnail.jpeg'],
    },
    twitter: {
      title: 'Wedding Invitation | Gina & Panji',
      description: 'Wedding invitation for Gina & Panji',
      card: 'summary_large_image',
      images: ['/thumbnail.jpeg'],
    },
  }
}

// The rest of your code remains the same
const Page: FC<PageProps> = async ({ params }) => {
  const { nama } = await params

  if (!nama) {
    notFound()
  }

  // Fetch guest data by nickname using Prisma directly
  const guest = await prisma.guest.findUnique({
    where: { nickname: nama },
  })

  // If guest not found, show 404
  if (!guest) {
    notFound()
  }

  return (
    <main className="container min-h-[100dvh] overflow-x-hidden">
      <SectionMusic />

      <SectionHome name={guest.nama} />

      <SectionPengantin />

      <SectionStory />

      <SectionDoa />

      <SectionBride />

      <SectionGroom />

      <SectionCountdown />

      <SectionAkad />

      <SectionKonfirmasi guest={guest} />

      <SectionAttire />

      <SectionPhoto />

      <SectionVideo />

      <SectionGift />

      <SectionPesan guest={guest} />

      <SectionPenutup />
    </main>
  )
}

export default Page
