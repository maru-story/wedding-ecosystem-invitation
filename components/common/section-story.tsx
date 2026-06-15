'use client'

import BgSectionStory from '@/components/assets/images/section-story/bg-section-story.svg'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { motion, Variants } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import React, { useEffect, useState } from 'react'

// Define the story chapter type
interface StoryChapter {
  id: number
  title: string
  subtitle: string
  bgTitle: string
  image: StaticImageData | string
}

// Create an array of story chapters
const storyChapters: StoryChapter[] = [
  {
    id: 1,
    title: 'Chapter 1',
    subtitle: 'HEY!! NICE TO MEET YOU',
    bgTitle: '#703F4E',
    image: `${process.env.NEXT_PUBLIC_URL_IMAGE}section-story-chapter-1.svg`,
  },
  {
    id: 2,
    title: 'Chapter 2',
    subtitle: 'KINDA A DATE?',
    bgTitle: '#664550',
    image: `${process.env.NEXT_PUBLIC_URL_IMAGE}section-story-chapter-2.svg`,
  },
  {
    id: 3,
    title: 'Chapter 3',
    subtitle: '" JUST THE TWO OF US "',
    bgTitle: '#80423C',
    image: `${process.env.NEXT_PUBLIC_URL_IMAGE}section-story-chapter-3.svg`,
  },
  {
    id: 4,
    title: 'Chapter 4',
    subtitle: 'LOVE IN DIFFERENT TIME ZONES',
    bgTitle: '#6D394E',
    image: `${process.env.NEXT_PUBLIC_URL_IMAGE}section-story-chapter-4.svg`,
  },
  {
    id: 5,
    title: 'Chapter 5',
    subtitle: 'A NEW CHAPTER BEGINS',
    bgTitle: '#85352F',
    image: `${process.env.NEXT_PUBLIC_URL_IMAGE}section-story-chapter-5.svg`,
  },
]

const SectionStory: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [hasViewedOnce, setHasViewedOnce] = useState<boolean[]>(
    Array(storyChapters.length).fill(false)
  )

  useEffect(() => {
    if (!api) {
      return
    }

    const handleSelect = () => {
      const newCurrent = api.selectedScrollSnap()
      setCurrent(newCurrent)

      // Mark this slide as viewed
      setHasViewedOnce((prev) => {
        const newArray = [...prev]
        newArray[newCurrent] = true
        return newArray
      })
    }

    api.on('select', handleSelect)

    // Initialize the first slide as viewed when the carousel loads
    setHasViewedOnce((prev) => {
      const newArray = [...prev]
      newArray[0] = true
      return newArray
    })

    // Cleanup
    return () => {
      api.off('select', handleSelect)
    }
  }, [api])

  // Animation variants
  const fadeInVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const slideUpVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.2,
      },
    },
  }

  return (
    <section className="section-story overflow-hidden" id="section-story">
      <div className="relative aspect-9/16 w-full">
        <Image
          src={BgSectionStory}
          loading="lazy"
          alt="bg-section-story"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full scale-102"
        />

        <div className="absolute top-1/2 left-1/2 w-[320px] -translate-x-1/2 -translate-y-1/2">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {storyChapters.map((chapter, index) => (
                <CarouselItem
                  key={chapter.id}
                  className="flex flex-col items-center"
                >
                  {/* Only animate if this is the current slide or has been viewed before */}
                  {current === index || hasViewedOnce[index] ? (
                    <>
                      {/* TITLE */}
                      <motion.div
                        initial="hidden"
                        animate={current === index ? 'visible' : 'hidden'}
                        variants={fadeInVariants}
                        style={{ backgroundColor: chapter.bgTitle }}
                        className="flex w-[310px] flex-col items-center justify-center rounded-tl-[20px] rounded-tr-[20px] p-2"
                      >
                        <p className="text-sm text-white uppercase">
                          {chapter.title}
                        </p>
                        <p className="text-white">{chapter.subtitle}</p>
                      </motion.div>

                      <motion.div
                        initial="hidden"
                        animate={current === index ? 'visible' : 'hidden'}
                        variants={slideUpVariants}
                        className="grid h-auto w-[310px] content-center bg-[#E2E1E0] p-2"
                      >
                        {/* CONTENT CHAPTER */}
                        <Image
                          src={chapter.image}
                          loading="lazy"
                          alt={`${chapter.title}-story`}
                          width={310}
                          height={447}
                        />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      {/* Non-animated fallback for slides that haven't been viewed yet */}
                      <div
                        style={{ backgroundColor: chapter.bgTitle, opacity: 0 }}
                        className="flex w-[310px] flex-col items-center justify-center rounded-tl-[20px] rounded-tr-[20px] p-2"
                      >
                        <p className="text-sm text-white uppercase">
                          {chapter.title}
                        </p>
                        <p className="text-white">{chapter.subtitle}</p>
                      </div>
                      <div className="grid h-auto w-[310px] content-center bg-[#E2E1E0] p-2 opacity-0">
                        <Image
                          src={chapter.image}
                          loading="lazy"
                          alt={`${chapter.title}-story`}
                          width={310}
                          height={447}
                        />
                      </div>
                    </>
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Dots navigation with animation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-4 flex justify-center gap-2"
          >
            {storyChapters.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  'h-3 w-3 rounded-full transition-all',
                  current === index
                    ? 'scale-125 bg-white'
                    : 'bg-[#F2D5BD] opacity-70'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#A0828E] px-10 py-4">
          <p className="text-nowrap text-white uppercase">Our Story</p>
        </div>
      </div>
    </section>
  )
}

export default SectionStory
