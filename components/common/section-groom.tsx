'use client'

import BgFrame from '@/components/assets/images/section-groom-bride/bg-section-groom-bride.svg'
import WeddingOf from '@/components/assets/images/section-groom-bride/groom-wedding-of.svg'
import PanjiNama from '@/components/assets/images/section-groom-bride/nama-groom-panji.svg'
import { motion } from 'framer-motion' // Import framer-motion
import Image from 'next/image'
import React from 'react'

const SectionGroom: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden" id="section-groom">
      {/* Container that establishes size */}
      <div className="relative aspect-[9/16] w-full">
        {/* Background elements */}
        <div className="absolute h-auto w-full">
          <Image
            src={BgFrame}
            alt="section-groom-bride-background-frame"
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
          <div className="relative flex flex-col items-center gap-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_URL_IMAGE}section-groom-gambar-panji.svg`}
                alt="section-groom-panji"
                width={0}
                height={0}
                sizes="100vw"
                className="mx-auto h-auto w-[375px]"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              <Image
                src={WeddingOf}
                alt="section-groom-wedding-of"
                width={0}
                height={0}
                sizes="100vw"
                className="absolute -top-3 left-1/2 h-auto -translate-x-1/2"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              <Image
                src={PanjiNama}
                alt="section-groom-panji-nama"
                width={0}
                height={0}
                sizes="100vw"
                className="absolute bottom-26 left-1/2 h-auto -translate-x-1/2"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              className="mx-auto flex w-full max-w-[300px] flex-col items-center justify-center rounded-xl border-1 border-[#BE997C] bg-[#B66F54] p-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              <p className="text-xs text-black">Putra Pertama dari</p>
              <p className="text-xs text-black">
                Bapak Lulu Mulyadi & Ibu Istrini Tyas Bisowarni
              </p>
            </motion.div>
            <motion.a
              href="https://www.instagram.com/panjinrr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              className="text-xs text-[#DBBCA5] underline"
              target="_blank"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              @panjinrr
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SectionGroom
