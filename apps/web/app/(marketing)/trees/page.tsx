"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, SlidersHorizontal } from "lucide-react"
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
import { formatPrice } from "@/lib/utils"

// Mock data
const products = [
  { id: '1', name: 'Japanese Maple', price: 149.99, image: '🍁', rating: 4.8, category: 'Ornamental' },
  { id: '2', name: 'Blue Spruce', price: 89.99, image: '🌲', rating: 4.9, category: 'Evergreen' },
  { id: '3', name: 'Apple Tree', price: 129.99, image: '🍎', rating: 4.7, category: 'Fruit' },
  { id: '4', name: 'Red Oak', price: 199.99, image: '🌳', rating: 4.9, category: 'Shade' },
  { id: '5', name: 'Cherry Blossom', price: 179.99, image: '🌸', rating: 5.0, category: 'Ornamental' },
  { id: '6', name: 'Pine Tree', price: 69.99, image: '🌲', rating: 4.6, category: 'Evergreen' },
]

export default function TreesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Trees</h1>
          <p className="text-muted-foreground">
            Browse our collection of premium trees
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search trees..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <ProductFilters />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="hidden md:block">
          <ProductFilters />
        </div>

        <div className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🌳</div>
              <h3 className="text-lg font-medium">No trees found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/trees/${product.id}`}
                  className="group block bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="aspect-square bg-muted flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                    {product.image}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        {product.category}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        ⭐ {product.rating}
                      </span>
                    </div>
                    <h3 className="font-bold mb-2 group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="font-medium text-lg">
                      {formatPrice(product.price)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
