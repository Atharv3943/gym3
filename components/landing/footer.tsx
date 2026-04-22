import Link from "next/link"
import { Dumbbell, MapPin, Phone, Mail } from "lucide-react"

const quickLinks = [
  { label: "Timings", href: "#timings" },
  { label: "Equipment", href: "#equipment" },
  { label: "Gallery", href: "#gallery" },
  { label: "Membership", href: "#membership" },
  { label: "Announcements", href: "#announcements" },
]

const accountLinks = [
  { label: "Log In", href: "/login" },
  { label: "Sign Up", href: "/register" },
  { label: "Student Dashboard", href: "/dashboard/student" },
  { label: "Admin Panel", href: "/dashboard/admin" },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-[#0f1b2d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Dumbbell className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">RIT Gymnasium</span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              State-of-the-art gymnasium at Rajarambapu Institute of Technology,
              Rajaramnagar. Empowering students with world-class fitness
              facilities since 2025.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-[family-name:var(--font-oswald)] text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/60 transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Account */}
          <div className="flex flex-col gap-4">
            <h4 className="font-[family-name:var(--font-oswald)] text-sm font-bold uppercase tracking-wider text-white">
              Account
            </h4>
            <nav className="flex flex-col gap-2.5">
              {accountLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/60 transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-[family-name:var(--font-oswald)] text-sm font-bold uppercase tracking-wider text-white">
              Contact Info
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-white/60">
                  Rajarambapu Institute of Technology, Rajaramnagar, Islampur -
                  415414
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-white/60">+91 77769 63666</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-white/60">
                  sangramsinh.patil@ritindia.edu
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 lg:px-8">
          <p className="text-center text-xs text-white/40">
            {'2026 Rajarambapu Institute of Technology. All rights reserved. RIT Smart Gym Portal.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
