'use client'

import BgSection from '@/components/assets/images/section-doa/bg-doa-section.svg'
import FlowerBottomLeft from '@/components/assets/images/section-doa/flower-doa-bottom-left.svg'
import FlowerBottomRight from '@/components/assets/images/section-doa/flower-doa-bottom-right.svg'
import FlowerTopLeft from '@/components/assets/images/section-doa/flower-doa-top-left.svg'
import FlowerTopRight from '@/components/assets/images/section-doa/flower-doa-top-right.svg'
import FrameDoa from '@/components/assets/images/section-doa/frame-doa.svg'
import TulisanArab from '@/components/assets/images/section-doa/tulisan-arab.svg'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { SectionData } from '@/lib/api'

interface SectionDoaProps {
  section?: SectionData
}

const SectionDoa: React.FC<SectionDoaProps> = ({ section }) => {
  const [isInView, setIsInView] = useState(false)

  const content = section?.content as {
    text?: string
    source?: string
    background_image?: string
    header_image?: string
  } | undefined

  // Listen for live preview updates from the dashboard editor
  const [liveContent, setLiveContent] = useState(content)

  useEffect(() => {
    setLiveContent(content)
  }, [content])

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'CMS_PREVIEW_UPDATE' && e.data?.section_type === 'verse') {
        setLiveContent(e.data.content)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const defaultText = `Among His signs is that He created for you spouses from among yourselves so that you may find comfort in them. He placed between you love and mercy. Indeed, in this are signs for people who reflect`
  const text = liveContent?.text || defaultText
  const source = liveContent?.source || `Surah Ar-Rum :21`
  const bgImage = liveContent?.background_image || BgSection
  const headerImage = liveContent?.header_image

  // Show default calligraphy if text is default/empty, otherwise only if custom header_image is uploaded
  const showDefaultCalligraphy = !liveContent?.text || liveContent.text.trim() === defaultText
  const hasCalligraphy = !!headerImage || showDefaultCalligraphy
  const calligraphySrc = headerImage || TulisanArab

  return (
    <motion.section
      className="relative w-full overflow-hidden"
      id="section-doa"
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* Container that establishes size */}
      <div className="relative aspect-9/16 w-full">
        {/* Background elements */}
        <div className="absolute inset-0">
          <Image
            src={bgImage}
            alt="section-doa-background"
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Center Card Frame Container (Vertically & Horizontally Centered) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full aspect-490/639 max-w-[520px]">
          {/* Frame Card Background */}
          <Image
            src={FrameDoa}
            alt="frame-doa"
            fill
            className="object-contain pointer-events-none z-10"
            loading="lazy"
          />

          {/* Corner Flowers (Sway loop triggered when scrolled into view) */}
          {/* Top-Left Flower */}
          <motion.div
            className="absolute top-[-10%] left-[-10%] z-20 pointer-events-none origin-top-left"
            style={{ width: '38%', transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, scale: 0.5, rotate: -45, x: -20, y: -20 }}
            animate={isInView ? {
              opacity: 1,
              scale: 1,
              rotate: [0, 2, -2, 0],
              x: [0, 2, -2, 0],
              y: [0, -3, 3, 0],
            } : {
              opacity: 0,
              scale: 0.5,
              rotate: -45,
              x: -20,
              y: -20
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.2 },
              scale: { type: 'spring', damping: 15, stiffness: 60, delay: 0.2 },
              x: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.2 },
              y: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.2 },
              rotate: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.2 },
            }}
          >
            <Image
              src={FlowerTopLeft}
              alt="flower-top-left"
              className="w-full h-auto"
              loading="lazy"
            />
          </motion.div>

          {/* Top-Right Flower */}
          <motion.div
            className="absolute top-[-10%] right-[-10%] z-20 pointer-events-none origin-top-right"
            style={{ width: '38%', transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, scale: 0.5, rotate: 45, x: 20, y: -20 }}
            animate={isInView ? {
              opacity: 1,
              scale: 1,
              rotate: [0, -2, 2, 0],
              x: [0, -2, 2, 0],
              y: [0, -3, 3, 0],
            } : {
              opacity: 0,
              scale: 0.5,
              rotate: 45,
              x: 20,
              y: -20
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.3 },
              scale: { type: 'spring', damping: 15, stiffness: 60, delay: 0.3 },
              x: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.3 },
              y: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.3 },
              rotate: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.3 },
            }}
          >
            <Image
              src={FlowerTopRight}
              alt="flower-top-right"
              className="w-full h-auto"
              loading="lazy"
            />
          </motion.div>

          {/* Bottom-Left Flower (Static, no animation) */}
          <div
            className="absolute bottom-[-5%] w-[20%] left-0 z-20 pointer-events-none origin-bottom-left"
          >
            <Image
              src={FlowerBottomLeft}
              alt="flower-bottom-left"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Bottom-Right Flower */}
          <motion.div
            className="absolute bottom-[-10%] right-[-10%] z-20 pointer-events-none origin-bottom-right"
            style={{ width: '38%', transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, scale: 0.5, rotate: 45, x: 20, y: 20 }}
            animate={isInView ? {
              opacity: 1,
              scale: 1,
              rotate: [0, -2, 2, 0],
              x: [0, -2, 2, 0],
              y: [0, 3, -3, 0],
            } : {
              opacity: 0,
              scale: 0.5,
              rotate: 45,
              x: 20,
              y: 20
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.5 },
              scale: { type: 'spring', damping: 15, stiffness: 60, delay: 0.5 },
              x: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.5 },
              y: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.5 },
              rotate: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.5 },
            }}
          >
            <Image
              src={FlowerBottomRight}
              alt="flower-bottom-right"
              className="w-full h-auto"
              loading="lazy"
            />
          </motion.div>

          {/* Inner Content Area (Centered perfectly overlaying the frame) */}
          <div className="absolute inset-0 flex flex-col justify-center items-center px-10 py-8 z-20">
            {/* Title Header */}
            {source && (
              <motion.h2
                initial={{ opacity: 0, y: -15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
                className="font-little-hands text-2xl sm:text-[28px] text-[#6B4C43] text-center tracking-tight leading-none mb-1.5 select-none"
              >
                {source}
              </motion.h2>
            )}

            {/* Arabic Calligraphy / Custom Header Image */}
            {hasCalligraphy && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.7 }}
                className="relative w-[60%] aspect-252/216 my-1.5 select-none pointer-events-none"
              >
                <Image
                  src={calligraphySrc}
                  alt="Tulisan Arab"
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              </motion.div>
            )}

            {/* Translation / Meaning Text */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
              className="text-[14px] sm:text-[18px] text-[#6B4C43] text-center leading-tight sm:leading-[1.3] tracking-tight font-doodle-head max-w-[220px] sm:max-w-[270px] select-none "
            >
              &ldquo;{text}&rdquo;
            </motion.p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default SectionDoa
