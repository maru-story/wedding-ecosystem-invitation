'use client'

import { useInvitation } from '@/components/context/provider'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { WS_BASE_URL } from '@/lib/api'
import { motion } from 'framer-motion'
import { CheckCircle2, DownloadIcon, QrCodeIcon } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import QRCode from 'react-qr-code'
import { io } from 'socket.io-client'

interface FloatingQrProps {
  guestName: string
  qrPayload?: string | null
  guestId?: string
  event?: {
    bride_name: string
    groom_name: string
  } | null
}

export default function FloatingQr({ guestName, qrPayload, guestId, event }: FloatingQrProps) {
  const { isInvitationOpen, isQrOpen, setIsQrOpen } = useInvitation()
  const qrRef = useRef<HTMLDivElement>(null)
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false)
  const [checkInData, setCheckInData] = useState<{
    guest_name: string
    scan_count: number
    checked_in_at: string
  } | null>(null)

  useEffect(() => {
    if (!isQrOpen || !guestId) return

    const socket = io(WS_BASE_URL, {
      auth: {
        type: 'guest',
        guestId: guestId,
      },
      transports: ['websocket'],
      reconnectionAttempts: 3,
    })

    socket.on('connect', () => {
      console.log('🔌 WebSocket connected for guest check-in tracking')
    })

    interface GuestCheckedInPayload {
      guest_id: string
      guest_name: string
      scan_count: number
      checked_in_at: string
    }

    socket.on('guest_checked_in', (payload: GuestCheckedInPayload) => {
      if (payload.guest_id === guestId) {
        setCheckInData({
          guest_name: payload.guest_name,
          scan_count: payload.scan_count,
          checked_in_at: payload.checked_in_at,
        })
        setIsWelcomeOpen(true)
        setIsQrOpen(false)
        socket.disconnect() // Disconnect immediately to free server resources
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [isQrOpen, guestId])

  const handleDownload = useCallback(() => {
    if (!qrRef.current) return

    const svg = qrRef.current.querySelector('svg')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = 600
      canvas.height = 600

      if (ctx) {
        // White background
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw QR with padding
        const padding = 40
        ctx.drawImage(
          img,
          padding,
          padding,
          canvas.width - padding * 2,
          canvas.height - padding * 2
        )

        const link = document.createElement('a')
        link.download = `QR-${guestName.replace(/\s+/g, '-')}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
      }
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }, [guestName])

  if (!qrPayload) return null

  return (
    <>
      <Drawer open={isQrOpen} onOpenChange={setIsQrOpen}>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={
            isInvitationOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
          }
          transition={{ duration: 0.5 }}
          className="fixed bottom-4 left-4 z-50"
        >
          <DrawerTrigger asChild>
            <Button
              variant="default"
              className="rounded-full p-4 shadow-lg"
            >
              <QrCodeIcon />
            </Button>
          </DrawerTrigger>
        </motion.div>

        <DrawerContent className="mx-auto max-w-md">
          <DrawerHeader className="text-center">
            <DrawerTitle className="font-little-hands text-2xl text-[#6B3D49]">
              Attendance QR
            </DrawerTitle>
            <DrawerDescription>
              Show this QR code at the venue for check-in
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col items-center gap-4 px-6 pb-4">
            <p className="text-sm font-medium text-[#6B3D49]">{guestName}</p>
            <div
              ref={qrRef}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <QRCode
                value={qrPayload}
                size={240}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                viewBox="0 0 240 240"
              />
            </div>
            <p className="text-center text-xs text-gray-500 max-w-[280px]">
              💡 Tingkatkan kecerahan layar HP Anda untuk mempermudah pemindaian saat check-in.
            </p>
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleDownload}
            >
              <DownloadIcon className="h-4 w-4" />
              Download QR
            </Button>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer open={isWelcomeOpen} onOpenChange={setIsWelcomeOpen}>
        <DrawerContent className="mx-auto max-w-md p-6 bg-[#FAF8F5] border-amber-500/20 font-doodle-head">
          <div className="mx-auto w-12 h-1.5 rounded-full bg-gray-300 mb-6" />
          
          <div className="relative text-center">
            {/* Confetti / Particle Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-t-[10px]">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: ['#E0A899', '#B6A29F', '#C6A477', '#8A6D71'][i % 4],
                    top: '50%',
                    left: '50%',
                  }}
                  animate={{
                    x: [0, (Math.random() - 0.5) * 250],
                    y: [0, (Math.random() - 0.5) * 250 - 50],
                    scale: [1, 0],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    ease: 'easeOut',
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
              ))}
            </div>

            {/* Animated Checkmark */}
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 10, stiffness: 100 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4"
            >
              <CheckCircle2 className="h-10 w-10" />
            </motion.div>

            <DrawerTitle className="text-2xl font-bold text-gray-800 font-doodle-head">
              Check-in Berhasil!
            </DrawerTitle>

            <DrawerDescription className="mt-1 text-xs text-gray-500 font-doodle-head">
              Pendaftaran kehadiran Anda telah tercatat
            </DrawerDescription>

            <div className="my-6 rounded-2xl border border-gray-100 bg-[#F5F2EC] p-4 text-center">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-doodle-head">
                Selamat Datang
              </p>
              <h4 className="mt-1 font-bold text-gray-800 text-lg font-doodle-head font-normal">
                {checkInData?.guest_name || guestName}
              </h4>

              {event && (
                <p className="mt-1 text-xs text-[#6B3D49] font-medium font-doodle-head">
                  di Pernikahan {event.bride_name} & {event.groom_name}
                </p>
              )}

              <div className="mt-4 border-t border-gray-200/50 pt-3 flex justify-around text-xs text-gray-600 font-medium">
                <div>
                  <span className="block text-gray-400 text-[10px] uppercase font-doodle-head">Waktu</span>
                  <span className="font-doodle-head">
                    {checkInData?.checked_in_at
                      ? new Date(checkInData.checked_in_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
                      : new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'}
                  </span>
                </div>
                <div className="border-l border-gray-200/50" />
                <div>
                  <span className="block text-gray-400 text-[10px] uppercase font-doodle-head">Status</span>
                  <span className="text-green-600 font-semibold font-doodle-head">Tiba di Venue</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed mb-6 font-doodle-head">
              Silakan memasuki ruang acara pernikahan dan mengikuti petunjuk dari panitia.
            </p>

            <DrawerFooter className="p-0">
              <Button
                variant="default"
                className="w-full bg-[#B6A29F] hover:bg-[#A38E8B] text-white rounded-full py-2.5 font-semibold text-sm transition-colors shadow-md cursor-pointer font-doodle-head"
                onClick={() => {
                  setIsWelcomeOpen(false)
                  setIsQrOpen(false) // Close the QR code drawer as well
                }}
              >
                Masuk ke Acara
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
