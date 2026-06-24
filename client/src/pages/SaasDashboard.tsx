import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  ChevronLeft,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Download,
  Calendar,
  Settings,
  Bell,
  User,
  Menu,
  X,
} from "lucide-react";

/**
 * SaaS Dashboard - Professional Demo with Time Range Filtering
 * Features: Time range filtering, dynamic data updates, smooth animations, responsive design
 */

interface DashboardMetric {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface ChartDataPoint {
  name: string;
  value?: number;
  revenue?: number;
  users?: number;
  conversions?: number;
  percentage?: number;
}

// Data for different time ranges
const DATA_BY_RANGE = {
  "7d": {
    revenue: [
      { name: "Mon", value: 3200, revenue: 1800, users: 1200 },
      { name: "Tue", value: 2800, revenue: 1500, users: 1100 },
      { name: "Wed", value: 3500, revenue: 2100, users: 1350 },
      { name: "Thu", value: 4100, revenue: 2400, users: 1500 },
      { name: "Fri", value: 3900, revenue: 2200, users: 1450 },
      { name: "Sat", value: 2600, revenue: 1400, users: 950 },
      { name: "Sun", value: 2900, revenue: 1600, users: 1050 },
    ],
    conversion: [
      { name: "Day 1", conversions: 45 },
      { name: "Day 2", conversions: 52 },
      { name: "Day 3", conversions: 48 },
      { name: "Day 4", conversions: 61 },
      { name: "Day 5", conversions: 58 },
      { name: "Day 6", conversions: 42 },
      { name: "Day 7", conversions: 55 },
    ],
    traffic: [
      { name: "Mon", value: 2400 },
      { name: "Tue", value: 2100 },
      { name: "Wed", value: 2800 },
      { name: "Thu", value: 3200 },
      { name: "Fri", value: 2900 },
      { name: "Sat", value: 1800 },
      { name: "Sun", value: 2200 },
    ],
    metrics: {
      revenue: "$28,500",
      revenueChange: 18.5,
      users: "8,450",
      usersChange: 12.3,
      conversion: "2.85%",
      conversionChange: 3.2,
      status: "99.9%",
      statusChange: 0.1,
    },
  },
  "30d": {
    revenue: [
      { name: "Week 1", value: 12500, revenue: 7200, users: 4500 },
      { name: "Week 2", value: 13200, revenue: 7800, users: 4800 },
      { name: "Week 3", value: 11800, revenue: 6900, users: 4200 },
      { name: "Week 4", value: 14100, revenue: 8400, users: 5100 },
    ],
    conversion: [
      { name: "Week 1", conversions: 65 },
      { name: "Week 2", conversions: 72 },
      { name: "Week 3", conversions: 68 },
      { name: "Week 4", conversions: 78 },
    ],
    traffic: [
      { name: "Week 1", value: 8500 },
      { name: "Week 2", value: 9200 },
      { name: "Week 3", value: 8100 },
      { name: "Week 4", value: 9800 },
    ],
    metrics: {
      revenue: "$118,450",
      revenueChange: 20.1,
      users: "38,500",
      usersChange: 15.3,
      conversion: "3.24%",
      conversionChange: 4.3,
      status: "99.8%",
      statusChange: 0.1,
    },
  },
  "90d": {
    revenue: [
      { name: "Jan", value: 28000, revenue: 16200, users: 10500 },
      { name: "Feb", value: 32000, revenue: 18500, users: 12000 },
      { name: "Mar", value: 35500, revenue: 20800, users: 13500 },
    ],
    conversion: [
      { name: "Jan", conversions: 72 },
      { name: "Feb", conversions: 78 },
      { name: "Mar", conversions: 85 },
    ],
    traffic: [
      { name: "Jan", value: 22000 },
      { name: "Feb", value: 25500 },
      { name: "Mar", value: 28000 },
    ],
    metrics: {
      revenue: "$325,800",
      revenueChange: 28.5,
      users: "92,500",
      usersChange: 22.8,
      conversion: "3.65%",
      conversionChange: 6.2,
      status: "99.7%",
      statusChange: 0.2,
    },
  },
  "1y": {
    revenue: [
      { name: "Q1", value: 95500, revenue: 55500, users: 36000 },
      { name: "Q2", value: 102000, revenue: 59200, users: 38500 },
      { name: "Q3", value: 98500, revenue: 57100, users: 37000 },
      { name: "Q4", value: 115000, revenue: 66800, users: 42500 },
    ],
    conversion: [
      { name: "Q1", conversions: 75 },
      { name: "Q2", conversions: 82 },
      { name: "Q3", conversions: 78 },
      { name: "Q4", conversions: 88 },
    ],
    traffic: [
      { name: "Q1", value: 65000 },
      { name: "Q2", value: 72000 },
      { name: "Q3", value: 68000 },
      { name: "Q4", value: 78000 },
    ],
    metrics: {
      revenue: "$1,245,600",
      revenueChange: 35.2,
      users: "285,000",
      usersChange: 32.5,
      conversion: "3.82%",
      conversionChange: 8.1,
      status: "99.6%",
      statusChange: 0.3,
    },
  },
};

const USER_DISTRIBUTION: ChartDataPoint[] = [
  { name: "Free Plan", percentage: 45 },
  { name: "Pro Plan", percentage: 35 },
  { name: "Enterprise", percentage: 20 },
];

const COLORS = ["#d97706", "#f59e0b", "#10b981"];

export default function SaasDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("30d");
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Get data based on selected time range
  const currentData = DATA_BY_RANGE[timeRange];

