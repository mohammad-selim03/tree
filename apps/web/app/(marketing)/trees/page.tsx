"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, SlidersHorizontal, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductFilters } from "@/components/features/products/ProductFilters"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ProductCardSkeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/ErrorBoundary"
import { useListings } from "@/lib/hooks/queries/useListings"
import { formatPrice } from "@/lib/utils"

// Mock data fallback (remove when backend is fully connected)
const mockProducts = [
  { id: '1', title: 'Japanese Maple', price: 149.99, images: ['🍁'], category: 'Ornamental' },
  { id: '2', title: 'Blue Spruce', price: 89.99, images: ['🌲'], category: 'Evergreen' },
  { id: '3', title: 'Apple Tree', price: 129.99, images: ['🍎'], category: 'Fruit' },
  { id: '4', title: 'Red Oak', price: 199.99, images: ['🌳'], category: 'Shade' },
  { id: '5', title: 'Cherry Blossom', price: 179.99, images: ['🌸'], category: 'Ornamental' },
  { id: '6', title: 'Pine Tree', price: 69.99, images: ['🌲'], category: 'Evergreen' },
]

export default function TreesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch listings from backend
  const { data, isLoading, isError, error, refetch } = useListings({
    status: 'active',
    search: searchQuery || undefined,
  })

  // Use actual data if available, fallback to mock data
  const products = data?.listings || mockProducts
  const usesMockData = !data

  const filteredProducts = searchQuery && usesMockData
    ? products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : products

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1f0f] via-[#1a2f1a] to-[#0f1f0f] relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-[#4a7c2d]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-[#2d5016]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4a7c2d]/5 rounded-full blur-[150px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container py-12">
        {/* Header Section */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-12">
          {/* Title */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 rounded-2xl opacity-20 blur-xl" />
            <div className="relative">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
                All Trees
              </h1>
              <p className="text-white/60 mt-2 text-lg">
                Browse our collection of premium trees
                {usesMockData && (
                  <span className="ml-2 text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                    Using mock data
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-[350px] group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-all duration-300" />
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-white/40" />
                <Input
                  type="search"
                  placeholder="Search trees..."
                  className="pl-12 h-12 bg-white/5 backdrop-blur-xl border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/30 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  className="md:hidden h-12 w-12 bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-[#1a2f1a]/95 backdrop-blur-xl border-white/10">
                <SheetHeader>
                  <SheetTitle className="text-white">Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <ProductFilters />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block">
            <div className="sticky top-8">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Filters</h3>
                  <ProductFilters />
                </div>
              </div>
            </div>
          </div>

          {/* Products Area */}
          <div className="md:col-span-3">
            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="relative group">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 animate-pulse">
                      <div className="aspect-square bg-white/10 rounded-2xl mb-4" />
                      <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
                      <div className="h-6 bg-white/10 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl opacity-20 blur-xl" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
                  <div className="text-6xl mb-4">⚠️</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Failed to load products</h3>
                  <p className="text-white/60 mb-6">{error?.message || "Unable to fetch product listings"}</p>
                  <Button
                    onClick={() => refetch()}
                    className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !isError && filteredProducts.length === 0 && (
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl opacity-20 blur-xl" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
                  <div className="text-8xl mb-6 animate-float">🌳</div>
                  <h3 className="text-2xl font-bold text-white mb-2">No trees found</h3>
                  <p className="text-white/60">Try adjusting your search or filters</p>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {!isLoading && !isError && filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => {
                  const image = product.images?.[0] || '🌳'
                  const category = product.category || 'Tree'

                  return (
                    <Link
                      key={product.id}
                      href={`/trees/${product.id}`}
                      className="group relative block animate-fade-in-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Gradient Glow */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-40 blur transition-all duration-500" />

                      {/* Card */}
                      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20">
                        {/* Image Container */}
                        <div className="aspect-square bg-gradient-to-br from-green-900/20 to-emerald-900/20 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="text-8xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10">
                            {image}
                          </div>

                          {/* Wishlist Button */}
                          <button className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110">
                            <Heart className="h-4 w-4 text-white" />
                          </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Category & Rating */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                              {category}
                            </span>
                            <div className="flex items-center gap-1 text-yellow-400">
                              <Star className="h-3 w-3 fill-current" />
                              <span className="text-xs font-medium text-white/70">4.8</span>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-green-300 transition-colors">
                            {product.title}
                          </h3>

                          {/* Price */}
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                              {formatPrice(product.price)}
                            </span>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white border-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                            >
                              View
                            </Button>
                          </div>

                          {/* Decorative Line */}
                          <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full transition-all duration-500" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
