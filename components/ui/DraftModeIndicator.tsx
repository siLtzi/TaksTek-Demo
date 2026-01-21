import { draftMode } from 'next/headers'
import Link from 'next/link'

export async function DraftModeIndicator() {
  const draft = await draftMode()
  
  if (!draft.isEnabled) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-3 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      <span>Draft Mode</span>
      <Link 
        href="/api/draft-mode/disable" 
        className="ml-2 rounded bg-white/20 px-2 py-0.5 hover:bg-white/30"
        prefetch={false}
      >
        Exit
      </Link>
    </div>
  )
}
