"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const hardcodedPlans = [
  {
    name: "3 Month",
    price: "2,500",
    badge: null,
    highlight: false,
    features: ["Full access to gym equipment", "Locker room access", "1 fitness consultation", "Access to group classes"],
  },
  {
    name: "6 Month",
    price: "4,500",
    badge: "Best Value",
    highlight: true,
    features: ["Full access to gym equipment", "Locker room & shower access", "3 fitness consultations", "Priority class booking", "Free gym t-shirt"],
  },
  {
    name: "12 Month",
    price: "8,000",
    badge: null,
    highlight: false,
    features: ["Full access to gym equipment", "Locker room & shower access", "Monthly fitness consultations", "Priority class booking", "Free Gym Swag Pack", "Guest passes (2/month)"],
  }
]

export function MembershipSection() {
  return (
    <section id="membership" className="bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center flex flex-col items-center">
          <h2 className="font-[family-name:var(--font-oswald)] text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            MEMBERSHIP PLANS
          </h2>
          <div className="mt-5 h-2 w-28 rounded-full bg-orange-500" />
          <p className="mt-8 max-w-2xl text-[#6B7280] md:text-lg">
            Choose the plan that fits your fitness goals. All plans include full access to our world-class equipment.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {hardcodedPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`group relative flex flex-col transition-all duration-300 ${
                plan.highlight
                  ? "border-2 border-orange-500 ring-4 ring-orange-500/10 scale-105 z-10 bg-card shadow-2xl"
                  : "border border-border/50 bg-white shadow-md hover:shadow-xl"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <Badge className="bg-orange-500 px-5 py-1.5 text-xs font-black uppercase tracking-widest text-[#ffffff] shadow-md border-none">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4 pt-10 text-center">
                <CardTitle className="text-2xl font-bold uppercase tracking-wide text-foreground">
                  {plan.name}
                </CardTitle>
                <div className="mt-6 flex items-baseline justify-center gap-1">
                  <span className="text-xl font-bold text-foreground">Rs.</span>
                  <span className="text-6xl font-extrabold tracking-tighter text-foreground">
                    {plan.price}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-8 pt-4 pb-10 px-8">
                <div className="flex-1">
                  <ul className="flex flex-col gap-5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-4">
                        <div className="mt-1 flex shrink-0 items-center justify-center">
                          <Check className="h-5 w-5 text-orange-500" strokeWidth={3} />
                        </div>
                        <span className="text-sm font-medium text-[#6B7280] leading-tight">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/register" className="mt-auto block w-full">
                  <Button
                    className={`w-full py-6 text-sm font-bold uppercase tracking-widest transition-all ${
                      plan.highlight
                        ? "bg-orange-500 text-white hover:bg-orange-600 shadow-md"
                        : "bg-black text-white hover:bg-gray-800 shadow-sm"
                    }`}
                  >
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

