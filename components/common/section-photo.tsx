'use client'

import BgPhotoSection from '@/components/assets/images/section-photo/bg-photo-section.svg'
import FlowerTopLeft from '@/components/assets/images/section-photo/flower-photo-top-left.svg'
import FramePhoto from '@/components/assets/images/section-photo/frame-section-photo.svg'
import type { CarouselApi } from '@/components/ui/carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { SectionData } from '@/lib/api'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface SectionPhotoProps {
  section?: SectionData
}

const SectionPhoto: React.FC<SectionPhotoProps> = ({ section }) => {
  const content = section?.content as {
    title?: string
    photos?: Array<{ url: string; caption?: string; order?: number }> | string[]
  } | undefined

  const [liveContent, setLiveContent] = useState(content)

  useEffect(() => {
    setLiveContent(content)
  }, [content])

  // Listen for CMS live preview updates
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'CMS_PREVIEW_UPDATE' && e.data?.section_type === 'gallery') {
        setLiveContent(e.data.content)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const title = liveContent?.title || 'Portrait of Us'

  // Support both formats: array of strings OR array of { url, caption, order }
  const photos: string[] = (() => {
    const raw = liveContent?.photos
    if (!raw || raw.length === 0) return []
    if (typeof raw[0] === 'string') return raw as string[]
    return (raw as Array<{ url: string }>)
      .map((p) => p.url)
      .filter(Boolean)
  })()

  const [mainApi, setMainApi] = useState<CarouselApi>()
  const [thumbApi, setThumbApi] = useState<CarouselApi>()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Group photos into chunks of 3 for thumbnails
  const photoGroups = photos.reduce((groups: string[][], photo, index) => {
    const groupIndex = Math.floor(index / 3)
    if (!groups[groupIndex]) {
      groups[groupIndex] = []
    }
    groups[groupIndex].push(photo)
    return groups
  }, [])

  // Sync main carousel with selected image
  useEffect(() => {
    if (mainApi && selectedImageIndex !== undefined) {
      mainApi.scrollTo(selectedImageIndex)
    }
  }, [selectedImageIndex, mainApi])

  // Sync thumbnail carousel to show the group containing selected image
  useEffect(() => {
    if (thumbApi && selectedImageIndex !== undefined) {
      const targetGroupIndex = Math.floor(selectedImageIndex / 3)
      thumbApi.scrollTo(targetGroupIndex)
    }
  }, [selectedImageIndex, thumbApi])

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  const handleMainImageClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // Handle keyboard events for modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false)
      }
      if (isModalOpen) {
        if (event.key === 'ArrowLeft') {
          setSelectedImageIndex((prev) =>
            prev > 0 ? prev - 1 : photos.length - 1
          )
        }
        if (event.key === 'ArrowRight') {
          setSelectedImageIndex((prev) =>
            prev < photos.length - 1 ? prev + 1 : 0
          )
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, photos.length])

  useEffect(() => {
    if (!mainApi) return undefined

    const handleMainCarouselChange = () => {
      setSelectedImageIndex(mainApi.selectedScrollSnap())
    }

    mainApi.on('select', handleMainCarouselChange)
    return () => {
      mainApi.off('select', handleMainCarouselChange)
    }
  }, [mainApi])

  // Reset selected index when photos change
  useEffect(() => {
    setSelectedImageIndex(0)
  }, [photos.length])

  return (
    <section className="relative w-full overflow-hidden" id="section-photo">
      {/* Container that establishes size */}
      <div className="relative flex aspect-9/16 w-full flex-col justify-evenly">
        {/* Background */}
        <div className="absolute z-0 h-auto w-full">
          <Image
            src={BgPhotoSection}
            alt="section-photo-background"
            sizes="100vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>

        {/* Main content area */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-6 py-4 max-[400px]:gap-4">
          {/* Frame with photo carousel inside */}
          <div className="relative w-[90%] max-w-[520px]">
            {/* Title pill */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="absolute -top-6 left-1/2 z-25 -translate-x-1/2"
            >
              <div className="flex items-center justify-center rounded-full border-[5px] border-[#C47C9E] bg-[#D08E61] px-6 py-2 shadow-md">
                <span className="font-little-hands text-sm leading-none tracking-wide text-white uppercase whitespace-nowrap sm:text-base">
                  {title}
                </span>
              </div>
            </motion.div>

            {/* Flower - top left of frame with floating animation */}
            <motion.div
              className="pointer-events-none absolute -top-16 -left-10 z-20 w-[40%] origin-top-left"
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
                src={FlowerTopLeft}
                alt="flower-photo-top-left"
                loading="lazy"
                className="h-auto w-full"
              />
            </motion.div>

            {/* Frame SVG - pointer-events-none so carousel below can receive touch */}
            <Image
              src={FramePhoto}
              alt="section-photo-frame"
              sizes="100vw"
              className="pointer-events-none relative z-10 h-auto w-full"
              loading="lazy"
            />

            {/* Photo carousel positioned inside the frame */}
            <motion.div
              className="absolute top-[11%] left-[7%] z-5 h-[78%] w-[86%] overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              {photos.length > 0 ? (
                <Carousel setApi={setMainApi} className="h-full w-full">
                  <CarouselContent className="h-full">
                    {photos.map((photo, index) => (
                      <CarouselItem key={index} className="h-full">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          className="cursor-pointer"
                          onClick={handleMainImageClick}
                        >
                          <div className="group relative h-75 w-full overflow-hidden max-[400px]:h-55">
                            <Image
                              src={photo}
                              alt={`Photo ${index + 1}`}
                              width={1280}
                              height={720}
                              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/10">
                              <div className="rounded-full bg-white/20 p-3 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                                <svg
                                  className="h-6 w-6 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <p className="text-center text-lg font-little-hands text-white">
                    No photos uploaded yet :(
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Thumbnail Carousel - Shows 3 thumbnails per slide */}
          {photos.length > 0 && (
            <div className="relative w-full px-4">
              <Carousel setApi={setThumbApi} className="w-full">
                <CarouselContent>
                  {photoGroups.map((group, groupIndex) => (
                    <CarouselItem key={groupIndex}>
                      <div className="overflow-hidden rounded-lg border-10 border-white bg-white max-[400px]:border-[6px]">
                        <div className="grid grid-cols-3">
                          {group.map((photo, photoIndexInGroup) => {
                            const globalPhotoIndex =
                              groupIndex * 3 + photoIndexInGroup
                            const isSelected =
                              selectedImageIndex === globalPhotoIndex

                            return (
                              <motion.button
                                key={globalPhotoIndex}
                                onClick={() => handleImageClick(globalPhotoIndex)}
                                className={`relative overflow-hidden transition-all duration-300 ${isSelected
                                  ? 'ring-2 ring-[#CF935F] ring-inset'
                                  : 'hover:brightness-110'
                                  }`}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Image
                                  src={photo}
                                  alt={`Thumbnail ${globalPhotoIndex + 1}`}
                                  width={120}
                                  height={240}
                                  className="h-40 w-full object-cover px-2 max-[400px]:h-28 max-[400px]:px-1"
                                  loading="lazy"
                                />
                              </motion.button>
                            )
                          })}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && photos.length > 0 && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleCloseModal}
        >
          {/* Modal Content */}
          <div className="relative flex h-full w-full items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 cursor-pointer rounded-full bg-black/50 p-2 text-white transition-all duration-200 hover:bg-black/70"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImageIndex((prev) =>
                  prev > 0 ? prev - 1 : photos.length - 1
                )
              }}
              className="absolute top-1/2 left-4 z-99 -translate-y-1/2 cursor-pointer rounded-full bg-black/50 p-3 text-white transition-all duration-200 hover:bg-black/70"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImageIndex((prev) =>
                  prev < photos.length - 1 ? prev + 1 : 0
                )
              }}
              className="absolute top-1/2 right-4 z-99 -translate-y-1/2 cursor-pointer rounded-full bg-black/50 p-3 text-white transition-all duration-200 hover:bg-black/70"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Main Image */}
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-full max-w-7xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[selectedImageIndex]}
                alt={`Photo ${selectedImageIndex + 1}`}
                width={1920}
                height={1080}
                className="max-h-[90vh] max-w-full rounded-lg object-contain"
                loading="lazy"
              />
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-white">
              {selectedImageIndex + 1} / {photos.length}
            </div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-16 left-1/2 w-full max-w-4xl -translate-x-1/2 overflow-x-auto overflow-y-hidden">
              <div className="flex justify-center space-x-2 px-4">
                {photos
                  .slice(
                    Math.max(0, selectedImageIndex - 5),
                    Math.min(photos.length, selectedImageIndex + 6)
                  )
                  .map((photo, relativeIndex) => {
                    const actualIndex =
                      Math.max(0, selectedImageIndex - 5) + relativeIndex
                    const isActive = actualIndex === selectedImageIndex

                    return (
                      <button
                        key={actualIndex}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedImageIndex(actualIndex)
                        }}
                        className={`shrink-0 overflow-hidden rounded border-2 transition-all duration-200 ${isActive
                          ? 'scale-110 border-white ring-2 ring-[#CF935F]'
                          : 'border-white/60 opacity-70 hover:scale-105 hover:opacity-100'
                          }`}
                      >
                        <Image
                          src={photo}
                          alt={`Thumbnail ${actualIndex + 1}`}
                          width={60}
                          height={40}
                          className="h-8 w-12 object-cover"
                          loading="lazy"
                        />
                      </button>
                    )
                  })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}

export default SectionPhoto
