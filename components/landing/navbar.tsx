"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Dumbbell, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Timings", href: "#timings" },
  { label: "Equipment", href: "#equipment" },
  { label: "Gallery", href: "#gallery" },
  { label: "Membership", href: "#membership" },
  { label: "News", href: "#announcements" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleCall = () => {
    window.location.href = "tel:+917776963666"
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFD700]">
            <Dumbbell className="h-5 w-5 text-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight tracking-tight text-foreground">
              RIT Gymnasium
            </span>
            <span className="text-[10px] leading-tight text-muted-foreground">
              Smart Gym Portal
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-[#6B7280] tracking-wide transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1.5 border-primary/20 text-primary hover:bg-primary/5"
            onClick={handleCall}
          >
            <Phone className="h-3.5 w-3.5" />
            Call Now
          </Button>
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Log In
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 shadow-[0_0_15px_rgba(255,215,0,0.25)] transition-all">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
            <button
                onClick={handleCall}
                className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary"
                aria-label="Call Now"
            >
                <Phone className="h-4 w-4" />
            </button>
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-md text-foreground"
                aria-label="Toggle navigation menu"
            >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link href="/register" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

