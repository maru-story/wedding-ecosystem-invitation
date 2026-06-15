'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          title: '!text-white !font-light',
          icon: '!text-white',
        },
      }}
      style={
        {
          // Normal toast background
          '--normal-bg': '#ffffff', // Custom background color
          '--normal-text': '#fffff',
          '--normal-border': '0',

          // Different toast types
          '--success-bg': '#10b981', // Success toast background
          '--error-bg': '#ef4444', // Error toast background
          '--warning-bg': '#f59e0b', // Warning toast background
          '--loading-bg': '#6b7280', // Loading toast background
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
