'use client'

import BgVideoSection from '@/components/assets/images/section-video/bg-video-section.svg'
import DividerVideo from '@/components/assets/images/section-video/divider-video-section.svg'
import FlowerBottomLeft from '@/components/assets/images/section-video/flower-video-bottom-left.svg'
import FlowerBottomRight from '@/components/assets/images/section-video/flower-video-bottom-right.svg'
import FotoVideo from '@/components/assets/images/section-video/foto-video-section.png'
import { SectionData } from '@/lib/api'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface SectionVideoProps {
  section?: SectionData
}

/**
 * Extracts YouTube embed URL from various YouTube URL formats.
 */
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null

  // Already an embed URL
  if (url.includes('/embed/')) return url

  // Standard watch URL: youtube.com/watch?v=ID
  const watchMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
  )
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}?rel=0&modestbranding=1&playsinline=1`
  }

  // Short URL: youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}?rel=0&modestbranding=1&playsinline=1`
  }

  return null
}

const SectionVideo: React.FC<SectionVideoProps> = ({ section }) => {
  const content = section?.content as {
    title?: string
    video_type?: 'youtube' | 'upload'
    youtube_url?: string
    video_url?: string
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
        e.data?.section_type === 'video'
      ) {
        setLiveContent(e.data.content)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const title =
    liveContent?.title || 'Catch a glimpse before the \u201cI do\u201d'
  const videoType = liveContent?.video_type || 'youtube'
  const youtubeUrl = liveContent?.youtube_url || ''
  const videoUrl = liveContent?.video_url || ''
  const photoUrl = liveContent?.photo_url || ''

  const embedUrl = videoType === 'youtube' ? getYouTubeEmbedUrl(youtubeUrl) : null
  const hasVideo = videoType === 'youtube' ? !!embedUrl : !!videoUrl

  return (
    <section className="relative w-full overflow-hidden" id="section-video">
      {/* Container that establishes size */}
      <div className="relative flex aspect-9/16 w-full flex-col">
        {/* Background */}
        <div className="absolute z-0 h-auto w-full">
          <Image
            src={BgVideoSection}
            alt="section-video-background"
            sizes="100vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>

        {/* Content - split into video top and image bottom */}
        <div className="relative z-10 flex h-full w-full flex-col">
          {/* Top half - Video */}
          <div className="flex flex-1 flex-col items-center justify-center px-6">
            {/* Title above video */}
            <motion.p
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-4 text-center font-little-hands text-base font-normal leading-relaxed tracking-wide text-white sm:text-lg"
            >
              {title}
            </motion.p>

            {/* Video / Fallback */}
            <motion.div
              className="w-full max-w-[375px]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {hasVideo ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  {videoType === 'youtube' && embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title="YouTube video player"
                      allow="autoplay; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full rounded-lg"
                    />
                  ) : (
                    <video
                      src={videoUrl}
                      controls
                      playsInline
                      className="absolute inset-0 h-full w-full rounded-lg object-cover"
                    />
                  )}
                </div>
              ) : (
                <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-black/30">
                  <p className="text-center font-little-hands text-lg text-white">
                    No video uploaded yet :(
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Bottom half - Image with divider overlapping */}
          <div className="relative flex flex-1 flex-col">
            {/* Divider - overlaps top of image */}
            <div className="relative z-20 -mb-6 w-full">
              <Image
                src={DividerVideo}
                alt="divider-video"
                sizes="100vw"
                className="h-auto w-full"
                loading="lazy"
              />
            </div>

            {/* Image with flowers */}
            <div className="relative flex flex-1 items-center justify-center">
              {/* Flower bottom-left */}
              <motion.div
                className="pointer-events-none absolute bottom-0 left-0 z-20 w-[25%] origin-bottom-left"
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
                  x: {
                    repeat: Infinity,
                    duration: 7,
                    ease: 'easeInOut',
                    delay: 1.0,
                  },
                  y: {
                    repeat: Infinity,
                    duration: 6,
                    ease: 'easeInOut',
                    delay: 1.0,
                  },
                  rotate: {
                    repeat: Infinity,
                    duration: 5,
                    ease: 'easeInOut',
                    delay: 1.0,
                  },
                }}
                viewport={{ once: true }}
              >
                <Image
                  src={FlowerBottomLeft}
                  alt="flower-bottom-left"
                  loading="lazy"
                  className="h-auto w-full"
                />
              </motion.div>

              {/* Flower bottom-right */}
              <motion.div
                className="pointer-events-none absolute right-0 bottom-0 z-20 w-[25%] origin-bottom-right"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotate: [0, -2, 2, 0],
                  x: [0, -1, 1, 0],
                  y: [0, -2, 2, 0],
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.3 },
                  scale: { duration: 0.8, delay: 0.3 },
                  x: {
                    repeat: Infinity,
                    duration: 6,
                    ease: 'easeInOut',
                    delay: 1.1,
                  },
                  y: {
                    repeat: Infinity,
                    duration: 7,
                    ease: 'easeInOut',
                    delay: 1.1,
                  },
                  rotate: {
                    repeat: Infinity,
                    duration: 8,
                    ease: 'easeInOut',
                    delay: 1.1,
                  },
                }}
                viewport={{ once: true }}
              >
                <Image
                  src={FlowerBottomRight}
                  alt="flower-bottom-right"
                  loading="lazy"
                  className="h-auto w-full"
                />
              </motion.div>

              {/* Photo */}
              <motion.div
                className="z-10 w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {photoUrl ? (
                  <Image
                    src={photoUrl}
                    alt="section-video-photo"
                    width={1080}
                    height={720}
                    sizes="100vw"
                    className="h-auto w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <Image
                    src={FotoVideo}
                    alt="section-video-photo"
                    sizes="100vw"
                    className="h-auto w-full object-cover"
                    loading="lazy"
                  />
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionVideo
