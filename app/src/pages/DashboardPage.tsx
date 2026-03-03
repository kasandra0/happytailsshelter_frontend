import { useEffect, useMemo } from "react"
import { format } from "date-fns"
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line,
} from "recharts"
import { PawPrint, Heart, Home, Users } from "lucide-react"
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

const speciesChartConfig: ChartConfig = {
  count: { label: "Animals", color: "var(--chart-4)" },
}

const fosterChartConfig: ChartConfig = {
  placements: { label: "Placements", color: "var(--chart-5)" },
}

const inventoryChartConfig: ChartConfig = {
  quantity: { label: "Quantity", color: "var(--chart-4)" },
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

  useEffect(() => {
    fetchAnimals()
    fetchAllFosterHistory()
    fetchInventoryItems()
  }, [])

  const available = animals.filter((a) => a.status === "A").length
  const fostered = animals.filter((a) => a.status === "F").length
  const adopted = animals.filter((a) => a.status === "X").length

  const statusData = [
    { name: "Available", value: available },
    { name: "Fostered", value: fostered },
    { name: "Adopted", value: adopted },
  ]

  const speciesData = useMemo(() => {
    const map: Record<string, number> = {}
    animals.forEach((a) => {
      const s = a.species || "Unknown"
      map[s] = (map[s] || 0) + 1
    })
    return Object.entries(map)
      .map(([species, count]) => ({ species, count }))
      .sort((a, b) => b.count - a.count)
  }, [animals])

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
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Animals" value={animals.length} icon={<PawPrint className="h-5 w-5" />} />
        <StatCard title="Available" value={available} icon={<Home className="h-5 w-5" />} />
        <StatCard title="Fostered" value={fostered} icon={<Users className="h-5 w-5" />} />
        <StatCard title="Adopted" value={adopted} icon={<Heart className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

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

        <Card>
          <CardHeader>
            <CardTitle>Animals by Species</CardTitle>
            <CardDescription>Count of animals per species</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={speciesChartConfig}>
              <BarChart data={speciesData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="species" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Foster Activity</CardTitle>
            <CardDescription>Monthly foster placements</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={fosterChartConfig}>
              <LineChart data={fosterActivityData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="placements"
                  stroke="var(--color-placements)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

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

      </div>
    </div>
  )
}
