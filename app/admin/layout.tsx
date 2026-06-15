import { Toaster } from '@/components/ui/sonner'
import '../globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <body>
      <Toaster richColors />
      {children}
    </body>
  )
}
