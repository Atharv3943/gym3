"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ShieldCheck, Zap, Star, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"

const iconMap: Record<string, any> = {
  Zap,
  Star,
  ShieldCheck
}

export default function MembershipPage() {
  const router = useRouter()
  const [plans, setPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [processing, setProcessing] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('membership_plans')
          .select('*')
          .order('id', { ascending: true })

        if (fetchError) throw fetchError
        setPlans(data || [])
      } catch (err: any) {
        setError(err.message || "Failed to fetch plans")
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  const handleSelectPlan = async (plan: any) => {
    setProcessing(plan.id)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast.error("Please login to purchase a membership")
        router.push("/login")
        return
      }

      // 1. Calculate dates
      const startDate = new Date()
      const endDate = new Date()
      
      if (plan.period.includes('month')) {
        endDate.setMonth(endDate.getMonth() + 1)
      } else if (plan.period.includes('3 months')) {
        endDate.setMonth(endDate.getMonth() + 3)
      } else if (plan.period.includes('year')) {
        endDate.setFullYear(endDate.getFullYear() + 1)
      } else {
        endDate.setMonth(endDate.getMonth() + 1) // Default 1 month
      }

      // 2. Insert Subscription
      const { data: subData, error: subError } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          plan_id: plan.id,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          status: 'active'
        })
        .select()
        .single()

      if (subError) throw subError

      // 3. Insert Payment
      const { error: payError } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          subscription_id: subData.id,
          amount: parseFloat(plan.price.replace('₹', '')),
          status: 'completed',
          payment_date: new Date().toISOString()
        })

      if (payError) throw payError

      // 4. Update Profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          membership_status: 'active',
          membership_expiry: endDate.toISOString()
        })
        .eq('id', user.id)

      if (profileError) throw profileError

      toast.success(`Successfully subscribed to ${plan.name}!`)
      router.push("/dashboard")
    } catch (err: any) {
      toast.error(err.message || "Failed to process subscription")
    } finally {
      setProcessing(null)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || plans.length === 0) {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="flex flex-col items-center justify-center py-32 text-center px-4">
                <h1 className="text-3xl font-bold uppercase font-[family-name:var(--font-oswald)]">Ops! No Plans Found</h1>
                <p className="mt-4 text-muted-foreground max-w-md">
                    {error || "We couldn't find any membership plans in the database. Please ensure the 'membership_plans' table is seeded."}
                </p>
                <Link href="/" className="mt-8 text-primary hover:underline font-bold uppercase tracking-widest text-sm">Return Home</Link>
            </div>
            <Footer />
        </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      <Navbar />
      
      {/* Header */}
      <section className="bg-muted/30 py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 font-[family-name:var(--font-oswald)] text-5xl font-bold uppercase tracking-tight text-foreground md:text-6xl">
            Membership Plans
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Invest in yourself today. Our flexible plans are designed to accommodate 
            every student's busy schedule and budget.
          </p>
        </div>
      </section>

      {/* Plans Section */}
      <section className="container mx-auto px-4 py-20">
        {error && (
          <div className="mb-8 rounded-lg bg-red-500/10 p-4 text-center text-red-500">
            {error}
          </div>
        )}
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = iconMap[plan.icon] || Zap
            return (
              <Card key={plan.id} className={`relative flex flex-col overflow-hidden transition-all hover:scale-[1.02] ${plan.theme || 'border-border shadow-sm'}`}>
                {plan.highlight && (
                  <div className="absolute top-0 right-0 rounded-bl-xl bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                      Most Popular
                  </div>
                )}
                <CardHeader>
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${plan.highlight ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                      <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-tight">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent className="flex-1 space-y-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight">₹{plan.price}</span>
                    <span className="text-muted-foreground">/ {plan.period}</span>
                  </div>
                  
                  <ul className="space-y-3">
                    {plan.features?.map((feature: string) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <div className="mt-1 shrink-0">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full py-6 text-base font-bold uppercase tracking-wide ${plan.highlight ? 'bg-primary' : ''}`} 
                    variant={plan.highlight ? 'default' : 'secondary'}
                    onClick={() => handleSelectPlan(plan)}
                    disabled={processing === plan.id}
                  >
                    {processing === plan.id ? "Processing..." : `Select ${plan.name}`}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Note */}
      <section className="container mx-auto px-4 text-center">
        <p className="max-w-xl mx-auto text-sm text-muted-foreground italic">
            * All memberships are subject to college regulations and availability. 
            Students must present their RIT ID during physical verification.
        </p>
      </section>

      <Footer />
    </main>
  )
}
