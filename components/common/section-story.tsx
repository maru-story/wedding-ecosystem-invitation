'use client'

import IconSvg from '@/components/assets/images/card-open-wedding/icon.svg'
import BgSectionStory from '@/components/assets/images/section-story/bg-our-story-section.svg'
import DividerOurStory from '@/components/assets/images/section-story/divider-our-story.svg'
import FlowerOurStoryBottomRight from '@/components/assets/images/section-story/flower-our-story-bottom-right.svg'
import FotoStoryBottom from '@/components/assets/images/section-story/foto-our-story-bottom.png'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { SectionData } from '@/lib/api'

interface StoryChapter {
  id: number
  phase?: string
  title: string
  subtitle?: string
  date?: string
  story?: string
}

interface SectionStoryProps {
  section?: SectionData
}

const SectionStory: React.FC<SectionStoryProps> = ({ section }) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [isInView, setIsInView] = useState(false)

  const content = section?.content as {
    background_image?: string
    bottom_image?: string
    intro_title?: string
    intro_subtitle?: string
    outro_title?: string
    outro_subtitle?: string
    phase_1_title?: string
    phase_1_date?: string
    phase_1_story?: string
    phase_2_title?: string
    phase_2_date?: string
    phase_2_story?: string
    phase_3_title?: string
    phase_3_date?: string
    phase_3_story?: string
    phases?: Array<{ title: string; date: string; story: string }>
  } | undefined

  // Listen for live preview updates from the dashboard editor
  const [liveContent, setLiveContent] = useState(content)

  useEffect(() => {
    setLiveContent(content)
  }, [content])

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'CMS_PREVIEW_UPDATE' && e.data?.section_type === 'story') {
        setLiveContent(e.data.content)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  useEffect(() => {
    if (!api) {
      return
    }

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on('select', handleSelect)
    return () => {
      api.off('select', handleSelect)
    }
  }, [api])

  const introTitle = liveContent?.intro_title || 'From cubicles to forever'
  const introSubtitle = liveContent?.intro_subtitle || 'a love that surprised us both'
  const outroTitle = liveContent?.outro_title || "and so, on July 11 2026 we're making it official"
  const outroSubtitle = liveContent?.outro_subtitle || "We'd love for you to be there when we do."

  const bgImage = liveContent?.background_image || BgSectionStory
  const bottomImage = liveContent?.bottom_image || FotoStoryBottom

  // Get phases dynamically from CMS content
  const phaseList = liveContent?.phases || [
    {
      title: liveContent?.phase_1_title || 'Coworkers',
      date: liveContent?.phase_1_date || '2022',
      story: liveContent?.phase_1_story || "Just coworkers. Or so we thought. It started at work, same team, same coffee runs, same complaints about the same things. We had so much in common. Everything clicked, except BTS and Persib, which we'll never agree. And yes, that debate is still ongoing.",
    },
    {
      title: liveContent?.phase_2_title || 'Growth',
      date: liveContent?.phase_2_date || '2023',
      story: liveContent?.phase_2_story || "Somewhere along the way, we stopped pretending it was just friendship and let it grow into something real. We escalated into a relationship, because we have found peace in each other's love, and that was reason enough.",
    },
    {
      title: liveContent?.phase_3_title || 'Forever',
      date: liveContent?.phase_3_date || '2025',
      story: liveContent?.phase_3_story || "We decided: let's do this forever. We decided to get married, because the idea of growing old together and bickering is kinda fun, and we wouldn't want to do it with anyone else.",
    }
  ];

  const PHASE_NAMES = ['FIRST PHASE', 'SECOND PHASE', 'THIRD PHASE', 'FOURTH PHASE', 'LAST PHASE'];

  const storyChapters: StoryChapter[] = [
    {
      id: 1,
      title: introTitle,
      subtitle: introSubtitle,
    },
    ...phaseList.map((phase, idx) => {
      // If it's the last phase in the array, label it "LAST PHASE"
      const phaseLabel = idx === phaseList.length - 1 ? 'LAST PHASE' : PHASE_NAMES[idx] || `PHASE ${idx + 1}`;
      return {
        id: idx + 2,
        phase: phaseLabel,
        title: phase.title,
        date: phase.date,
        story: phase.story,
      };
    }),
    {
      id: phaseList.length + 2,
      title: outroTitle,
      subtitle: outroSubtitle,
    },
  ]

  const renderIntroTitle = (title: string) => {
    if (!liveContent?.intro_title || title === 'From cubicles to forever') {
      return (
        <>
          From cubicles<br />to forever
        </>
      )
    }
    return title.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {i > 0 && <br />}
        {line}
      </React.Fragment>
    ))
  }

  const renderOutroTitle = (title: string) => {
    if (!liveContent?.outro_title || title === "and so, on July 11 2026 we're making it official") {
      return (
        <>
          and so, on<br />
          <span className="text-[#C47C9E] font-little-hands">July 11, 2026</span><br />
          we&apos;re making it<br />
          official
        </>
      )
    }

    const lines = title.split('\n')
    return lines.map((line, i) => {
      const isDateLine = /^[0-9A-Za-z\s,.-]+$/.test(line) && (/\b\d{4}\b/.test(line) || i === 1);
      return (
        <React.Fragment key={i}>
          {i > 0 && <br />}
          {isDateLine ? (
            <span className="text-[#C47C9E] font-little-hands">{line}</span>
          ) : (
            line
          )}
        </React.Fragment>
      )
    })
  }

  return (
    <motion.section
      className="relative w-full overflow-hidden"
      id="section-story"
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="relative aspect-9/16 w-full">
        {/* Background cover */}
        <div className="absolute inset-0">
          <Image
            src={bgImage}
            alt="bg-section-story"
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Single Static Card Frame (Centered & Responsive) */}
        <div className="absolute top-[37.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[75%] max-w-[315px] aspect-315/360">
          {/* Our Story Title Pill (above the card frame) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-20 flex justify-center items-center pointer-events-none w-max"
          >
            <div className="bg-[#D08E61] border-[5px] border-[#C47C9E] rounded-full px-8 py-2.5 shadow-md flex items-center justify-center">
              <span className="text-white text-lg sm:text-xl whitespace-nowrap tracking-wide leading-none select-none font-doodle-head uppercase">
                Our Story
              </span>
            </div>
          </motion.div>

          {/* Custom Frame Background */}
          <div className="box absolute inset-0 bg-[#DDD3C8]" />

          {/* Inner Content Wrapper (contains Carousel and Dots) */}
          <div className="relative z-20 w-full h-full flex flex-col justify-between items-center px-6 pt-8 pb-6 sm:px-8 sm:pt-9 sm:pb-7">
            <Carousel setApi={setApi} className="w-full h-full grow flex items-center justify-center">
              <CarouselContent className="h-full flex items-center">
                {storyChapters.map((chapter, index) => (
                  <CarouselItem key={chapter.id} className="flex justify-center items-center h-full">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={current === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="w-full flex flex-col justify-center items-center text-center text-black"
                    >
                      {index === 0 && (
                        <>
                          <Image
                            src={IconSvg}
                            alt="couple icon"
                            width={32}
                            height={32}
                            className="mb-3.5 h-auto object-contain select-none pointer-events-none"
                            loading="lazy"
                          />
                          <h3 className="font-doodle-head text-[28px] sm:text-[36px] leading-tight mb-2 select-none">
                            {renderIntroTitle(chapter.title)}
                          </h3>
                          <p className="text-[11px] sm:text-[13px] tracking-wider uppercase opacity-75 select-none">
                            {chapter.subtitle}
                          </p>
                        </>
                      )}

                      {index > 0 && index < storyChapters.length - 1 && (
                        <>
                          <span className="text-[10px] sm:text-[13px] tracking-widest uppercase opacity-60 mb-0.5 select-none font-medium">
                            {chapter.phase}
                          </span>
                          <h3 className="text-[24px] sm:text-[32px] leading-none mb-0.5 select-none">
                            {chapter.title}
                          </h3>
                          <span className="text-[18px] sm:text-[22px] text-[#C47C9E] mb-1.5 select-none">
                            {chapter.date}
                          </span>
                          <p className="font-doodle-head text-[12px] sm:text-[15px] leading-relaxed max-w-[220px] select-none">
                            {chapter.story}
                          </p>
                        </>
                      )}

                      {index === storyChapters.length - 1 && (
                        <>
                          <h3 className="font-doodle-head text-[26px] sm:text-[34px] leading-tight mb-2.5 select-none">
                            {renderOutroTitle(chapter.title)}
                          </h3>
                          <p className="text-[11px] sm:text-[13px] tracking-wide uppercase opacity-75 select-none">
                            {chapter.subtitle}
                          </p>
                        </>
                      )}
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Dots navigation - inside the frame container */}
            <div className="mt-3 flex justify-center gap-2 z-30">
              {storyChapters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    'h-2.5 w-2.5 rounded-full transition-all duration-300',
                    current === index
                      ? 'scale-125 bg-[#7098BC]'
                      : 'bg-[#BFBFBF]'
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Custom Frame Border Overlay */}
          <div className="box-inside absolute top-1/2 left-1/2 w-[92%] h-[93%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10" />
        </div>

        {/* Bottom Graphic Group */}
        <div className="absolute bottom-0 left-0 w-full z-20 select-none pointer-events-none">
          <div className="relative w-full">
            {/* Photo at the bottom */}
            <div className="relative w-full">
              {typeof bottomImage === 'string' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={bottomImage}
                  alt="foto-our-story-bottom"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              ) : (
                <Image
                  src={bottomImage}
                  alt="foto-our-story-bottom"
                  sizes="100vw"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              )}
            </div>

            {/* Divider placed slightly above the photo */}
            <div className="absolute top-[-15px] sm:top-[-25px] left-0 w-full z-30">
              <div className="relative w-full">
                <Image
                  src={DividerOurStory}
                  alt="divider-our-story"
                  className="w-full h-auto"
                  loading="lazy"
                />
                {/* Flower at the right corner of the divider */}
                <motion.div
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-[18%] z-40 origin-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? {
                    opacity: 1,
                    scale: [1, 1.03, 0.97, 1],
                    rotate: [0, 4, -4, 0]
                  } : {
                    opacity: 0,
                    scale: 0.5
                  }}
                  transition={{
                    opacity: { duration: 0.8, delay: 0.3 },
                    scale: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.2 },
                    rotate: { repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1.2 }
                  }}
                >
                  <Image
                    src={FlowerOurStoryBottomRight}
                    alt="flower-our-story-bottom-right"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default SectionStory
