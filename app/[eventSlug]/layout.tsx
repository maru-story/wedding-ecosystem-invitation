import { InvitationProvider } from '@/components/context/provider'
import { Toaster } from '@/components/ui/sonner'
import OrientationLock from '@/lib/useDisableLandscape'
import '../globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <body className={`mx-auto max-w-md shadow-lg`}>
      <InvitationProvider>
        <Toaster richColors />
        <OrientationLock />
        {children}
      </InvitationProvider>
    </body>
  )
}
