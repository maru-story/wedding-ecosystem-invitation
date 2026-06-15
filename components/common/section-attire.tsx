'use client'

import BgFrame from '@/components/assets/images/section-attire/bg-section-attire.svg'
import CollorPallette from '@/components/assets/images/section-attire/color-pallette.svg'
import Flower1 from '@/components/assets/images/section-attire/flower-1.svg'
import Flower2 from '@/components/assets/images/section-attire/flower-2.svg'
import Flower3 from '@/components/assets/images/section-attire/flower-3.svg'
import Flower4 from '@/components/assets/images/section-attire/flower-4.svg'
import Frame from '@/components/assets/images/section-attire/frame-section-attire.svg'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const SectionAttire: React.FC = () => {
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
    <section className="relative w-full overflow-hidden" id="section-attire">
      {/* Container that establishes size */}
      <div className="relative aspect-[9/16] w-full">
        {/* Background elements */}
        <div className="absolute z-0 h-auto w-full">
          <Image
            src={BgFrame}
            alt="section-attire-background"
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
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <Image
                src={Frame}
                alt="section-attire-frame"
                width={0}
                height={0}
                sizes="100vw"
                className="mx-auto h-auto"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: false }}
              className="absolute top-10 left-1/2 z-10 -translate-x-1/2"
            >
              <p className="text-xs text-[#634749]">ATTIRE</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: false }}
              className="absolute top-15 left-1/2 z-10 h-auto w-[80%] -translate-x-1/2"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_URL_IMAGE}section-attire-outfit.svg`}
                alt="section-attire-outfit"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: false }}
              className="absolute bottom-45 left-[49%] z-11 w-[93%] -translate-x-1/2"
            >
              <Image
                src={CollorPallette}
                alt="section-attire-collor-pallette"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: false }}
              className="absolute bottom-10 left-[49.5%] z-10 w-[85%] -translate-x-1/2 rounded-2xl bg-[#AA6552] p-2 text-center"
            >
              <p className="text-[10px] text-[#C6C1C2]">
                Dihari yang berbahagia ini, untuk menciptakan suasana yang
                selaras dan juga khidmat, kami dengan segala kerendahan hati
                meminta kesediaan Anda untuk mengenakan pakaian bernuansa
                tradisional seperti kain batik, kebaya, dan kemeja formal saat
                menghadiri acara pernikahan.
              </p>
              <p className="text-[10px] text-[#C6C1C2]">
                Kehadiran Anda dalam balutan Kain Tradisional akan menjadi
                pelengkap sempurna dalam merayakan hari yang berbahagia ini
              </p>
            </motion.div>
            <motion.div
              className="absolute right-0 -bottom-10 z-10"
              variants={flipVariants[0]}
              initial="hidden"
              whileInView="visible"
              custom={4}
              viewport={{ once: false }}
              style={{ perspective: '500px' }}
            >
              <Image
                src={Flower4}
                alt="decorative-flower-4"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-10 -left-10 z-10"
              variants={flipVariants[0]}
              initial="hidden"
              whileInView="visible"
              custom={3}
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
              className="absolute -right-5 bottom-45 z-10"
              variants={flipVariants[0]}
              initial="hidden"
              whileInView="visible"
              custom={2}
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
            <motion.div
              className="absolute  -bottom-17 -left-15 z-10"
              variants={flipVariants[0]}
              initial="hidden"
              whileInView="visible"
              custom={1}
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SectionAttire
