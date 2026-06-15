'use client'

import Flower1 from '@/components/assets/images/section-photo/flower-1.svg'
import Flower2 from '@/components/assets/images/section-photo/flower-2.svg'
import TextPotrait from '@/components/assets/images/section-photo/text-potrait-of-us.svg'
import type { CarouselApi } from '@/components/ui/carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const SectionPhoto = () => {
  const [mainApi, setMainApi] = useState<CarouselApi>()
  const [thumbApi, setThumbApi] = useState<CarouselApi>()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const photos = Array.from(
    { length: 30 },
    (_, i) => `${process.env.NEXT_PUBLIC_URL_IMAGE}section-photo-${i + 1}.JPEG`
  )

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
    <section className="relative w-full overflow-hidden" id="section-photo">
      {/* Container that establishes size */}
      <div className="relative flex aspect-[9/16] w-full flex-col justify-evenly">
        <div className="absolute h-auto w-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_URL_IMAGE}bg-section-photo.svg`}
            alt="section-photo-background-frame"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>
        <motion.div
          className="absolute top-25 right-0 z-11"
          variants={flipVariant}
          initial="hidden"
          whileInView="visible"
          custom={5}
          viewport={{ once: false }}
          style={{ perspective: '500px' }}
        >
          <Image
            src={Flower1}
            alt="section-photo-flower-1"
            width={0}
            height={0}
            loading="lazy"
            className="h-auto"
          />
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-0"
          variants={flipVariant}
          initial="hidden"
          whileInView="visible"
          custom={5}
          viewport={{ once: false }}
          style={{ perspective: '500px' }}
        >
          <Image
            src={Flower2}
            alt="section-photo-flower-2"
            width={0}
            height={0}
            loading="lazy"
            className="h-auto"
          />
        </motion.div>
        <div className="relative z-10 aspect-16/9 h-auto w-full">
          {/* <div className="absolute h-auto w-full">
            <Image
              src={BgFrame}
              alt="section-photo-frame"
              width={0}
              height={0}
              loading="lazy"
              sizes="100vw"
              className="h-auto w-full"
            />
            <div className="absolute right-8 bottom-2 rounded px-2 py-1 text-xs text-black">
              {selectedImageIndex + 1} / {photos.length}
            </div>
          </div> */}
          <div className="absolute -top-15 left-20 h-auto w-fit">
            <Image
              src={TextPotrait}
              alt="section-photo-text-of-us"
              width={0}
              height={0}
              loading="lazy"
              className="h-auto"
            />
          </div>

          <motion.div
            className="absolute top-[75%] left-1/2 mx-auto w-full max-w-[375px] min-w-[300px] -translate-x-1/2 -translate-y-1/2 px-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            {/* Main Image Carousel */}
            <Carousel setApi={setMainApi} className="w-full">
              <CarouselContent>
                {photos.map((photo, index) => (
                  <CarouselItem key={index}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="cursor-pointer"
                      onClick={handleMainImageClick}
                    >
                      <div className="group relative h-60 w-full overflow-hidden rounded-lg">
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
          </motion.div>
        </div>

        {/* Thumbnail Carousel - Shows 3 thumbnails per slide */}
        <div className="relative px-4">
          <Carousel setApi={setThumbApi} className="w-full">
            <CarouselContent>
              {photoGroups.map((group, groupIndex) => (
                <CarouselItem key={groupIndex}>
                  <div className="grid grid-cols-3 gap-3 px-2">
                    {group.map((photo, photoIndexInGroup) => {
                      const globalPhotoIndex =
                        groupIndex * 3 + photoIndexInGroup
                      const isSelected = selectedImageIndex === globalPhotoIndex

                      return (
                        <motion.button
                          key={globalPhotoIndex}
                          onClick={() => handleImageClick(globalPhotoIndex)}
                          className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                            isSelected
                              ? 'scale-110 border-[#CF935F] shadow-lg ring-2 ring-[#CF935F]/30'
                              : 'border-transparent hover:scale-105 hover:border-[#CF935F]/50'
                          }`}
                          whileHover={{
                            scale: isSelected ? 1.1 : 1.05,
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Image
                            src={photo}
                            alt={`Thumbnail ${globalPhotoIndex + 1}`}
                            width={120}
                            height={80}
                            className="h-20 w-full object-cover"
                            loading="lazy"
                          />

                          {/* Image number */}
                          <div className="absolute top-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
                            {globalPhotoIndex + 1}
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && (
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
              <div className="flex justify-center space-x-2  px-4">
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
                        className={`flex-shrink-0 overflow-hidden rounded transition-all duration-200 ${
                          isActive
                            ? 'scale-110 ring-2 ring-[#CF935F]'
                            : 'opacity-70 hover:scale-105 hover:opacity-100'
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
