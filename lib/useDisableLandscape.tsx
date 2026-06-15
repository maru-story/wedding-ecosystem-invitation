'use client'

import { useEffect, useState } from 'react'

const OrientationLock = () => {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const handleOrientationChange = () => {
      setShowMessage(screen.orientation.angle === 90)
    }

    screen.orientation.addEventListener('change', handleOrientationChange)
    handleOrientationChange() // Check on initial load

    return () => {
      screen.orientation.removeEventListener('change', handleOrientationChange)
    }
  }, [])

  if (!showMessage) {
    return null
  }

  return (
    <div
      id="rotation-message"
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="p-5 text-center">
        <div className="text-xl font-bold">Please rotate your device</div>
        <p>This application works best in portrait mode</p>
      </div>
    </div>
  )
}

export default OrientationLock
