import FloatingQr from '@/components/common/floating-qr';
import SectionHome from '@/components/common/section-home-with-loading';
import SectionMusic from '@/components/common/section-music';
import { fetchInvitationData } from '@/lib/api';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import React, { FC } from 'react';

const SectionPengantin = dynamic(() => import('@/components/common/section-pengantin'));
const SectionStory = dynamic(() => import('@/components/common/section-story'));
const SectionDoa = dynamic(() => import('@/components/common/section-doa'));
const SectionBride = dynamic(() => import('@/components/common/section-bride'));
const SectionGroom = dynamic(() => import('@/components/common/section-groom'));
const SectionCountdown = dynamic(() => import('@/components/common/section-countdown'));
const SectionAkad = dynamic(() => import('@/components/common/section-akad'));
const SectionKonfirmasi = dynamic(() => import('@/components/common/section-konfirmasi'));
const SectionPhoto = dynamic(() => import('@/components/common/section-photo'));
const SectionVideo = dynamic(() => import('@/components/common/section-video'));
const SectionGift = dynamic(() => import('@/components/common/section-gift'));
const SectionPesan = dynamic(() => import('@/components/common/section-pesan'));
const SectionPenutup = dynamic(() => import('@/components/common/section-penutup'));

interface PageProps {
  params: Promise<{ eventSlug: string }>;
  searchParams: Promise<{ to?: string; single?: string; focus?: string }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { eventSlug } = await params;
  const { to: guestSlug } = await searchParams;

  if (!guestSlug) {
    return {
      title: 'Wedding Invitation',
      description: 'Digital wedding invitation',
    };
  }

  const data = await fetchInvitationData(eventSlug, guestSlug);

  if (!data) {
    return {
      title: 'Invitation Not Found',
      description: 'The invitation you are looking for is not available.',
    };
  }

  const rawTitle = data.event.share_title || `Wedding Invitation of ${data.event.bride_name} & ${data.event.groom_name}`;
  const title = rawTitle.replace(/{guest}/g, data.guest.name);

  const rawDescription = data.event.share_description || `Dear {guest}, you are cordially invited to the wedding celebration of ${data.event.bride_name} & ${data.event.groom_name}.`;
  const description = rawDescription.replace(/{guest}/g, data.guest.name);

  let shareImage = data.event.share_image_url || '';
  if (!shareImage) {
    shareImage = '/thumbnail.jpeg';
  }

  const origin = process.env.INVITATION_ORIGIN || 'https://maruplanner.my.id';
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
  const { to: guestSlug, single, focus } = await searchParams;

  if (!guestSlug) {
    notFound();
  }

  // Fetch invitation data from API
  const data = await fetchInvitationData(eventSlug, guestSlug);

  if (!data) {
    notFound();
  }

  const { event, guest, sections } = data;

  // Adapt guest to match the expected format for SectionKonfirmasi & SectionPesan
  const adaptedGuest = {
    id: guest.id,
    nama: guest.name,
    nickname: guest.slug,
    plus_one_count: guest.plus_one_count,
    rsvp: guest.rsvp || null,
  };

  const verseSection = sections.find((s) => s.section_type === 'verse');
  const storySection = sections.find((s) => s.section_type === 'story');
  const brideGroomSection = sections.find((s) => s.section_type === 'bride_groom');
  const brideSection = sections.find((s) => s.section_type === 'bride');
  const groomSection = sections.find((s) => s.section_type === 'groom');
  const akadResepsiSection = sections.find((s) => s.section_type === 'akad_resepsi');
  const countdownSection = sections.find((s) => s.section_type === 'countdown');
  const rsvpSection = sections.find((s) => s.section_type === 'rsvp');
  const gallerySection = sections.find((s) => s.section_type === 'gallery');
  const giftSection = sections.find((s) => s.section_type === 'gift');
  const videoSection = sections.find((s) => s.section_type === 'video');
  const messagesSection = sections.find((s) => s.section_type === 'messages');
  const closingSection = sections.find((s) => s.section_type === 'closing');

