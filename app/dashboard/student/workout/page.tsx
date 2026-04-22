"use client"

import { useAuth } from "@/hooks/use-auth"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, Timer, Flame, Target } from "lucide-react"

const workoutPlans = {
  beginner: {
    label: "Beginner",
    description: "For those new to the gym. 3 days a week.",
    days: [
      {
        name: "Day 1 - Upper Body",
        exercises: [
          { name: "Bench Press (Machine)", sets: "3 x 12", muscle: "Chest" },
          { name: "Lat Pulldown", sets: "3 x 12", muscle: "Back" },
          { name: "Shoulder Press (Machine)", sets: "3 x 10", muscle: "Shoulders" },
          { name: "Bicep Curls", sets: "3 x 12", muscle: "Arms" },
          { name: "Tricep Pushdown", sets: "3 x 12", muscle: "Arms" },
        ],
      },
      {
        name: "Day 2 - Lower Body",
        exercises: [
          { name: "Leg Press", sets: "3 x 12", muscle: "Quads" },
          { name: "Leg Curl (Machine)", sets: "3 x 12", muscle: "Hamstrings" },
          { name: "Leg Extension", sets: "3 x 12", muscle: "Quads" },
          { name: "Calf Raises", sets: "3 x 15", muscle: "Calves" },
          { name: "Plank Hold", sets: "3 x 30s", muscle: "Core" },
        ],
      },
      {
        name: "Day 3 - Full Body",
        exercises: [
          { name: "Cable Rows", sets: "3 x 12", muscle: "Back" },
          { name: "Dumbbell Press", sets: "3 x 10", muscle: "Chest" },
          { name: "Goblet Squats", sets: "3 x 12", muscle: "Legs" },
          { name: "Lateral Raises", sets: "3 x 12", muscle: "Shoulders" },
          { name: "Ab Crunches", sets: "3 x 15", muscle: "Core" },
        ],
      },
    ],
  },
  intermediate: {
    label: "Intermediate",
    description: "Push-Pull-Legs split. 5 days a week.",
    days: [
      {
        name: "Day 1 - Push",
        exercises: [
          { name: "Barbell Bench Press", sets: "4 x 10", muscle: "Chest" },
          { name: "Incline Dumbbell Press", sets: "3 x 12", muscle: "Upper Chest" },
          { name: "Overhead Press", sets: "4 x 10", muscle: "Shoulders" },
          { name: "Cable Flyes", sets: "3 x 12", muscle: "Chest" },
          { name: "Skull Crushers", sets: "3 x 12", muscle: "Triceps" },
          { name: "Lateral Raises", sets: "3 x 15", muscle: "Shoulders" },
        ],
      },
      {
        name: "Day 2 - Pull",
        exercises: [
          { name: "Deadlifts", sets: "4 x 8", muscle: "Back" },
          { name: "Barbell Rows", sets: "4 x 10", muscle: "Back" },
          { name: "Lat Pulldown", sets: "3 x 12", muscle: "Lats" },
          { name: "Face Pulls", sets: "3 x 15", muscle: "Rear Delts" },
          { name: "Barbell Curls", sets: "3 x 12", muscle: "Biceps" },
          { name: "Hammer Curls", sets: "3 x 12", muscle: "Biceps" },
        ],
      },
      {
        name: "Day 3 - Legs",
        exercises: [
          { name: "Barbell Squats", sets: "4 x 10", muscle: "Quads" },
          { name: "Romanian Deadlifts", sets: "4 x 10", muscle: "Hamstrings" },
          { name: "Leg Press", sets: "3 x 12", muscle: "Quads" },
          { name: "Leg Curls", sets: "3 x 12", muscle: "Hamstrings" },
          { name: "Calf Raises", sets: "4 x 15", muscle: "Calves" },
          { name: "Hanging Leg Raise", sets: "3 x 12", muscle: "Core" },
        ],
      },
      {
        name: "Day 4 - Upper",
        exercises: [
          { name: "Dumbbell Bench Press", sets: "4 x 10", muscle: "Chest" },
          { name: "Cable Rows", sets: "4 x 12", muscle: "Back" },
          { name: "Arnold Press", sets: "3 x 10", muscle: "Shoulders" },
          { name: "Dips", sets: "3 x max", muscle: "Triceps" },
          { name: "Preacher Curls", sets: "3 x 12", muscle: "Biceps" },
        ],
      },
      {
        name: "Day 5 - Legs & Core",
        exercises: [
          { name: "Front Squats", sets: "4 x 8", muscle: "Quads" },
          { name: "Hip Thrusts", sets: "3 x 12", muscle: "Glutes" },
          { name: "Walking Lunges", sets: "3 x 10ea", muscle: "Legs" },
          { name: "Leg Extensions", sets: "3 x 15", muscle: "Quads" },
          { name: "Cable Woodchops", sets: "3 x 12ea", muscle: "Core" },
        ],
      },
    ],
  },
  advanced: {
    label: "Advanced",
    description: "High-volume bodybuilding split. 6 days a week.",
    days: [
      {
        name: "Day 1 - Chest & Triceps",
        exercises: [
          { name: "Flat Barbell Bench", sets: "5 x 5", muscle: "Chest" },
          { name: "Incline DB Press", sets: "4 x 10", muscle: "Upper Chest" },
          { name: "Cable Crossovers", sets: "4 x 12", muscle: "Chest" },
          { name: "Close-grip Bench", sets: "4 x 10", muscle: "Triceps" },
          { name: "Overhead Tricep Ext", sets: "3 x 12", muscle: "Triceps" },
          { name: "Dips (Weighted)", sets: "3 x 10", muscle: "Triceps" },
        ],
      },
      {
        name: "Day 2 - Back & Biceps",
        exercises: [
          { name: "Barbell Rows", sets: "5 x 5", muscle: "Back" },
          { name: "Weighted Pull-ups", sets: "4 x 8", muscle: "Lats" },
          { name: "T-Bar Rows", sets: "4 x 10", muscle: "Back" },
          { name: "Straight Arm Pulldown", sets: "3 x 12", muscle: "Lats" },
          { name: "EZ Bar Curls", sets: "4 x 10", muscle: "Biceps" },
          { name: "Concentration Curls", sets: "3 x 12", muscle: "Biceps" },
        ],
      },
      {
        name: "Day 3 - Legs (Quad Focus)",
        exercises: [
          { name: "Back Squats", sets: "5 x 5", muscle: "Quads" },
          { name: "Hack Squat", sets: "4 x 10", muscle: "Quads" },
          { name: "Leg Extension", sets: "4 x 12", muscle: "Quads" },
          { name: "Walking Lunges", sets: "3 x 12ea", muscle: "Legs" },
          { name: "Calf Raises (Seated)", sets: "5 x 15", muscle: "Calves" },
        ],
      },
      {
        name: "Day 4 - Shoulders",
        exercises: [
          { name: "Overhead Press", sets: "5 x 5", muscle: "Shoulders" },
          { name: "DB Lateral Raises", sets: "4 x 15", muscle: "Side Delts" },
          { name: "Reverse Flyes", sets: "4 x 15", muscle: "Rear Delts" },
          { name: "Cable Front Raise", sets: "3 x 12", muscle: "Front Delts" },
          { name: "Shrugs", sets: "4 x 12", muscle: "Traps" },
        ],
      },
      {
        name: "Day 5 - Legs (Hamstring Focus)",
        exercises: [
          { name: "Romanian Deadlifts", sets: "4 x 8", muscle: "Hamstrings" },
          { name: "Lying Leg Curls", sets: "4 x 12", muscle: "Hamstrings" },
          { name: "Hip Thrusts", sets: "4 x 10", muscle: "Glutes" },
          { name: "Bulgarian Squats", sets: "3 x 10ea", muscle: "Legs" },
          { name: "Standing Calf Raise", sets: "5 x 15", muscle: "Calves" },
        ],
      },
      {
        name: "Day 6 - Arms & Core",
        exercises: [
          { name: "Barbell Curls", sets: "4 x 10", muscle: "Biceps" },
          { name: "Skull Crushers", sets: "4 x 10", muscle: "Triceps" },
          { name: "Hammer Curls", sets: "3 x 12", muscle: "Biceps" },
          { name: "Tricep Pushdown", sets: "3 x 12", muscle: "Triceps" },
          { name: "Hanging Leg Raise", sets: "4 x 12", muscle: "Core" },
          { name: "Ab Wheel Rollout", sets: "3 x 10", muscle: "Core" },
        ],
      },
    ],
  },
}

