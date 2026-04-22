import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Dumbbell, Users, Trophy, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="mb-6 font-[family-name:var(--font-oswald)] text-5xl font-bold uppercase tracking-tight md:text-7xl">
            Our Legacy
          </h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">
            Dedicated to fostering a culture of health, discipline, and excellence at RIT. 
            From humble beginnings to a world-class training facility.
          </p>
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/50 to-primary opacity-50"></div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-oswald)] text-4xl font-bold uppercase text-foreground">
                More Than Just A Gym
              </h2>
              <p className="text-lg text-muted-foreground">
                The RIT Gymnasium is not just a place to lift weights; it's a sanctuary for 
                student development. We believe that physical fitness is the cornerstone of 
                academic and personal success.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="space-y-2">
                  <Target className="h-8 w-8 text-primary" />
                  <h3 className="font-bold">Our Mission</h3>
                  <p className="text-sm text-muted-foreground">Empowering every student to achieve their peak physical potential.</p>
                </div>
                <div className="space-y-2">
                  <Trophy className="h-8 w-8 text-primary" />
                  <h3 className="font-bold">Our Vision</h3>
                  <p className="text-sm text-muted-foreground">To be the premier collegiate fitness center in the region.</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl">
                {/* Image placeholder - in real usage would use generate_image or user upload */}
                <div className="flex h-full w-full items-center justify-center bg-muted">
                    <Dumbbell className="h-24 w-24 text-muted-foreground/20" />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Stats */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Active Members", val: "500+", icon: Users },
              { label: "Modern Equipment", val: "40+", icon: Dumbbell },
              { label: "Expert Trainers", val: "5", icon: Trophy },
              { label: "Daily Slots", val: "12", icon: Target },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-4 h-10 w-10 text-primary" />
                <h4 className="font-[family-name:var(--font-oswald)] text-3xl font-bold text-foreground">{stat.val}</h4>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
