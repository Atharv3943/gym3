"use client"

import { useAuth } from "@/hooks/use-auth"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState, useCallback } from "react"
import { TrendingDown, Plus, Scale, Target, Activity } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

interface ProgressEntry {
  id: string
  user_id: string
  weight: number
  date: string
}

export default function ProgressPage() {
  const { user, loading, logout } = useAuth("student")
  const [progress, setProgress] = useState<ProgressEntry[]>([])
  const [newWeight, setNewWeight] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const fetchProgress = useCallback(async () => {
    if (!user) return
    try {
        const { data, error } = await supabase
            .from('progress')
            .select('*')
            .eq('user_id', user.id)
            .order('date', { ascending: true })
        
        if (error) throw error
        setProgress(data || [])
    } catch (err: any) {
        console.log("Failed to fetch progress", err)
    }
  }, [user])

  useEffect(() => {
    if (user) fetchProgress()
  }, [user, fetchProgress])

  const addEntry = async () => {
    if (!user || !newWeight) return
    setSubmitting(true)
    try {
      const { error } = await supabase
        .from('progress')
        .insert({
          user_id: user.id,
          weight: Number(newWeight),
          date: new Date().toISOString()
        })

      if (error) throw error
      
      setNewWeight("")
      toast.success("Progress logged!")
      fetchProgress()
    } catch (err: any) {
      toast.error(err.message || "Failed to log progress")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  const latestWeight = progress.length > 0 ? progress[progress.length - 1].weight : null
  const firstWeight = progress.length > 0 ? progress[0].weight : null
  const totalChange = latestWeight && firstWeight ? (latestWeight - firstWeight).toFixed(1) : "0"
  const maxWeight = Math.max(...progress.map((p) => p.weight), 0)
  const minWeight = Math.min(...progress.map((p) => p.weight), 100)
  const range = maxWeight - minWeight || 1

  return (
    <DashboardShell userName={user.name} onLogout={logout}>
      <div className="mb-6">
        <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-tight text-foreground">
          Progress Tracker
        </h2>
        <p className="text-muted-foreground">Track your fitness journey over time</p>
      </div>

      {/* Stats cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Weight</CardTitle>
            <Scale className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{latestWeight ? `${latestWeight} kg` : "N/A"}</p>
            <p className="text-xs text-muted-foreground">Latest entry</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Change</CardTitle>
            <TrendingDown className="h-4 w-4 text-[#10b981]" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{totalChange} kg</p>
            <p className="text-xs text-[#10b981]">Since you started</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Entries</CardTitle>
            <Activity className="h-4 w-4 text-[#3b82f6]" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{progress.length}</p>
            <p className="text-xs text-muted-foreground">Total check-ins</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weight chart area */}
        <Card className="border-border/50 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Weight Trend</CardTitle>
            <CardDescription>Visual history of your weight entries</CardDescription>
          </CardHeader>
          <CardContent>
            {progress.length > 1 ? (
              <div className="relative h-56 w-full">
                {/* Y axis labels */}
                <div className="absolute left-0 top-0 flex h-full flex-col justify-between text-xs text-muted-foreground">
                  <span>{maxWeight} kg</span>
                  <span>{((maxWeight + minWeight) / 2).toFixed(1)} kg</span>
                  <span>{minWeight} kg</span>
                </div>
                {/* Chart area */}
                <div className="ml-14 h-full">
                  <svg viewBox={`0 0 ${(progress.length - 1) * 100} 200`} className="h-full w-full" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="0" x2={`${(progress.length - 1) * 100}`} y2="0" stroke="var(--border)" strokeWidth="1" />
                    <line x1="0" y1="100" x2={`${(progress.length - 1) * 100}`} y2="100" stroke="var(--border)" strokeWidth="1" strokeDasharray="4" />
                    <line x1="0" y1="200" x2={`${(progress.length - 1) * 100}`} y2="200" stroke="var(--border)" strokeWidth="1" />

                    {/* Area fill */}
                    <path
                      d={`M0,${200 - ((progress[0].weight - minWeight) / range) * 200} ${progress
                        .map((p, i) => `L${i * 100},${200 - ((p.weight - minWeight) / range) * 200}`)
                        .join(" ")} L${(progress.length - 1) * 100},200 L0,200 Z`}
                      fill="var(--primary)"
                      fillOpacity="0.1"
                    />

                    {/* Line */}
                    <polyline
                      points={progress
                        .map((p, i) => `${i * 100},${200 - ((p.weight - minWeight) / range) * 200}`)
                        .join(" ")}
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Dots */}
                    {progress.map((p, i) => (
                      <circle
                        key={p.id}
                        cx={i * 100}
                        cy={200 - ((p.weight - minWeight) / range) * 200}
                        r="6"
                        fill="var(--background)"
                        stroke="var(--primary)"
                        strokeWidth="3"
                      />
                    ))}
                  </svg>
                  {/* X axis labels */}
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    {progress.map((p) => (
                      <span key={p.id}>{new Date(p.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 py-12 text-center">
                <Target className="h-10 w-10 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">Add at least 2 entries to see your trend chart</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add entry form */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Log Weight</CardTitle>
            <CardDescription>Record your current weight</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 70.5"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                />
              </div>
              <Button
                onClick={addEntry}
                disabled={submitting || !newWeight}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                {submitting ? "Saving..." : "Log Entry"}
              </Button>
            </div>

            {/* Recent entries list */}
            <div className="mt-6">
              <h4 className="mb-3 text-sm font-medium text-foreground">Recent Entries</h4>
              <div className="flex flex-col gap-2">
                {[...progress].reverse().slice(0, 5).map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2"
                  >
                    <span className="text-sm text-foreground">{entry.weight} kg</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
