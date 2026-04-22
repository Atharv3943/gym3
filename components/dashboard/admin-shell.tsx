"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dumbbell,
  LayoutDashboard,
  CalendarCheck,
  Users,
  Megaphone,
  LogOut,
  Menu,
  X,
  BarChart3,
  Settings,
} from "lucide-react"
import { useState } from "react"

interface AdminShellProps {
  children: React.ReactNode
  userName: string
  onLogout: () => void
}

const adminLinks = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Slot Management", href: "/dashboard/admin/slots", icon: CalendarCheck },
  { label: "Members", href: "/dashboard/admin/members", icon: Users },
  { label: "Announcements", href: "/dashboard/admin/announcements", icon: Megaphone },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  { label: "Website CMS", href: "/dashboard/admin/cms", icon: Settings },
]

export function AdminShell({ children, userName, onLogout }: AdminShellProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-[#1e3a5f] text-[#ffffff] transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-[#ffffff]/10 px-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Dumbbell className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#ffffff]">RIT Gym</span>
              <span className="ml-1 text-[10px] font-medium text-primary">Admin</span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5 text-[#ffffff]/70" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-[#ffffff]/70 hover:bg-[#ffffff]/10 hover:text-[#ffffff]"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-[#ffffff]/10 p-3">
          <div className="mb-2 px-3 py-1">
            <p className="truncate text-sm font-medium text-[#ffffff]">{userName}</p>
            <p className="text-xs text-[#ffffff]/50">Administrator</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="w-full justify-start gap-2 text-[#ffffff]/70 hover:bg-[#ffffff]/10 hover:text-[#ffffff]"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur-md lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-tight text-foreground">
            Admin Panel
          </h1>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
