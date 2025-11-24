"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Package,
  CheckCircle2,
  XCircle,
  Sparkles,
  BarChart3,
  Calendar
} from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

interface AnalyticsData {
  overview: {
    totalListings: number
    activeListings: number
    totalViews: number
    averagePrice: number
  }
  verification: {
    totalImages: number
    verifiedCount: number
    mismatchCount: number
    pendingCount: number
    verificationRate: number
  }
  carePlans: {
    totalGenerated: number
    uniqueSpecies: number
  }
  trends: {
    viewTrend: Array<{ date: string; views: number }>
    listingTrend: Array<{ date: string; count: number }>
  }
  performance: {
    topListings: Array<{
      id: string
      title: string
      views: number
      verificationStatus: string | null
    }>
  }
}

export default function AnalyticsDashboard() {
  const [period, setPeriod] = useState('30d')
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  const fetchAnalytics = async () => {
    setIsLoading(true)
    try {
      // Mock seller ID - in production, get from auth
      const sellerId = 'seller-1'
      const res = await fetch(`/api/v1/analytics?sellerId=${sellerId}&period=${period}`)
      const data = await res.json()
      if (data.success) {
        setAnalytics(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading || !analytics) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4" />
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#6366f1']

  const verificationData = [
    { name: 'Verified', value: analytics.verification.verifiedCount, color: COLORS[0] },
    { name: 'Mismatch', value: analytics.verification.mismatchCount, color: COLORS[1] },
    { name: 'Pending', value: analytics.verification.pendingCount, color: COLORS[2] },
  ]

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Track your listings, AI features, and performance
          </p>
        </div>
        <div className="flex gap-2">
          {['7d', '30d', '90d'].map((p) => (
            <Button
              key={p}
              variant={period === p ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod(p)}
            >
              Last {p}
            </Button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Total Listings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.overview.totalListings}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {analytics.overview.activeListings} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Total Views
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.overview.totalViews.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              +12% vs last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              Verification Rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.verification.verificationRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {analytics.verification.verifiedCount} / {analytics.verification.totalImages} verified
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-600" />
              Care Plans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.carePlans.totalGenerated}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {analytics.carePlans.uniqueSpecies} unique species
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="views" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="views">Views</TabsTrigger>
          <TabsTrigger value="verification">AI Verification</TabsTrigger>
          <TabsTrigger value="performance">Top Listings</TabsTrigger>
        </TabsList>

        <TabsContent value="views" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>View Trends</CardTitle>
              <CardDescription>Daily views over the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analytics.trends.viewTrend}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    stroke="#9ca3af"
                    fontSize={12}
                  />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorViews)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Verification Status</CardTitle>
                <CardDescription>AI image verification results</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={verificationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {verificationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification Breakdown</CardTitle>
                <CardDescription>Detailed counts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Verified</span>
                  </div>
                  <span className="text-2xl font-bold">{analytics.verification.verifiedCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="font-medium">Mismatch</span>
                  </div>
                  <span className="text-2xl font-bold">{analytics.verification.mismatchCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium">Pending</span>
                  </div>
                  <span className="text-2xl font-bold">{analytics.verification.pendingCount}</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Success Rate</span>
                    <span className="text-2xl font-bold text-green-600">
                      {analytics.verification.verificationRate}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Listings</CardTitle>
              <CardDescription>Your most viewed listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.performance.topListings.map((listing, index) => (
                  <div
                    key={listing.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:border-green-500 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{listing.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {listing.views} views
                          </span>
                          {listing.verificationStatus === 'VERIFIED' && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
