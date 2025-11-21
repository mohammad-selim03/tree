"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { DollarSign, Package, ShoppingBag, Users } from "lucide-react"
import { StatCard } from "@/components/features/seller/StatCard"
import { StatCardSkeleton, ChartSkeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/ErrorBoundary"
import { useSellerStats, mockSellerStats } from "@/lib/hooks/queries/useSellerStats"
import { formatPrice } from "@/lib/utils"

export default function SellerDashboardPage() {
    const { data, isLoading, isError, error, refetch } = useSellerStats()

    // Use actual data if available, fallback to mock data
    const stats = data || mockSellerStats
    const usesMockData = !data

    if (isError) {
        return (
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-muted-foreground">
                        Overview of your store's performance
                    </p>
                </div>
                <ErrorState
                    title="Failed to load dashboard"
                    message={error?.message || "Unable to fetch dashboard data"}
                    onRetry={() => refetch()}
                />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header with Glassmorphic Design */}
            <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 rounded-3xl opacity-20 blur-xl" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                    <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
                        Dashboard
                    </h2>
                    <p className="text-white/60 mt-2 text-lg">
                        Overview of your store's performance
                        {usesMockData && (
                            <span className="ml-2 text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                                Using mock data - backend not connected
                            </span>
                        )}
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {isLoading ? (
                    <>
                        <StatCardSkeleton />
                        <StatCardSkeleton />
                        <StatCardSkeleton />
                        <StatCardSkeleton />
                    </>
                ) : (
                    <>
                        <StatCard
                            title="Total Revenue"
                            value={formatPrice(stats.totalRevenue)}
                            icon={DollarSign}
                            trend={{ value: stats.revenueChange, label: "from last month" }}
                            description="from last month"
                        />
                        <StatCard
                            title="Orders"
                            value={`+${stats.totalOrders}`}
                            icon={ShoppingBag}
                            trend={{ value: stats.ordersChange, label: "from last month" }}
                            description="from last month"
                        />
                        <StatCard
                            title="Products"
                            value={stats.totalProducts.toString()}
                            icon={Package}
                            description="Active listings"
                        />
                        <StatCard
                            title="Active Customers"
                            value={`+${stats.activeCustomers}`}
                            icon={Users}
                            description="Total customers"
                        />
                    </>
                )}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Revenue Chart */}
                <div className="group relative col-span-4">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300">
                        <h3 className="text-xl font-bold text-white mb-6">Revenue Overview</h3>
                        <div className="pl-2">
                            {isLoading ? (
                                <ChartSkeleton />
                            ) : (
                                <ResponsiveContainer width="100%" height={350}>
                                    <BarChart data={stats.monthlyRevenue}>
                                        <XAxis
                                            dataKey="month"
                                            stroke="rgba(255,255,255,0.3)"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="rgba(255,255,255,0.3)"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `$${value}`}
                                        />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                            contentStyle={{
                                                backgroundColor: 'rgba(255,255,255,0.1)',
                                                backdropFilter: 'blur(20px)',
                                                border: '1px solid rgba(255,255,255,0.2)',
                                                borderRadius: '12px',
                                                color: 'white',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                                            }}
                                        />
                                        <Bar
                                            dataKey="total"
                                            fill="url(#colorGradient)"
                                            radius={[8, 8, 0, 0]}
                                        />
                                        <defs>
                                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#4ade80" stopOpacity={0.8} />
                                                <stop offset="100%" stopColor="#22c55e" stopOpacity={0.3} />
                                            </linearGradient>
                                        </defs>
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Sales */}
                <div className="group relative col-span-3">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300">
                        <h3 className="text-xl font-bold text-white mb-2">Recent Sales</h3>
                        <p className="text-sm text-white/50 mb-6">
                            {isLoading ? "Loading..." : `You made ${stats.recentSales.length} recent sales.`}
                        </p>
                        <div>
                            {isLoading ? (
                                <div className="space-y-4">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="h-9 w-9 rounded-full bg-white/10 animate-pulse" />
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
                                                <div className="h-3 w-48 bg-white/10 rounded animate-pulse" />
                                            </div>
                                            <div className="h-4 w-20 bg-white/10 rounded animate-pulse" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {stats.recentSales.map((sale, index) => {
                                        const initials = sale.customerName
                                            .split(' ')
                                            .map(n => n[0])
                                            .join('')
                                            .toUpperCase()

                                        const colors = [
                                            'from-emerald-500/30 to-green-500/30 text-green-200',
                                            'from-blue-500/30 to-cyan-500/30 text-blue-200',
                                            'from-yellow-500/30 to-amber-500/30 text-yellow-200',
                                            'from-purple-500/30 to-pink-500/30 text-purple-200',
                                            'from-pink-500/30 to-rose-500/30 text-pink-200',
                                        ]
                                        const colorClass = colors[index % colors.length]

                                        return (
                                            <div key={sale.id} className="flex items-center group/item hover:bg-white/5 p-2 rounded-xl transition-colors duration-200">
                                                <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center font-bold text-sm border border-white/10`}>
                                                    {initials}
                                                </div>
                                                <div className="ml-4 space-y-1 flex-1">
                                                    <p className="text-sm font-medium text-white">
                                                        {sale.customerName}
                                                    </p>
                                                    <p className="text-xs text-white/40">
                                                        {sale.customerEmail}
                                                    </p>
                                                </div>
                                                <div className="font-bold text-green-400">
                                                    +{formatPrice(sale.amount)}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
