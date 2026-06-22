'use client'

import { useEffect, useState } from 'react'

const OrientationLock = () => {
  const [showMessage, setShowMessage] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const handleOrientationChange = () => {
      const isLandscape = screen.orientation.angle === 90
      setShowMessage(isLandscape)
      if (!isLandscape) {
        setIsDismissed(false)
      }
    }

    screen.orientation.addEventListener('change', handleOrientationChange)
    handleOrientationChange() // Check on initial load

    return () => {
      screen.orientation.removeEventListener('change', handleOrientationChange)
    }
  }, [])

  if (!showMessage || isDismissed) {
    return null
  }

  return (
    <div
      id="rotation-message"
      className="fixed inset-0 z-999 flex items-center justify-center bg-[#FDFBF7]/95 backdrop-blur-md"
    >
      <div className="max-w-xs p-6 text-center bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center gap-4">
        <div className="font-little-hands text-2xl text-[#6B3D49]">
          Portrait Mode is Recommended
        </div>
        <p className="font-sans text-[11px] text-gray-500 leading-relaxed">
          This invitation is designed to be viewed in portrait mode. You can continue, but the layout might not look optimal.
        </p>
        <button
          onClick={() => setIsDismissed(true)}
          className="cursor-pointer rounded-[10px] bg-[#275E78] px-6 py-2 text-xs font-minecraft text-[#C2A198] hover:opacity-90 transition-opacity w-full uppercase"
        >
          Continue Anyway
        </button>
      </div>
    </div>
  )
}

export default OrientationLock
