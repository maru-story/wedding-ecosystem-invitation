'use client'

import BgFrame from '@/components/assets/images/section-konfirmasi/bg-section-konfirmasi.svg'
import Flower1 from '@/components/assets/images/section-konfirmasi/flower-1.svg'
import Flower10 from '@/components/assets/images/section-konfirmasi/flower-10.svg'
import Flower11 from '@/components/assets/images/section-konfirmasi/flower-11.svg'
import Flower2 from '@/components/assets/images/section-konfirmasi/flower-2.svg'
import Flower3 from '@/components/assets/images/section-konfirmasi/flower-3.svg'
import Flower4 from '@/components/assets/images/section-konfirmasi/flower-4.svg'
import Flower5 from '@/components/assets/images/section-konfirmasi/flower-5.svg'
import Flower6 from '@/components/assets/images/section-konfirmasi/flower-6.svg'
import Flower7 from '@/components/assets/images/section-konfirmasi/flower-7.svg'
import Flower8 from '@/components/assets/images/section-konfirmasi/flower-8.svg'
import Flower9 from '@/components/assets/images/section-konfirmasi/flower-9.svg'
import FrameSectionKonfirmasi from '@/components/assets/images/section-konfirmasi/frame-section-konfirmasi.svg'
import TextKonfirmasi from '@/components/assets/images/section-konfirmasi/text-section-konfirmasi.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { createAttendance } from '@/hooks/useApi'
import { Guest } from '@/types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface SectionKonfirmasiProps {
  guest?: Guest | null
}

