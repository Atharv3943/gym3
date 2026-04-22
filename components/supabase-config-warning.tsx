"use client"

import { AlertTriangle } from "lucide-react"

export function SupabaseConfigWarning() {
  const isPlaceholder = 
    process.env.NEXT_PUBLIC_SUPABASE_URL === "yoursupabaseurl" || 
    !process.env.NEXT_PUBLIC_SUPABASE_URL

  if (!isPlaceholder) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999] md:left-auto md:w-96">
      <div className="flex flex-col gap-3 rounded-xl border border-[#dc2626]/20 bg-[#dc2626]/10 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-[#dc2626] p-1.5 text-white">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <h3 className="font-bold text-[#dc2626]">Supabase Not Configured</h3>
        </div>
        <p className="text-xs leading-relaxed text-[#dc2626]/80">
          The application is still using placeholder environment variables. 
          Please update your <strong>.env.local</strong> file and restart the server to enable authentication and data.
        </p>
        <div className="rounded bg-black/5 p-2 font-mono text-[10px] text-[#dc2626]/60">
          NEXT_PUBLIC_SUPABASE_URL="yoursupabaseurl"
        </div>
      </div>
    </div>
  )
}
