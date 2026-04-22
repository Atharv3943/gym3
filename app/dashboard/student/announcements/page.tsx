"use client"

import { useAuth } from "@/hooks/use-auth"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { Megaphone, Calendar } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Announcement {
  id: string
  title: string
  description: string
  created_at: string
  important?: boolean
}

export default function AnnouncementsPage() {
  const { user, loading, logout } = useAuth("student")
  const [announcements, setAnnouncements] = useState<Announcement[]>([])

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const { data, error } = await supabase
          .from('announcements')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) throw error
        setAnnouncements(data || [])
      } catch (err) {
        console.log("Failed to fetch announcements", err)
      }
    }
    fetchAnnouncements()
  }, [])

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <DashboardShell userName={user.name} onLogout={logout}>
      <div className="mb-6">
        <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-tight text-foreground">
          Announcements
        </h2>
        <p className="text-muted-foreground">Stay updated with gym news and events</p>
      </div>

      <div className="flex flex-col gap-4">
        {announcements.map((a) => (
          <Card key={a.id} className={`border-border/50 shadow-sm ${a.important ? "border-l-4 border-l-[#dc2626]" : ""}`}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${a.important ? "bg-[#dc2626]/10" : "bg-primary/10"}`}>
                    <Megaphone className={`h-5 w-5 ${a.important ? "text-[#dc2626]" : "text-primary"}`} />
                  </div>
                  <div>
                    <CardTitle className="text-base text-foreground">{a.title}</CardTitle>
                    <div className="mt-1 flex items-center gap-1.5">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {new Date(a.created_at).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                {a.important && (
                  <Badge className="shrink-0 bg-[#dc2626] text-[#ffffff]">Important</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{a.description}</p>
            </CardContent>
          </Card>
        ))}

        {announcements.length === 0 && (
          <Card className="border-border/50 shadow-sm">
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <Megaphone className="h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No announcements yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardShell>
  )
}
