"use client"

import { useAuth } from "@/hooks/use-auth"
import { AdminShell } from "@/components/dashboard/admin-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { Users, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"

interface Member {
  id: string
  full_name: string
  email: string
  phone: string
  department: string
  year: string
  membership_status: string
  created_at: string
}

export default function AdminMembersPage() {
  const { user, loading, logout } = useAuth("admin")
  const [members, setMembers] = useState<Member[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function fetchMembers() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) throw error
        setMembers(data || [])
      } catch (err) {
        console.error("Failed to fetch members", err)
      }
    }
    fetchMembers()
  }, [])

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  const filtered = members.filter(
    (m) =>
      (m.full_name || '').toLowerCase().includes(search.toLowerCase()) ||
      (m.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (m.department || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminShell userName={user.name} onLogout={logout}>
      <div className="mb-6">
        <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-tight text-foreground">
          Members
        </h2>
        <p className="text-muted-foreground">View and manage registered gym members</p>
      </div>

      {/* Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="border-border/50 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{members.length}</p>
              <p className="text-xs text-muted-foreground">Total Members</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-[#10b981]/10 p-2">
              <Users className="h-5 w-5 text-[#10b981]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{members.filter((m) => m.membership_status === 'active').length}</p>
              <p className="text-xs text-muted-foreground">Active Memberships</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-[#dc2626]/10 p-2">
              <Users className="h-5 w-5 text-[#dc2626]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{members.filter((m) => m.membership_status !== 'active').length}</p>
              <p className="text-xs text-muted-foreground">Inactive</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Table */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">All Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium text-foreground">{m.full_name}</TableCell>
                    <TableCell className="text-muted-foreground">{m.email}</TableCell>
                    <TableCell className="text-muted-foreground">{m.department}</TableCell>
                    <TableCell className="text-muted-foreground">{m.year}</TableCell>
                    <TableCell>
                      {m.membership_status === 'active' ? (
                        <Badge className="bg-[#10b981]/10 text-[#10b981]">Active</Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-[#dc2626]/10 text-[#dc2626]">Inactive</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                      No members found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminShell>
  )
}