const SectionKonfirmasi: React.FC<SectionKonfirmasiProps> = ({ guest }) => {
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState('akad-dan-resepsi')
  const [guestCount, setGuestCount] = useState('1')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Flip animation variant for flowers
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!guest) {
      toast.error('Guest information not found')
      return
    }

    setIsSubmitting(true)

    try {
      await createAttendance({
        guestId: guest.id,
        nama: name || guest.nama,
        konfirmasi:
          attendance === 'akad'
            ? 'Akad'
            : attendance === 'resepsi'
              ? 'Resepsi'
              : attendance === 'akad-dan-resepsi'
                ? 'Akad dan Resepsi'
                : 'Maaf, Saya belum bisa hadir',
        jumlahTamu: attendance === 'cannot-attend' ? 0 : parseInt(guestCount),
      })

      toast.success('Konfirmasi berhasil dikirim!')
    } catch (error) {
      toast.error('Gagal mengirim konfirmasi. Silakan coba lagi.')
      console.error('Error submitting attendance:', error)
    } finally {
      setIsSubmitting(false)
    }
    // Add your form submission logic here
  }

  const decrementGuests = () => {
    if (parseInt(guestCount) > 1) {
      setGuestCount((parseInt(guestCount) - 1).toString())
    }
  }

  const incrementGuests = () => {
    setGuestCount((parseInt(guestCount) + 1).toString())
  }

  return (
    <section className="relative w-full" id="section-konfirmasi">
      {/* Container that establishes size */}
      <div className="relative grid aspect-[9/16] w-full content-center">
        <div className="absolute h-auto w-full">
          <Image
            src={BgFrame}
            alt="section-konfirmasi-background-frame"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>
        <motion.div
          className="absolute -bottom-7 -left-2 z-10"
          variants={flipVariant}
          initial="hidden"
          whileInView="visible"
          custom={5}
          viewport={{ once: false }}
          style={{ perspective: '500px' }}
        >
          <Image
            src={Flower2}
            alt="decorative-flower-2"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto"
            loading="lazy"
          />
        </motion.div>
        <motion.div
          className="absolute -right-2 -bottom-7 z-11 "
          variants={flipVariant}
          initial="hidden"
          whileInView="visible"
          custom={2}
          viewport={{ once: false }}
          style={{ perspective: '500px' }}
        >
          <Image
            src={Flower5}
            alt="decorative-flower-5"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          className="absolute -bottom-7 -left-2 z-9"
          variants={flipVariant}
          initial="hidden"
          whileInView="visible"
          custom={10}
          viewport={{ once: false }}
          style={{ perspective: '500px' }}
        >
          <Image
            src={Flower11}
            alt="decorative-flower-11"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto"
            loading="lazy"
          />
        </motion.div>
        <div className="relative mx-auto h-[550px] w-full max-w-[350px] min-w-[300px]">
          <Image
            src={FrameSectionKonfirmasi}
            alt="section-konfirmasi-frame"
            width={350}
            height={550}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            loading="lazy"
          />
          <motion.div
            initial={{ opacity: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute top-0 left-1/2 h-auto w-full -translate-x-1/2"
          >
            <Image
              src={TextKonfirmasi}
              alt="section-doa-text"
              width={0}
              height={0}
              loading="lazy"
              sizes="100vw"
              className="mx-auto h-auto "
            />
          </motion.div>

          {/* Flower Decorations with Flip Animation */}
          {/* Left side flowers */}
          <motion.div
            className="absolute bottom-0 left-25 z-10"
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: false }}
            style={{ perspective: '500px' }}
          >
            <Image
              src={Flower1}
              alt="decorative-flower-1"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            className="absolute right-10 -bottom-5 z-10 "
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: false }}
            style={{ perspective: '500px' }}
          >
            <Image
              src={Flower3}
              alt="decorative-flower-3"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            className="absolute -bottom-12.5 -left-15 z-10"
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            custom={3}
            viewport={{ once: false }}
            style={{ perspective: '500px' }}
          >
            <Image
              src={Flower7}
              alt="decorative-flower-7"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            className="absolute -right-5 -bottom-4 z-10"
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            custom={4}
            viewport={{ once: false }}
            style={{ perspective: '500px' }}
          >
            <Image
              src={Flower9}
              alt="decorative-flower-9"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            className="absolute bottom-27.5 -left-12.5 z-10"
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            custom={6}
            viewport={{ once: false }}
            style={{ perspective: '500px' }}
          >
            <Image
              src={Flower4}
              alt="decorative-flower-4"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            className="absolute bottom-5 -left-5 z-10 "
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            custom={7}
            viewport={{ once: false }}
            style={{ perspective: '500px' }}
          >
            <Image
              src={Flower6}
              alt="decorative-flower-6"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            className="absolute -right-7.5 -bottom-5 z-10"
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            custom={8}
            viewport={{ once: false }}
            style={{ perspective: '500px' }}
          >
            <Image
              src={Flower8}
              alt="decorative-flower-8"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            className="absolute -right-5 bottom-25 z-10"
            variants={flipVariant}
            initial="hidden"
            whileInView="visible"
            custom={9}
            viewport={{ once: false }}
            style={{ perspective: '500px' }}
          >
            <Image
              src={Flower10}
              alt="decorative-flower-10"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 z-20 flex h-auto w-[65%] -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          >
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col justify-center space-y-1.5"
            >
              {/* Name Input */}
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs text-[#6B3D49]">
                  Nama
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-8 rounded-md border-none bg-[#F0EFEF] focus-visible:ring-[#6B3D49] focus-visible:ring-offset-0"
                  required
                />
              </div>

              {/* Radio Buttons */}
              <div className="space-y-1.5">
                <Label className="text-xs text-[#6B3D49]">Konfirmasi</Label>
                <RadioGroup
                  value={attendance}
                  onValueChange={setAttendance}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="akad"
                      id="akad"
                      className="data-[state=checked]:bg-[#CF935F]"
                    />
                    <Label htmlFor="akad" className="text-xs text-[#6B3D49]">
                      Akad
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="resepsi"
                      id="resepsi"
                      className="data-[state=checked]:bg-[#CF935F]"
                    />
                    <Label htmlFor="resepsi" className="text-xs text-[#6B3D49]">
                      Resepsi
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="akad-dan-resepsi"
                      id="akad-dan-resepsi"
                      className="data-[state=checked]:bg-[#CF935F]"
                    />
                    <Label
                      htmlFor="akad-dan-resepsi"
                      className="text-xs text-[#6B3D49]"
                    >
                      Akad dan Resepsi
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="cannot-attend"
                      id="cannot-attend"
                      className="data-[state=checked]:bg-[#CF935F]"
                    />
                    <Label
                      htmlFor="cannot-attend"
                      className="text-xs text-[#6B3D49]"
                    >
                      Maaf, Saya belum bisa hadir
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Guest Counter */}
              {attendance !== 'cannot-attend' && (
                <div className="mt-2 flex flex-col items-center space-y-1.5">
                  <Label className="text-center text-xs text-[#6B3D49]">
                    Jumlah Tamu
                  </Label>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      onClick={decrementGuests}
                      className="h-5 w-5 rounded-full bg-[#E5E5E5] p-0 text-xs text-[#DD73A1] "
                      aria-label="Reduce guest count"
                    >
                      -
                    </Button>
                    <div className="mx-2 flex-1">
                      <Input
                        type="number"
                        value={guestCount ?? ''}
                        onChange={(e) => {
                          const value = e.target.value
                          if (parseInt(value) > 20) {
                            setGuestCount('20')
                          } else {
                            setGuestCount(parseInt(value).toString())
                          }
                        }}
                        className="h-5 w-[100px] [appearance:textfield] rounded-full border-none bg-[#E5E5E5] text-center text-xs text-[#6B3D49] focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        max={20}
                        inputMode="numeric"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={incrementGuests}
                      className="h-5 w-5 rounded-full bg-[#E5E5E5] p-0 text-xs text-[#DD73A1] "
                      aria-label="Increase guest count"
                    >
                      +
                    </Button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="mx-auto mt-5 h-7.5 w-1/2 rounded-full border-1 border-[#DD73A1] bg-[#CF935F] text-white uppercase transition-all duration-300 hover:bg-[#b37b48]"
              >
                {isSubmitting ? 'Mengirim...' : 'SUBMIT'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SectionKonfirmasi
