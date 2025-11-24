"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle2, XCircle, Clock, AlertCircle, Search, Loader2 } from "lucide-react"
import { useVerifications } from "@/lib/hooks/queries/useVerifications"

type VerificationStatus = 'PENDING' | 'VERIFIED' | 'MISMATCH' | 'FLAGGED'

export default function VerificationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<'ALL' | VerificationStatus>('ALL')

  // Fetch real data from API
  const { data, isLoading, isError } = useVerifications({
    status: filter === 'ALL' ? undefined : filter,
    limit: 50,
  })

  const verifications = data?.verifications || []
  const stats = data?.stats || {
    total: 0,
    VERIFIED: 0,
    MISMATCH: 0,
    PENDING: 0,
    FLAGGED: 0,
  }

  const filteredVerifications = verifications.filter(v => {
    const matchesSearch = v.listingTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.claimedSpecies.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.claimedCommonName || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const getStatusIcon = (status: VerificationStatus) => {
    switch (status) {
      case 'VERIFIED': return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case 'MISMATCH': return <XCircle className="h-4 w-4 text-red-600" />
      case 'PENDING': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'FLAGGED': return <AlertCircle className="h-4 w-4 text-orange-600" />
    }
  }

  const getStatusBadge = (status: VerificationStatus) => {
    const variants = {
      VERIFIED: 'bg-green-100 text-green-800 border-green-200',
      MISMATCH: 'bg-red-100 text-red-800 border-red-200',
      PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      FLAGGED: 'bg-orange-100 text-orange-800 border-orange-200',
    }
    return (
      <Badge variant="outline" className={variants[status]}>
        {status}
      </Badge>
    )
  }

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">AI Verification Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Monitor and review AI-powered species verification results
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Analyzed</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              Verified
            </CardDescription>
            <CardTitle className="text-3xl text-green-600">{stats.VERIFIED}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              Mismatches
            </CardDescription>
            <CardTitle className="text-3xl text-red-600">{stats.MISMATCH}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              Pending
            </CardDescription>
            <CardTitle className="text-3xl text-yellow-600">{stats.PENDING}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by listing or species..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {(['ALL', 'VERIFIED', 'MISMATCH', 'PENDING'] as const).map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(f)}
                >
                  {f}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {isError && (
            <div className="text-center py-12 text-red-600">
              Failed to load verification data
            </div>
          )}

          {!isLoading && !isError && (
            <div className="space-y-4">
              {filteredVerifications.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No verifications found matching your criteria
                </div>
              ) : (
                filteredVerifications.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Image */}
                        <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                          <img src={item.imageUrl} alt={item.listingTitle} className="w-full h-full object-cover" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{item.listingTitle}</h3>
                              <p className="text-sm text-muted-foreground">
                                Claimed: <span className="font-medium">{item.claimedCommonName}</span>
                                {' '}
                                <span className="text-xs">({item.claimedSpecies})</span>
                              </p>
                            </div>
                            {getStatusBadge(item.status)}
                          </div>

                          {item.detectedSpecies && (
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(item.status)}
                                <span>
                                  Detected: <span className="font-medium">{item.detectedSpecies}</span>
                                </span>
                              </div>
                              {item.confidence && (
                                <div className="text-muted-foreground">
                                  Confidence: <span className="font-medium">{(item.confidence * 100).toFixed(1)}%</span>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="flex items-center gap-4 mt-3">
                            <span className="text-xs text-muted-foreground">
                              {new Date(item.createdAt).toLocaleString()}
                            </span>
                            {item.status === 'MISMATCH' && (
                              <Button size="sm" variant="outline">
                                Review
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
