/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import IconSvg from '@/components/assets/images/card-open-wedding/icon.svg'
import BgSectionBottomCroppedTop from '@/components/assets/images/section-awal/bg-section-1-cropped-top.png'
import BgSectionHome from '@/components/assets/images/section-awal/bg-section-1-cropped.png'
import BgSectionBottomCropped from '@/components/assets/images/section-awal/bg-section-bottom-cropped.svg'
import CardOpenWedding from '@/components/common/card-open-wedding'
import { useInvitation } from '@/components/context/provider'
import { EventData, SectionData } from '@/lib/api'
import { motion, Variants } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect } from 'react'

const SECTION_DOM_IDS: Record<string, string> = {
  bride_groom: 'section-pengantin',
  bride: 'section-bride',
  groom: 'section-groom',
  story: 'section-story',
  verse: 'section-doa',
  countdown: 'section-countdown',
  akad_resepsi: 'section-akad',
  rsvp: 'section-konfirmasi',
  attire: 'section-attire',
  gallery: 'section-photo',
  video: 'section-video',
  gift: 'section-gift',
  messages: 'section-pesan',
  closing: 'section-penutup',
}

export default function SectionHome({
  name,
  event,
  sections: initialSections,
  qrPayload,
}: {
  name: string
  event: EventData
  sections: SectionData[]
  qrPayload?: string | null
}) {
  const { loading, setLoading, progress, setProgress, isInvitationOpen } =
    useInvitation()

  const [sections, setSections] = React.useState<SectionData[]>(initialSections)

  const coverSection = sections.find((s) => s.section_type === 'cover')
  const coverContent = coverSection?.content as {
    title?: string
    subtitle?: string
    opening_text?: string
  } | undefined

  const activeSections = sections
    .filter((s) => s.is_active && s.section_type !== 'music')
    .sort((a, b) => a.sort_order - b.sort_order)

  const firstActiveAfterCover = activeSections.find((s) => s.section_type !== 'cover')
  const targetId = firstActiveAfterCover ? SECTION_DOM_IDS[firstActiveAfterCover.section_type] : undefined

  // Listen for live preview updates from the dashboard editor
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'CMS_PREVIEW_UPDATE') {
        const { section_type, content } = e.data;
        setSections((prev) =>
          prev.map((s) =>
            s.section_type === section_type ? { ...s, content } : s
          )
        );
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const refLoading = React.useRef<boolean>(false)
  // Simulate loading progress
  useEffect(() => {
    const isPreviewMode = window.location.search.includes('to=preview') || window.location.search.includes('preview=true');
    if (isPreviewMode) {
      setLoading(false);
      setProgress(100);
      return;
    }

    let IS_VISITED: string | null = null
    try {
      IS_VISITED = localStorage.getItem('IS_VISITED') ?? null
    } catch (e) {
      console.warn('localStorage is not accessible:', e)
    }

    if (!IS_VISITED) {
      if (refLoading.current) return

      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer)
            // Add a small delay before showing main content fully
            setTimeout(() => setLoading(false), 2000)
            try {
              localStorage.setItem('IS_VISITED', 'true')
            } catch (e) {
              console.warn('Failed to save to localStorage:', e)
            }
            return 100
          }
          return prevProgress + Math.floor(Math.random() * 10) + 1
        })
      }, 200)

      refLoading.current = true
      return () => {
        clearInterval(timer)
      }
    } else {
      setLoading(false)
      setProgress(100)
    }
  }, [])

  // Variants for the text scrolling
  const textScrollVariants: Variants = {
    animate: {
      x: ['100%', '-100%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop' as const,
          duration: 6,
          ease: 'linear',
        },
      },
    },
  }

  // Calculate opacity percentage based on progress
  const contentOpacity = progress / 100

  return (
    <section className="relative">
      {/* Loading overlay - always present but opacity changes with progress */}
      <motion.div
        className="absolute bottom-30 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 flex-col items-center justify-center bg-transparent"
        initial={{ opacity: 1 }}
        animate={{ opacity: loading ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{ pointerEvents: loading ? 'auto' : 'none' }} // Disable interaction when faded out
      >
        <div className="w-[80%]">
          <h1
            className={`mb-6 text-center font-minecraft text-xl ${progress < 50 ? 'text-[#603C24]' : 'text-white'} transition-all duration-300 ease-in`}
          >
            Please Wait...
          </h1>

          {/* Minecraft-style dirt loading bar background */}
          <div className="relative h-8 w-full overflow-hidden rounded border-2 border-black bg-[#322a23]">
            <motion.div
              className="absolute top-0 left-0 flex h-full items-center justify-center bg-[#275E78]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            >
              <p className={`text-xs text-white`}>{progress}%</p>
            </motion.div>
          </div>

          {/* Loading text */}
          <div
            className={`mt-4 text-center font-minecraft text-xs ${progress < 50 ? 'text-[#603C24]' : 'text-white'} transition-all duration-300 ease-in`}
          >
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {progress < 33
                ? 'Loading...'
                : progress < 66
                  ? 'Halfway there...'
                  : progress < 100
                    ? 'Almost there...'
                    : 'Welcome!'}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Main content with progressive opacity based on loading progress */}
      <motion.div
        animate={{ opacity: contentOpacity }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: loading ? 'none' : 'auto' }} // Disable interaction when faded out
      >
        {/* BACKGROUND TOP */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isInvitationOpen ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={BgSectionBottomCroppedTop}
            alt="section-awal-background-top"
            sizes="100vw"
            className="absolute top-[-10px] left-0 z-10 h-auto w-full"
            loading="lazy"
          />
        </motion.div>

        {/* DIVIDER */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isInvitationOpen ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-5 z-10 h-[10px] w-full border-b-2 border-b-[#46607A] bg-[#314C64]"
        />

        {/* ITEM FOR TEXT WEDDING */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isInvitationOpen ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-10 left-1/2 z-10 mb-2 flex w-[90%] -translate-x-1/2 justify-between gap-1 rounded-xs border-b-2 border-b-[#314C63] bg-[#314C63] px-3 py-2"
        >
          <div className="flex-2 overflow-hidden rounded-sm bg-[#322a23] px-4 py-2.5">
            <motion.p
              className="text-center font-minecraft text-xs text-nowrap text-[#8a826c] uppercase"
              variants={textScrollVariants}
              animate="animate"
              whileInView={{ opacity: [1, 0, 1] }}
              transition={{
                opacity: {
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'easeInOut',
                },
              }}
            >
              {coverContent?.title || `The Wedding Of ${event.bride_name} & ${event.groom_name}`}
            </motion.p>
          </div>
          <div className="absolute left-[33%] h-3/4 w-2.5 bg-[#314C63]" />
          <div className="absolute right-[33%] h-3/4 w-2.5 bg-[#314C63]" />
        </motion.div>

        {/* ITEM FOR PRINTING THE CARD */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isInvitationOpen ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-26 left-1/2 z-10 w-[90%] -translate-x-1/2 rounded-tl-xs rounded-tr-xs bg-[#314C63] px-3 pt-2"
        >
          <div className="relative">
            <div className="h-[4px] w-full rounded-tl-sm rounded-tr-sm bg-[#322a23]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isInvitationOpen ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-29 left-1/2 z-8 w-[90%] -translate-x-1/2 rounded-br-xs rounded-bl-xs bg-[#314C63] px-3 pb-2"
        >
          <div className="relative">
            <div className="h-[4px] w-full bg-[#322a23]" />
            <div className="absolute bottom-0 left-1/2 h-[2px] w-[90%] -translate-x-1/2 rounded-tl-xs rounded-tr-xs bg-[#2b201a]" />
          </div>
        </motion.div>

        {/* BACKGROUND RED */}
        <Image
          src={BgSectionHome}
          alt="background-section-1"
          sizes="100vw"
          loading="lazy"
          className="h-dvh w-full"
        />

        {/* KEY IMAGE with simple fade out */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: loading ? 1 : 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src={IconSvg}
            alt="icon"
            width={100}
            height={115}
            loading="lazy"
            className="h-auto w-auto"
          />
        </motion.div>

        {/* BOTTOM CROPPED */}
        <Image
          src={BgSectionBottomCropped}
          alt="key"
          sizes="100vw"
          loading="lazy"
          className="absolute bottom-0 h-auto w-full"
        />
      </motion.div>

      {/* Content card */}
      <motion.div
        className={`absolute top-0 ${loading ? 'opacity-0' : 'opacity-100'} z-8 w-full`}
        initial={{ y: '-80%', scale: 0.85 }}
        animate={
          loading
            ? { y: '-80%', scale: 0.85 }
            : isInvitationOpen
              ? { y: 0, scale: 1, transition: { duration: 1 } }
              : { y: 0, scale: 0.85, transition: { duration: 4, delay: 2 } }
        }
      >
        <CardOpenWedding
          name={name}
          loading={loading}
          event={event}
          subtitle={coverContent?.subtitle}
          buttonText={coverContent?.opening_text}
          targetId={targetId}
          qrPayload={qrPayload}
        />
      </motion.div>
    </section>
  )
}
