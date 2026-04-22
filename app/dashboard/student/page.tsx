"use client"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { CalendarCheck, TrendingUp, CreditCard, Activity, Megaphone } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/hooks/use-auth"

interface Booking {
  id: string;
  slot_id: string;
  date: string;
  status: string;
  slots?: {
    time: string;
  }
}

interface Announcement {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

interface ProgressLog {
  id: string;
  weight: number;
  date: string;
}

export default function DashboardPage() {
  const { user, loading, logout } = useAuth("student")
  const [bookings, setBookings] = useState<Booking[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [progress, setProgress] = useState<ProgressLog[]>([])

  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      try {
        const [bookingsData, announcementsData, progressData] = await Promise.all([
          supabase.from('bookings').select('*, slots(time)').eq('user_id', user.id).order('date', { ascending: true }),
          supabase.from('announcements').select('*').order('created_at', { ascending: false }).limit(5),
          supabase.from('progress').select('*').eq('user_id', user.id).order('date', { ascending: true })
        ])

        if (bookingsData.data) setBookings(bookingsData.data)
        if (announcementsData.data) setAnnouncements(announcementsData.data)
        if (progressData.data) setProgress(progressData.data)
      } catch (err) {
        console.error("Failed to fetch dashboard data", err)
      }
    }
    fetchData()
  }, [user])

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  const todayStr = new Date().toISOString().split("T")[0];
  const activeBookings = bookings.filter(b => b.status === "active" && new Date(b.date).toISOString().split("T")[0] >= todayStr);
  const nextBooking = activeBookings.length > 0 ? activeBookings[0] : null;

  const cards = [
    {
      title: "Membership",
      value: user.membershipStatus === "active" ? "Active" : "Inactive",
      icon: CreditCard,
      sub: user.membershipExpiry ? `Expires ${new Date(user.membershipExpiry).toLocaleDateString()}` : "No plan",
      color: user.membershipStatus === "active" ? "text-[#10b981]" : "text-[#dc2626]",
    },
    {
      title: "Department",
      value: user.department || "N/A",
      icon: Activity,
      sub: "Student",
      color: "text-primary",
    },
    {
      title: "Personal Bookings",
      value: activeBookings.length.toString(),
      icon: CalendarCheck,
      sub: "Active slots",
      color: "text-[#3b82f6]",
    },
    {
      title: "Weight Progress",
      value: progress.length > 0 ? `${progress[progress.length - 1].weight} kg` : "N/A",
      icon: TrendingUp,
      sub: "Latest recording",
      color: "text-[#10b981]",
    },
  ]

  // Recharts data format: 
  const chartData = progress.map(p => ({
    date: new Date(p.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    weight: p.weight
  }));

  return (
    <DashboardShell userName={user.name} onLogout={logout}>
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 sm:p-8">
        <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
          Welcome, <span className="text-primary">{user.name.split(" ")[0]}</span>!
        </h2>
        <p className="mt-2 text-muted-foreground max-w-lg">
          Ready to crush your goals today?
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title} className="border-border/50 shadow-sm overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 z-10 relative">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent className="z-10 relative">
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
              <div className="mt-1 flex items-center gap-2">
                <p className={`text-xs font-semibold ${card.color}`}>{card.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-primary/20 bg-primary/5 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/10 blur-3xl"></div>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Your Next Workout</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {nextBooking ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl bg-background/50 p-4 border border-border/50 backdrop-blur-sm">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">Gym Slot</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(nextBooking.date).toLocaleDateString()} &bull; {nextBooking.slots?.time || "N/A"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10" onClick={() => window.location.href = '/dashboard/student/slots'}>
                      Manage
                    </Button>
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                      onClick={() => alert("Successfully checked in!")}
                    >
                      Check In
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl bg-background/50 p-4 border border-border/50 backdrop-blur-sm">
                  <p className="text-sm text-muted-foreground">No upcoming bookings. Book your next slot now!</p>
                  <Button className="mt-4 bg-primary text-primary-foreground" onClick={() => window.location.href = '/dashboard/student/slots'}>Book Slot</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Weight Progress Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}kg`} />
                      <Tooltip />
                      <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                    No weight progress recorded yet. Start logging your weight!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-base flex justify-between items-center">
                Announcements
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {announcements.length > 0 ? (
                  announcements.map((ann, idx) => (
                    <div key={idx} className="p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex gap-2">
                        <Megaphone className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{ann.title}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-3">{ann.description}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">
                            {new Date(ann.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-sm text-muted-foreground text-center">No recent announcements.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
