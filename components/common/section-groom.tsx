'use client'

import BgSection from '@/components/assets/images/section-groom-bride/bg-bride-groom-section.svg'
import FlowerBrideBottomLeft from '@/components/assets/images/section-groom-bride/flower-bride-bottom-left.svg'
import FlowerBrideBottomRight from '@/components/assets/images/section-groom-bride/flower-bride-bottom-right.svg'
import FlowerBrideLeft from '@/components/assets/images/section-groom-bride/flower-bride-left.svg'
import FlowerBrideRight from '@/components/assets/images/section-groom-bride/flower-bride-right.svg'
import FlowerPinkBrideRight from '@/components/assets/images/section-groom-bride/flower-pink-bride-right.svg'
import GroomFoto from '@/components/assets/images/section-groom-bride/groom-foto.svg'
import WeddingOf from '@/components/assets/images/section-groom-bride/groom-wedding-of.svg'
import { SectionData } from '@/lib/api'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface SectionGroomProps {
  section?: SectionData
}

const SectionGroom: React.FC<SectionGroomProps> = ({ section }) => {
  const [isInView, setIsInView] = useState(false)
  const content = section?.content as {
    name?: string
    parent_info?: string
    photo?: string
    instagram?: string
    background_image?: string
  } | undefined

  const [liveContent, setLiveContent] = useState(content)

  useEffect(() => {
    setLiveContent(content)
  }, [content])

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'CMS_PREVIEW_UPDATE' && e.data?.section_type === 'groom') {
        setLiveContent(e.data.content)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const defaultParentInfo = "First Son of\nMr. Lulu Mulyadi & Mrs. Istrini Tyas Bisowarni"
  const parentInfo = liveContent?.parent_info || defaultParentInfo

  const instagramHandle = liveContent?.instagram || '@panjinrr'
  const instagramUsername = instagramHandle.replace(/^@/, '')
  const instagramUrl = `https://www.instagram.com/${instagramUsername}`

  const groomName = liveContent?.name || 'Panji'
  const bgImage = liveContent?.background_image || BgSection

  const getBadgeClasses = (name: string) => {
    const len = name.length
    if (len <= 8) {
      return {
        text: 'text-xl sm:text-2xl',
        padding: 'px-8 py-2'
      }
    } else if (len <= 14) {
      return {
        text: 'text-lg sm:text-xl',
        padding: 'px-6 py-2'
      }
    } else {
      return {
        text: 'text-base sm:text-lg',
        padding: 'px-4 py-1.5'
      }
    }
  }

  const badgeStyles = getBadgeClasses(groomName)

  return (
    <motion.section
      className="relative w-full overflow-hidden"
      id="section-groom"
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* Container that establishes size */}
      <div className="relative aspect-9/16 w-full">
        {/* Background elements */}
        <div className="absolute inset-0">
          <Image
            src={bgImage}
            alt="section-groom-background"
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Center Content Group */}
        <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[82%] max-w-[325px] flex flex-col items-center gap-5">

          {/* Photo Container with overlapping corner flowers */}
          <div className="relative w-full aspect-426/570 flex justify-center items-center z-10">
            {/* Wedding Of Title (positioned absolute, overlapping the top edge of the photo) */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="absolute top-[-2.5%] left-1/2 -translate-x-1/2 z-30 pointer-events-none w-[68%]"
            >
              <Image
                src={WeddingOf}
                alt="wedding of"
                className="h-auto w-full object-contain"
                loading="lazy"
              />
            </motion.div>
            {/* Fallback SVG or Custom CMS Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-full h-full"
            >
              {liveContent?.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={liveContent.photo}
                  alt="section-groom-photo"
                  className="w-full h-full object-cover rounded-xl border border-[#DDD1BF] shadow-md"
                  loading="lazy"
                />
              ) : (
                <Image
                  src={GroomFoto}
                  alt="section-groom-photo"
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              )}
            </motion.div>

            {/* Overlapping Bottom-Left Corner Flowers (mirrored from Bride's right side) */}
            {/* Flower right side (mirrored left) */}
            <div className="absolute bottom-[14%] left-[10%] w-[18%] z-10 pointer-events-none scale-x-[-1]">
              <motion.div
                className="w-full h-full origin-bottom-right"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? {
                  opacity: 1,
                  scale: 1,
                  rotate: [0, -2, 2, 0],
                  x: [0, -1, 1, 0],
                  y: [0, -2, 2, 0],
                } : {
                  opacity: 0,
                  scale: 0.8,
                  rotate: 0,
                  x: 0,
                  y: 0,
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.2 },
                  scale: { duration: 0.8, delay: 0.2 },
                  x: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.0 },
                  y: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.0 },
                  rotate: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.0 },
                }}
              >
                <Image src={FlowerBrideRight} alt="flower-left-side" className="w-full h-auto" loading="lazy" />
              </motion.div>
            </div>

            {/* Pink flower right side (mirrored left) */}
            <div className="absolute bottom-[20%] left-0 w-[26%] z-15 pointer-events-none scale-x-[-1]">
              <motion.div
                className="w-full h-full origin-bottom-right"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? {
                  opacity: 1,
                  scale: 1,
                  rotate: [0, 2, -2, 0],
                  x: [0, 1, -1, 0],
                  y: [0, -1, 1, 0],
                } : {
                  opacity: 0,
                  scale: 0.8,
                  rotate: 0,
                  x: 0,
                  y: 0,
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.3 },
                  scale: { duration: 0.8, delay: 0.3 },
                  x: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.1 },
                  y: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.1 },
                  rotate: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.1 },
                }}
              >
                <Image src={FlowerPinkBrideRight} alt="flower-pink-left" className="w-full h-auto" loading="lazy" />
              </motion.div>
            </div>

            {/* Flower bottom right corner (mirrored left) */}
            <div className="absolute bottom-[-18%] left-[-15%] w-[42%] z-22 pointer-events-none scale-x-[-1]">
              <motion.div
                className="w-full h-full origin-bottom-right"
                initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
                animate={isInView ? {
                  opacity: 1,
                  scale: 1,
                  rotate: [15, -2, 2, 15],
                  x: [0, -1, 1, 0],
                  y: [0, 2, -2, 0],
                } : {
                  opacity: 0,
                  scale: 0.8,
                  rotate: 15,
                  x: 0,
                  y: 0,
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.4 },
                  scale: { duration: 0.8, delay: 0.4 },
                  x: { repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1.2 },
                  y: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.2 },
                  rotate: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.2 },
                }}
              >
                <Image src={FlowerBrideBottomRight} alt="flower-bottom-left-corner" className="w-full h-auto" loading="lazy" />
              </motion.div>
            </div>

            {/* Overlapping Bottom-Right Corner Flowers (mirrored from Bride's left side) */}
            {/* Flower left side (mirrored right) */}
            <div className="absolute bottom-[5%] right-[5%] w-[24%] z-15 pointer-events-none scale-x-[-1]">
              <motion.div
                className="w-full h-full origin-bottom-left"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? {
                  opacity: 1,
                  scale: 1,
                  rotate: [0, 2, -2, 0],
                  x: [0, 1, -1, 0],
                  y: [0, -2, 2, 0],
                } : {
                  opacity: 0,
                  scale: 0.8,
                  rotate: 0,
                  x: 0,
                  y: 0,
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.2 },
                  scale: { duration: 0.8, delay: 0.2 },
                  x: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.0 },
                  y: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.0 },
                  rotate: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.0 },
                }}
              >
                <Image src={FlowerBrideLeft} alt="flower-right-side" className="w-full h-auto" loading="lazy" />
              </motion.div>
            </div>

            {/* Flower bottom left corner (mirrored right) */}
            <div className="absolute bottom-[-30%] right-[-15%] w-[38%] z-20 pointer-events-none scale-x-[-1]">
              <motion.div
                className="w-full h-full origin-bottom-left"
                initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                animate={isInView ? {
                  opacity: 1,
                  scale: 1,
                  rotate: [-15, 2, -2, -15],
                  x: [0, 1, -1, 0],
                  y: [0, 2, -2, 0],
                } : {
                  opacity: 0,
                  scale: 0.8,
                  rotate: -15,
                  x: 0,
                  y: 0,
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.3 },
                  scale: { duration: 0.8, delay: 0.3 },
                  x: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.1 },
                  y: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.1 },
                  rotate: { repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1.1 },
                }}
              >
                <Image src={FlowerBrideBottomLeft} alt="flower-bottom-right-corner" className="w-full h-auto" loading="lazy" />
              </motion.div>
            </div>

            {/* Groom Name Pill Badge (positioned absolute, overlapping the bottom edge of the photo) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
              className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 z-50 flex items-center justify-center w-max pointer-events-none"
            >
              <div className={`bg-[#D08E61] border-[5px] border-[#C47C9E] rounded-full shadow-md flex items-center justify-center ${badgeStyles.padding}`}>
                <span className={`text-white font-little-hands select-none leading-none font-normal whitespace-nowrap ${badgeStyles.text}`}>
                  {groomName}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Parents Information Card */}
          <motion.div
            className="mx-auto flex w-full max-w-[280px] flex-col items-center justify-center rounded-xl bg-[#DDD1BF] p-3.5 text-center z-20 shadow-sm pointer-events-none gap-1.5 mt-2"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
          >
            {parentInfo.split('\n').map((line, i) => (
              <p key={i} className="text-xs sm:text-sm text-black leading-normal font-doodle-head select-none">
                {line}
              </p>
            ))}
          </motion.div>

          {/* Instagram Handle */}
          <motion.a
            href={instagramUrl}
            className="text-xs sm:text-sm text-[#DDD1BF] underline z-20 font-medium hover:opacity-80 transition-opacity font-sans"
            target="_blank"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            @{instagramUsername}
          </motion.a>

        </div>
      </div>
    </motion.section>
  )
}

export default SectionGroom
