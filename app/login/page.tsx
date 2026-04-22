"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dumbbell, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({ email: "", password: "" })

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .maybeSingle();
        
        if (profile?.role === "admin") {
          router.push("/dashboard/admin");
        } else {
          router.push("/dashboard/student");
        }
      }
    };
    checkUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (authError) {
        if (authError.message === "Invalid login credentials") {
          setError("Invalid email or password. Note: If you just registered, your email might be unconfirmed. Try creating a completely new account.");
        } else {
          setError(authError.message);
        }
        return;
      }

      if (data.user) {
        // Fetch user profile to ensure it exists and get role
        let { data: profile } = await supabase
          .from("profiles")
          .select("id, role")
          .eq("id", data.user.id)
          .maybeSingle();

        let userRole = "student";

        if (!profile) {
          const metadata = data.user.user_metadata || {};
          // Insert into profiles if they don't have one
          const { data: newProfile, error: insertError } = await supabase.from("profiles").insert({
            id: data.user.id,
            full_name: metadata.full_name || "",
            email: data.user.email,
            phone: metadata.phone || "",
            department: metadata.department || "",
            year: metadata.year || "",
          }).select().maybeSingle();
          
          if (newProfile?.role) {
            userRole = newProfile.role;
          } else if (insertError) {
             // eslint-disable-next-line no-console
             console.warn("Profile insertion during login failed:", insertError.message || insertError);
          }
        } else if (profile.role) {
          userRole = profile.role;
        }
        
        // Redirect based on role
        if (userRole === "admin") {
          router.push("/dashboard/admin");
        } else {
          router.push("/dashboard/student");
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Card className="border-border/50 shadow-xl">
          <CardHeader className="items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Dumbbell className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="font-[family-name:var(--font-oswald)] text-2xl uppercase tracking-tight">
              Welcome Back
            </CardTitle>
            <CardDescription>
              Log in to your RIT Gym account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {error && (
                <div className="rounded-lg bg-[#dc2626]/10 px-4 py-3 text-sm text-[#dc2626]">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <Label htmlFor="email">College Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="yourname@ritindia.edu"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                {"Don't have an account? "}
                <Link href="/register" className="font-medium text-primary hover:underline">
                  Sign Up
                </Link>
              </p>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
