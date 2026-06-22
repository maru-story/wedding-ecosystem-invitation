'use client'

import BgFrame from '@/components/assets/images/section-konfirmasi/bg-rsvp-section.svg'
import FlowerPinkRsvpBottomLeft from '@/components/assets/images/section-konfirmasi/flower-pink-rsvp-bottom-left.svg'
import FlowerRsvpBottomLeft from '@/components/assets/images/section-konfirmasi/flower-rsvp-bottom-left.svg'
import FlowerRsvpBottomRight from '@/components/assets/images/section-konfirmasi/flower-rsvp-bottom-right.svg'
import FlowerRsvpTopRight from '@/components/assets/images/section-konfirmasi/flower-rsvp-top-right.svg'
import FlowerYellowRsvpBottomLeft from '@/components/assets/images/section-konfirmasi/flower-yellow-rsvp-bottom-left.svg'
import FrameSectionKonfirmasi from '@/components/assets/images/section-konfirmasi/frame-rsvp-section.svg'
import { useInvitation } from '@/components/context/provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { AdaptedGuest, SectionData, submitRsvp } from '@/lib/api'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface SectionKonfirmasiProps {
  guest?: AdaptedGuest | null
  eventId: string
  section?: SectionData
}

const SectionKonfirmasi: React.FC<SectionKonfirmasiProps> = ({ guest, eventId, section }) => {
  const { isInvitationOpen } = useInvitation()

  const content = section?.content as {
    max_plus_one?: number
    intro_text?: string
  } | undefined

  const [liveContent, setLiveContent] = useState(content)

  useEffect(() => {
    setLiveContent(content)
  }, [content])

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'CMS_PREVIEW_UPDATE' && e.data?.section_type === 'rsvp') {
        setLiveContent(e.data.content)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const introText = liveContent?.intro_text || 'Please let us know if you will be\njoining us by filling out the form below:'

  const maxPlusOne = guest?.plus_one_count !== undefined
    ? guest.plus_one_count
    : (liveContent?.max_plus_one ?? 10)

  const rsvpAttendance = guest?.rsvp?.attendance
  let initialAttendance = 'akad-dan-resepsi'
  if (rsvpAttendance === 'akad') {
    initialAttendance = 'akad'
  } else if (rsvpAttendance === 'resepsi') {
    initialAttendance = 'resepsi'
  } else if (rsvpAttendance === 'decline') {
    initialAttendance = 'cannot-attend'
  }

  const initialGuestCount = guest?.rsvp
    ? Math.max(0, guest.rsvp.guest_count - 1).toString()
    : '0'

  const [name, setName] = useState(guest?.nama || '')
  const [attendance, setAttendance] = useState(initialAttendance)
  const [guestCount, setGuestCount] = useState(initialGuestCount)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(!!guest?.rsvp)

  const isPreviewMode = guest?.nickname === 'preview'

  useEffect(() => {
    if (guest?.rsvp) {
      const rsvpAttendance = guest.rsvp.attendance
      let initialAttendance = 'akad-dan-resepsi'
      if (rsvpAttendance === 'akad') {
        initialAttendance = 'akad'
      } else if (rsvpAttendance === 'resepsi') {
        initialAttendance = 'resepsi'
      } else if (rsvpAttendance === 'decline') {
        initialAttendance = 'cannot-attend'
      }
      setAttendance(initialAttendance)
      setGuestCount(Math.max(0, guest.rsvp.guest_count - 1).toString())
      setIsSubmitted(true)
    } else {
      setAttendance('akad-dan-resepsi')
      setGuestCount('0')
      setIsSubmitted(false)
    }
    setName(guest?.nama || '')
  }, [guest])

  const decrementGuests = () => {
    setGuestCount((prev) => {
      const current = parseInt(prev, 10) || 0
      return current > 0 ? (current - 1).toString() : '0'
    })
  }

  const incrementGuests = () => {
    setGuestCount((prev) => {
      const current = parseInt(prev, 10) || 0
      return current < maxPlusOne ? (current + 1).toString() : maxPlusOne.toString()
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!guest) {
      toast.error('Guest data not found')
      return
    }

    setIsSubmitting(true)

    try {
      let attendanceValue: 'akad' | 'resepsi' | 'both' | 'decline' = 'both'
      if (attendance === 'akad') {
        attendanceValue = 'akad'
      } else if (attendance === 'resepsi') {
        attendanceValue = 'resepsi'
      } else if (attendance === 'cannot-attend') {
        attendanceValue = 'decline'
      }

      const additionalCount = parseInt(guestCount, 10) || 0
      const totalCount = attendanceValue === 'decline' ? 0 : additionalCount + 1

      await submitRsvp({
        guest_id: guest.id,
        event_id: eventId,
        attendance: attendanceValue,
        guest_count: totalCount,
      })

      setIsSubmitted(true)
      toast.success('RSVP successfully submitted!')
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to submit RSVP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative w-full" id="section-konfirmasi">
      {/* Container that establishes size */}
      <div className="relative aspect-9/16 w-full">
        {/* Background elements */}
        <div className="absolute z-0 h-auto w-full">
          <Image
            src={BgFrame}
            alt="section-konfirmasi-background"
            sizes="100vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>

        {/* ANIMATION HERE */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-full max-w-[350px] min-w-[300px] -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
        >
          <div className="relative flex flex-col items-center gap-2">
            {/* RSVP Title (positioned absolute, top center of the frame) */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="absolute top-[10%] left-1/2 -translate-x-1/2 z-25 w-max pointer-events-none select-none text-center"
            >
              <h2 className="font-little-hands text-4xl sm:text-5xl text-[#6B3D49] tracking-wider uppercase leading-none">
                RSVP
              </h2>
            </motion.div>

            {/* Intro text below RSVP Title */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: false }}
              className="absolute top-[20%] left-1/2 -translate-x-1/2 z-20 w-full px-6 flex justify-center text-center select-none"
            >
              <p className="text-[10px] sm:text-xs text-black leading-relaxed max-w-[240px] whitespace-pre-line">
                {introText}
              </p>
            </motion.div>

            {/* Flower Decorations with Floating Animation */}
            {/* Flower Top-Right */}
            <motion.div
              className="absolute top-[8%] right-[-10%] w-[32%] z-10 pointer-events-none origin-top-right"
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
                x: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.0 },
                y: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.0 },
                rotate: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.0 },
              }}
              viewport={{ once: true }}
            >
              <Image src={FlowerRsvpTopRight} alt="flower-top-right" className="w-full h-auto" loading="lazy" />
            </motion.div>

            {/* Flower Bottom-Right */}
            <motion.div
              className="absolute bottom-[5%] right-[-12%] w-[36%] z-10 pointer-events-none origin-bottom-right"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: [0, -2, 2, 0],
                x: [0, -1, 1, 0],
                y: [0, -2, 2, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.2 },
                scale: { duration: 0.8, delay: 0.2 },
                x: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.0 },
                y: { repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1.0 },
                rotate: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.0 },
              }}
              viewport={{ once: true }}
            >
              <Image src={FlowerRsvpBottomRight} alt="flower-bottom-right" className="w-full h-auto" loading="lazy" />
            </motion.div>

            {/* Flower Pink Bottom-Left */}
            <motion.div
              className="absolute bottom-[2%] left-[-10%] w-[26%] z-12 pointer-events-none origin-bottom-left"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: [0, 2, -2, 0],
                x: [0, 1, -1, 0],
                y: [0, -1, 1, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.3 },
                scale: { duration: 0.8, delay: 0.3 },
                x: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.1 },
                y: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.1 },
                rotate: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.1 },
              }}
              viewport={{ once: true }}
            >
              <Image src={FlowerPinkRsvpBottomLeft} alt="flower-pink-bottom-left" className="w-full h-auto" loading="lazy" />
            </motion.div>

            {/* Flower Bottom-Left */}
            <motion.div
              className="absolute bottom-[-5%] left-[-12%] w-[38%] z-10 pointer-events-none origin-bottom-left"
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
                x: { repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1.0 },
                y: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.0 },
                rotate: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.0 },
              }}
              viewport={{ once: true }}
            >
              <Image src={FlowerRsvpBottomLeft} alt="flower-bottom-left" className="w-full h-auto" loading="lazy" />
            </motion.div>

            {/* Flower Yellow Bottom-Left */}
            <motion.div
              className="absolute bottom-[10%] left-[-8%] w-[24%] z-15 pointer-events-none origin-bottom-left"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: [0, -2, 2, 0],
                x: [0, -1, 1, 0],
                y: [0, 1, -1, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.4 },
                scale: { duration: 0.8, delay: 0.4 },
                x: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.2 },
                y: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.2 },
                rotate: { repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.2 },
              }}
              viewport={{ once: true }}
            >
              <Image src={FlowerYellowRsvpBottomLeft} alt="flower-yellow-bottom-left" className="w-full h-auto" loading="lazy" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`absolute top-[58%] left-1/2 z-20 flex h-auto w-[65%] -translate-x-1/2 -translate-y-1/2 flex-col items-center ${isPreviewMode ? 'pointer-events-none select-none opacity-90' : ''
                }`}
            >
              {isSubmitted ? (
                <div className="flex w-full flex-col justify-center items-center text-center space-y-4 text-black select-none">
                  <div className="space-y-1">
                    <p className="text-[10px] sm:text-xs font-semibold text-[#6B3D49]">Thank you for your response,</p>
                    <p className="text-xs sm:text-sm font-bold text-[#6B3D49]">{name}</p>
                  </div>

                  <div className="bg-[#F0EFEF] p-3 rounded-lg w-full text-[10px] sm:text-xs space-y-2 border border-[#E0DEDE] leading-relaxed">
                    <p className="text-[#6B3D49]">
                      Attendance Status: <br />
                      <span className="font-bold text-[#D08E61]">
                        {attendance === 'akad' && 'Akad'}
                        {attendance === 'resepsi' && 'Reception'}
                        {attendance === 'akad-dan-resepsi' && 'Akad & Reception'}
                        {attendance === 'cannot-attend' && 'Sorry, I cannot attend'}
                      </span>
                    </p>
                    {attendance !== 'cannot-attend' && (
                      <p className="text-[#6B3D49]">
                        Additional Guests: <span className="font-bold">{guestCount} guests</span>
                      </p>
                    )}
                  </div>

                  <Button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#D08E61] border-[5px] border-[#C47C9E] rounded-full px-6 py-2 h-auto shadow-md flex items-center justify-center font-doodle-head text-white text-xs sm:text-sm uppercase tracking-wide whitespace-nowrap leading-none select-none transition-all hover:opacity-90 w-max"
                  >
                    Edit RSVP
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex w-full flex-col justify-center space-y-1.5"
                >
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs text-[#6B3D49]">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isPreviewMode}
                      className="h-8 rounded-md border-none bg-[#F0EFEF] focus-visible:ring-[#6B3D49] focus-visible:ring-offset-0 text-black disabled:opacity-80"
                      tabIndex={isInvitationOpen && !isPreviewMode ? 0 : -1}
                      required
                    />
                  </div>

                  {/* Radio Buttons */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-[#6B3D49]">Confirmation</Label>
                    <RadioGroup
                      value={attendance}
                      onValueChange={setAttendance}
                      disabled={isPreviewMode}
                      className="flex flex-col space-y-1 text-black"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="akad"
                          id="akad"
                          className="data-[state=checked]:bg-[#CF935F]"
                          tabIndex={isInvitationOpen ? 0 : -1}
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
                          tabIndex={isInvitationOpen ? 0 : -1}
                        />
                        <Label htmlFor="resepsi" className="text-xs text-[#6B3D49]">
                          Reception
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="akad-dan-resepsi"
                          id="akad-dan-resepsi"
                          className="data-[state=checked]:bg-[#CF935F]"
                          tabIndex={isInvitationOpen ? 0 : -1}
                        />
                        <Label
                          htmlFor="akad-dan-resepsi"
                          className="text-xs text-[#6B3D49]"
                        >
                          Akad & Reception
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="cannot-attend"
                          id="cannot-attend"
                          className="data-[state=checked]:bg-[#CF935F]"
                          tabIndex={isInvitationOpen ? 0 : -1}
                        />
                        <Label
                          htmlFor="cannot-attend"
                          className="text-xs text-[#6B3D49]"
                        >
                          Sorry, I cannot attend
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Guest Counter */}
                  {attendance !== 'cannot-attend' && maxPlusOne > 0 && (
                    <>
                      <div className="mt-2 flex flex-col items-center space-y-1">
                        <Label className="text-center text-xs text-[#6B3D49]">
                          Additional Guests
                        </Label>
                        <div className="flex items-center">
                          <Button
                            type="button"
                            onClick={decrementGuests}
                            disabled={isPreviewMode}
                            className="h-5 w-5 rounded-full bg-white p-0 text-xs text-[#DD73A1]"
                            aria-label="Reduce guest count"
                            tabIndex={isInvitationOpen && !isPreviewMode ? 0 : -1}
                          >
                            -
                          </Button>
                          <div className="mx-2 flex-1">
                            <Input
                              type="number"
                              value={guestCount ?? ''}
                              onChange={(e) => {
                                const value = e.target.value
                                const parsed = parseInt(value, 10) || 0
                                if (parsed > maxPlusOne) {
                                  setGuestCount(maxPlusOne.toString())
                                } else if (parsed < 0) {
                                  setGuestCount('0')
                                } else {
                                  setGuestCount(parsed.toString())
                                }
                              }}
                              disabled={isPreviewMode}
                              className="h-5 w-[100px] [appearance:textfield] rounded-full border-none bg-white text-center text-xs text-[#6B3D49] focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                              max={maxPlusOne}
                              min={0}
                              inputMode="numeric"
                              tabIndex={isInvitationOpen && !isPreviewMode ? 0 : -1}
                            />
                          </div>
                          <Button
                            type="button"
                            onClick={incrementGuests}
                            disabled={isPreviewMode}
                            className="h-5 w-5 rounded-full bg-white p-0 text-xs text-[#DD73A1]"
                            aria-label="Increase guest count"
                            tabIndex={isInvitationOpen && !isPreviewMode ? 0 : -1}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-[#6B3D49]/80 font-medium text-center">
                        Maximum of {maxPlusOne} additional guests
                      </p>
                    </>
                  )}


                  {/* Submit Button styled as Pill Badge */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || isPreviewMode}
                    className="mx-auto mt-5 bg-[#D08E61] border-[5px] border-[#C47C9E] rounded-full px-6 py-2 h-auto shadow-md flex items-center justify-center font-doodle-head text-white text-xs sm:text-sm uppercase tracking-wide whitespace-nowrap leading-none select-none transition-all hover:opacity-90 w-max disabled:opacity-50 disabled:cursor-not-allowed"
                    tabIndex={isInvitationOpen && !isPreviewMode ? 0 : -1}
                  >
                    {isSubmitting ? 'Sending...' : 'SUBMIT'}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Frame Background image */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <Image
                src={FrameSectionKonfirmasi}
                alt="section-konfirmasi-frame"
                sizes="100vw"
                className="mx-auto h-auto"
                loading="lazy"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SectionKonfirmasi
