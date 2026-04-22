"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function ClassesPage() {
  const [classes, setClasses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { data, error } = await supabase
          .from('classes')
          .select('*, trainers(*)')
          .order('id', { ascending: true })
        
        if (error) throw error
        setClasses(data || [])
      } catch (err) {
        console.error("Error fetching classes:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchClasses()
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
            Available Classes
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Join our expert-led sessions to take your fitness to the next level.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((cls) => (
            <Card key={cls.id} className="overflow-hidden border-border/50 bg-card transition-all hover:shadow-xl">
              <div className="aspect-video bg-muted relative">
                {/* Fallback pattern if image is missing */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                   <Calendar className="h-12 w-12 text-primary/20" />
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {cls.category || 'Fitness'}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {cls.duration || '60 mins'}
                  </div>
                </div>
                <CardTitle className="font-[family-name:var(--font-oswald)] text-2xl uppercase tracking-wider">{cls.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{cls.description}</p>
                <div className="flex items-center gap-4 border-t border-border/50 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{cls.trainers?.full_name || 'Expert Trainer'}</p>
                    <p className="text-xs text-muted-foreground">{cls.schedule || 'Weekly Basis'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {classes.length === 0 && (
          <div className="text-center text-muted-foreground py-10">
            No classes available at the moment.
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
