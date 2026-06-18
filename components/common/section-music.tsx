/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useInvitation } from '@/components/context/provider'
import { Button } from '@/components/ui/button'
import { SectionData } from '@/lib/api'
import { motion } from 'framer-motion'
import { PauseIcon, PlayIcon } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface SectionMusicProps {
  section?: SectionData
}

export default function FloatingAudioButton({ section }: SectionMusicProps) {
  const content = section?.content as {
    audio_url?: string
    autoplay?: boolean
    title?: string
  } | undefined

  const [liveContent, setLiveContent] = useState(content)

  useEffect(() => {
    setLiveContent(content)
  }, [content])

  // Listen for CMS live preview updates
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (
        e.data?.type === 'CMS_PREVIEW_UPDATE' &&
        e.data?.section_type === 'music'
      ) {
        setLiveContent(e.data.content)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const audioUrl = liveContent?.audio_url || '/audio/lagu-undangan.mp3'
  const autoplay = liveContent?.autoplay ?? true

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const { isInvitationOpen } = useInvitation()

  // Initialize or update audio source
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    const audio = new Audio(audioUrl)
    audio.addEventListener('ended', () => setIsPlaying(false))
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.removeEventListener('ended', () => setIsPlaying(false))
      audioRef.current = null
    }
  }, [audioUrl])

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }, [isPlaying])

  // Autoplay when invitation is opened (if autoplay is enabled)
  useEffect(() => {
    if (isInvitationOpen && autoplay) {
      togglePlay()
    }
  }, [isInvitationOpen])

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={
        isInvitationOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }
      }
      transition={{ duration: 0.5 }}
      className="fixed right-4 bottom-4 z-50"
    >
      <Button
        onClick={togglePlay}
        variant="default"
        className="rounded-full p-4 shadow-lg"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </Button>
    </motion.div>
  )
}
