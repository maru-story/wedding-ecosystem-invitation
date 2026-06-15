'use client'

import BgSectionHome from '@/components/assets/images/section-awal/bg-section-1-cropped.png'
import BgSectionBottomCropped from '@/components/assets/images/section-awal/bg-section-bottom-cropped.png'
import Key from '@/components/assets/images/section-awal/key.png'
import { motion, Variants } from 'framer-motion'
import Image from 'next/image'

export default function SectionHome() {
  // Variants for the scrolling text only (keeping this animation)
  const textScrollVariants: Variants = {
    animate: {
      x: ['-100%', '100%'],
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

  return (
    <section className="relative">
      {/* DIVIDER */}
      <div className="absolute top-5 h-[10px] w-full border-b-2 border-b-[#8b3438] bg-[#701f24]" />

      {/* TOP PRINTER*/}
      <motion.div
        className="absolute top-10 left-1/2 flex w-[90%] -translate-x-1/2 flex-col gap-2 border-b-2 border-b-[#8b3438]"
        animate="animate"
      >
        {/* ITEM FOR TEXT WEDDING */}
        <div className="flex justify-between gap-1 rounded-xs border-b-2 border-b-[#8b3438] bg-[#701f24] px-3 py-2">
          <div className="flex-2 overflow-hidden rounded-sm bg-[#322a23] px-4 py-2.5">
            <motion.p
              className="text-center font-[minecraft] text-xs text-nowrap text-[#8a826c] uppercase"
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
              The Wedding Of Panji Gina
            </motion.p>
          </div>
          <div className="absolute left-[33%] h-1/2 w-2.5 bg-[#701f24]" />
          <div className="absolute right-[33%] h-1/2 w-2.5 bg-[#701f24]" />
        </div>
        {/* ITEM FOR PRINTING THE CARD */}
        <div className="rounded-xs bg-[#701f24] px-3 py-2">
          <div className="relative">
            <div className="h-[8px] w-full rounded-tl-sm rounded-tr-sm bg-[#322a23]" />
            <div className="absolute bottom-0 left-1/2 h-[2px] w-[90%] -translate-x-1/2 rounded-tl-xs rounded-tr-xs bg-[#2b201a]" />
          </div>
        </div>
      </motion.div>

      {/* BACKGROUND RED */}
      <Image
        src={BgSectionHome}
        alt="background-section-1"
        sizes="100vw"
        width={0}
        height={0}
        loading="lazy"
        className="h-[100dvh] w-full"
      />

      {/* KEY IMAGE - no animation */}
      <motion.div
        animate={{ opacity: 0 }}
        transition={{ duration: 1, delay: 1 }}
        initial={{ opacity: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <Image
          src={Key}
          alt="key"
          sizes="100vw"
          width={160}
          height={290}
          loading="lazy"
          className="w-auto"
        />
      </motion.div>

      {/* BOTTOM CROPPED */}
      <Image
        src={BgSectionBottomCropped}
        alt="key"
        sizes="100vw"
        width={0}
        height={0}
        loading="lazy"
        className="absolute bottom-0 h-auto w-full"
      />
    </section>
  )
}
