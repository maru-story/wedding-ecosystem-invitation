'use client'

import BgSection from '@/components/assets/images/section-pengantin/bg-bride-groom-section.svg'
import FlowerBottomLeft from '@/components/assets/images/section-pengantin/flower-bride-groom-bottom-left.svg'
import FlowerTopRight from '@/components/assets/images/section-pengantin/flower-bride-groom-top-right.svg'
import FrameBrideGroom from '@/components/assets/images/section-pengantin/frame-bride-groom.svg'
import OrnamentBottomRight from '@/components/assets/images/section-pengantin/ornament-bride-groom-bottom-right.svg'
import OrnamentTopLeft from '@/components/assets/images/section-pengantin/ornament-bride-groom-top-left.svg'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { SectionData } from '@/lib/api'

interface SectionPengantinProps {
  brideName?: string
  groomName?: string
  section?: SectionData
}

const SectionPengantin: React.FC<SectionPengantinProps> = ({
  brideName = 'Gina',
  groomName = 'Panji',
  section,
}) => {
  const [isInView, setIsInView] = useState(false)

  const content = section?.content as {
    bride_name?: string
    groom_name?: string
    background_image?: string
  } | undefined

  const [liveContent, setLiveContent] = useState(content)

  useEffect(() => {
    setLiveContent(content)
  }, [content])

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'CMS_PREVIEW_UPDATE' && e.data?.section_type === 'bride_groom') {
        setLiveContent(e.data.content)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const finalBrideName = liveContent?.bride_name || brideName
  const finalGroomName = liveContent?.groom_name || groomName
  const bgImage = liveContent?.background_image || BgSection

  return (
    <motion.section
      className="relative w-full overflow-hidden"
      id="section-pengantin"
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* Container that establishes size */}
      <div className="relative aspect-9/16 w-full">
        {/* Background elements */}
        <div className="absolute inset-0">
          <Image
            src={bgImage}
            alt="section-pengantin-background"
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Center Card Frame Container (Vertically & Horizontally Centered) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[95%] aspect-490/639 max-w-[380px]">
          {/* Frame Card Background */}
          <Image
            src={FrameBrideGroom}
            alt="frame-bride-groom"
            fill
            className="object-contain pointer-events-none z-10"
            loading="lazy"
          />

          {/* Corner Ornaments (Sway loop triggered when scrolled into view) */}
          {/* Top-Left Ornament (Scaled up by ~30%) */}
          <motion.div
            className="absolute top-[10%] left-[10%] z-20 pointer-events-none origin-top-left"
            style={{ width: '26%', transformStyle: 'preserve-3d' }}
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
              src={OrnamentTopLeft}
              alt="ornament-top-left"
              className="w-full h-auto"
              loading="lazy"
            />
          </motion.div>

          {/* Top-Right Flower (Scaled up by ~30%) */}
          <motion.div
            className="absolute top-[-12%] right-[-12%] z-20 pointer-events-none origin-top-right"
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

          {/* Bottom-Left Flower (Scaled up by ~30%) */}
          <motion.div
            className="absolute bottom-[-15%] left-[-15%] z-20 pointer-events-none origin-bottom-left"
            style={{ width: '50%', transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, scale: 0.5, rotate: -45, x: -20, y: 20 }}
            animate={isInView ? {
              opacity: 1,
              scale: 1,
              rotate: [0, 2, -2, 0],
              x: [0, 2, -2, 0],
              y: [0, 3, -3, 0],
            } : {
              opacity: 0,
              scale: 0.5,
              rotate: -45,
              x: -20,
              y: 20
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.4 },
              scale: { type: 'spring', damping: 15, stiffness: 60, delay: 0.4 },
              x: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.4 },
              y: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.4 },
              rotate: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.4 },
            }}
          >
            <Image
              src={FlowerBottomLeft}
              alt="flower-bottom-left"
              className="w-full h-auto"
              loading="lazy"
            />
          </motion.div>

          {/* Bottom-Right Ornament (Scaled up by ~30%) */}
          <motion.div
            className="absolute bottom-[10%] right-[10%] z-20 pointer-events-none origin-bottom-right"
            style={{ width: '22%', transformStyle: 'preserve-3d' }}
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
              src={OrnamentBottomRight}
              alt="ornament-bottom-right"
              className="w-full h-auto"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>

      {/* Dynamic Styled Name Badge (always absolute bottom of the section) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex justify-center items-center pointer-events-none w-max"
      >
        <div className="bg-[#D08E61] border-[5px] border-[#C47C9E] rounded-full px-8 py-3 shadow-md flex items-center justify-center">
          <span
            className="text-[#604534] text-xl sm:text-2xl whitespace-nowrap tracking-wide leading-none select-none font-doodle-head"
          >
            {finalGroomName} & {finalBrideName}
          </span>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default SectionPengantin
