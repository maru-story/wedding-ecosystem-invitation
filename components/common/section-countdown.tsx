'use client'

import BgFrame from '@/components/assets/images/section-countdown/bg-section-countdown.svg'
import Flower1 from '@/components/assets/images/section-countdown/flower-1.svg'
import Flower2 from '@/components/assets/images/section-countdown/flower-2.svg'
import Flower3 from '@/components/assets/images/section-countdown/flower-3.svg'
import Flower4 from '@/components/assets/images/section-countdown/flower-4.svg'
import Flower5 from '@/components/assets/images/section-countdown/flower-5.svg'
import Flower6 from '@/components/assets/images/section-countdown/flower-6.svg'
import Flower7 from '@/components/assets/images/section-countdown/flower-7.svg'
import Flower8 from '@/components/assets/images/section-countdown/flower-8.svg'
import Frame from '@/components/assets/images/section-countdown/frame-section-countdown.svg'
import Countdown from '@/components/common/countdown'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const SectionCountdown: React.FC = () => {
  // Create Google Calendar URL
  const createGoogleCalendarUrl = () => {
    // Event details
    const eventTitle = 'Panji & Gina Wedding'
    const eventDescription =
      'Wedding ceremony of Panji, son of Bapak Lulu Mulyadi & Ibu Istrini Tyas Bisowarni & Gina, daughter of Muhammad Bakrie Baharuddin & Ibu Siti Hasanah'

    // Use the exact Google Maps location link provided
    const eventLocation = 'https://maps.app.goo.gl/6i8ZZFUpJDyC1Qw76'

    // Format start and end dates for Google Calendar
    // Wedding date: June 8, 2025, 11:00 AM WIB (UTC+7)
    const startDate = new Date('2025-06-08T11:00:00+07:00')
    const endDate = new Date('2025-06-08T15:00:00+07:00') // Assuming 4-hour event

    // Convert to UTC format required by Google Calendar
    const formattedStart = startDate.toISOString().replace(/-|:|\.\d+/g, '')
    const formattedEnd = endDate.toISOString().replace(/-|:|\.\d+/g, '')

    // Create the URL
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${formattedStart}/${formattedEnd}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`
  }

  // Different flip variants for flowers (without scale)
  const flipVariants = [
    // Flip on X axis (horizontal flip)
    {
      hidden: { opacity: 0, rotateY: -180 },
      visible: (i: number) => ({
        opacity: 1,
        rotateY: 0,
        transition: {
          delay: 0.3 + i * 0.1,
          duration: 0.8,
        },
      }),
    },
  ]

  return (
    <section className="relative w-full overflow-hidden" id="section-countdown">
      {/* Container that establishes size */}
      <div className="relative aspect-[9/16] w-full">
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
            {/* Flowers positioning */}
            {/* Flower 1 - top left - X axis flip */}
            <motion.div
              className="absolute -top-8 -left-5 z-7"
              variants={flipVariants[0]}
              initial="hidden"
              whileInView="visible"
              custom={0}
              viewport={{ once: false }}
              style={{ perspective: '500px' }}
            >
              <Image
                src={Flower1}
                alt="decorative-flower-1"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto"
                loading="lazy"
              />
            </motion.div>

            {/* Flower 2 - middle left - Y axis flip */}
            <motion.div
              className="absolute top-25 -left-10 z-7"
              variants={flipVariants[0]}
              initial="hidden"
              whileInView="visible"
              custom={1}
              viewport={{ once: false }}
              style={{ perspective: '500px' }}
            >
              <Image
                src={Flower2}
                alt="decorative-flower-2"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto"
                loading="lazy"
              />
            </motion.div>

            {/* Flower 3 - bottom left - Z axis flip */}
            <motion.div
              className="absolute bottom-45 -left-3 z-7"
              variants={flipVariants[0]}
              initial="hidden"
              whileInView="visible"
              custom={2}
              viewport={{ once: false }}
              style={{ perspective: '500px' }}
            >
              <Image
                src={Flower3}
                alt="decorative-flower-3"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto"
                loading="lazy"
              />
            </motion.div>

            {/* Flower 4 - bottom left corner - X axis flip */}
            <motion.div
              className="absolute -bottom-10 -left-15 z-7"
              variants={flipVariants[0]}
              initial="hidden"
              whileInView="visible"
              custom={3}
              viewport={{ once: false }}
              style={{ perspective: '500px' }}
            >
              <Image
                src={Flower4}
                alt="decorative-flower-4"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Flower 5 - top right - Y axis flip */}
            <motion.div
              className="absolute top-0 -right-10 z-7"
              variants={flipVariants[0]}
              initial="hidden"
              whileInView="visible"
              custom={4}
              viewport={{ once: false }}
              style={{ perspective: '500px' }}
            >
              <Image
                src={Flower5}
                alt="decorative-flower-5"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto"
                loading="lazy"
              />
            </motion.div>

            {/* Flower 6 - middle right - Z axis flip */}
            <motion.div
              className="absolute top-40 -right-10 z-7"
              variants={flipVariants[0]}
              initial="hidden"
              whileInView="visible"
              custom={5}
              viewport={{ once: false }}
              style={{ perspective: '500px' }}
            >
              <Image
                src={Flower6}
                alt="decorative-flower-6"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto"
                loading="lazy"
              />
            </motion.div>

            {/* Flower 7 - bottom right - X axis flip */}
            <motion.div
              className="absolute -right-10 bottom-10 z-8"
              variants={flipVariants[0]}
              initial="hidden"
              whileInView="visible"
              custom={6}
              viewport={{ once: false }}
              style={{ perspective: '500px' }}
            >
              <Image
                src={Flower7}
                alt="decorative-flower-7"
                width={0}
                height={0}
                sizes="11vw"
                className="h-auto"
                loading="lazy"
              />
            </motion.div>

            {/* Flower 8 - bottom right corner - Y axis flip */}
            <motion.div
              className="absolute -right-10 bottom-5 z-7"
              variants={flipVariants[0]}
              initial="hidden"
              whileInView="visible"
              custom={7}
              viewport={{ once: false }}
              style={{ perspective: '500px' }}
            >
              <Image
                src={Flower8}
                alt="decorative-flower-8"
                width={0}
                height={0}
                sizes="10vw"
                className="h-auto"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: false }}
              className="absolute top-20 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
            >
              <p className="font-[milk-honey] text-2xl text-[#3D3D3D] uppercase">
                8 Juni 2025
              </p>
              <p className="text-xs text-[#3D3D3D] uppercase">Countdown</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: false }}
              className="absolute top-1/2 left-1/2 mx-auto grid w-full max-w-[300px] -translate-x-1/2 -translate-y-1/2 grid-cols-12 justify-center space-y-6 gap-x-0"
            >
              <Countdown />
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
                width={0}
                height={0}
                sizes="100vw"
                className="mx-auto h-auto"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: '-100%' }}
              whileInView={{ opacity: 1, x: '0%' }}
              transition={{ duration: 0.8, delay: 0.8 }}
              exit={{ opacity: 0, x: '100%' }}
              viewport={{ once: false }}
              className="absolute -bottom-20 z-10 max-[475px]:-bottom-[15vw]"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_URL_IMAGE}section-countdown-sepeda.svg`}
                alt="section-countdown-frame"
                width={0}
                height={0}
                sizes="100vw"
                className="mx-auto h-auto w-[70%]"
                loading="lazy"
              />
            </motion.div>
            <motion.a
              href={createGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -bottom-10 left-1/2 z-11 -translate-x-1/2 rounded-full border-1 border-[#CF935F] bg-[#8D4F5D] px-4 py-2.5 font-[milk-honey] text-[8px] font-thin text-nowrap text-white uppercase transition-all hover:bg-[#896B58] max-lg:-bottom-[3vw]"
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Tambah Ke Kalender
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SectionCountdown
