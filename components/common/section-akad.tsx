'use client'

import IconSvg from '@/components/assets/images/card-open-wedding/icon.svg'
import BgFrame from '@/components/assets/images/section-akad/bg-akad-section.svg'
import CatAkadBottomRight from '@/components/assets/images/section-akad/cat-akad-bottom-right.svg'
import CatAkadTopLeft from '@/components/assets/images/section-akad/cat-akad-top-left.svg'
import FlowerAkadBottomLeft from '@/components/assets/images/section-akad/flower-akad-bottom-left.svg'
import FlowerAkadBottomRight from '@/components/assets/images/section-akad/flower-akad-bottom-right.svg'
import FlowerAkadTopLeft from '@/components/assets/images/section-akad/flower-akad-top-left.svg'
import FlowerAkadTopRight from '@/components/assets/images/section-akad/flower-akad-top-right.svg'
import Frame from '@/components/assets/images/section-akad/frame-akad-section.svg'
import { EventData, SectionData } from '@/lib/api'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface SectionAkadProps {
  event: EventData
  section?: SectionData
}

const SectionAkad: React.FC<SectionAkadProps> = ({ event, section }) => {
  const content = section?.content as {
    intro_text?: string
    akad?: { date?: string; time_start?: string; time_end?: string }
    resepsi?: { date?: string; time_start?: string; time_end?: string }
    venue?: string
    venue_address?: string
    maps_url?: string
    maps_button_text?: string
  } | undefined

  const [liveContent, setLiveContent] = useState(content)

  useEffect(() => {
    setLiveContent(content)
  }, [content])

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'CMS_PREVIEW_UPDATE' && e.data?.section_type === 'akad_resepsi') {
        setLiveContent(e.data.content)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // Date formatting helpers
  const rawAkadDate = liveContent?.akad?.date || event.event_date
  const akadDateObj = new Date(rawAkadDate)
  const akadDayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(akadDateObj).toUpperCase()
  const akadFormattedDate = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(akadDateObj).toUpperCase()

  const rawResepsiDate = liveContent?.resepsi?.date || event.event_date
  const resepsiDateObj = new Date(rawResepsiDate)
  const resepsiDayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(resepsiDateObj).toUpperCase()
  const resepsiFormattedDate = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(resepsiDateObj).toUpperCase()

  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    return timeString.substring(0, 5).replace(':', '.');
  }

  const introText = liveContent?.intro_text || 'It would be our greatest honour and joy\nto have your presence and blessing\non our wedding day.'
  const akadStart = liveContent?.akad?.time_start || event.akad_start
  const akadEnd = liveContent?.akad?.time_end || event.akad_end
  const resepsiStart = liveContent?.resepsi?.time_start || event.resepsi_start
  const resepsiEnd = liveContent?.resepsi?.time_end || event.resepsi_end
  const venueName = liveContent?.venue || event.venue_name || 'GEDUNG BADARUSAMSI DITKUAD'
  const venueAddress = liveContent?.venue_address || event.venue_address || 'Jl. Menado No 8, Merdeka, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40113'
  const mapsUrl = liveContent?.maps_url || event.venue_maps_url || 'https://maps.app.goo.gl/6i8ZZFUpJDyC1Qw76'
  const mapsButtonText = liveContent?.maps_button_text || 'View Maps'

  return (
    <section className="relative w-full" id="section-akad">
      {/* Container that establishes size */}
      <div className="relative aspect-9/16 w-full">
        {/* Background elements */}
        <div className="absolute z-0 h-auto w-full">
          <Image
            src={BgFrame}
            alt="section-akad-background"
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

            {/* Top-Left Corner Ornaments */}
            {/* Flower Top-Left */}
            <motion.div
              className="absolute top-[6%] left-[-12%] w-[34%] z-16 pointer-events-none origin-top-left"
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
                x: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.0 },
                y: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.0 },
                rotate: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.0 },
              }}
              viewport={{ once: true }}
            >
              <Image src={FlowerAkadTopLeft} alt="flower-top-left" className="w-full h-auto" loading="lazy" />
            </motion.div>

            {/* Cat Top-Left */}
            <motion.div
              className="absolute top-[-5%] left-[-5%] w-[28%] z-15 pointer-events-none origin-top-left"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: [0, 3, -3, 0],
                x: [0, 1, -1, 0],
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
              <Image src={CatAkadTopLeft} alt="cat-top-left" className="w-full h-auto" loading="lazy" />
            </motion.div>

            {/* Top-Right Corner Ornaments */}
            {/* Flower Top-Right */}
            <motion.div
              className="absolute top-[5%] right-[-10%] w-[32%] z-10 pointer-events-none origin-top-right"
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
                y: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.0 },
                rotate: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.0 },
              }}
              viewport={{ once: true }}
            >
              <Image src={FlowerAkadTopRight} alt="flower-top-right" className="w-full h-auto" loading="lazy" />
            </motion.div>

            {/* Bottom-Left Corner Ornaments */}
            {/* Flower Bottom-Left */}
            <motion.div
              className="absolute bottom-[5%] left-[-10%] w-[36%] z-10 pointer-events-none origin-bottom-left"
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
                x: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.0 },
                y: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.0 },
                rotate: { repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1.0 },
              }}
              viewport={{ once: true }}
            >
              <Image src={FlowerAkadBottomLeft} alt="flower-bottom-left" className="w-full h-auto" loading="lazy" />
            </motion.div>

            {/* Bottom-Right Corner Ornaments */}
            {/* Flower Bottom-Right */}
            <motion.div
              className="absolute bottom-[-8%] right-[-12%] w-[38%] z-16 pointer-events-none origin-bottom-right"
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
                x: { repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1.0 },
                y: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.0 },
                rotate: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.0 },
              }}
              viewport={{ once: true }}
            >
              <Image src={FlowerAkadBottomRight} alt="flower-bottom-right" className="w-full h-auto" loading="lazy" />
            </motion.div>

            {/* Cat Bottom-Right */}
            <motion.div
              className="absolute bottom-[-6%] right-[-10%] w-[32%] z-15 pointer-events-none origin-bottom-right"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: [0, -3, 3, 0],
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
              <Image src={CatAkadBottomRight} alt="cat-bottom-right" className="w-full h-auto" loading="lazy" />
            </motion.div>

            {/* Text content with sequential animations */}
            <div className="absolute top-[22%] left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 w-full px-6">
              {/* Introduction text - First to appear */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: false }}
              >
                <p className="text-center text-[10px] text-black leading-relaxed max-w-[260px] mx-auto select-none whitespace-pre-line">
                  {introText}
                </p>
              </motion.div>

              {/* AKAD section - Second to appear */}
              <motion.div
                className="flex flex-col items-center gap-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: false }}
              >
                <p className="text-xl text-[#6B3D49] select-none">AKAD</p>
                <div className="flex items-center select-none">
                  <div className="flex flex-col items-end">
                    <p className="text-xs text-black">{akadDayName}</p>
                    <p className="text-xs text-black">{akadFormattedDate}</p>
                  </div>
                  <div className="mx-1.5 h-[30px] w-px bg-[#6B3D49]" />
                  <p className="text-xs text-black">
                    {formatTime(akadStart) || '08.00'} - {formatTime(akadEnd) || '10.00'}
                  </p>
                </div>
              </motion.div>

              {/* RESEPSI section - Third to appear */}
              <motion.div
                className="flex flex-col items-center gap-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                viewport={{ once: false }}
              >
                <p className="text-xl text-[#6B3D49] select-none">
                  RECEPTION
                </p>
                <div className="flex items-center select-none">
                  <div className="flex flex-col items-end">
                    <p className="text-xs text-black">{resepsiDayName}</p>
                    <p className="text-xs text-black">{resepsiFormattedDate}</p>
                  </div>
                  <div className="mx-1.5 h-[30px] w-px bg-[#6B3D49]" />
                  <p className="text-xs text-black">
                    {formatTime(resepsiStart) || '11.00'} - {formatTime(resepsiEnd) || '14.00'}
                  </p>
                </div>
              </motion.div>

              {/* Venue information - Fourth to appear */}
              <motion.div
                className="flex flex-col items-center gap-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
                viewport={{ once: false }}
              >
                <div className="flex flex-col items-center select-none">
                  <p className="text-xl text-[#6B3D49]">Located at</p>
                  <p className="text-center text-xs text-nowrap text-[#6B3D49] uppercase">
                    {venueName}
                  </p>
                </div>
                <p className="text-center text-[10px] text-black max-w-[280px] select-none">
                  {venueAddress}
                </p>
              </motion.div>
            </div>

            <motion.a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-20 left-1/2 z-11 -translate-x-1/2 bg-[#D08E61] border-[5px] border-[#C47C9E] rounded-full px-6 py-2 shadow-md flex items-center justify-center font-doodle-head text-white text-xs sm:text-sm uppercase tracking-wide whitespace-nowrap leading-none select-none transition-all hover:opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              {mapsButtonText}
            </motion.a>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <Image
                src={Frame}
                alt="section-akad-frame"
                sizes="100vw"
                className="mx-auto h-auto"
                loading="lazy"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SectionAkad
