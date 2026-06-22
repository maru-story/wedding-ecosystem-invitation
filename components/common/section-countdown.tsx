'use client'

import IconSvg from '@/components/assets/images/card-open-wedding/icon.svg'
import BgFrame from '@/components/assets/images/section-countdown/bg-countdown-section.svg'
import BirdCountdownBottomRight from '@/components/assets/images/section-countdown/bird-countdown-bottom-right.svg'
import BirdCountdownLeft from '@/components/assets/images/section-countdown/bird-countdown-left.svg'
import CatCountdownBottomLeft from '@/components/assets/images/section-countdown/cat-countdown-bottom-left.svg'
import CatCountdownTopRight from '@/components/assets/images/section-countdown/cat-countdown-top-right.svg'
import FlowerCountdownBottomLeft from '@/components/assets/images/section-countdown/flower-countdown-bottom-left.svg'
import FlowerCountdownBottomRight from '@/components/assets/images/section-countdown/flower-countdown-bottom-right.svg'
import FlowerCountdownLeft from '@/components/assets/images/section-countdown/flower-countdown-left.svg'
import FlowerCountdownTopRight from '@/components/assets/images/section-countdown/flower-countdown-top-right.svg'
import Frame from '@/components/assets/images/section-countdown/frame-section-countdown.svg'
import WatchCountdownBottomRight from '@/components/assets/images/section-countdown/watch-countdown-bottom-right.svg'
import Countdown from '@/components/common/countdown'
import { EventData, SectionData } from '@/lib/api'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface SectionCountdownProps {
  event: EventData
  section?: SectionData
}

