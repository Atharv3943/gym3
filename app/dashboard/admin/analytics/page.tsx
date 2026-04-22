"use client"

import { useAuth } from "@/hooks/use-auth"
import { AdminShell } from "@/components/dashboard/admin-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TrendingUp, Users, Clock, BarChart3 } from "lucide-react"

const weeklyData = [
  { day: "Mon", morning: 85, evening: 92 },
  { day: "Tue", morning: 78, evening: 88 },
  { day: "Wed", morning: 90, evening: 95 },
  { day: "Thu", morning: 72, evening: 85 },
  { day: "Fri", morning: 68, evening: 90 },
  { day: "Sat", morning: 95, evening: 98 },
  { day: "Sun", morning: 40, evening: 55 },
]

const departmentData = [
  { dept: "CSE", count: 45, color: "#FFC107" },
  { dept: "MECH", count: 32, color: "#3b82f6" },
  { dept: "ENTC", count: 28, color: "#10b981" },
  { dept: "CIVIL", count: 18, color: "#FFD54F" },
  { dept: "ELE", count: 15, color: "#8b5cf6" },
]

const peakHours = [
  { time: "6-7 AM", usage: 65 },
  { time: "7-8 AM", usage: 85 },
  { time: "8-9 AM", usage: 70 },
  { time: "9-10 AM", usage: 45 },
  { time: "4-5 PM", usage: 75 },
  { time: "5-6 PM", usage: 95 },
  { time: "6-7 PM", usage: 90 },
  { time: "7-8 PM", usage: 80 },
]

export default function AdminAnalyticsPage() {
  const { user, loading, logout } = useAuth("admin")

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  const maxDept = Math.max(...departmentData.map((d) => d.count))

  return (
    <AdminShell userName={user.name} onLogout={logout}>
      <div className="mb-8">
        <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-tight text-foreground">
          Analytics
        </h2>
        <p className="text-muted-foreground">Gym usage statistics and insights</p>
      </div>

      {/* Key metrics */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">82%</p>
                <p className="text-xs text-muted-foreground">Avg Occupancy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#3b82f6]/10 p-2.5">
                <Users className="h-5 w-5 text-[#3b82f6]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">138</p>
                <p className="text-xs text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#10b981]/10 p-2.5">
                <Clock className="h-5 w-5 text-[#10b981]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">5-6 PM</p>
                <p className="text-xs text-muted-foreground">Peak Hour</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-2.5">
                <BarChart3 className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">Saturday</p>
                <p className="text-xs text-muted-foreground">Busiest Day</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly occupancy chart */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Weekly Occupancy</CardTitle>
            <CardDescription>Morning vs Evening session usage (%)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {weeklyData.map((d) => (
                <div key={d.day} className="flex items-center gap-3">
                  <span className="w-8 text-xs font-medium text-muted-foreground">{d.day}</span>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="h-3 rounded-full bg-primary/80 transition-all" style={{ width: `${d.morning}%` }} />
                      <span className="text-[10px] text-muted-foreground">{d.morning}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 rounded-full bg-[#1e3a5f] transition-all" style={{ width: `${d.evening}%` }} />
                      <span className="text-[10px] text-muted-foreground">{d.evening}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-primary/80" />
                Morning
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#1e3a5f]" />
                Evening
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Department distribution */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Department Distribution</CardTitle>
            <CardDescription>Active members by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {departmentData.map((d) => (
                <div key={d.dept} className="flex items-center gap-3">
                  <span className="w-12 text-sm font-medium text-foreground">{d.dept}</span>
                  <div className="flex flex-1 items-center gap-2">
                    <div className="h-6 flex-1 overflow-hidden rounded-lg bg-muted">
                      <div
                        className="flex h-full items-center justify-end rounded-lg px-2 transition-all"
                        style={{
                          width: `${(d.count / maxDept) * 100}%`,
                          backgroundColor: d.color,
                        }}
                      >
                        <span className="text-[11px] font-medium text-[#ffffff]">{d.count}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Peak hours */}
        <Card className="border-border/50 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Peak Hours Analysis</CardTitle>
            <CardDescription>Average usage by time slot across the week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2" style={{ height: 180 }}>
              {peakHours.map((h) => (
                <div key={h.time} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-[11px] font-medium text-foreground">{h.usage}%</span>
                  <div
                    className={`w-full rounded-t-lg transition-all ${
                      h.usage >= 90 ? "bg-[#dc2626]" : h.usage >= 75 ? "bg-primary" : h.usage >= 60 ? "bg-accent" : "bg-[#10b981]"
                    }`}
                    style={{ height: `${h.usage * 1.4}px` }}
                  />
                  <span className="text-[10px] text-muted-foreground text-center leading-tight">{h.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#10b981]" />
                {'< 60% Low'}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                60-75% Medium
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                75-90% High
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#dc2626]" />
                {'90%+ Peak'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  )
}