const muscleColors: Record<string, string> = {
  Chest: "bg-[#dc2626]/10 text-[#dc2626]",
  "Upper Chest": "bg-[#dc2626]/10 text-[#dc2626]",
  Back: "bg-[#3b82f6]/10 text-[#3b82f6]",
  Lats: "bg-[#3b82f6]/10 text-[#3b82f6]",
  Shoulders: "bg-primary/10 text-primary",
  "Side Delts": "bg-primary/10 text-primary",
  "Rear Delts": "bg-primary/10 text-primary",
  "Front Delts": "bg-primary/10 text-primary",
  Arms: "bg-[#8b5cf6]/10 text-[#8b5cf6]",
  Biceps: "bg-[#8b5cf6]/10 text-[#8b5cf6]",
  Triceps: "bg-[#8b5cf6]/10 text-[#8b5cf6]",
  Quads: "bg-[#10b981]/10 text-[#10b981]",
  Hamstrings: "bg-[#10b981]/10 text-[#10b981]",
  Legs: "bg-[#10b981]/10 text-[#10b981]",
  Glutes: "bg-[#10b981]/10 text-[#10b981]",
  Calves: "bg-[#10b981]/10 text-[#10b981]",
  Core: "bg-accent/10 text-[#b45309]",
  Traps: "bg-primary/10 text-primary",
}

export default function WorkoutPage() {
  const { user, loading, logout } = useAuth("student")

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <DashboardShell userName={user.name} onLogout={logout}>
      <div className="mb-6">
        <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-tight text-foreground">
          Workout Plans
        </h2>
        <p className="text-muted-foreground">
          Choose a plan that matches your fitness level
        </p>
      </div>

      <Tabs defaultValue="beginner" className="w-full">
        <TabsList className="mb-6 grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {Object.entries(workoutPlans).map(([key, plan]) => (
          <TabsContent key={key} value={key}>
            <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">{plan.label} Plan</h3>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {plan.days.map((day) => (
                <Card key={day.name} className="border-border/50 shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <Dumbbell className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-bold text-foreground">{day.name}</CardTitle>
                        <CardDescription className="text-xs">{day.exercises.length} exercises</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2.5">
                      {day.exercises.map((ex) => (
                        <div
                          key={ex.name}
                          className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2"
                        >
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-medium text-foreground">{ex.name}</span>
                            <div className="flex items-center gap-1.5">
                              <Timer className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{ex.sets}</span>
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className={`text-[10px] ${muscleColors[ex.muscle] || "bg-muted text-muted-foreground"}`}
                          >
                            {ex.muscle}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                      <Flame className="h-3 w-3 text-primary" />
                      <span>Rest 60-90s between sets</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </DashboardShell>
  )
}
