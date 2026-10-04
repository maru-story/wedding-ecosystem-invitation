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
    if (!guestId) return

    const socket = io(WS_BASE_URL, {
      auth: {
        type: 'guest',
        guestId: guestId,
      },
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    socket.on('connect', () => {
      console.log('🔌 WebSocket connected for guest check-in tracking (ID:', guestId, ')')
    })

    socket.on('connect_error', (err) => {
      console.warn('⚠️ WebSocket connection issue:', err.message)
    })

    interface GuestCheckedInPayload {
      guest_id: string
      guest_name: string
      scan_count: number
      checked_in_at: string
    }

    socket.on('guest_checked_in', (payload: GuestCheckedInPayload) => {
      console.log('🎉 guest_checked_in event received:', payload)
      if (payload.guest_id === guestId) {
        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate([100, 50, 100])
          } catch {}
        }
        setCheckInData({
          guest_name: payload.guest_name,
          scan_count: payload.scan_count,
          checked_in_at: payload.checked_in_at,
        })
        setIsQrOpen(false)
        setTimeout(() => {
          setIsWelcomeOpen(true)
        }, 200)
        socket.disconnect() // Disconnect after check-in to free server resources
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [guestId, setIsQrOpen])

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
        <DrawerContent className="mx-auto max-w-md p-6 bg-[#FAF8F5] border-t border-amber-900/10">
          <div className="mx-auto w-12 h-1.5 rounded-full bg-gray-300 mb-6" />
          
          <div className="relative text-center px-2">
            {/* Animated Minimal Checkmark Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 12, stiffness: 120 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 mb-4 shadow-xs"
            >
              <CheckCircle2 className="h-9 w-9" />
            </motion.div>

            <DrawerTitle className="font-little-hands text-3xl sm:text-4xl text-[#603C24] leading-tight font-normal">
              Check-in Berhasil!
            </DrawerTitle>

            <DrawerDescription className="mt-1 text-sm text-gray-500 font-normal">
              Kehadiran Anda telah berhasil dicatat oleh penerima tamu
            </DrawerDescription>

            <div className="my-6 rounded-2xl border border-stone-200/70 bg-white/80 backdrop-blur-xs p-5 text-center shadow-xs">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">
                Selamat Datang
              </p>
              <h4 className="mt-1.5 font-bold text-gray-900 text-xl sm:text-2xl">
                {checkInData?.guest_name || guestName}
              </h4>

              {event && (
                <p className="mt-1.5 text-sm sm:text-base text-[#6B3D49] font-medium">
                  di Pernikahan {event.bride_name} & {event.groom_name}
                </p>
              )}

              <div className="mt-4 border-t border-stone-100 pt-3.5 flex justify-around text-sm text-gray-700">
                <div className="flex-1 text-center">
                  <span className="block text-gray-400 text-xs uppercase tracking-wider mb-0.5">Waktu</span>
                  <span className="font-semibold text-gray-800">
                    {checkInData?.checked_in_at
                      ? new Date(checkInData.checked_in_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
                      : new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'}
                  </span>
                </div>
                <div className="w-[1px] bg-stone-200" />
                <div className="flex-1 text-center">
                  <span className="block text-gray-400 text-xs uppercase tracking-wider mb-0.5">Status</span>
                  <span className="text-emerald-700 font-semibold">Tiba di Lokasi</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-6 font-normal">
              Silakan memasuki ruang acara dan menikmati seluruh rangkaian acara pernikahan.
            </p>

            <DrawerFooter className="p-0">
              <Button
                variant="default"
                className="w-full bg-[#603C24] hover:bg-[#4E301C] text-white rounded-full py-3.5 font-medium text-base transition-colors shadow-md cursor-pointer"
                onClick={() => {
                  setIsWelcomeOpen(false)
                  setIsQrOpen(false)
                }}
              >
                Masuk ke Undangan
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
