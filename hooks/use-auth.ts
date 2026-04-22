"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

interface User {
  id: string
  name: string
  email: string
  role: "student" | "admin"
  department?: string
  year?: string
  membershipStatus?: string
  membershipExpiry?: string
}

export function useAuth(requiredRole?: "student" | "admin") {
  const router = useRouter()
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [unauthorized, setUnauthorized] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();

        if (!authUser) {
          router.push("/login")
          return
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single()

        if (error) {
          console.log("Error fetching profile:", error)
        }

        const fullUser = {
          ...authUser,
          name: profile?.full_name || authUser.email?.split('@')[0],
          role: profile?.role || "student",
          department: profile?.department,
          year: profile?.year,
          membershipStatus: profile?.membership_status || "inactive",
          membershipExpiry: profile?.membership_expiry,
        }

        if (requiredRole && fullUser.role !== requiredRole) {
          setUnauthorized(true)
        }
        
        setUser(fullUser)
      } catch (err) {
        console.error("Auth error:", err)
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router, requiredRole])

  const logout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return { user, loading, unauthorized, logout }
}
