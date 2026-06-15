import SectionAkad from '@/components/common/section-akad';
import SectionAttire from '@/components/common/section-attire';
import SectionBride from '@/components/common/section-bride';
import SectionCountdown from '@/components/common/section-countdown';
import SectionDoa from '@/components/common/section-doa';
import SectionGift from '@/components/common/section-gift';
import SectionGroom from '@/components/common/section-groom';
import SectionHome from '@/components/common/section-home-with-loading';
import SectionKonfirmasi from '@/components/common/section-konfirmasi';
import SectionMusic from '@/components/common/section-music';
import SectionPengantin from '@/components/common/section-pengantin';
import SectionPenutup from '@/components/common/section-penutup';
import SectionPesan from '@/components/common/section-pesan';
import SectionPhoto from '@/components/common/section-photo';
import SectionStory from '@/components/common/section-story';
import SectionVideo from '@/components/common/section-video';
import { fetchInvitationData } from '@/lib/api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FC } from 'react';

interface PageProps {
  params: Promise<{ eventSlug: string }>;
  searchParams: Promise<{ to?: string }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { eventSlug } = await params;
  const { to: guestSlug } = await searchParams;

  if (!guestSlug) {
    return {
      title: 'Undangan Pernikahan',
      description: 'Undangan pernikahan digital',
    };
  }

  const data = await fetchInvitationData(eventSlug, guestSlug);

  if (!data) {
    return {
      title: 'Undangan Tidak Ditemukan',
      description: 'Undangan yang Anda cari tidak tersedia.',
    };
  }

  const rawTitle = data.event.share_title || `Undangan Pernikahan ${data.event.bride_name} & ${data.event.groom_name}`;
  const title = rawTitle.replace(/{guest}/g, data.guest.name);

  const rawDescription = data.event.share_description || `Kepada Yth. Bapak/Ibu/Saudara/i {guest}, kami mengundang Anda untuk menghadiri hari bahagia pernikahan ${data.event.bride_name} & ${data.event.groom_name}.`;
  const description = rawDescription.replace(/{guest}/g, data.guest.name);

  let shareImage = data.event.share_image_url || '';
  if (!shareImage) {
    shareImage = '/thumbnail.jpeg';
  }

  const origin = process.env.INVITATION_ORIGIN || 'https://maruplanner.com';
  const imageUrl = shareImage.startsWith('http') ? shareImage : `${origin.replace(/\/$/, '')}/${shareImage.replace(/^\//, '')}`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Pernikahan ${data.event.bride_name} & ${data.event.groom_name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl],
    },
  };
}

const Page: FC<PageProps> = async ({ params, searchParams }) => {
  const { eventSlug } = await params;
  const { to: guestSlug } = await searchParams;

  if (!guestSlug) {
    notFound();
  }

  // Fetch invitation data from API
  const data = await fetchInvitationData(eventSlug, guestSlug);

  if (!data) {
    notFound();
  }

  const { event, guest } = data;

  // Adapt guest to match the expected format for SectionKonfirmasi & SectionPesan
  const adaptedGuest = {
    id: guest.id,
    nama: guest.name,
    nickname: guest.slug,
  };

  return (
    <main className="container min-h-[100dvh] overflow-x-hidden">
      <SectionMusic />

      <SectionHome name={guest.name} />

      <SectionPengantin />

      <SectionStory />

      <SectionDoa />

      <SectionBride />

      <SectionGroom />

      <SectionCountdown />

      <SectionAkad />

      <SectionKonfirmasi guest={adaptedGuest} eventId={event.id} />

      <SectionAttire />

      <SectionPhoto />

      <SectionVideo />

      <SectionGift />

      <SectionPesan guest={adaptedGuest} eventId={event.id} />

      <SectionPenutup />
    </main>
  );
};

export default Page;