  const isSingle = single === 'true' && focus !== 'cover';

  const hasSeparateBrideGroom = sections.some((s) => s.section_type === 'bride' || s.section_type === 'groom');

  const activeSections = sections
    .filter((s) => s.is_active && s.section_type !== 'music')
    .sort((a, b) => a.sort_order - b.sort_order);

  const musicSection = sections.find((s) => s.section_type === 'music');
  const isMusicActive = musicSection ? musicSection.is_active : true;

  const renderSection = (sectionType: string) => {
    switch (sectionType) {
      case 'cover':
        return <SectionHome key="cover" name={guest.name} event={event} sections={sections} qrPayload={guest.qr_payload} />;
      case 'bride_groom':
        return (
          <React.Fragment key="bride_groom">
            <SectionPengantin brideName={event.bride_name} groomName={event.groom_name} section={brideGroomSection} />
            {!hasSeparateBrideGroom && (
              <>
                <SectionBride section={brideSection} />
                <SectionGroom section={groomSection} />
              </>
            )}
          </React.Fragment>
        );
      case 'bride':
        return <SectionBride key="bride" section={brideSection} />;
      case 'groom':
        return <SectionGroom key="groom" section={groomSection} />;
      case 'story':
        return <SectionStory key="story" section={storySection} />;
      case 'verse':
        return <SectionDoa key="verse" section={verseSection} />;
      case 'countdown':
        return <SectionCountdown key="countdown" event={event} section={countdownSection} />;
      case 'akad_resepsi':
        return <SectionAkad key="akad_resepsi" event={event} section={akadResepsiSection} />;
      case 'rsvp':
        return <SectionKonfirmasi key="rsvp" guest={adaptedGuest} eventId={event.id} section={rsvpSection} />;
      case 'attire':
        return null;
      case 'gallery':
        return <SectionPhoto key="gallery" section={gallerySection} />;
      case 'video':
        return <SectionVideo key="video" section={videoSection} />;
      case 'gift':
        return <SectionGift key="gift" section={giftSection} />;
      case 'messages':
        return <SectionPesan key="messages" guest={adaptedGuest} eventId={event.id} section={messagesSection} />;
      case 'closing':
        return <SectionPenutup key="closing" section={closingSection} />;
      default:
        return null;
    }
  };

  if (isSingle) {
    return (
      <main className="container min-h-dvh overflow-x-hidden">
        {focus === 'cover' && (
          <SectionHome name={guest.name} event={event} sections={sections} qrPayload={guest.qr_payload} />
        )}
        {focus === 'bride_groom' && (
          <SectionPengantin brideName={event.bride_name} groomName={event.groom_name} section={brideGroomSection} />
        )}
        {focus === 'bride' && <SectionBride section={brideSection} />}
        {focus === 'groom' && <SectionGroom section={groomSection} />}
        {focus === 'story' && <SectionStory section={storySection} />}
        {focus === 'verse' && <SectionDoa section={verseSection} />}
        {focus === 'countdown' && <SectionCountdown event={event} section={countdownSection} />}
        {focus === 'akad_resepsi' && <SectionAkad event={event} section={akadResepsiSection} />}
        {focus === 'rsvp' && (
          <SectionKonfirmasi guest={adaptedGuest} eventId={event.id} section={rsvpSection} />
        )}
        {focus === 'gallery' && <SectionPhoto section={gallerySection} />}
        {focus === 'video' && <SectionVideo section={videoSection} />}
        {focus === 'gift' && <SectionGift section={giftSection} />}
        {focus === 'messages' && (
          <SectionPesan guest={adaptedGuest} eventId={event.id} section={messagesSection} />
        )}
        {focus === 'closing' && <SectionPenutup section={closingSection} />}
      </main>
    );
  }

  return (
    <main className="container min-h-dvh overflow-x-hidden">
      {isMusicActive && <SectionMusic section={musicSection} />}
      <FloatingQr guestName={guest.name} qrPayload={guest.qr_payload} />

      {activeSections.map((section) => renderSection(section.section_type))}
    </main>
  );
};

export default Page;
