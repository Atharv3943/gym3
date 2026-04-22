"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const strengthEquipment = [
  { sr: 1, name: "Leg Press Machine (Cybex)", qty: 2, cost: "Rs. 3,50,000", date: "2025-06-15" },
  { sr: 2, name: "Smith Machine (Cybex)", qty: 1, cost: "Rs. 4,25,000", date: "2025-06-15" },
  { sr: 3, name: "Lat Pulldown Machine", qty: 2, cost: "Rs. 2,80,000", date: "2025-06-15" },
  { sr: 4, name: "Cable Crossover Machine", qty: 1, cost: "Rs. 3,75,000", date: "2025-07-10" },
  { sr: 5, name: "Chest Press Machine", qty: 2, cost: "Rs. 2,50,000", date: "2025-06-15" },
  { sr: 6, name: "Adjustable Dumbbells (Set)", qty: 20, cost: "Rs. 4,00,000", date: "2025-06-15" },
  { sr: 7, name: "Flat/Incline/Decline Bench", qty: 6, cost: "Rs. 1,80,000", date: "2025-06-15" },
  { sr: 8, name: "Shoulder Press Machine", qty: 2, cost: "Rs. 2,60,000", date: "2025-07-10" },
  { sr: 9, name: "Leg Curl / Extension Machine", qty: 2, cost: "Rs. 3,10,000", date: "2025-06-15" },
  { sr: 10, name: "Olympic Barbell Set", qty: 4, cost: "Rs. 2,40,000", date: "2025-06-15" },
  { sr: 11, name: "Hack Squat Machine", qty: 1, cost: "Rs. 3,90,000", date: "2025-07-10" },
  { sr: 12, name: "Pec Deck Fly Machine", qty: 1, cost: "Rs. 2,75,000", date: "2025-06-15" },
];

const cardioEquipment = [
  { sr: 1, name: "Commercial Treadmill", qty: 6, cost: "Rs. 8,50,000", date: "2025-06-15" },
  { sr: 2, name: "Elliptical Cross Trainer", qty: 4, cost: "Rs. 5,20,000", date: "2025-06-15" },
  { sr: 3, name: "Stationary Exercise Bike", qty: 6, cost: "Rs. 3,60,000", date: "2025-06-15" },
  { sr: 4, name: "Rowing Machine", qty: 3, cost: "Rs. 4,50,000", date: "2025-07-10" },
  { sr: 5, name: "Stair Climber Machine", qty: 2, cost: "Rs. 3,80,000", date: "2025-07-10" },
  { sr: 6, name: "Air Bike (Assault Bike)", qty: 2, cost: "Rs. 2,10,000", date: "2025-08-20" },
  { sr: 7, name: "Spin Bike (Indoor Cycling)", qty: 4, cost: "Rs. 2,80,000", date: "2025-08-20" },
  { sr: 8, name: "Recumbent Exercise Bike", qty: 2, cost: "Rs. 2,40,000", date: "2025-06-15" },
];

function EquipmentTable({
  data,
}: {
  data: typeof strengthEquipment
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/50 bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-border/50 bg-muted/60 hover:bg-muted/60">
            <TableHead className="w-16 text-center text-xs font-bold uppercase tracking-wider text-foreground">
              SR
            </TableHead>
            <TableHead className="text-xs font-bold uppercase tracking-wider text-foreground">
              Equipment Name
            </TableHead>
            <TableHead className="w-16 text-center text-xs font-bold uppercase tracking-wider text-foreground">
              Qty
            </TableHead>
            <TableHead className="text-xs font-bold uppercase tracking-wider text-foreground">
              Cost
            </TableHead>
            <TableHead className="hidden text-xs font-bold uppercase tracking-wider text-foreground sm:table-cell">
              Purchase Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={item.sr}
              className={`border-border/30 transition-colors ${
                index % 2 === 0 ? "bg-card" : "bg-muted/20"
              }`}
            >
              <TableCell className="text-center font-medium text-primary">
                {String(item.sr).padStart(2, "0")}
              </TableCell>
              <TableCell className="font-medium text-foreground">
                {item.name}
              </TableCell>
              <TableCell className="text-center text-muted-foreground">
                {item.qty}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {item.cost}
              </TableCell>
              <TableCell className="hidden text-muted-foreground sm:table-cell">
                {item.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function EquipmentSection() {
  return (
    <section id="equipment" className="bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            Infrastructure
          </span>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
            Gym Equipment
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary" />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="strength" className="w-full">
          <div className="mb-8 flex justify-center">
            <TabsList className="h-11 bg-muted p-1">
              <TabsTrigger value="strength" className="px-6 text-sm font-semibold">
                Strength Equipment
              </TabsTrigger>
              <TabsTrigger value="cardio" className="px-6 text-sm font-semibold">
                Cardio Equipment
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="strength">
            <EquipmentTable data={strengthEquipment} />
          </TabsContent>
          <TabsContent value="cardio">
            <EquipmentTable data={cardioEquipment} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
