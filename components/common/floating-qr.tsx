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
import { motion } from 'framer-motion'
import { DownloadIcon, QrCodeIcon } from 'lucide-react'
import { useCallback, useRef } from 'react'
import QRCode from 'react-qr-code'

interface FloatingQrProps {
  guestName: string
  qrPayload?: string | null
}

export default function FloatingQr({ guestName, qrPayload }: FloatingQrProps) {
  const { isInvitationOpen, isQrOpen, setIsQrOpen } = useInvitation()
  const qrRef = useRef<HTMLDivElement>(null)

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
            className="rounded-lg border border-gray-200 bg-white p-4"
          >
            <QRCode
              value={qrPayload}
              size={200}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              viewBox="0 0 200 200"
            />
          </div>
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
  )
}
