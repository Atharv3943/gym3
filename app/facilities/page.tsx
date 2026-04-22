import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, Activity, Calendar, Clock } from "lucide-react"

const facilities = [
  {
    title: "Cardio Zone",
    description: "State-of-the-art treadmills, ellipticals, and stationary bikes to boost your heart health.",
    icon: Activity,
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    title: "Strength Station",
    description: "Extensive selection of free weights, dumbbells up to 50kg, and power racks for serious gains.",
    icon: Dumbbell,
    color: "bg-red-500/10 text-red-500"
  },
  {
    title: "Resistance Machines",
    description: "Full suite of pin-loaded machines for targeted muscle isolation and safe workouts.",
    icon: Activity,
    color: "bg-emerald-500/10 text-emerald-500"
  },
  {
    title: "Open Gym Space",
    description: "Dedicated area for calisthenics, stretching, and functional movement floor work.",
    icon: Dumbbell,
    color: "bg-yellow-500/10 text-yellow-500"
  }
]

export default function FacilitiesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="bg-muted/30 py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 font-[family-name:var(--font-oswald)] text-5xl font-bold uppercase tracking-tight text-foreground">
            Our Facilities
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We provide a world-class training environment with cutting-edge equipment 
            maintained to the highest standards.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {facilities.map((f) => (
              <Card key={f.title} className="group relative overflow-hidden transition-all hover:shadow-xl">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${f.color}`}>
                    <f.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-tight">
                    {f.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{f.description}</p>
                  <div className="mt-8 relative aspect-[21/9] overflow-hidden rounded-xl bg-muted group-hover:bg-muted/80 transition-colors">
                     {/* Image would go here */}
                     <div className="flex h-full w-full items-center justify-center">
                        <Dumbbell className="h-16 w-16 text-muted-foreground/10" />
                     </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Info */}
      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center md:p-12">
            <h2 className="mb-6 font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-foreground">
                Equipment Usage Schedule
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                    <Clock className="mx-auto h-6 w-6 text-primary" />
                    <h3 className="font-bold">Peak Hours</h3>
                    <p className="text-sm text-muted-foreground">5:00 PM - 8:00 PM (High utilization, please plan ahead)</p>
                </div>
                <div className="space-y-2">
                    <Clock className="mx-auto h-6 w-6 text-primary" />
                    <h3 className="font-bold">Maintenance</h3>
                    <p className="text-sm text-muted-foreground">Daily 1:00 PM - 2:00 PM (Equipment sanitization)</p>
                </div>
                <div className="space-y-2">
                    <Calendar className="mx-auto h-6 w-6 text-primary" />
                    <h3 className="font-bold">Bookings</h3>
                    <p className="text-sm text-muted-foreground">Check the portal for slot availability.</p>
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
