'use client'

import BgFrame from '@/components/assets/images/section-akad/bg-section-akad.svg'
import Flower1 from '@/components/assets/images/section-akad/flower-1.svg'
import Flower2 from '@/components/assets/images/section-akad/flower-2.svg'
import Flower3 from '@/components/assets/images/section-akad/flower-3.svg'
import Flower4 from '@/components/assets/images/section-akad/flower-4.svg'
import Flower5 from '@/components/assets/images/section-akad/flower-5.svg'
import Flower6 from '@/components/assets/images/section-akad/flower-6.svg'
import Frame from '@/components/assets/images/section-akad/frame-section-akad.svg'
import Gedung from '@/components/assets/images/section-akad/gedung-section-akad.svg'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const SectionAkad: React.FC = () => {
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
    <section className="relative w-full" id="section-akad">
      {/* Container that establishes size */}
      <div className="relative aspect-[9/16] w-full">
        {/* Background elements */}
        <div className="absolute z-0 h-auto w-full">
          <Image
            src={BgFrame}
            alt="section-akad-background"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>
        <motion.div
          className="absolute -bottom-5 left-0 z-7"
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
        <motion.div
          className="absolute right-0 -bottom-5 z-7"
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
              className="absolute -top-15 -left-5 z-7"
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
              className="absolute bottom-10 -left-10 z-7"
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

            {/* Flower 4 - bottom left corner - X axis flip */}
            <motion.div
              className="absolute -top-10 -right-10 z-7"
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
              className="absolute -right-10 bottom-0 z-7"
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

            {/* Text content with sequential animations */}
            <div className="absolute top-17.5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
              {/* Introduction text - First to appear */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: false }}
              >
                <p className="text-center text-[10px] text-[#606161]">
                  Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
                  Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu
                  kepada kedua mempelai
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
                <p className="font-[milk-honey] text-xl text-[#6B3D49]">AKAD</p>
                <div className="flex items-center">
                  <div className="flex flex-col items-end">
                    <p className="text-xs text-[#606161]">MINGGU</p>
                    <p className="text-xs text-[#606161]">08 JUNI 2025</p>
                  </div>
                  <div className="mx-1.5 h-[30px] w-px bg-[#6B3D49]" />
                  <p className="text-xs text-[#606161]">08.00 - 10.00</p>
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
                <p className="font-[milk-honey] text-xl text-[#6B3D49]">
                  RESEPSI
                </p>
                <div className="flex items-center">
                  <div className="flex flex-col items-end">
                    <p className="text-xs text-[#606161]">MINGGU</p>
                    <p className="text-xs text-[#606161]">08 JUNI 2025</p>
                  </div>
                  <div className="mx-1.5 h-[30px] w-px bg-[#6B3D49]" />
                  <p className="text-xs text-[#606161]">11.00 - 14.00</p>
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
                <div className="flex flex-col items-center">
                  <p className="text-xs text-[#6B3D49]">Bertempat di</p>
                  <p className="text-center text-xs text-nowrap text-[#6B3D49]">
                    GEDUNG BADARUSAMSI DITKUAD
                  </p>
                </div>
                <p className="text-center text-[10px] text-[#606161]">
                  Jl. Menado No 8, Merdeka, Kec. Sumur Bandung, Kota Bandung,
                  Jawa Barat 40113
                </p>
              </motion.div>
            </div>

            <motion.a
              href={'https://maps.app.goo.gl/6i8ZZFUpJDyC1Qw76'}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-20 left-1/2 z-11 -translate-x-1/2 text-nowrap text-white uppercase transition-all hover:bg-[#896B58]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }} // Increased delay to appear after all text
            >
              <span className="rounded-full border-1 border-[#CF935F] bg-[#8D4F5D] px-4 py-2.5 font-[milk-honey] text-[8px] font-thin">
                Lihat Maps
              </span>
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
                width={0}
                height={0}
                sizes="100vw"
                className="mx-auto h-auto"
                loading="lazy"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
          className="absolute bottom-10 w-full"
        >
          <Image
            src={Gedung}
            alt="section-akad-background"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default SectionAkad
