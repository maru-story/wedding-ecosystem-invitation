'use client'
/**
 * Global error boundary - catches errors in the root layout.
 * Must include <html> and <body> tags since it replaces the root layout.
 */
export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex min-h-screen items-center justify-center bg-[#FDFCF9] px-4">
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">
              System Error
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              The invitation cannot be displayed. Please reload the page.
            </p>
            <button
              onClick={reset}
              className="mt-6 rounded-full bg-[#5F7161] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Reload
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
