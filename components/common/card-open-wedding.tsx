'use client'

import BgCardOpenGuest from '@/components/assets/images/card-open-wedding/bg-card-open-guest.svg'
import BgCardOpenWedding from '@/components/assets/images/card-open-wedding/bg-card-open-wedding.svg'
import FlowerBottomRight from '@/components/assets/images/card-open-wedding/flower-bottom-right.svg'
import FlowerTopLeft from '@/components/assets/images/card-open-wedding/flower-top-left.svg'
import IconSvg from '@/components/assets/images/card-open-wedding/icon.svg'
import OrnamentBottomLeft from '@/components/assets/images/card-open-wedding/ornament-bottom-left.svg'
import OrnamentTopRight from '@/components/assets/images/card-open-wedding/ornament-top-right.svg'
import { useInvitation } from '@/components/context/provider'
import { EventData } from '@/lib/api'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const formatDateEnglish = (dateStr: string) => {
  if (!dateStr) return ''
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (match) {
    const year = parseInt(match[1], 10)
    const monthIndex = parseInt(match[2], 10) - 1
    const day = parseInt(match[3], 10)
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    return `${months[monthIndex]} ${day}, ${year}`
  }
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  } catch {
    return dateStr
  }
}

const CardOpenWedding: React.FC<{
  name: string
  loading: boolean
  event: EventData
  subtitle?: string
  buttonText?: string
  targetId?: string
  qrPayload?: string | null
}> = ({ name, loading, event, subtitle, buttonText, targetId, qrPayload }) => {
  const { openInvitation, isInvitationOpen, setIsQrOpen } = useInvitation()

  const [isPreview, setIsPreview] = React.useState(false)
  React.useEffect(() => {
    setIsPreview(window.location.search.includes('to=preview') || window.location.search.includes('preview=true'))
  }, [])

  return (
    <div className="relative h-dvh w-full flex items-center justify-center overflow-hidden" id="card-open-wedding">
      {/* Fullscreen Base Screen Background (Transitions to BgCardOpenGuest when opened) */}
      <motion.div
        className="absolute inset-0 z-0 h-full w-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInvitationOpen ? 1 : 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      >
        <Image
          src={BgCardOpenGuest}
          loading="lazy"
          alt="bg-card-open-guest"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Center Card Frame Container */}
      <div className="relative aspect-421/601 w-[90%] max-w-[380px] z-10 flex flex-col items-center justify-center">
        {/* Frame Card Background */}
        <Image
          src={BgCardOpenWedding}
          alt="bg-card-open-wedding"
          fill
          priority
          sizes="(max-width: 768px) 90vw, 380px"
          className="absolute inset-0 z-0 object-fill pointer-events-none"
        />


        {/* Corner Ornaments (positioned at the corners of this card-frame-container, NOT screen) */}
        {/* Top-Left Flower */}
        <motion.div
          className="absolute top-[-10%] left-[-10%] z-10 pointer-events-none origin-top-left"
          style={{ width: '36.5%', transformStyle: 'preserve-3d' }}
          initial={{ opacity: 0, scale: 0.5, rotate: -45, x: -20, y: -20 }}
          animate={isInvitationOpen ? { opacity: 1, scale: 1, rotate: [0, 2, -2, 0], x: [0, 3, -3, 0], y: [0, -5, 5, 0] } : { opacity: 0, scale: 0.5, rotate: -45, x: -20, y: -20 }}
          transition={isInvitationOpen ? {
            opacity: { duration: 0.8, delay: 0.2 },
            scale: { type: 'spring', damping: 15, stiffness: 60, delay: 0.2 },
            x: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.2 },
            y: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.2 },
            rotate: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.2 },
          } : { duration: 0.5 }}
        >
          <Image
            src={FlowerTopLeft}
            alt="flower-top-left"
            className="w-full h-auto"
          />
        </motion.div>

        {/* Top-Right Ornament */}
        <motion.div
          className="absolute top-[-4%] right-[-4%] z-10 pointer-events-none origin-top-right"
          style={{ width: '17%', transformStyle: 'preserve-3d' }}
          initial={{ opacity: 0, scale: 0.5, rotate: 45, x: 20, y: -20 }}
          animate={isInvitationOpen ? { opacity: 1, scale: 1, rotate: [0, -2, 2, 0], x: [0, -3, 3, 0], y: [0, -5, 5, 0] } : { opacity: 0, scale: 0.5, rotate: 45, x: 20, y: -20 }}
          transition={isInvitationOpen ? {
            opacity: { duration: 0.8, delay: 0.3 },
            scale: { type: 'spring', damping: 15, stiffness: 60, delay: 0.3 },
            x: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.3 },
            y: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.3 },
            rotate: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.3 },
          } : { duration: 0.5 }}
        >
          <Image
            src={OrnamentTopRight}
            alt="ornament-top-right"
            className="w-full h-auto"
          />
        </motion.div>

        {/* Bottom-Left Ornament */}
        <motion.div
          className="absolute bottom-[-4%] left-[-4%] z-10 pointer-events-none origin-bottom-left"
          style={{ width: '23.3%', transformStyle: 'preserve-3d' }}
          initial={{ opacity: 0, scale: 0.5, rotate: -45, x: -20, y: 20 }}
          animate={isInvitationOpen ? { opacity: 1, scale: 1, rotate: [0, 2, -2, 0], x: [0, 3, -3, 0], y: [0, 5, -5, 0] } : { opacity: 0, scale: 0.5, rotate: -45, x: -20, y: 20 }}
          transition={isInvitationOpen ? {
            opacity: { duration: 0.8, delay: 0.4 },
            scale: { type: 'spring', damping: 15, stiffness: 60, delay: 0.4 },
            x: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.4 },
            y: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.4 },
            rotate: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.4 },
          } : { duration: 0.5 }}
        >
          <Image
            src={OrnamentBottomLeft}
            alt="ornament-bottom-left"
            className="w-full h-auto"
          />
        </motion.div>

        {/* Bottom-Right Flower */}
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] z-10 pointer-events-none origin-bottom-right"
          style={{ width: '38.5%', transformStyle: 'preserve-3d' }}
          initial={{ opacity: 0, scale: 0.5, rotate: 45, x: 20, y: 20 }}
          animate={isInvitationOpen ? { opacity: 1, scale: 1, rotate: [0, -2, 2, 0], x: [0, -3, 3, 0], y: [0, 5, -5, 0] } : { opacity: 0, scale: 0.5, rotate: 45, x: 20, y: 20 }}
          transition={isInvitationOpen ? {
            opacity: { duration: 0.8, delay: 0.5 },
            scale: { type: 'spring', damping: 15, stiffness: 60, delay: 0.5 },
            x: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.5 },
            y: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.5 },
            rotate: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.5 },
          } : { duration: 0.5 }}
        >
          <Image
            src={FlowerBottomRight}
            alt="flower-bottom-right"
            className="w-full h-auto"
          />
        </motion.div>

        {/* Inside Card Content (Icon, Subtitle/Couple Names, Button/Guest Details) */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 w-full px-6">
          {/* Couple Names (Fades out when invitation is opened) */}
          <motion.div
            className="flex flex-col items-center text-center w-full"
            initial={{ opacity: 0 }}
            transition={
              isPreview
                ? { duration: 0.2 }
                : { duration: 1, delay: 5.5 }
            }
            animate={{
              opacity: loading ? 0 : 1,
              y: 0
            }}
          >
            <Image
              src={IconSvg}
              alt="icon"
              width={47}
              height={54}
              className="h-auto w-auto mb-4"
            />
            {subtitle ? (
              <h1
                className="font-little-hands leading-none text-[#603C24] font-normal text-center whitespace-pre-line"
                style={{ fontSize: 'clamp(32px, 15vw, 72px)' }}
              >
                {subtitle}
              </h1>
            ) : (
              <div className="flex flex-col items-center text-center leading-none">
                <span
                  className="leading-none font-little-hands text-[#603C24] font-normal"
                  style={{ fontSize: 'clamp(32px, 15vw, 72px)' }}
                >
                  {event.bride_name.toLowerCase()}
                </span>
                <span
                  className="font-little-hands text-[#603C24] font-normal block"
                  style={{ fontSize: 'clamp(24px, 10vw, 48px)' }}
                >
                  &
                </span>
                <span
                  className="font-little-hands text-[#603C24] font-normal"
                  style={{ fontSize: 'clamp(32px, 15vw, 72px)' }}
                >
                  {event.groom_name.toLowerCase()}
                </span>
              </div>
            )}
            {/* Wedding Date (Fades in when opened, positioned mepet below couple names) */}
            <motion.p
              className="font-little-hands leading-none text-[#603C24] font-normal"
              style={{ fontSize: 'clamp(20px, 5vw, 32px)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={
                isInvitationOpen
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            >
              {formatDateEnglish(event.event_date)}
            </motion.p>
          </motion.div>

          {/* Button & Guest Personalization Transition Area */}
          <div className="relative flex flex-col items-center justify-center w-full min-h-[120px]">
            {/* "Lihat Undangan" Button (Only clickable when closed) */}
            <motion.button
              className="cursor-pointer rounded-[10px] bg-[#275E78] border-2 border-transparent w-[200px] sm:w-[240px] md:w-[280px] py-2 text-sm sm:py-2.5 sm:text-base md:py-3 text-center font-minecraft font-normal text-nowrap uppercase text-[#C2A198]"
              initial={{ opacity: 0 }}
              transition={
                isPreview
                  ? { duration: 0.2 }
                  : isInvitationOpen
                    ? { duration: 0.5 }
                    : { duration: 1, delay: 6 }
              }
              animate={{
                opacity: isInvitationOpen ? 0 : (loading ? 0 : 1),
                scale: isInvitationOpen ? 0.9 : 1,
                pointerEvents: isInvitationOpen ? 'none' : 'auto'
              }}
              onClick={() => openInvitation(targetId)}
            >
              {buttonText || 'Open Invitation'}
            </motion.button>

            {qrPayload && (
              <motion.button
                className="mt-3 cursor-pointer rounded-[10px] bg-white border-2 border-[#275E78] w-[200px] sm:w-[240px] md:w-[280px] py-2 text-sm sm:py-2.5 sm:text-base md:py-3 text-center font-minecraft font-normal text-nowrap uppercase text-[#C2A198] hover:bg-gray-50 transition-all z-20"
                initial={{ opacity: 0 }}
                transition={
                  isPreview
                    ? { duration: 0.2 }
                    : isInvitationOpen
                      ? { duration: 0.5 }
                      : { duration: 1, delay: 6 }
                }
                animate={{
                  opacity: isInvitationOpen ? 0 : (loading ? 0 : 1),
                  scale: isInvitationOpen ? 0.9 : 1,
                  pointerEvents: isInvitationOpen ? 'none' : 'auto'
                }}
                onClick={() => setIsQrOpen(true)}
              >
                Show QR Code
              </motion.button>
            )}

            {/* Guest Personalization Details (Fades in when opened) */}
            <motion.div
              className="absolute flex flex-col items-center gap-1.5 text-center pointer-events-none w-full"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={
                isInvitationOpen
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.9, y: 15 }
              }
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            >
              <p
                className="font-minecraft leading-none text-[#603C24] font-normal uppercase tracking-wide"
                style={{ fontSize: 'clamp(16px, 4.5vw, 21px)' }}
              >
                Hello, {name}!
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardOpenWedding
