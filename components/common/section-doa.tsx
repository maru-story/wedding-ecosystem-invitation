'use client'

import BgFrame from '@/components/assets/images/section-doa/bg-section-doa.svg'
import Flower1 from '@/components/assets/images/section-doa/flower-1.svg'
import Flower2 from '@/components/assets/images/section-doa/flower-2.svg'
import Flower3 from '@/components/assets/images/section-doa/flower-3.svg'
import Flower4 from '@/components/assets/images/section-doa/flower-4.svg'
import Flower5 from '@/components/assets/images/section-doa/flower-5.svg'
import Flower6 from '@/components/assets/images/section-doa/flower-6.svg'
import FrameSectionDoa from '@/components/assets/images/section-doa/frame-section-doa.svg'
import Surat from '@/components/assets/images/section-doa/surat.png'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const SectionDoa: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden" id="section-doa">
      {/* Container that establishes size */}
      <div className="relative grid aspect-[9/16] w-full content-center">
        <div className="absolute h-auto w-full">
          <Image
            src={BgFrame}
            alt="section-doa-background-frame"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>
        <div className="relative mx-auto h-[450px] w-[300px]">
          {/* Flower 1 - Top Left */}
          <motion.div
            initial={{ rotateY: -180, opacity: 0 }}
            whileInView={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: 'easeInOut' }}
            viewport={{ once: false, amount: 0.5 }}
            className="absolute -top-20 -left-10 z-10"
          >
            <Image
              src={Flower1}
              alt="flower-1"
              width={0}
              height={0}
              loading="lazy"
              className="h-auto"
            />
          </motion.div>

          {/* Flower 2 - Top Right */}
          <motion.div
            initial={{ rotateY: -180, opacity: 0 }}
            whileInView={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: 'easeInOut' }}
            viewport={{ once: false, amount: 0.5 }}
            className="absolute top-10 -left-10 z-10"
          >
            <Image
              src={Flower2}
              alt="flower-2"
              width={0}
              height={0}
              loading="lazy"
              className="h-auto"
            />
          </motion.div>

          {/* Flower 3 - Middle Left */}
          <motion.div
            initial={{ rotateY: -180, opacity: 0 }}
            whileInView={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: 'easeInOut' }}
            viewport={{ once: false, amount: 0.5 }}
            className="absolute bottom-0 left-0 z-10"
          >
            <Image
              src={Flower3}
              alt="flower-3"
              width={0}
              height={0}
              loading="lazy"
              className="h-auto"
            />
          </motion.div>

          {/* Flower 4 - Middle Right */}
          <motion.div
            initial={{ rotateY: -180, opacity: 0 }}
            whileInView={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.4, ease: 'easeInOut' }}
            viewport={{ once: false, amount: 0.5 }}
            className="absolute top-20 -right-10 z-10"
          >
            <Image
              src={Flower4}
              alt="flower-4"
              width={0}
              height={0}
              loading="lazy"
              className="h-auto"
            />
          </motion.div>

          {/* Flower 5 - Bottom Left */}
          <motion.div
            initial={{ rotateY: -180, opacity: 0 }}
            whileInView={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.4, ease: 'easeInOut' }}
            viewport={{ once: false, amount: 0.5 }}
            className="absolute -right-10 bottom-30 z-10"
          >
            <Image
              src={Flower5}
              alt="flower-5"
              width={0}
              height={0}
              loading="lazy"
              className="h-auto"
            />
          </motion.div>

          {/* Flower 6 - Bottom Right */}
          <motion.div
            initial={{ rotateY: -180, opacity: 0 }}
            whileInView={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.4, ease: 'easeInOut' }}
            viewport={{ once: false, amount: 0.5 }}
            className="absolute -right-10 -bottom-10 z-10 "
          >
            <Image
              src={Flower6}
              alt="flower-6"
              width={0}
              height={0}
              loading="lazy"
              className="h-auto"
            />
          </motion.div>
          <Image
            src={FrameSectionDoa}
            alt="section-doa-frame"
            width={300}
            height={450}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            loading="lazy"
          />
          <motion.div
            initial={{ opacity: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute -top-10 right-0 h-auto"
          >
            <Image
              src={Surat}
              alt="section-doa-text"
              width={0}
              height={0}
              sizes="100vw"
              loading="lazy"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
            className="absolute top-1/2 left-1/2 z-99 w-[175px] -translate-x-1/2 -translate-y-1/2 text-center text-[13px] text-[#606161]"
          >
            Diantara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan
            pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu
            merasa tentram kepadanya. Dia menjadikan di antaramu rasa cinta dan
            kasih sayang. Sesungguhnya pada yang demikian itu benar-benar
            terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

export default SectionDoa
