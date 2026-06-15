'use client'

import BgCardOpenWedding from '@/components/assets/images/card-open-wedding/bg-card-open-wedding.png'
import TextPanjiGina from '@/components/assets/images/card-open-wedding/text-panji-gina.svg'
import FlowersCardWedding from '@/components/common/flowers-card-wedding'
import { useInvitation } from '@/components/context/provider'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const CardOpenWedding: React.FC<{ name: string; loading: boolean }> = ({
  name,
  loading,
}) => {
  const { openInvitation, isInvitationOpen } = useInvitation()

  return (
    <div className="relative aspect-9/16 w-full" id="card-open-wedding">
      <Image
        src={BgCardOpenWedding}
        loading="lazy"
        alt="bg-card-open-wedding"
        width={0}
        height={0}
        sizes="100vw"
        className="h-[100dvh] w-full"
      />
      <FlowersCardWedding />
      <div className="absolute top-1/2 left-1/2 z-21 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-8">
        <Image
          src={TextPanjiGina}
          loading="lazy"
          alt="text-panji-gina"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-[400px]"
        />
        <motion.button
          className="cursor-pointer rounded-[10px] bg-[#894839] px-[50px] py-3 text-center font-[minecraft] text-lg font-normal text-nowrap text-white uppercase"
          initial={{ opacity: 0 }}
          transition={
            isInvitationOpen ? { duration: 1 } : { duration: 1, delay: 6 }
          }
          animate={
            isInvitationOpen ? { opacity: 0 } : { opacity: loading ? 0 : 1 }
          }
          onClick={openInvitation}
        >
          Lihat Undangan
        </motion.button>
        <motion.div
          className="rounded-full border-2 border-[#CF935F] bg-[#8D4F5D] px-10 py-2 text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: isInvitationOpen ? 1 : 0,
            y: isInvitationOpen ? -75 : 50,
          }}
          transition={{ duration: 1, delay: 2 }}
        >
          Halo, {name}
        </motion.div>
      </div>
    </div>
  )
}

export default CardOpenWedding
