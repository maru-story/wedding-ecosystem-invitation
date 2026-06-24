'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to the console with details
    console.error('Captured Client Error Boundary:', error)
    
    // Send the error details to our logging endpoint
    const reportError = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
        await fetch(`${API_BASE_URL}/invitations/logs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: error?.message || 'Unknown error',
            stack: error?.stack || '',
            digest: error?.digest || '',
            url: typeof window !== 'undefined' ? window.location?.href : '',
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (e) {
        console.warn('Failed to send error report to backend:', e)
      }
    }

    reportError()
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCF9] p-6 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Terjadi Kesalahan</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Maaf, halaman undangan gagal dimuat. Silakan muat ulang halaman atau coba beberapa saat lagi.
        </p>
        <button
          onClick={() => reset()}
          className="cursor-pointer px-6 py-2 bg-[#8D4F5D] text-white rounded-lg hover:opacity-90 transition-colors text-sm"
        >
          Muat Ulang
        </button>
      </div>
    </div>
  )
}
