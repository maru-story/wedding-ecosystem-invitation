import { InvitationProvider } from '@/components/context/provider'
import { Toaster } from '@/components/ui/sonner'
import OrientationLock from '@/components/common/orientation-lock'
import '../globals.css'

export default function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto max-w-md shadow-lg min-h-screen">
      <InvitationProvider>
        <Toaster richColors />
        <OrientationLock />
        {children}
      </InvitationProvider>
    </div>
  )
}
