'use client'

import BgPenutup from '@/components/assets/images/section-penutup/bg-section-penutup.png'
import FotoPenutup from '@/components/assets/images/section-penutup/foto-penutup-section.png'
import { SectionData } from '@/lib/api'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface SectionPenutupProps {
  section?: SectionData
}

const SectionPenutup: React.FC<SectionPenutupProps> = ({ section }) => {
  const content = section?.content as {
    photo_url?: string
  } | undefined

  const [liveContent, setLiveContent] = useState(content)

  useEffect(() => {
    setLiveContent(content)
  }, [content])

  // Listen for CMS live preview updates
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (
        e.data?.type === 'CMS_PREVIEW_UPDATE' &&
        e.data?.section_type === 'closing'
      ) {
        setLiveContent(e.data.content)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const photoUrl = liveContent?.photo_url || ''

  return (
    <section className="relative w-full overflow-hidden" id="section-penutup">
      {/* Container that establishes size */}
      <div className="relative flex aspect-9/16 w-full flex-col items-center justify-center">
        {/* Layer 1 (back): Photo - full size */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt="closing photo"
              width={880}
              height={1238}
              sizes="100vw"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <Image
              src={FotoPenutup}
              alt="closing photo"
              sizes="100vw"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          )}
        </motion.div>

        {/* Layer 2 (middle): Background frame overlay */}
        <div className="pointer-events-none absolute inset-0 z-5">
          <Image
            src={BgPenutup}
            alt="section-penutup-frame"
            sizes="100vw"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Layer 3 (front): "See You!" text - top right corner above photo */}
        <motion.div
          className="absolute top-12 right-8 z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.6,
              },
            },
          }}
          animate={{
            rotate: [-12, -10, -14, -12],
            y: [0, -3, 0],
          }}
          transition={{
            rotate: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
            y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
          }}
        >
          <span className="font-little-hands text-6xl font-normal tracking-wide text-white">
            {'See You!'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: 12, scale: 0.8, filter: 'blur(4px)' },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    transition: {
                      type: 'spring',
                      damping: 12,
                      stiffness: 200,
                    },
                  },
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </motion.div>
      </div>
    </section>
  )
}

export default SectionPenutup
