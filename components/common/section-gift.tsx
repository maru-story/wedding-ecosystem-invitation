'use client'

import BorderBottom from '@/components/assets/images/section-gift/border-bottom-gift.svg'
import FrameRekening from '@/components/assets/images/section-gift/frame-rekening.svg'
import LogoKredit from '@/components/assets/images/section-gift/logo-kredit.svg'
import TextKadoFisik from '@/components/assets/images/section-gift/text-kado-fisik.svg'
import TextTerimakasih from '@/components/assets/images/section-gift/text-terimakasih.svg'
import TextWeddingGift from '@/components/assets/images/section-gift/text-wedding-gift.svg'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner'
import BgFrame from '../assets/images/section-gift/bg-section-gift.png'

const SectionGift: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isWishlist, setIsWishlist] = useState(false)

  // Height values for expansion
  const defaultHeight = 440
  const expandedHeight = 1100 // Increased to fit all content
  const wishlistHeight = 2425 // Increased to fit all content

  // Calculate the correct height based on states
  const getContentHeight = () => {
    if (!isExpanded) {
      return defaultHeight - 100
    }

    return isWishlist ? wishlistHeight - 100 : expandedHeight - 100
  }

  // Calculate height for inner box
  const getInnerBoxHeight = () => {
    if (!isExpanded) {
      return defaultHeight - 120
    }

    return isWishlist ? wishlistHeight - 120 : expandedHeight - 120
  }

  // Define wishlist items with proper organization
  const wishlistGrid = [
    [
      { name: 'rice-cooker', label: 'Rice Cooker' },
      { name: 'tv', label: 'Smart TV 32 inch' },
    ],
    [
      { name: 'bantal', label: 'Bantal & Guling' },
      { name: 'bed-cover', label: 'Sprei /+ Bedcover' },
    ],
    [
      { name: 'peralatan-masak', label: 'Peralatan Masak' },
      { name: 'peralatan-makan', label: 'Peralatan Makan' },
    ],
    [
      { name: 'kasur', label: 'Kasur Queen Size' },
      { name: 'lemari', label: 'Lemari / Drawer' },
    ],
    [
      { name: 'hairdryer', label: 'Hair Dryer' },
      { name: 'pel', label: 'Alat Pel' },
    ],
    [
      { name: 'vacuum-cleaner', label: 'Vacuum Cleaner' },
      { name: 'sapu', label: 'Sapu + Pengki' },
    ],
    [
      { name: 'perintilan', label: 'Perintilan' },
      { name: 'voucher', label: 'Voucher' },
    ],
  ]

  return (
    <section
      className="relative w-full overflow-hidden"
      id="section-gift"
      style={{
        backgroundImage: `url(${BgFrame.src})`,
        backgroundSize: '100%',
      }}
    >
      {/* Container that establishes size */}
      <div className="relative flex aspect-[9/16] w-full flex-col">
        {/* ANIMATION HERE */}
        <motion.div
          className="mx-auto mt-20 w-full max-w-[350px] min-w-[300px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative flex flex-col items-center gap-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false }}
              className="relative w-[315px]"
            >
              {/* Frame with separate top, middle, and bottom sections */}
              <div className="relative">
                <motion.div
                  className="box flex w-[315px] bg-[#DDD3C8]"
                  initial={{ height: defaultHeight - 100 }}
                  animate={{ height: getContentHeight() }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative z-20 mx-auto flex w-[250px] flex-col items-center gap-4 py-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="w-1/2"
                    >
                      <Image
                        src={TextWeddingGift}
                        alt="section-gift-text-wedding-gift"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-auto w-full "
                        loading="lazy"
                      />
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="text-center text-xs text-[#8E7C81]"
                    >
                      Doa restu anda merupakan karunia yang sangat berarti bagi
                      kami. Jika memberi adalah ungkapan tanda kasih, anda dapat
                      memberi kado secara transfer dan lainnya.
                    </motion.p>
                    {/* Toggle button */}
                    <motion.button
                      className="cursor-pointer rounded-full border-1 border-[#C47C9E] bg-[#D08E61] px-8 py-2 font-[milk-honey] text-xs text-white transition-all hover:bg-[#896B58]"
                      onClick={() => {
                        setIsExpanded(!isExpanded)
                        if (!isExpanded) {
                          setIsWishlist(false) // Reset wishlist state when closing
                        }
                      }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {isExpanded ? 'Tutup' : 'Klik disini'}
                    </motion.button>
                    {/* Gift content - Inside the frame */}
                    {isExpanded && (
                      <>
                        <motion.div
                          className="relative"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Image
                            src={FrameRekening}
                            alt="section-gift-frame-rekening"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="h-auto w-full"
                            loading="lazy"
                          />
                          <div className="absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-2 p-12.5">
                            <div className="flex items-center justify-between">
                              <Image
                                src={LogoKredit}
                                alt="section-gift-logo-kredit"
                                width={30}
                                height={23}
                                className="h-auto"
                                loading="lazy"
                              />
                              <div className="flex flex-col items-center gap-1">
                                <p className="text-xs text-[#8E7C81]">
                                  Mandiri
                                </p>
                                <button
                                  className="cursor-pointer rounded-full border-1 border-[#E0DEDF] bg-[#B6A29F] px-2.5 py-1 text-[10px] text-nowrap text-white"
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      '1300022969938'
                                    )
                                    toast.success('Nomor rekening disalin!')
                                  }}
                                >
                                  Salin Rekening
                                </button>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-xs text-[#8E7C81]">
                                1300022969938
                              </p>
                              <p className="text-xs text-[#8E7C81]">
                                a.n Panji Nur Rahman Rahim
                              </p>
                            </div>
                          </div>
                        </motion.div>
                        <motion.div
                          className="relative"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Image
                            src={FrameRekening}
                            alt="section-gift-frame-rekening"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="h-auto w-full"
                            loading="lazy"
                          />
                          <div className="absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-2 p-12.5">
                            <div className="flex items-center justify-between">
                              <Image
                                src={LogoKredit}
                                alt="section-gift-logo-kredit"
                                width={30}
                                height={23}
                                className="h-auto"
                                loading="lazy"
                              />
                              <div className="flex flex-col items-center gap-1">
                                <p className="text-xs text-[#8E7C81]">BCA</p>
                                <button
                                  className="cursor-pointer rounded-full border-1 border-[#E0DEDF] bg-[#B6A29F] px-2.5 py-1 text-[10px] text-nowrap text-white"
                                  onClick={() => {
                                    navigator.clipboard.writeText('4380255346')
                                    toast.success('Nomor rekening disalin!')
                                  }}
                                >
                                  Salin Rekening
                                </button>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-xs text-[#8E7C81]">
                                4380255346
                              </p>
                              <p className="text-xs text-[#8E7C81]">
                                a.n Gina Ghaisani
                              </p>
                            </div>
                          </div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          viewport={{ once: true }}
                        >
                          <Image
                            src={TextKadoFisik}
                            alt="section-gift-text-kado-fisik"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="h-auto w-full "
                            loading="lazy"
                          />
                        </motion.div>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          viewport={{ once: true }}
                          className="text-center text-xs text-[#8E7C81]"
                        >
                          Jika berkenan mengirimkan kado fisik, dapat dikirimkan
                          ke:
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                          viewport={{ once: true }}
                          className="text-center text-xs text-[#6B3D49]"
                        >
                          Jalan Babakan Priangan V No. 15, Kota Bandung, Jawa
                          Barat 40255
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                          viewport={{ once: true }}
                          className="text-center text-xs text-[#6B3D49]"
                        >
                          Panji Nur Rahman Rahim <br /> +62 811 2244 650
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.6 }}
                          viewport={{ once: true }}
                          className="cursor-pointer text-center text-xs text-[#6B3D49] underline"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              'Jalan Babakan Priangan V No. 15, Kota Bandung, Jawa Barat 40255'
                            )
                            toast.success('Alamat Pengiriman disalin!')
                          }}
                        >
                          Salin Alamat Pengiriman
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.7 }}
                          viewport={{ once: true }}
                          className="text-center text-xs text-[#8E7C81]"
                        >
                          Jika berkenan memberikan kado yang sesuai dengan
                          kebutuhan kami, berikut beberapa ide:
                        </motion.p>
                        <motion.button
                          className="cursor-pointer rounded-full border-1 border-[#C47C9E] bg-[#D08E61] px-8 py-2 font-[milk-honey] text-xs text-white transition-all hover:bg-[#896B58]"
                          onClick={() => setIsWishlist(!isWishlist)}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.8 }}
                          viewport={{ once: true }}
                        >
                          {isWishlist ? 'Tutup Wishlist' : 'Lihat Wishlist'}
                        </motion.button>

                        {/* Wishlist Content */}
                        {isWishlist && (
                          <motion.div
                            className="mt-8 flex w-full flex-col items-center justify-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            {/* Grid layout for wishlist items */}
                            {wishlistGrid.map((row, rowIndex) => (
                              <div
                                key={`row-${rowIndex}`}
                                className="flex w-full justify-between"
                              >
                                {row.map((item, colIndex) => (
                                  <motion.div
                                    key={`item-${rowIndex}-${colIndex}`}
                                    className="flex w-full flex-col items-center px-2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      duration: 0.5,
                                      delay:
                                        (rowIndex * 3 + colIndex) * 0.1 + 0.3,
                                    }}
                                  >
                                    <div className="relative mb-1 flex h-auto w-full items-center justify-center">
                                      <Image
                                        src={`${process.env.NEXT_PUBLIC_URL_IMAGE}section-gift-${item.name}.svg`}
                                        alt={item.label}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        className="h-auto w-full object-contain"
                                        loading="lazy"
                                      />
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            ))}

                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              viewport={{ once: true }}
                              className="mt-5"
                            >
                              <Image
                                src={TextTerimakasih}
                                alt="section-gift-text-terimakasih"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="h-auto w-full "
                                loading="lazy"
                              />
                            </motion.div>
                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                              viewport={{ once: true }}
                              className="text-center text-xs text-[#8E7C81]"
                            >
                              Hadiah dan perhatian yang Anda kirimkan menjadi
                              bagian dari kebahagiaan kami dalam perjalanan baru
                              kami bersama.
                            </motion.p>
                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.8, delay: 0.4 }}
                              viewport={{ once: true }}
                              className="text-center text-xs text-[#8E7C81]"
                            >
                              Untuk kemudahan, konfirmasi pengiriman hadiahmu
                              pada tombol dibawah ini
                            </motion.p>

                            <motion.button
                              className="mt-8 cursor-pointer rounded-full border-1 border-[#D08E61] bg-[#C47C9E] px-8 py-2 font-[milk-honey] text-xs text-white transition-all hover:bg-[#896B58]"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ duration: 0.8, delay: 0.5 }}
                              viewport={{ once: true }}
                              onClick={() =>
                                window.open(
                                  `https://wa.me/628112244650`,
                                  '_blank'
                                )
                              }
                            >
                              Konfirmasi Hadiah
                            </motion.button>
                          </motion.div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
                <motion.div
                  className="box-inside pointer-events-none top-1/2 left-1/2 w-[290px] -translate-x-1/2 -translate-y-1/2"
                  initial={{ height: defaultHeight - 120 }}
                  animate={{ height: getInnerBoxHeight() }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-auto pt-8"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_URL_IMAGE}section-gift-foto.svg`}
            alt="section-gift-foto"
            width={0}
            height={0}
            sizes="100vw"
            className="mx-auto h-auto w-full border-t-5 border-b-5 border-[#C1567F]"
            loading="lazy"
          />
          <Image
            src={BorderBottom}
            alt="section-gift-border-bottom"
            width={0}
            height={0}
            sizes="100vw"
            className="mx-auto h-auto w-full"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default SectionGift