  // Real-time data update effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const metrics: DashboardMetric[] = [
    {
      label: "Total Revenue",
      value: currentData.metrics.revenue,
      change: currentData.metrics.revenueChange,
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Active Users",
      value: currentData.metrics.users,
      change: currentData.metrics.usersChange,
      icon: <Users className="w-6 h-6" />,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Conversion Rate",
      value: currentData.metrics.conversion,
      change: currentData.metrics.conversionChange,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "System Status",
      value: currentData.metrics.status,
      change: currentData.metrics.statusChange,
      icon: <Activity className="w-6 h-6" />,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-secondary rounded-lg transition-colors lg:hidden"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <a
              href="/"
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Portfolio
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/90 transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-0"
          } transition-all duration-300 border-r border-border bg-card overflow-hidden`}
        >
          <nav className="p-6 space-y-4">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-6">
              Main Menu
            </div>
            {[
              "Dashboard",
              "Analytics",
              "Reports",
              "Users",
              "Settings",
            ].map((item) => (
              <button
                key={item}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-secondary transition-colors text-sm font-medium"
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1
                  className="text-3xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Performance overview for the selected period
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Time Range Selector - Redesigned */}
                <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1">
                  {(["7d", "30d", "90d", "1y"] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                        timeRange === range
                          ? "bg-accent text-accent-foreground shadow-md"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      {range === "7d"
                        ? "Last 7 Days"
                        : range === "30d"
                        ? "Last 30 Days"
                        : range === "90d"
                        ? "Last 90 Days"
                        : "Last Year"}
                    </button>
                  ))}
                </div>

                {/* Export Button - Redesigned */}
                <button className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-all font-medium shadow-sm hover:shadow-md">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMetric(metric.label)}
                  className={`p-6 rounded-lg border transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    selectedMetric === metric.label
                      ? "border-accent bg-accent/5 shadow-lg"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${metric.color}`}>
                      {metric.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">
                        +{metric.change.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {metric.label}
                  </div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                </button>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trend */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">Revenue Trend</h2>
                  <div className="animate-pulse w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={currentData.revenue}
                    key={`revenue-${animationKey}`}
                  >
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#d4af37"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                      animationDuration={800}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Plan Distribution */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">Plan Distribution</h2>
                  <div className="animate-pulse w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={USER_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                      animationDuration={800}
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Conversion Rate */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">Conversion Rate</h2>
                  <div className="animate-pulse w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={currentData.conversion}
                    key={`conversion-${animationKey}`}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="conversions"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: "#10b981", r: 4 }}
                      activeDot={{ r: 6 }}
                      animationDuration={800}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Weekly Traffic */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">Traffic</h2>
                  <div className="animate-pulse w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={currentData.traffic}
                    key={`traffic-${animationKey}`}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="#f59e0b"
                      radius={[8, 8, 0, 0]}
                      animationDuration={800}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { action: "New user signup", user: "John Doe", time: "2 hours ago" },
                  { action: "Payment received", user: "$1,200 from Acme Corp", time: "4 hours ago" },
                  { action: "Plan upgraded", user: "Sarah Smith", time: "6 hours ago" },
                  { action: "Report generated", user: "Monthly Analytics", time: "1 day ago" },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.user}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-muted-foreground py-8">
              <p>
                This is an interactive demo showcasing React.js data visualization capabilities and responsive dashboard design patterns.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
