"use client"

import { useAuth } from "@/hooks/use-auth"
import { AdminShell } from "@/components/dashboard/admin-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react"
import { Megaphone, Plus, Trash2, Calendar } from "lucide-react"

interface Announcement {
  id: string
  title: string
  description: string
  createdAt: string
  important?: boolean
}

export default function AdminAnnouncementsPage() {
  const { user, loading, logout } = useAuth("admin")
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [important, setImportant] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function fetchAnnouncements() {
    const res = await fetch("/api/announcements")
    const data = await res.json()
    setAnnouncements(Array.isArray(data) ? data : [])
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const createAnnouncement = async () => {
    if (!title || !description) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, important }),
      })
      if (res.ok) {
        setTitle("")
        setDescription("")
        setImportant(false)
        setShowForm(false)
        fetchAnnouncements()
      }
    } finally {
      setSubmitting(false)
    }
  }

  const deleteAnnouncement = async (id: string) => {
    const res = await fetch(`/api/announcements?id=${id}`, { method: "DELETE" })
    if (res.ok) fetchAnnouncements()
  }

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <AdminShell userName={user.name} onLogout={logout}>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-tight text-foreground">
            Announcements
          </h2>
          <p className="text-muted-foreground">Create and manage gym announcements</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          New
        </Button>
      </div>

      {/* Create form */}
      {showForm && (
        <Card className="mb-6 border-primary/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">New Announcement</CardTitle>
            <CardDescription>Create a new announcement for all gym members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Announcement title..."
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="desc">Description</Label>
                <Input
                  id="desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Announcement details..."
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="important"
                  checked={important}
                  onCheckedChange={(checked) => setImportant(checked === true)}
                />
                <Label htmlFor="important" className="text-sm text-muted-foreground">
                  Mark as important
                </Label>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={createAnnouncement}
                  disabled={submitting || !title || !description}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {submitting ? "Creating..." : "Create Announcement"}
                </Button>
                <Button variant="ghost" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* List */}
      <div className="flex flex-col gap-4">
        {announcements.map((a) => (
          <Card key={a.id} className={`border-border/50 shadow-sm ${a.important ? "border-l-4 border-l-[#dc2626]" : ""}`}>
            <CardContent className="flex items-start justify-between gap-4 p-4">
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${a.important ? "bg-[#dc2626]/10" : "bg-primary/10"}`}>
                  <Megaphone className={`h-5 w-5 ${a.important ? "text-[#dc2626]" : "text-primary"}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{a.title}</h3>
                    {a.important && (
                      <Badge className="bg-[#dc2626] text-[#ffffff] text-[10px] px-1.5 py-0">
                        Important
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {new Date(a.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteAnnouncement(a.id)}
                className="shrink-0 text-muted-foreground hover:text-[#dc2626]"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete announcement</span>
              </Button>
            </CardContent>
          </Card>
        ))}

        {announcements.length === 0 && (
          <Card className="border-border/50 shadow-sm">
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <Megaphone className="h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No announcements yet. Create one to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminShell>
  )
}
