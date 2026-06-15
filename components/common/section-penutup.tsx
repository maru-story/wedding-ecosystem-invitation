'use client'

import Image from 'next/image'
import React from 'react'

const SectionPenutup: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden" id="section-penutup">
      {/* Container that establishes size */}
      <div className="relative grid aspect-[9/16] w-full content-center">
        <div className="absolute h-auto w-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_URL_IMAGE}section-closing-foto.svg`}
            alt="section-penutup-background-frame"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

export default SectionPenutup
