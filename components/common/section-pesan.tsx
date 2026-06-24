'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import BgFrame from '../assets/images/section-pesan/bg-pesan-section.svg'

import { useInvitation } from '@/components/context/provider'
// Import avatar SVGs
import Ciyo from '@/components/assets/images/section-pesan/ciyo.svg'
import Gumiho from '@/components/assets/images/section-pesan/gumiho.svg'
import Kuma from '@/components/assets/images/section-pesan/kuma.svg'
import Kyo from '@/components/assets/images/section-pesan/kyo.svg'
import Spike from '@/components/assets/images/section-pesan/spike.svg'
import { AdaptedGuest, fetchMessages, MessageData, SectionData, submitMessage } from '@/lib/api'
import { parseJakartaDate } from '@/lib/date'

interface ClientMessage {
  id: string
  name: string
  message: string
  createdAt: string
  avatar: unknown
}

interface SectionPesanProps {
  guest: AdaptedGuest
  eventId: string
  section?: SectionData
}
const avatars = [Ciyo, Gumiho, Kuma, Kyo, Spike]

const SectionPesan: React.FC<SectionPesanProps> = ({ guest, eventId, section }) => {
  const content = section?.content as {
    avatar_set?: string // 'cats' | 'none' (extensible later)
    mock_messages?: Array<{ name: string; message: string }>
  } | undefined

  const [liveContent, setLiveContent] = useState(content)

  useEffect(() => {
    setLiveContent(content)
  }, [content])

  // Listen for CMS live preview updates
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'CMS_PREVIEW_UPDATE' && e.data?.section_type === 'messages') {
        setLiveContent(e.data.content)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const avatarSet = liveContent?.avatar_set || 'cats'
  const showAvatars = avatarSet !== 'none'

  // Convert mock messages from CMS preview into ClientMessage format
  const mockMessages: ClientMessage[] = (liveContent?.mock_messages || []).map(
    (mock, index) => ({
      id: `mock-${index}`,
      name: mock.name,
      message: mock.message,
      createdAt: new Date().toISOString(),
      avatar: avatars[index % avatars.length],
    })
  )

  const { isInvitationOpen } = useInvitation()
  const [name, setName] = useState(guest?.nama || '')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ClientMessage[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Use mock messages for preview if available, otherwise use real messages
  const displayMessages = mockMessages.length > 0 ? mockMessages : messages

  // Get random avatar
  const getRandomAvatar = () => {
    return avatars[Math.floor(Math.random() * avatars.length)]
  }

  const fetchMessagesData = useCallback(async () => {
    try {
      const result = await fetchMessages(eventId)
      if (result && result.messages) {
        const messagesWithAvatars = result.messages.map((msg: MessageData) => ({
          id: msg.id,
          name: msg.sender_name,
          message: msg.message_text,
          createdAt: msg.created_at,
          avatar: avatars[Math.floor(Math.random() * avatars.length)],
        }))
        setMessages(messagesWithAvatars)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }, [eventId])

  // Fetch messages on component mount
  useEffect(() => {
    if (eventId) {
      fetchMessagesData()
    }
  }, [eventId, fetchMessagesData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!guest) {
      toast.error('Guest information not found')
      return
    }

    if (!message.trim()) {
      toast.error('Please write a message')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await submitMessage({
        event_id: eventId,
        guest_id: guest.id,
        sender_name: name.trim() || guest.nama,
        message_text: message.trim(),
      })

      const newMessage = {
        id: response.id,
        name: response.sender_name,
        message: response.message_text,
        createdAt: response.created_at,
        avatar: getRandomAvatar(),
      }

      // Add new message to the list
      setMessages((prev) => [newMessage, ...prev])

      // Reset form
      setMessage('')
      setName('')
      toast.success('Message successfully sent!')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
      console.error('Error submitting message:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative w-full overflow-hidden" id="section-pesan">
      {/* Container that establishes size */}
      <div className="relative aspect-9/16 w-full">
        {/* Background elements */}
        <div className="absolute z-0 h-auto w-full">
          <Image
            src={BgFrame}
            alt="section-pesan-background-frame"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-evenly gap-3 py-3">
          {/* Input Message Section */}
          <div className="relative w-[80%] min-w-[260px]">
            {/* Amplop background image */}
            <Image
              src={`${process.env.NEXT_PUBLIC_URL_IMAGE}section-pesan-amplop.svg`}
              alt="section-pesan-background-frame"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-full"
              loading="lazy"
            />

            {/* Form Container - positioned over the amplop image */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false }}
              className="absolute top-[45px] z-10 h-fit w-full px-6.5 max-[400px]:top-[40px]"
            >
              <form onSubmit={handleSubmit} className="space-y-2">
                {/* Name Input */}
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name..."
                  className="h-9 w-[65%] rounded-lg border border-[#558384] bg-[#E9CBA6]/50 text-sm focus-within:outline-none  focus:ring-0 focus:outline-none focus-visible:outline-0 max-[400px]:h-7 max-[400px]:text-[10px]"
                  tabIndex={isInvitationOpen ? 0 : -1}
                  required
                />
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your wishes & prayers for us :)"
                  className="h-[100px] resize-none rounded-lg border border-[#558384] bg-[#E9CBA6]/50 text-sm max-[400px]:h-[20vw] max-[400px]:text-[10px]"
                  tabIndex={isInvitationOpen ? 0 : -1}
                  maxLength={500}
                  required
                />
                {/* Submit Button & Character Count Indicator */}
                <div className="flex justify-between pt-1">
                  <span className={`text-lg ${message.length >= 500 ? 'text-[#BD3F40] font-semibold' : 'text-[#558384]'
                    }`}>
                    {message.length}/500
                  </span>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex h-fit w-1/2 justify-center items-center rounded-lg border border-[#E6D1B9] bg-[#C8B6A1] py-1 text-sm font-medium text-white uppercase transition-all duration-300 disabled:opacity-50 max-[400px]:h-[25px] max-[400px]:text-[10px]"
                    tabIndex={isInvitationOpen ? 0 : -1}
                  >
                    {isSubmitting ? 'Sending...' : 'Send'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* The message section */}
          <div className="relative w-[80%] min-w-[260px] flex-1">
            {/* Message background image */}
            <Image
              src={`${process.env.NEXT_PUBLIC_URL_IMAGE}section-pesan-message.svg`}
              alt="section-pesan-message"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-full"
              loading="lazy"
            />

            {/* Messages Container - positioned over the message image */}
            <div
              className={`scrollbar-custom scrollbar-thin scrollbar-thumb-[#CF935F]/30 scrollbar-thumb-rounded scrollbar-track-transparent absolute top-25 z-10 px-2 py-3 max-[400px]:top-20 ${displayMessages.length === 0
                ? 'flex h-full items-center justify-center'
                : 'h-full'
                } left-[49%] max-h-[330px] w-[280px] -translate-x-1/2 overflow-x-hidden overflow-y-auto rounded-lg border border-[#DCA394] bg-[#E9E2D8] max-[450px]:h-[71vw] max-[450px]:w-[61vw] max-[400px]:h-[75vw]`}
            >
              <AnimatePresence>
                {displayMessages.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-8 text-center"
                  >
                    <p className="text-xs text-[#606161]/60">
                      No wishes yet. Be the first!
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-2">
                    {displayMessages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{
                          opacity: { duration: 0.4 },
                          y: { duration: 0.4 },
                          layout: { type: 'spring', stiffness: 300, damping: 30 },
                        }}
                        className="rounded-lg bg-white/60 p-3 shadow-sm backdrop-blur-sm"
                      >
                        <div className="flex items-start gap-2">
                          {/* Avatar */}
                          {showAvatars && (
                            <div className="shrink-0">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#CF935F]/10 p-1">
                                <Image
                                  src={msg.avatar ?? Ciyo}
                                  alt={`${msg.name} avatar`}
                                  width={24}
                                  height={24}
                                  className="h-full w-full object-contain"
                                />
                              </div>
                            </div>
                          )}

                          {/* Message Content */}
                          <div className="flex-1">
                            <div className="mb-1 flex items-baseline justify-between">
                              <h4 className="text-xs font-medium text-[#BD3F40]">
                                {msg.name}
                              </h4>
                              <span className="text-[9px] text-black">
                                {parseJakartaDate(msg.createdAt).format('hh:mm A')}
                              </span>
                            </div>
                            <p className="text-xs leading-relaxed text-black font-doodle-head">
                              {msg.message}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionPesan
