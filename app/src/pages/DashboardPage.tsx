import { useEffect, useMemo, useState } from "react"
import { getCurrentUser } from "@/services/userService"
import type { User } from "@/types/types"
import { format } from "date-fns"
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts"
import { PawPrint, Heart, Home, Users, PackageOpen } from "lucide-react"
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card"
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
  ChartLegend, ChartLegendContent, type ChartConfig,
} from "@/components/ui/chart"
import { useAnimalStore } from "@/store/animals/animalStore"
import { useFosterHistoryStore } from "@/store/fosterhistory/fosterHistoryStore"
import { useInventoryItemStore } from "@/store/inventoryItems/inventoryItemsStore"
import { useInventoryCheckoutStore } from "@/store/inventoryCheckout/inventoryCheckoutStore"
import { useIsMobile } from "@/hooks/useMobile"

const STATUS_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
]

const statusChartConfig: ChartConfig = {
  Available: { label: "Available", color: "var(--chart-1)" },
  Fostered: { label: "Fostered", color: "var(--chart-2)" },
  Adopted: { label: "Adopted", color: "var(--chart-3)" },
}

const inventoryChartConfig: ChartConfig = {
  quantity: { label: "Quantity", color: "var(--chart-4)" },
}

const rentedOutChartConfig: ChartConfig = {
  quantity: { label: "Rented Out", color: "var(--chart-1)" },
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string
  value: number
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 pt-6">
        <div className="rounded-full bg-muted p-3 text-muted-foreground">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardPage() {
  const { animals, fetchAnimals } = useAnimalStore()
  const { fosterHistory, fetchAllFosterHistory } = useFosterHistoryStore()
  const { inventoryItems, fetchInventoryItems } = useInventoryItemStore()
  const { inventoryCheckouts, fetchInventoryCheckouts } = useInventoryCheckoutStore()

  const isMobile = useIsMobile()
  const [currentUser, setCurrentUser] = useState<User | null>(null)

useEffect(() => {
  fetchAnimals();
  fetchAllFosterHistory();
  fetchInventoryItems();
  fetchInventoryCheckouts();
  getCurrentUser()
    .then((user) => setCurrentUser(user))
    .catch((err) => console.error("Failed to fetch user:", err));
  }, []);

  const available = animals.filter((a) => a.status === "A").length
  const fostered = animals.filter((a) => a.status === "F").length
  const adopted = animals.filter((a) => a.status === "X").length

  const statusData = [
    { name: "Available", value: available },
    { name: "Fostered", value: fostered },
    { name: "Adopted", value: adopted },
  ]

  const fosterActivityData = useMemo(() => {
    const map: Record<string, number> = {}
    fosterHistory.forEach((f) => {
      if (!f.start_date) return
      const month = format(new Date(f.start_date as unknown as string), "MMM yyyy")
      map[month] = (map[month] || 0) + 1
    })
    return Object.entries(map)
      .map(([month, placements]) => ({ month, placements }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
  }, [fosterHistory])

  const rentedOutByItemId = useMemo(() => {
    const now = new Date();
    const map = new Map<number, number>();
    for (const c of inventoryCheckouts) {
      const returnDate = c.return_date as unknown as Date | null;
      const isActive = returnDate === null || new Date(returnDate) > now;
      if (isActive) {
        map.set(c.inventory_item_id, (map.get(c.inventory_item_id) ?? 0) + c.quantity);
      }
    }
    return map;
  }, [inventoryCheckouts]);

  const totalCheckedOut = useMemo(() => {
    let sum = 0
    rentedOutByItemId.forEach((qty) => { sum += qty })
    return sum
  }, [rentedOutByItemId])

  const rentedOutData = useMemo(() => {
    return inventoryItems
      .filter((item) => rentedOutByItemId.has(item.inventory_item_id))
      .map((item) => ({
        name: item.name,
        quantity: rentedOutByItemId.get(item.inventory_item_id)!,
      }))
      .sort((a, b) => b.quantity - a.quantity)
  }, [inventoryItems, rentedOutByItemId])

  const inventoryByType = useMemo(() => {
    const map: Record<string, number> = {}
    inventoryItems.forEach((item) => {
      const t = item.type || "Unknown"
      map[t] = (map[t] || 0) + (item.quantity || 0)
    })
    return Object.entries(map).map(([type, quantity]) => ({ type, quantity }))
  }, [inventoryItems])

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {currentUser && (
        <h2 className="text-xl font-semibold mb-4">
          Welcome, {currentUser.first_name}!
        </h2>
      )}

      <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-4"}`}>
        <StatCard title="Total Animals" value={available + fostered} icon={<PawPrint className="h-5 w-5" />} />
        <StatCard title="Available" value={available} icon={<Home className="h-5 w-5" />} />
        <StatCard title="Fostered" value={fostered} icon={<Users className="h-5 w-5" />} />
        <StatCard title="Items Checked Out" value={totalCheckedOut} icon={<PackageOpen className="h-5 w-5" />} />
      </div>

      {!isMobile && <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Inventory by Type</CardTitle>
            <CardDescription>Total quantity per item type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={inventoryChartConfig}>
              <BarChart data={inventoryByType} layout="vertical">
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} allowDecimals={false} />
                <YAxis dataKey="type" type="category" width={90} tickLine={false} axisLine={false} interval={0} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="quantity" fill="var(--color-quantity)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle>Items Currently Rented Out</CardTitle>
            <CardDescription>Active checkouts by item</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={rentedOutChartConfig}>
              <BarChart data={rentedOutData} layout="vertical">
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} allowDecimals={false} />
                <YAxis dataKey="name" type="category" width={120} tickLine={false} axisLine={false} interval={0} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="quantity" fill="var(--color-quantity)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Animal Status</CardTitle>
            <CardDescription>Breakdown by status</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={statusChartConfig}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  nameKey="name"
                >
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={STATUS_COLORS[i]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                <ChartLegend content={<ChartLegendContent nameKey="name" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>




      </div>}
    </div>
  )
}
