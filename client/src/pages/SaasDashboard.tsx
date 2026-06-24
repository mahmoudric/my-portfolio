import { Button } from "@/components/ui/button";
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
  Filter,
  Calendar,
  Settings,
  Bell,
  User,
  Menu,
  X,
} from "lucide-react";

/**
 * SaaS Dashboard - Interactive Demo with Real-Time Updates
 * Features: Live data updates, smooth animations, responsive design, interactive charts
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

const REVENUE_DATA_BASE: ChartDataPoint[] = [
  { name: "Jan", value: 4000, revenue: 2400, users: 2210 },
  { name: "Feb", value: 3000, revenue: 1398, users: 2290 },
  { name: "Mar", value: 2000, revenue: 9800, users: 2000 },
  { name: "Apr", value: 2780, revenue: 3908, users: 2108 },
  { name: "May", value: 1890, revenue: 4800, users: 2200 },
  { name: "Jun", value: 2390, revenue: 3800, users: 2250 },
];

const CONVERSION_DATA_BASE: ChartDataPoint[] = [
  { name: "Week 1", conversions: 65 },
  { name: "Week 2", conversions: 78 },
  { name: "Week 3", conversions: 72 },
  { name: "Week 4", conversions: 85 },
  { name: "Week 5", conversions: 92 },
  { name: "Week 6", conversions: 88 },
];

const USER_DISTRIBUTION: ChartDataPoint[] = [
  { name: "Free Plan", percentage: 45 },
  { name: "Pro Plan", percentage: 35 },
  { name: "Enterprise", percentage: 20 },
];

const TRAFFIC_DATA_BASE: ChartDataPoint[] = [
  { name: "Mon", value: 4000 },
  { name: "Tue", value: 3000 },
  { name: "Wed", value: 2000 },
  { name: "Thu", value: 2780 },
  { name: "Fri", value: 1890 },
  { name: "Sat", value: 2390 },
  { name: "Sun", value: 3490 },
];

const COLORS = ["#d97706", "#f59e0b", "#10b981"];

// Helper function to add variation to data for real-time effect
const addVariation = (data: ChartDataPoint[], variation: number = 0.1) => {
  return data.map((point) => ({
    ...point,
    value: point.value ? Math.round(point.value * (1 + (Math.random() - 0.5) * variation)) : undefined,
    revenue: point.revenue ? Math.round(point.revenue * (1 + (Math.random() - 0.5) * variation)) : undefined,
    users: point.users ? Math.round(point.users * (1 + (Math.random() - 0.5) * variation)) : undefined,
    conversions: point.conversions ? Math.round(point.conversions * (1 + (Math.random() - 0.5) * variation)) : undefined,
  }));
};

export default function SaasDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [revenueData, setRevenueData] = useState(REVENUE_DATA_BASE);
  const [conversionData, setConversionData] = useState(CONVERSION_DATA_BASE);
  const [trafficData, setTrafficData] = useState(TRAFFIC_DATA_BASE);
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [animationKey, setAnimationKey] = useState(0);

  // Initialize metrics
  useEffect(() => {
    const initialMetrics: DashboardMetric[] = [
      {
        label: "Total Revenue",
        value: "$45,231.89",
        change: 20.1,
        icon: <DollarSign className="w-6 h-6" />,
        color: "bg-blue-50 text-blue-600",
      },
      {
        label: "Active Users",
        value: "12,543",
        change: 15.3,
        icon: <Users className="w-6 h-6" />,
        color: "bg-green-50 text-green-600",
      },
      {
        label: "Conversion Rate",
        value: "3.24%",
        change: 4.3,
        icon: <TrendingUp className="w-6 h-6" />,
        color: "bg-purple-50 text-purple-600",
      },
      {
        label: "System Status",
        value: "99.8%",
        change: 0.1,
        icon: <Activity className="w-6 h-6" />,
        color: "bg-orange-50 text-orange-600",
      },
    ];
    setMetrics(initialMetrics);
  }, []);

  // Real-time data update effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Update chart data with slight variations
      setRevenueData(addVariation(REVENUE_DATA_BASE, 0.08));
      setConversionData(addVariation(CONVERSION_DATA_BASE, 0.12));
      setTrafficData(addVariation(TRAFFIC_DATA_BASE, 0.1));
      
      // Update metrics with slight variations
      setMetrics((prevMetrics) =>
        prevMetrics.map((metric) => {
          const changeVariation = (Math.random() - 0.5) * 2;
          return {
            ...metric,
            change: Math.max(0, metric.change + changeVariation),
          };
        })
      );

      // Trigger animation key change for smooth transitions
      setAnimationKey((prev) => prev + 1);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

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
                  Welcome back! Here's your performance overview. Data updates every 3 seconds.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors">
                  <Calendar className="w-4 h-4" />
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="bg-transparent outline-none text-sm font-medium"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="1y">Last year</option>
                  </select>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-colors">
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
                  className={`p-6 rounded-lg border transition-all duration-500 cursor-pointer transform hover:scale-105 ${
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
                    data={revenueData}
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
                    data={conversionData}
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
                  <h2 className="text-lg font-bold">Weekly Traffic</h2>
                  <div className="animate-pulse w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={trafficData}
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
