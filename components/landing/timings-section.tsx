import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sun, Moon, Calendar } from "lucide-react"

const morningSlots = [
  { slot: "Slot 1", time: "6:00 AM - 7:00 AM" },
  { slot: "Slot 2", time: "7:00 AM - 8:00 AM" },
  { slot: "Slot 3", time: "8:00 AM - 9:00 AM" },
  { slot: "Slot 4", time: "9:00 AM - 10:00 AM" },
]

const eveningSlots = [
  { slot: "Slot 1", time: "4:00 PM - 5:00 PM" },
  { slot: "Slot 2", time: "5:00 PM - 6:00 PM" },
  { slot: "Slot 3", time: "6:00 PM - 7:00 PM" },
  { slot: "Slot 4", time: "7:00 PM - 8:00 PM" },
]

const weeklySchedule = [
  { day: "Monday", status: "Open" },
  { day: "Tuesday", status: "Open" },
  { day: "Wednesday", status: "Open" },
  { day: "Thursday", status: "Open" },
  { day: "Friday", status: "Open" },
  { day: "Saturday", status: "Open" },
  { day: "Sunday", status: "Closed" },
]

export function TimingsSection() {
  return (
    <section id="timings" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            Schedule
          </span>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
            Gymnasium Timings
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary" />
        </div>

        {/* Session Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Morning Session */}
          <Card className="border-border/50 bg-card shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3b82f6]/10">
                  <Sun className="h-5 w-5 text-[#3b82f6]" />
                </div>
                <CardTitle className="font-[family-name:var(--font-oswald)] text-xl uppercase tracking-tight">
                  Morning Session
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {morningSlots.map((s) => (
                  <div
                    key={s.slot}
                    className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3"
                  >
                    <span className="text-sm font-medium text-foreground">{s.slot}</span>
                    <span className="text-sm text-muted-foreground">{s.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Evening Session */}
          <Card className="border-border/50 bg-card shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                  <Moon className="h-5 w-5 text-accent" />
                </div>
                <CardTitle className="font-[family-name:var(--font-oswald)] text-xl uppercase tracking-tight">
                  Evening Session
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {eveningSlots.map((s) => (
                  <div
                    key={s.slot}
                    className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3"
                  >
                    <span className="text-sm font-medium text-foreground">{s.slot}</span>
                    <span className="text-sm text-muted-foreground">{s.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Schedule */}
        <Card className="mt-8 border-border/50 bg-card shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="font-[family-name:var(--font-oswald)] text-xl uppercase tracking-tight">
                Weekly Schedule
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {weeklySchedule.map((d) => (
                <div
                  key={d.day}
                  className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3"
                >
                  <span className="text-sm font-medium text-foreground">{d.day}</span>
                  {d.status === "Closed" ? (
                    <Badge variant="destructive" className="bg-[#dc2626] text-white">Closed</Badge>
                  ) : (
                    <Badge className="bg-[#10b981] text-white">Open</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
