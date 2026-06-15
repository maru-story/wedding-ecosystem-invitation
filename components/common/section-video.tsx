'use client'

import Flower1 from '@/components/assets/images/section-video/flower-1.svg'
import Flower2 from '@/components/assets/images/section-video/flower-2.svg'
import Flower3 from '@/components/assets/images/section-video/flower-3.svg'
import Flower4 from '@/components/assets/images/section-video/flower-4.svg'
import Frame from '@/components/assets/images/section-video/frame-section-video.svg'
import TextVideo from '@/components/assets/images/section-video/text-video.svg'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const SectionVideo: React.FC = () => {
  const flipVariant = {
    hidden: { opacity: 0, rotateY: -180 },
    visible: (i: number) => ({
      opacity: 1,
      rotateY: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.8,
      },
    }),
  }
  return (
    <section className="relative w-full" id="section-video">
      {/* Container that establishes size */}
      <div className="relative grid aspect-[9/16] w-full">
        <div className="absolute h-auto w-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_URL_IMAGE}bg-section-video.svg`}
            alt="section-video-background-frame"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>
        <div className="absolute right-0 z-11 h-auto">
          <Image
            src={TextVideo}
            alt="section-video-text"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>
        <div className="relative mt-20 h-[250px] w-full">
          <Image
            src={Frame}
            alt="section-video-frame"
            width={0}
            height={0}
            loading="lazy"
            className="mx-auto h-auto w-[90%]"
          />
          <div className="absolute top-2.5 left-1/2 h-[250px] w-full max-w-[375px] min-w-[280px] -translate-x-1/2 rounded-lg px-2.5 py-2.5 max-[400px]:top-2.5 max-[400px]:h-[57vw] max-[400px]:px-8">
            <iframe
              src="https://www.youtube.com/embed/4I-BUN-swrA?loop=1?controls=1&rel=0&mute=0&loop=1&playsinline=1&modestbranding=0&autoplay=0&enablejsapi=1"
              title="YouTube video player"
              allow="autoplay;  gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="h-full w-full rounded-lg"
            ></iframe>
          </div>
          <motion.div
            className="absolute right-0 -bottom-60 z-11 max-[400]:-bottom-30"
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: false }}
            style={{ perspective: '500px' }}
          >
            <Image
              src={Flower1}
              alt="section-video-flower-1"
              width={0}
              height={0}
              loading="lazy"
              className="h-auto"
            />
          </motion.div>
          <motion.div
            className="absolute -right-2 -bottom-50 h-auto max-[400px]:-bottom-25"
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: false }}
            style={{ perspective: '500px' }}
          >
            <Image
              src={Flower2}
              alt="section-video-flower-2"
              width={0}
              height={0}
              loading="lazy"
              className="h-auto"
            />
          </motion.div>
          <motion.div
            className="absolute -bottom-60 -left-5 z-11 h-auto max-[400px]:-bottom-35"
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: false }}
            style={{ perspective: '500px' }}
          >
            <Image
              src={Flower3}
              alt="section-video-flower-3"
              width={0}
              height={0}
              loading="lazy"
              className="h-auto"
            />
          </motion.div>
          <motion.div
            className="absolute -left-10 h-auto max-[400px]:-bottom-30"
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: false }}
            style={{ perspective: '500px' }}
          >
            <Image
              src={Flower4}
              alt="section-video-flower-4"
              width={0}
              height={0}
              loading="lazy"
              className="h-auto"
            />
          </motion.div>
        </div>
        <Image
          src={`${process.env.NEXT_PUBLIC_URL_IMAGE}section-video-foto.svg`}
          alt="section-video-foto"
          width={0}
          height={0}
          sizes="100vw"
          className="absolute bottom-0 z-10 h-auto w-full"
          loading="lazy"
        />
      </div>
    </section>
  )
}

export default SectionVideo
