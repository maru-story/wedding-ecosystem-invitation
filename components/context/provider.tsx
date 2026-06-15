'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface InvitationContextType {
  isInvitationOpen: boolean
  openInvitation: () => void

  progress: number
  setProgress: React.Dispatch<React.SetStateAction<number>>

  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const InvitationContext = createContext<InvitationContextType | undefined>(
  undefined
)

export const InvitationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)

  // Custom smooth scroll function with configurable duration and easing
  const smoothScrollTo = (element: HTMLElement, duration: number = 1000) => {
    const start = window.scrollY || window.pageYOffset
    const targetPosition = element.getBoundingClientRect().top + start
    const startTime = performance.now()

    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime

      // Easing function: easeInOutCubic
      const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
      }

      if (elapsedTime < duration) {
        const progress = elapsedTime / duration
        const easedProgress = easeInOutCubic(progress)
        const distance = targetPosition - start
        const currentPosition = start + distance * easedProgress

        window.scrollTo(0, currentPosition)
        requestAnimationFrame(animateScroll)
      } else {
        window.scrollTo(0, targetPosition)
      }
    }

    requestAnimationFrame(animateScroll)
  }

  const openInvitation = () => {
    setIsInvitationOpen(true)

    // Enable scrolling when invitation is opened
    setTimeout(() => {
      document.body.style.overflow = 'auto'
    }, 3000)

    // Auto-scroll to section-pengantin after 3.5 seconds with custom animation
    setTimeout(() => {
      const sectionPengantin = document.getElementById('section-pengantin')
      if (sectionPengantin) {
        // Use custom smooth scroll with 1500ms duration
        smoothScrollTo(sectionPengantin, 1500)
      }
    }, 3500)
  }

  // Force scroll to top on page load/reload and disable scrolling initially
  useEffect(() => {
    // Force scroll to top
    window.onbeforeunload = function () {
      window.scrollTo(0, 0)
    }

    // Scroll to top immediately on load/reload
    window.scrollTo(0, 0)

    // Disable browser's scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    // Disable scrolling initially
    if (!window.location.pathname.includes('/admin')) {
      document.body.style.overflow = 'hidden'
    }

    // Enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'auto'

      // Clean up event listener
      window.onbeforeunload = null

      // Restore default scroll behavior
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto'
      }
    }
  }, [])

  return (
    <InvitationContext.Provider
      value={{
        isInvitationOpen,
        openInvitation,
        progress,
        setProgress,
        loading,
        setLoading,
      }}
    >
      {children}
    </InvitationContext.Provider>
  )
}

export const useInvitation = () => {
  const context = useContext(InvitationContext)
  if (context === undefined) {
    throw new Error('useInvitation must be used within an InvitationProvider')
  }
  return context
}
