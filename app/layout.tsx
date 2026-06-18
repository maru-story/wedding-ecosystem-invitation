import localFont from 'next/font/local'
import './globals.css'

const minecraft = localFont({
  src: '../public/fonts/Minecraft.ttf',
  variable: '--font-minecraft',
  display: 'swap',
})

const doodleHead = localFont({
  src: '../public/fonts/Doodle_Head.ttf',
  variable: '--font-doodle-head',
  display: 'swap',
})
const littleKidsHandwriting = localFont({
  src: '../public/fonts/LittleKidsHandwriting.otf',
  variable: '--font-little-hands',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${minecraft.variable} ${doodleHead.variable} ${littleKidsHandwriting.variable}`}
      suppressHydrationWarning
    >
      <body>
        {children}
      </body>
    </html>
  )
}
