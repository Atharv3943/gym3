"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { AdminShell } from "@/components/dashboard/admin-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Save, Globe, Phone, Mail, MapPin, Clock, Info } from "lucide-react"

export default function CMSPage() {
  const { user, loading, logout } = useAuth("admin")
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState({
    aboutText: "",
    timings: "",
    contactPhone: "",
    contactEmail: "",
    address: "",
  })

  useEffect(() => {
    async function fetchSettings() {
      const res = await fetch("/api/cms")
      const data = await res.json()
      if (data && !data.error) {
        setSettings({
          aboutText: data.aboutText || "",
          timings: data.timings || "",
          contactPhone: data.contactPhone || "",
          contactEmail: data.contactEmail || "",
          address: data.address || "",
        })
      }
    }
    fetchSettings()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      })
      if (res.ok) {
        toast.success("Website content updated successfully!")
      } else {
        toast.error("Failed to update content.")
      }
    } catch (err) {
      toast.error("An error occurred.")
    } finally {
      setSaving(false)
    }
  }

  if (loading || !user) return <div className="p-8 text-center text-muted-foreground">Loading Admin CMS...</div>

  return (
    <AdminShell userName={user.name} onLogout={logout}>
      <div className="mb-8">
        <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight">Website CMS</h2>
        <p className="text-muted-foreground">Manage the public content visible to students and visitors.</p>
      </div>

      <form onSubmit={handleSave} className="grid gap-8 lg:grid-cols-2">
        {/* About & Basic Info */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle>Gym Information</CardTitle>
              </div>
              <CardDescription>Update the primary description of the gymnasium.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">About Text</label>
                <Textarea 
                  value={settings.aboutText}
                  onChange={(e) => setSettings({...settings, aboutText: e.target.value})}
                  placeholder="Tell your story..." 
                  className="min-h-[150px]"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4" /> Gym Timings
                </label>
                <Input 
                   value={settings.timings}
                   onChange={(e) => setSettings({...settings, timings: e.target.value})}
                   placeholder="e.g. Mon-Sat: 5:30 AM - 8:30 PM" 
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <CardTitle>Contact Details</CardTitle>
              </div>
              <CardDescription>Changes reflect on the Contact page and Footer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Phone className="h-4 w-4" /> Phone Number
                </label>
                <Input 
                   value={settings.contactPhone}
                   onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                   placeholder="+91 77769 63666" 
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Mail className="h-4 w-4" /> Email Address
                </label>
                <Input 
                   value={settings.contactEmail}
                   onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                   placeholder="sangramsinh.patil@ritindia.edu" 
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="h-4 w-4" /> Physical Address
                </label>
                <Textarea 
                   value={settings.address}
                   onChange={(e) => setSettings({...settings, address: e.target.value})}
                   placeholder="Enter full address..." 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview / Status Column */}
        <div className="space-y-8">
            <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-lg">Publish Changes</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-6 text-sm text-muted-foreground">
                        Once saved, these changes will be immediately visible to all users on the public site. 
                        Please verify all details before pushing updates.
                    </p>
                    <Button type="submit" disabled={saving} className="w-full py-6 text-lg font-bold">
                        {saving ? "Saving..." : "Save & Publish Changes"}
                        <Save className="ml-2 h-5 w-5" />
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                   <CardTitle className="text-lg">Live Preview Hint</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                    Your changes will update the <strong>About</strong>, <strong>Facilities</strong>, 
                    <strong>Contact</strong>, and <strong>Footer</strong> sections globally.
                </CardContent>
            </Card>
        </div>
      </form>
    </AdminShell>
  )
}
