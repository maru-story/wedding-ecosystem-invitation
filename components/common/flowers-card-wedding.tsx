'use client'

import { useInvitation } from '@/components/context/provider'
import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import React, { useEffect, useState } from 'react'

// Import images directly
import Flower1 from '@/components/assets/images/card-open-wedding/Flower-1.svg'
import Flower10 from '@/components/assets/images/card-open-wedding/Flower-10.svg'
import Flower11 from '@/components/assets/images/card-open-wedding/Flower-11.svg'
import Flower12 from '@/components/assets/images/card-open-wedding/Flower-12.svg'
import Flower13 from '@/components/assets/images/card-open-wedding/Flower-13.svg'
import Flower14 from '@/components/assets/images/card-open-wedding/Flower-14.svg'
import Flower2 from '@/components/assets/images/card-open-wedding/Flower-2.svg'
import Flower3 from '@/components/assets/images/card-open-wedding/Flower-3.svg'
import Flower4 from '@/components/assets/images/card-open-wedding/Flower-4.svg'
import Flower5 from '@/components/assets/images/card-open-wedding/Flower-5.svg'
import Flower6 from '@/components/assets/images/card-open-wedding/Flower-6.svg'
import Flower7 from '@/components/assets/images/card-open-wedding/Flower-7.svg'
import Flower8 from '@/components/assets/images/card-open-wedding/Flower-8.svg'
import Flower9 from '@/components/assets/images/card-open-wedding/Flower-9.svg'

// Define the type for flower images
type FlowerImage = {
  id: number
  image: StaticImageData
  top?: string
  left?: string
  right?: string
  bottom?: string
  widthRatio?: number // Ratio relative to viewport height
  heightRatio?: number // Ratio relative to viewport height
  originalWidth: number // Original width for aspect ratio calculation
  originalHeight: number // Original height for aspect ratio calculation
  delay: number
}

// Create an array of the imported images with responsive values
const flowerImages: FlowerImage[] = [
  {
    id: 1,
    image: Flower1,
    top: '0',
    left: '0',
    widthRatio: 0.25,
    heightRatio: 0.25,
    originalWidth: 200,
    originalHeight: 200,
    delay: 1,
  },
  {
    id: 2,
    image: Flower2,
    top: '2',
    left: '40',
    widthRatio: 0.25,
    heightRatio: 0.25,
    originalWidth: 200,
    originalHeight: 200,
    delay: 1.3,
  },
  {
    id: 3,
    image: Flower3,
    top: '7',
    right: '-10',
    widthRatio: 0.25,
    heightRatio: 0.25,
    originalWidth: 200,
    originalHeight: 200,
    delay: 1.6,
  },
  {
    id: 4,
    image: Flower4,
    top: '15',
    right: '0',
    widthRatio: 0.12,
    heightRatio: 0.25,
    originalWidth: 100,
    originalHeight: 200,
    delay: 1.3,
  },
  {
    id: 5,
    image: Flower5,
    top: '30',
    right: '0',
    widthRatio: 0.15,
    heightRatio: 0.27,
    originalWidth: 120,
    originalHeight: 220,
    delay: 1,
  },
  {
    id: 6,
    image: Flower6,
    bottom: '30',
    right: '0',
    widthRatio: 0.25,
    heightRatio: 0.25,
    originalWidth: 200,
    originalHeight: 200,
    delay: 1.3,
  },
  {
    id: 7,
    image: Flower7,
    bottom: '0',
    right: '-5',
    widthRatio: 0.25,
    heightRatio: 0.25,
    originalWidth: 200,
    originalHeight: 200,
    delay: 1.6,
  },
  {
    id: 8,
    image: Flower8,
    bottom: '0',
    right: '10',
    widthRatio: 0.25,
    heightRatio: 0.25,
    originalWidth: 200,
    originalHeight: 200,
    delay: 1.3,
  },
  {
    id: 9,
    image: Flower9,
    bottom: '10',
    left: '20',
    widthRatio: 0.25,
    heightRatio: 0.25,
    originalWidth: 200,
    originalHeight: 200,
    delay: 1.6,
  },
  {
    id: 10,
    image: Flower10,
    bottom: '0',
    left: '0',
    widthRatio: 0.25,
    heightRatio: 0.25,
    originalWidth: 200,
    originalHeight: 200,
    delay: 1,
  },
  {
    id: 11,
    image: Flower11,
    bottom: '20',
    left: '0',
    widthRatio: 0.25,
    heightRatio: 0.25,
    originalWidth: 200,
    originalHeight: 200,
    delay: 1.3,
  },
  {
    id: 12,
    image: Flower12,
    bottom: '35',
    left: '0',
    widthRatio: 0.12,
    heightRatio: 0.25,
    originalWidth: 100,
    originalHeight: 200,
    delay: 1.6,
  },
  {
    id: 13,
    image: Flower13,
    top: '20',
    left: '0',
    widthRatio: 0.25,
    heightRatio: 0.25,
    originalWidth: 200,
    originalHeight: 200,
    delay: 1,
  },
  {
    id: 14,
    image: Flower14,
    top: '25',
    left: '0',
    widthRatio: 0.25,
    heightRatio: 0.25,
    originalWidth: 200,
    originalHeight: 200,
    delay: 1.6,
  },
]

const FlowersCardWedding: React.FC = () => {
  const { isInvitationOpen } = useInvitation()
  const [dimensions, setDimensions] = useState({
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    width: typeof window !== 'undefined' ? window.innerWidth : 600,
  })

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }

    // Set initial dimensions
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Animation variants for flip effect
  const flipVariants = {
    hidden: {
      rotateY: -180,
      opacity: 0,
    },
    visible: (delay: number) => ({
      rotateY: 0,
      opacity: 1,
      transition: {
        delay: isInvitationOpen ? delay : 0, // 0.3 second delay between each flower
        duration: 2,
      },
    }),
  }

  // Calculate responsive size based on viewport height
  const calculateResponsiveSize = (
    ratio: number | undefined,
    dimension: number
  ) => {
    if (!ratio) return 'auto'
    return Math.round(ratio * dimension)
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {flowerImages.map(
        ({
          id,
          image,
          top,
          left,
          right,
          bottom,
          widthRatio,
          heightRatio,
          originalWidth,
          originalHeight,
          delay,
        }) => {
          // Calculate responsive dimensions
          const width = calculateResponsiveSize(widthRatio, dimensions.height)
          const height = calculateResponsiveSize(heightRatio, dimensions.height)

          // Maintain aspect ratio if only one dimension is provided
          const finalWidth =
            width !== 'auto'
              ? width
              : height !== 'auto'
                ? height * (originalWidth / originalHeight)
                : originalWidth
          const finalHeight =
            height !== 'auto'
              ? height
              : width !== 'auto'
                ? width * (originalHeight / originalWidth)
                : originalHeight

          return (
            <motion.div
              key={id}
              custom={delay}
              initial="hidden"
              animate={isInvitationOpen ? 'visible' : 'hidden'}
              variants={flipVariants}
              style={{
                position: 'absolute',
                top: top ? `${top}%` : undefined,
                left: left ? `${left}%` : undefined,
                right: right ? `${right}%` : undefined,
                bottom: bottom ? `${bottom}%` : undefined,
                transformStyle: 'preserve-3d',
              }}
            >
              <Image
                src={image}
                alt={`Flower-${id}`}
                width={finalWidth}
                height={finalHeight}
                className="h-auto"
                style={{
                  maxWidth: '100%',
                }}
              />
            </motion.div>
          )
        }
      )}
    </div>
  )
}

export default FlowersCardWedding
