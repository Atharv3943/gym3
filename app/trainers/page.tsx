"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Loader2, Dumbbell } from "lucide-react"
import { supabase } from "@/lib/supabase"

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const { data, error } = await supabase
          .from('trainers')
          .select('*')
          .order('id', { ascending: true })
        
        if (error) throw error
        setTrainers(data || [])
      } catch (err) {
        console.error("Error fetching trainers:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTrainers()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <section className="bg-muted/30 py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 font-[family-name:var(--font-oswald)] text-5xl font-bold uppercase tracking-tight text-foreground">
            Our Expert Trainers
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Work with our certified professionals to achieve your fitness goals safely and efficiently.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trainers.map((trainer) => (
            <Card key={trainer.id} className="group overflow-hidden border-border/50 bg-card transition-all hover:-translate-y-1 hover:shadow-2xl">
              <div className="aspect-[4/5] bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                   <div className="flex gap-4">
                      <Instagram className="h-5 w-5 text-white cursor-pointer hover:text-primary" />
                   </div>
                </div>
                {/* Image Placeholder */}
                <div className="flex h-full w-full items-center justify-center bg-muted">
                    <Dumbbell className="h-20 w-20 text-muted-foreground/10" />
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{trainer.specialization || 'Fitness Expert'}</Badge>
                  <div className="flex items-center gap-1 text-primary">
                     <Star className="h-3 w-3 fill-current" />
                     <span className="text-xs font-bold">{trainer.rating || '4.9'}</span>
                  </div>
                </div>
                <CardTitle className="font-[family-name:var(--font-oswald)] text-xl uppercase tracking-wider mt-2">{trainer.full_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{trainer.bio || 'Expert trainer dedicated to helping students achieve their physical potential.'}</p>
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                   <Trophy className="h-4 w-4" />
                   <span>{trainer.experience || '3+ Years'} Experience</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {trainers.length === 0 && (
          <div className="text-center text-muted-foreground py-10">
            No trainers listed at the moment.
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
