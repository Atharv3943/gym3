import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock, Dumbbell, IndianRupee } from "lucide-react"

const stats = [
  {
    icon: Clock,
    value: "Two Sessions",
    label: "Daily",
  },
  {
    icon: Dumbbell,
    value: "58+",
    label: "Equipment",
  },
  {
    icon: IndianRupee,
    value: "89 Lakhs",
    label: "Equipment Value",
  },
]

export function HeroSection() {
  return (
    <section id="about" className="relative min-h-[90vh] overflow-hidden bg-background">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center lg:px-8 lg:py-32">
        <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary animate-pulse">
          Official Gymnasium
        </span>

        <h1 className="mb-2 font-[family-name:var(--font-oswald)] text-4xl font-bold uppercase leading-tight tracking-tighter text-foreground md:text-5xl lg:text-7xl">
          Rajarambapu Institute
        </h1>
        <h2 className="mb-6 font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase leading-tight tracking-tight text-[#FFD700] md:text-4xl lg:text-5xl">
          of Technology
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          State-of-the-art gymnasium facility equipped with world-class
          equipment worth <span className="font-bold text-foreground">Rs. 89 Lakhs</span>. 
          Train smarter, track progress, and achieve your fitness goals with our Smart Gym Portal.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link href="/register">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-[#FFD700] px-10 text-base font-bold text-black shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all hover:scale-105 hover:bg-[#FFD700]/90 hover:shadow-[0_0_30px_rgba(255,215,0,0.6)]"
            >
              <span className="relative z-10">Join Now</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </Button>
          </Link>
          <Link href="#timings">
            <Button
              size="lg"
              variant="outline"
              className="border-foreground/20 bg-transparent px-10 text-base font-bold text-foreground transition-all hover:bg-foreground/5 hover:border-foreground/40"
            >
              View Timings
            </Button>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="mt-20 grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur-md transition-all hover:border-primary/40 hover:bg-card/50"
            >
              <div className="rounded-xl bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="font-[family-name:var(--font-oswald)] text-3xl font-bold text-foreground">
                {stat.value}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


