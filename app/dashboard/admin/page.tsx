"use client"

import { AdminShell } from "@/components/dashboard/admin-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Users, CalendarCheck, Megaphone, Activity, AlertTriangle } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/hooks/use-auth"

interface Stats {
  totalMembers: number
  activeBookings: number
  totalAnnouncements: number
  todaySlots: number
}

export default function AdminPage() {
  const { user, loading, unauthorized, logout } = useAuth("admin")
  const [stats, setStats] = useState<Stats>({
    totalMembers: 0,
    activeBookings: 0,
    totalAnnouncements: 0,
    todaySlots: 0,
  })
  const [recentUsers, setRecentUsers] = useState<any[]>([])
  const [slotData, setSlotData] = useState<any[]>([])

  useEffect(() => {
    async function fetchStats() {
      try {
        const todayStr = new Date().toISOString().split("T")[0]
        
        const [usersData, announcementsData, bookingsData, slotsData] = await Promise.all([
          supabase.from('profiles').select('*').order('created_at', { ascending: false }),
          supabase.from('announcements').select('*', { count: 'exact' }),
          supabase.from('bookings').select('*').eq('date', todayStr),
          supabase.from('slots').select('*').eq('date', todayStr)
        ])

        const usersArr = usersData.data || []
        const announcementsArr = announcementsData.data || []
        const bookingsArr = bookingsData.data || []
        const slotsArr = slotsData.data || []

        setRecentUsers(usersArr.slice(0, 5))
        setSlotData(slotsArr)

        setStats({
          totalMembers: usersArr.length,
          activeBookings: bookingsArr.length,
          totalAnnouncements: announcementsArr.length,
          todaySlots: slotsArr.length,
        })
      } catch (err) {
        console.error("Admin stats fetch failed:", err)
      }
    }
    fetchStats()
  }, [])

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (unauthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md border-[#dc2626]/20 bg-[#dc2626]/5 shadow-xl">
          <CardHeader className="items-center text-center pb-2">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#dc2626]/10">
              <AlertTriangle className="h-6 w-6 text-[#dc2626]" />
            </div>
            <CardTitle className="text-xl font-bold text-[#dc2626]">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6 text-sm text-muted-foreground">
              You do not have permission to view the Admin Dashboard.
            </p>
            <button
              onClick={() => window.location.href = "/dashboard/student"}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Go to Student Dashboard
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const cards = [
    {
      title: "Total Members",
      value: stats.totalMembers,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Today's Bookings",
      value: stats.activeBookings,
      icon: CalendarCheck,
      color: "text-[#3b82f6]",
      bgColor: "bg-[#3b82f6]/10",
    },
    {
      title: "Active Slots Today",
      value: stats.todaySlots,
      icon: Activity,
      color: "text-[#10b981]",
      bgColor: "bg-[#10b981]/10",
    },
    {
      title: "Announcements",
      value: stats.totalAnnouncements,
      icon: Megaphone,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ]

  return (
    <AdminShell userName={user.name} onLogout={logout}>
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-tight text-foreground">
            Admin Overview
          </h2>
          <p className="text-sm text-muted-foreground">Manage gym operations and monitor activity</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-md bg-[#10b981]/10 px-2.5 py-1 text-xs font-medium text-[#10b981]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]"></span>
            System Online
          </span>
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title} className="border-border/50 shadow-sm bg-card hover:border-border transition-colors">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                <p className="text-2xl font-bold text-foreground">{card.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main data area (spans 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Recent Member Registrations</CardTitle>
                <Button variant="outline" size="sm" className="h-8 text-xs font-medium" asChild>
                  <a href="/dashboard/admin/members">View All</a>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {recentUsers.map((u, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                        {u.full_name?.substring(0, 2).toUpperCase() || "NB"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{u.full_name}</p>
                        <p className="text-xs text-muted-foreground">{u.department || "No Dept"} &bull; {u.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${u.membership_status === "active" ? "bg-[#10b981]/10 text-[#10b981]" : "bg-[#dc2626]/10 text-[#dc2626]"}`}>
                        {u.membership_status || 'inactive'}
                      </span>
                      <p className="text-[10px] text-muted-foreground mt-1">{new Date(u.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
                {recentUsers.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-4">No recent members.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Today's Slot Utilization</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 text-xs font-medium" asChild>
                  <a href="/dashboard/admin/slots">Manage Slots</a>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {(() => {
                  const morningSlots = slotData.filter(s => s.session === "morning");
                  const eveningSlots = slotData.filter(s => s.session === "evening");
                  const morningBooked = morningSlots.reduce((acc, s) => acc + s.booked, 0);
                  const morningTotal = morningSlots.reduce((acc, s) => acc + s.capacity, 0) || 1;
                  const eveningBooked = eveningSlots.reduce((acc, s) => acc + s.booked, 0);
                  const eveningTotal = eveningSlots.reduce((acc, s) => acc + s.capacity, 0) || 1;
                  return (
                    <>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">Morning Session</span>
                          <span className="text-sm text-muted-foreground">{morningBooked}/{morningTotal}</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div className="h-full bg-primary transition-all" style={{ width: `${(morningBooked / morningTotal) * 100}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">Evening Session</span>
                          <span className="text-sm text-muted-foreground">{eveningBooked}/{eveningTotal}</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div className="h-full bg-[#3b82f6] transition-all" style={{ width: `${(eveningBooked / eveningTotal) * 100}%` }}></div>
                        </div>
                      </div>
                    </>
                  )
                })()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar area (1 column) */}
        <div className="space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold uppercase text-muted-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                <a href="/dashboard/admin/announcements" className="flex items-center gap-3 border-b border-border/50 p-3 sm:px-4 hover:bg-muted/50 transition-colors">
                  <div className="bg-accent/10 p-2 rounded-md">
                    <Megaphone className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New Announcement</p>
                  </div>
                </a>
                <a href="/dashboard/admin/analytics" className="flex items-center gap-3 border-b border-border/50 p-3 sm:px-4 hover:bg-muted/50 transition-colors">
                  <div className="bg-[#10b981]/10 p-2 rounded-md">
                    <Activity className="h-4 w-4 text-[#10b981]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">View detailed reports</p>
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm bg-[#1e3a5f]/5 border-[#1e3a5f]/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-[#1e3a5f]">System Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Total Equipment</span>
                  <span className="font-medium text-foreground">42 machines</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Maintenance Due</span>
                  <span className="font-medium text-[#dc2626]">3 machines</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Last backup</span>
                  <span className="font-medium text-foreground">1 hr ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  )
}
