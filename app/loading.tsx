/**
 * Root loading state. Shown as Suspense fallback during page transitions.
 */
export default function InvitationLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FDFCF9]">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#5F7161] border-t-transparent" />
        <p className="mt-4 text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  )
}
