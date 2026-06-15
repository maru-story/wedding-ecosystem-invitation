/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useInvitation } from '@/components/context/provider'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { PauseIcon, PlayIcon } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function FloatingAudioButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const { isInvitationOpen } = useInvitation()

  useEffect(() => {
    audioRef.current = new Audio('/audio/lagu-undangan.mp3')
    audioRef.current.addEventListener('ended', () => setIsPlaying(false))
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

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

  useEffect(() => {
    if (isInvitationOpen) {
      togglePlay()
    }
  }, [isInvitationOpen])

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={isInvitationOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
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
