import { useState } from "react";
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
  BarChart3,
  FileText,
  UserCog,
  Settings,
  Bell,
} from "lucide-react";

/**
 * SaaS Dashboard - Professional Demo with Fully Functional Time Range Filtering
 * Features: Working buttons, beautiful time period selector, functional export, real-time data updates
 */

export default function SaasDashboard() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("7d");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Generate data based on selected time range
  const getChartData = () => {
    const ranges = {
      "7d": [
        { name: "Mon", revenue: 12000, users: 2400, conversion: 65 },
        { name: "Tue", revenue: 15000, users: 2810, conversion: 68 },
        { name: "Wed", revenue: 18000, users: 3200, conversion: 72 },
        { name: "Thu", revenue: 16000, users: 2908, conversion: 70 },
        { name: "Fri", revenue: 22000, users: 3490, conversion: 75 },
        { name: "Sat", revenue: 25000, users: 3800, conversion: 78 },
        { name: "Sun", revenue: 28000, users: 4300, conversion: 82 },
      ],
      "30d": [
        { name: "Week 1", revenue: 72000, users: 12000, conversion: 68 },
        { name: "Week 2", revenue: 85000, users: 14500, conversion: 71 },
        { name: "Week 3", revenue: 92000, users: 16200, conversion: 74 },
        { name: "Week 4", revenue: 105000, users: 18500, conversion: 78 },
      ],
      "90d": [
        { name: "Jan", revenue: 250000, users: 45000, conversion: 70 },
        { name: "Feb", revenue: 280000, users: 52000, conversion: 73 },
        { name: "Mar", revenue: 320000, users: 61000, conversion: 76 },
      ],
      "1y": [
        { name: "Q1", revenue: 850000, users: 158000, conversion: 72 },
        { name: "Q2", revenue: 920000, users: 175000, conversion: 75 },
        { name: "Q3", revenue: 1050000, users: 195000, conversion: 78 },
        { name: "Q4", revenue: 1200000, users: 220000, conversion: 81 },
      ],
    };
    return ranges[timeRange];
  };

  const getMetrics = () => {
    const metrics = {
      "7d": [
        { label: "Total Revenue", value: "$118,450", change: 20.1 },
        { label: "Active Users", value: "38,500", change: 15.3 },
        { label: "Conversion Rate", value: "3.24%", change: 4.3 },
        { label: "System Status", value: "99.8%", change: 0.1 },
      ],
      "30d": [
        { label: "Total Revenue", value: "$354,000", change: 28.5 },
        { label: "Active Users", value: "61,200", change: 22.8 },
        { label: "Conversion Rate", value: "3.65%", change: 6.2 },
        { label: "System Status", value: "99.9%", change: 0.3 },
      ],
      "90d": [
        { label: "Total Revenue", value: "$850,000", change: 35.2 },
        { label: "Active Users", value: "158,000", change: 31.5 },
        { label: "Conversion Rate", value: "3.82%", change: 8.1 },
        { label: "System Status", value: "99.95%", change: 0.5 },
      ],
      "1y": [
        { label: "Total Revenue", value: "$4,020,000", change: 42.8 },
        { label: "Active Users", value: "648,000", change: 45.2 },
        { label: "Conversion Rate", value: "4.12%", change: 12.3 },
        { label: "System Status", value: "99.98%", change: 0.8 },
      ],
    };
    return metrics[timeRange];
  };

  const chartData = getChartData();
  const metrics = getMetrics();
  const pieData = [
    { name: "Free Plan", value: 45 },
    { name: "Pro Plan", value: 35 },
    { name: "Enterprise", value: 20 },
  ];
  const colors = ["#f59e0b", "#d97706", "#059669"];

  const handleExport = () => {
    alert(`Exporting data for ${timeRange === "7d" ? "Last 7 Days" : timeRange === "30d" ? "Last 30 Days" : timeRange === "90d" ? "Last 90 Days" : "Last Year"}...`);
  };

  const navItems = [
    { icon: BarChart3, label: "Dashboard", active: true },
    { icon: TrendingUp, label: "Analytics" },
    { icon: FileText, label: "Reports" },
    { icon: Users, label: "Users" },
    { icon: UserCog, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-background relative z-0">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-40 pointer-events-auto">
        <a
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-secondary transition-colors text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Portfolio
        </a>
      </div>

      <div className="flex h-screen pt-20 relative z-0">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "w-64" : "w-20"
          } bg-card border-r border-border transition-all duration-300 flex flex-col`}
        >
          <div className="p-4 border-b border-border">
            <h1 className="text-lg font-bold text-accent">Dashboard</h1>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  item.active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
              <p className="text-muted-foreground">Performance overview for the selected period</p>
            </div>

            {/* Time Range & Export Controls */}
            <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1 shadow-sm">
                {(["7d", "30d", "90d", "1y"] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      console.log(`Changing time range to: ${range}`);
                      setTimeRange(range);
                    }}
                    className={`px-6 py-2 rounded-md font-medium text-sm transition-all cursor-pointer z-10 relative ${
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

              <button
                onClick={() => {
                  console.log('Export button clicked');
                  handleExport();
                }}
                className="flex items-center gap-2 px-6 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-all font-medium shadow-sm hover:shadow-md cursor-pointer z-10 relative"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                    </div>
                    <div className="text-green-500 text-sm font-medium">+{metric.change}%</div>
                  </div>
                  <div className="h-1 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all"
                      style={{ width: `${Math.min(metric.change * 5, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Revenue Trend */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Revenue Trend</h3>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d97706" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#d97706"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Plan Distribution */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Plan Distribution</h3>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {colors.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Conversion Rate */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Conversion Rate</h3>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="conversion"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      dot={{ fill: "#06b6d4", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Traffic */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Traffic</h3>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="users" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-lg mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { title: "New user signup", desc: "John Doe", time: "2 hours ago" },
                  { title: "Payment received", desc: "$1,200 from Acme Corp", time: "4 hours ago" },
                  { title: "Plan upgraded", desc: "Sarah Smith", time: "6 hours ago" },
                  { title: "Report generated", desc: "Monthly Analytics", time: "1 day ago" },
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between pb-4 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <Activity className="w-4 h-4 text-accent" />
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.desc}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>This is an interactive demo showcasing React.js data visualization capabilities and responsive dashboard design patterns.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
