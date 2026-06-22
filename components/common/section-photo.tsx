'use client'

import BgPhotoSection from '@/components/assets/images/section-photo/bg-photo-section.svg'
import FlowerTopLeft from '@/components/assets/images/section-photo/flower-photo-top-left.svg'
import FramePhoto from '@/components/assets/images/section-photo/frame-section-photo.svg'
import type { CarouselApi } from '@/components/ui/carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { SectionData } from '@/lib/api'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'

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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const thumbContainerRef = useRef<HTMLDivElement>(null)

  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrollable, setIsScrollable] = useState(false)
  const [thumbWidthPercent, setThumbWidthPercent] = useState(30)
  const [isDragging, setIsDragging] = useState(false)

  const handleScroll = useCallback(() => {
    if (thumbContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = thumbContainerRef.current
      const maxScroll = scrollWidth - clientWidth
      if (maxScroll > 0) {
        setScrollProgress(scrollLeft / maxScroll)
        setIsScrollable(true)
        const visibleRatio = clientWidth / scrollWidth
        setThumbWidthPercent(Math.max(15, Math.min(50, visibleRatio * 100)))
      } else {
        setScrollProgress(0)
        setIsScrollable(false)
      }
    }
  }, [])

  // Listen to scroll events on the thumbnail container
  useEffect(() => {
    const container = thumbContainerRef.current
    if (!container) return

    handleScroll()

    container.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    const resizeObserver = new ResizeObserver(handleScroll)
    resizeObserver.observe(container)
    if (container.firstElementChild) {
      resizeObserver.observe(container.firstElementChild)
    }

    return () => {
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      resizeObserver.disconnect()
    }
  }, [photos, handleScroll])
  const trackRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef<{ startX: number; startScrollLeft: number } | null>(null)

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!dragStartRef.current || !thumbContainerRef.current || !trackRef.current) return
    
    const deltaX = e.clientX - dragStartRef.current.startX
    const trackWidth = trackRef.current.clientWidth
    const thumbWidthPx = (thumbWidthPercent / 100) * trackWidth
    const maxLeft = trackWidth - thumbWidthPx
    
    const container = thumbContainerRef.current
    const maxScroll = container.scrollWidth - container.clientWidth
    
    if (maxLeft > 0 && maxScroll > 0) {
      const dragRatio = deltaX / maxLeft
      const scrollDelta = dragRatio * maxScroll
      container.scrollLeft = dragStartRef.current.startScrollLeft + scrollDelta
    }
  }, [thumbWidthPercent])

  const handlePointerUp = useCallback((e: PointerEvent) => {
    setIsDragging(false)
    dragStartRef.current = null
    const target = e.target as HTMLElement
    if (target) {
      try {
        target.releasePointerCapture(e.pointerId)
      } catch (err) {
        console.error(err)
      }
      target.removeEventListener('pointermove', handlePointerMove)
      target.removeEventListener('pointerup', handlePointerUp)
    }
  }, [handlePointerMove])

  const startDrag = useCallback((e: React.PointerEvent) => {
    if (thumbContainerRef.current && trackRef.current) {
      setIsDragging(true)
      dragStartRef.current = {
        startX: e.clientX,
        startScrollLeft: thumbContainerRef.current.scrollLeft,
      }
      
      const target = e.target as HTMLElement
      if (target) {
        try {
          target.setPointerCapture(e.pointerId)
        } catch (err) {
          console.error(err)
        }
        target.addEventListener('pointermove', handlePointerMove)
        target.addEventListener('pointerup', handlePointerUp)
      }
    }
  }, [handlePointerMove, handlePointerUp])

  const handleTrackPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    e.preventDefault()

    if (trackRef.current && thumbContainerRef.current) {
      const rect = trackRef.current.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const trackWidth = rect.width
      
      const thumbWidthPx = (thumbWidthPercent / 100) * trackWidth
      const targetLeft = clickX - thumbWidthPx / 2
      const maxLeft = trackWidth - thumbWidthPx
      
      if (maxLeft > 0) {
        const ratio = Math.max(0, Math.min(1, targetLeft / maxLeft))
        const container = thumbContainerRef.current
        const maxScroll = container.scrollWidth - container.clientWidth
        
        container.scrollLeft = ratio * maxScroll
        startDrag(e)
      }
    }
  }, [thumbWidthPercent, startDrag])

  const handleThumbPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    e.stopPropagation()
    e.preventDefault()
    startDrag(e)
  }, [startDrag])
  // Sync main carousel with selected image
  useEffect(() => {
    if (mainApi && selectedImageIndex !== undefined) {
      mainApi.scrollTo(selectedImageIndex)
    }
  }, [selectedImageIndex, mainApi])

  // Sync thumbnail container scroll to keep selected image centered
  useEffect(() => {
    if (thumbContainerRef.current && selectedImageIndex !== undefined) {
      const container = thumbContainerRef.current
      const wrapper = container.children[0] as HTMLElement
      if (wrapper) {
        const selectedButton = wrapper.children[selectedImageIndex] as HTMLElement
        if (selectedButton) {
          const containerWidth = container.clientWidth
          const buttonWidth = selectedButton.clientWidth
          const buttonLeft = selectedButton.offsetLeft

          container.scrollTo({
            left: buttonLeft - containerWidth / 2 + buttonWidth / 2,
            behavior: 'smooth'
          })
        }
      }
    }
  }, [selectedImageIndex])

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
                              unoptimized
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
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/40 border-none text-white hover:bg-black/60 hover:text-white" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/40 border-none text-white hover:bg-black/60 hover:text-white" />
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

          {/* Thumbnail Scroll - Shows horizontally scrollable list with scrollbar below background card */}
          {photos.length > 0 && (
            <div className="w-full px-6">
              <div
                ref={thumbContainerRef}
                className="no-scrollbar flex overflow-x-auto pb-3 select-none"
              >
                <div className="flex w-max shrink-0 bg-white rounded-lg border-10 border-white max-[400px]:border-[6px] shadow-sm gap-3">
                  {photos.map((photo, index) => {
                    const isSelected = selectedImageIndex === index

                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleImageClick(index)}
                        className={`relative shrink-0 overflow-hidden rounded-md transition-all duration-300 ${isSelected
                          ? 'ring-2 ring-[#CF935F] scale-105'
                          : 'brightness-75 hover:brightness-100'
                          }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Image
                          src={photo}
                          alt={`Thumbnail ${index + 1}`}
                          width={120}
                          height={240}
                          className="h-40 w-28 object-cover max-[400px]:h-28 max-[400px]:w-20"
                          loading="lazy"
                          unoptimized
                        />
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Custom Interactive Scrollbar */}
              {isScrollable && (
                <div className="mt-2.5 px-1 flex justify-center">
                  <div
                    ref={trackRef}
                    onPointerDown={handleTrackPointerDown}
                    className="relative h-2 w-full rounded-full bg-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] border border-neutral-200/50 cursor-pointer touch-none"
                  >
                    <motion.div
                      onPointerDown={handleThumbPointerDown}
                      className="absolute top-0 bottom-0 rounded-full bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-500 cursor-grab active:cursor-grabbing border border-white/50 shadow-sm touch-none"
                      style={{
                        width: `${thumbWidthPercent}%`,
                      }}
                      animate={{
                        left: `${scrollProgress * (100 - thumbWidthPercent)}%`,
                      }}
                      transition={isDragging ? {
                        type: 'tween',
                        duration: 0
                      } : {
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                        mass: 0.2,
                      }}
                    />
                  </div>
                </div>
              )}
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
                unoptimized
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
                          unoptimized
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