const SectionCountdown: React.FC<SectionCountdownProps> = ({ event, section }) => {
  const content = section?.content as {
    target_date?: string
    calendar_link?: string
  } | undefined

  const [liveContent, setLiveContent] = useState(content)

  useEffect(() => {
    setLiveContent(content)
  }, [content])

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'CMS_PREVIEW_UPDATE' && e.data?.section_type === 'countdown') {
        setLiveContent(e.data.content)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const targetDate = liveContent?.target_date || event.event_date

  const calendarUrl = liveContent?.calendar_link || ''

  return (
    <section className="relative w-full overflow-hidden" id="section-countdown">
      {/* Container that establishes size */}
      <div className="relative aspect-9/16 w-full">
        {/* Background elements */}
        <div className="absolute z-0 h-auto w-full">
          <Image
            src={BgFrame}
            alt="section-countdown-background"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>

        {/* ANIMATION HERE */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-full max-w-[350px] min-w-[300px] -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
        >
          <div className="relative flex flex-col items-center gap-2">
            {/* Couple Icon (positioned absolute, top center of the frame) */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="absolute top-[10%] left-1/2 -translate-x-1/2 z-25 w-[10%] pointer-events-none"
            >
              <Image
                src={IconSvg}
                alt="couple icon"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </motion.div>

            {/* Top-Right Corner Ornaments */}
            {/* Flower Top-Right */}
            <motion.div
              className="absolute top-0 right-[-14%] w-[35%] z-13 pointer-events-none origin-top-right"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: [0, 2, -2, 0],
                x: [0, 1, -1, 0],
                y: [0, -2, 2, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.2 },
                scale: { duration: 0.8, delay: 0.2 },
                x: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.0 },
                y: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.0 },
                rotate: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.0 },
              }}
              viewport={{ once: true }}
            >
              <Image src={FlowerCountdownTopRight} alt="flower-top-right" className="w-full h-auto" loading="lazy" />
            </motion.div>

            {/* Cat Top-Right */}
            <motion.div
              className="absolute top-0 right-[-5%] w-[32%] z-12 pointer-events-none origin-top-right"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: [0, -3, 3, 0],
                x: [0, -1, 1, 0],
                y: [0, 2, -2, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.3 },
                scale: { duration: 0.8, delay: 0.3 },
                x: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.1 },
                y: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.1 },
                rotate: { repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1.1 },
              }}
              viewport={{ once: true }}
            >
              <Image src={CatCountdownTopRight} alt="cat-top-right" className="w-full h-auto" loading="lazy" />
            </motion.div>

            {/* Left Side Ornaments */}
            {/* Flower Left */}
            <motion.div
              className="absolute top-[65%] left-[-10%] w-[22%] z-10 pointer-events-none origin-left"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: [0, 2, -2, 0],
                x: [0, 1, -1, 0],
                y: [0, -1, 1, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.2 },
                scale: { duration: 0.8, delay: 0.2 },
                x: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.0 },
                y: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.0 },
                rotate: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.0 },
              }}
              viewport={{ once: true }}
            >
              <Image src={FlowerCountdownLeft} alt="flower-left" className="w-full h-auto" loading="lazy" />
            </motion.div>

            {/* Bird Left */}
            <motion.div
              className="absolute top-[50%] left-[-5%] w-[24%] z-15 pointer-events-none origin-left"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: [0, -2, 2, 0],
                x: [0, -2, 2, 0],
                y: [0, 1, -1, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.3 },
                scale: { duration: 0.8, delay: 0.3 },
                x: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.1 },
                y: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.1 },
                rotate: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.1 },
              }}
              viewport={{ once: true }}
            >
              <Image src={BirdCountdownLeft} alt="bird-left" className="w-full h-auto" loading="lazy" />
            </motion.div>

            {/* Bottom-Left Corner Ornaments */}
            {/* Flower Bottom-Left */}
            <motion.div
              className="absolute bottom-[-25%] left-[-10%] w-[42%] z-16 pointer-events-none origin-bottom-left"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: [0, 2, -2, 0],
                x: [0, 1, -1, 0],
                y: [0, -2, 2, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.2 },
                scale: { duration: 0.8, delay: 0.2 },
                x: { repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1.0 },
                y: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.0 },
                rotate: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.0 },
              }}
              viewport={{ once: true }}
            >
              <Image src={FlowerCountdownBottomLeft} alt="flower-bottom-left" className="w-full h-auto" loading="lazy" />
            </motion.div>

            {/* Cat Bottom-Left */}
            <motion.div
              className="absolute bottom-[-10%] left-[-10%] w-[34%] z-15 pointer-events-none origin-bottom-left"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: [0, -2, 2, 0],
                x: [0, -1, 1, 0],
                y: [0, 1, -1, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.3 },
                scale: { duration: 0.8, delay: 0.3 },
                x: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.1 },
                y: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.1 },
                rotate: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.1 },
              }}
              viewport={{ once: true }}
            >
              <Image src={CatCountdownBottomLeft} alt="cat-bottom-left" className="w-full h-auto" loading="lazy" />
            </motion.div>

            {/* Bottom-Right Corner Ornaments */}
            {/* Flower Bottom-Right */}
            <motion.div
              className="absolute bottom-[-5%] right-[-10%] w-[44%] z-13 pointer-events-none origin-bottom-right"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: [0, -2, 2, 0],
                x: [0, -1, 1, 0],
                y: [0, -2, 2, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.2 },
                scale: { duration: 0.8, delay: 0.2 },
                x: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.0 },
                y: { repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1.0 },
                rotate: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.0 },
              }}
              viewport={{ once: true }}
            >
              <Image src={FlowerCountdownBottomRight} alt="flower-bottom-right" className="w-full h-auto" loading="lazy" />
            </motion.div>

            {/* Watch Bottom-Right */}
            <motion.div
              className="absolute bottom-[7.5%] right-[-5%] w-[25%] z-12 pointer-events-none origin-bottom-right"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: [0, 3, -3, 0],
                x: [0, 1, -1, 0],
                y: [0, -1, 1, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.3 },
                scale: { duration: 0.8, delay: 0.3 },
                x: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.1 },
                y: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.1 },
                rotate: { repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1.1 },
              }}
              viewport={{ once: true }}
            >
              <Image src={WatchCountdownBottomRight} alt="watch-bottom-right" className="w-full h-auto" loading="lazy" />
            </motion.div>

            {/* Bird Bottom-Right */}
            <motion.div
              className="absolute bottom-[25%] right-[-10%] w-[28%] z-11 pointer-events-none origin-bottom-right"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: [0, -2, 2, 0],
                x: [0, -1, 1, 0],
                y: [0, 1, -1, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.4 },
                scale: { duration: 0.8, delay: 0.4 },
                x: { repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1.2 },
                y: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.2 },
                rotate: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.2 },
              }}
              viewport={{ once: true }}
            >
              <Image src={BirdCountdownBottomRight} alt="bird-bottom-right" className="w-full h-auto" loading="lazy" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: false }}
              className="absolute top-27.5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 w-full"
            >
              <p className="font-little-hands text-3xl sm:text-5xl text-[#6B3D49] uppercase text-center text-nowrap px-4">
                {new Intl.DateTimeFormat('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                }).format(new Date(targetDate))}
              </p>
              <p className="text-xl text-[#6B3D49] uppercase">Countdown</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: false }}
              className="absolute top-[60%] left-1/2 mx-auto grid w-full max-w-[300px] -translate-x-1/2 -translate-y-1/2 grid-cols-12 justify-center space-y-6 gap-x-0"
            >
              <Countdown targetDate={targetDate} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <Image
                src={Frame}
                alt="section-countdown-frame"
                sizes="100vw"
                className="mx-auto h-auto"
                loading="lazy"
              />
            </motion.div>
            {calendarUrl && (
              <motion.a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-[15%] left-1/2 z-11 -translate-x-1/2 bg-[#D08E61] border-[5px] border-[#C47C9E] rounded-full px-6 py-2 shadow-md flex items-center justify-center font-doodle-head text-white text-xs sm:text-sm uppercase tracking-wide whitespace-nowrap leading-none select-none transition-all hover:opacity-90 max-lg:bottom-[12.5%]"
                whileInView={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Add to Calendar
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SectionCountdown
