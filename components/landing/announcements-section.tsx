import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Megaphone, CalendarDays } from "lucide-react"

const announcements = [
  {
    title: "Gym Reopens After Maintenance",
    description:
      "The gymnasium is now fully operational after scheduled equipment maintenance. All machines have been serviced and recalibrated for optimal performance.",
    date: "Feb 20, 2026",
    important: true,
  },
  {
    title: "New Evening Batch Timings",
    description:
      "Due to popular demand, we have extended our evening sessions. The last slot now runs from 7:00 PM to 8:00 PM. Please book your slots in advance.",
    date: "Feb 15, 2026",
    important: false,
  },
  {
    title: "Fitness Assessment Camp",
    description:
      "Free fitness assessment camp for all registered members on March 1st. Get your BMI, body fat percentage, and personalized workout recommendations.",
    date: "Feb 10, 2026",
    important: true,
  },
  {
    title: "New Cardio Equipment Arrived",
    description:
      "We have added 4 new state-of-the-art spin bikes and 2 rowing machines to our cardio section. Come try them out during your next session!",
    date: "Feb 5, 2026",
    important: false,
  },
]

export function AnnouncementsSection() {
  return (
    <section id="announcements" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            Updates
          </span>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
            Announcements
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary" />
        </div>

        {/* Announcement Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {announcements.map((a) => (
            <Card
              key={a.title}
              className="border-border/50 bg-card shadow-md transition-shadow hover:shadow-lg"
            >
              <CardContent className="flex gap-4 pt-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Megaphone className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-foreground">
                      {a.title}
                    </h3>
                    {a.important && (
                      <Badge className="bg-[#dc2626] text-white text-[10px] px-2 py-0">
                        Important
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {a.description}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span>{a.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
