'use client'

import IconSvg from '@/components/assets/images/card-open-wedding/icon.svg'
import BgGiftSection from '@/components/assets/images/section-gift/bg-gift-section.svg'
import FrameRekening from '@/components/assets/images/section-gift/frame-rekening.svg'
import LogoKredit from '@/components/assets/images/section-gift/logo-kredit.svg'
import { SectionData } from '@/lib/api'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface SectionGiftProps {
  section?: SectionData
}

interface BankAccount {
  bank_name: string
  account_number: string
  account_holder: string
}

const DEFAULT_INTRO =
  'Your presence and prayers are the greatest gift of all. But if you wish to express your kindness, you are welcome to send a gift via bank transfer or other means.'

const SectionGift: React.FC<SectionGiftProps> = ({ section }) => {
  const content = section?.content as {
    title?: string
    intro_text?: string
    accounts?: BankAccount[]
  } | undefined

  const [liveContent, setLiveContent] = useState(content)

  useEffect(() => {
    setLiveContent(content)
  }, [content])

  // Listen for CMS live preview updates
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'CMS_PREVIEW_UPDATE' && e.data?.section_type === 'gift') {
        setLiveContent(e.data.content)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const title = liveContent?.title || 'Wedding Gift'
  const introText = liveContent?.intro_text || DEFAULT_INTRO
  const accounts = liveContent?.accounts || []

  return (
    <section className="relative w-full overflow-hidden" id="section-gift">
      {/* Container with fixed aspect ratio */}
      <div className="relative flex aspect-9/16 w-full flex-col items-center justify-center">
        {/* Background */}
        <div className="absolute z-0 h-auto w-full">
          <Image
            src={BgGiftSection}
            alt="section-gift-background"
            sizes="100vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 w-[85%] max-w-[315px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative w-full">
            {/* Outer box */}
            <div className="box w-full bg-[#DDD3C8] px-5 py-10">
              <div className="relative z-20 flex w-full flex-col items-center gap-4">
                {/* Icon above title */}
                <motion.div
                  initial={{ opacity: 0, y: -15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: 'easeOut',
                    delay: 0.2,
                  }}
                  className="pointer-events-none w-[12%]"
                >
                  <Image
                    src={IconSvg}
                    alt="couple icon"
                    className="h-auto w-full object-contain"
                    loading="lazy"
                  />
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="font-little-hands text-3xl tracking-wider text-[#6B3D49] uppercase sm:text-4xl"
                >
                  {title}
                </motion.h2>

                {/* Intro text */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-center text-xs leading-relaxed text-[#8E7C81] whitespace-pre-line"
                >
                  {introText}
                </motion.p>

                {/* Bank accounts */}
                {accounts.length > 0 ? (
                  <div className="flex w-full flex-col gap-4">
                    {accounts.map((account, index) => (
                      <motion.div
                        key={index}
                        className="relative w-full"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Image
                          src={FrameRekening}
                          alt="frame-rekening"
                          sizes="100vw"
                          className="absolute inset-0 h-full w-full"
                          loading="lazy"
                        />
                        <div className="relative flex flex-col gap-2 p-7">
                          <div className="flex items-center justify-between px-7.5">
                            <Image
                              src={LogoKredit}
                              alt="logo-kredit"
                              width={28}
                              height={21}
                              className="h-auto"
                              loading="lazy"
                            />
                            <div className="flex flex-col items-center gap-1">
                              <p className="text-[11px] text-[#8E7C81]">
                                {account.bank_name}
                              </p>
                              <button
                                className="cursor-pointer rounded-full border border-[#E0DEDF] bg-[#B6A29F] px-2.5 py-1 text-[10px] text-nowrap text-white"
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    account.account_number
                                  )
                                  toast.success('Account number copied!')
                                }}
                              >
                                Copy Account
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <p className="text-center text-[11px] text-[#8E7C81]">
                              {account.account_number}
                            </p>
                            <p className="text-center text-[11px] text-[#8E7C81]">
                              a.n {account.account_holder}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="py-4"
                  >
                    <p className="text-center text-sm font-little-hands text-white">
                      No bank account added yet :(
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Inner box border */}
            <div className="box-inside pointer-events-none absolute inset-[10px]" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SectionGift
