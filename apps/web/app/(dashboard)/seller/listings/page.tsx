"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TableRowSkeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/ErrorBoundary"
import { useListings, useDeleteListing } from "@/lib/hooks/queries/useListings"
import { formatPrice } from "@/lib/utils"
import type { ColumnDef } from "@tanstack/react-table"

type Listing = {
    id: string
    title: string
    category: string
    price: number
    stock: number
    status: 'active' | 'draft' | 'archived'
    createdAt: string
}

// Mock data fallback
const mockListings: Listing[] = [
    { id: '1', title: 'Japanese Maple', category: 'Ornamental', price: 149.99, stock: 12, status: 'active', createdAt: '2025-11-01' },
    { id: '2', title: 'Blue Spruce', category: 'Evergreen', price: 89.99, stock: 8, status: 'active', createdAt: '2025-11-10' },
    { id: '3', title: 'Apple Tree', category: 'Fruit', price: 129.99, stock: 0, status: 'draft', createdAt: '2025-11-15' },
]

export default function ListingsPage() {
    const [search, setSearch] = useState("")
    const { mutate: deleteListing } = useDeleteListing()

    // Fetch listings from backend
    const { data, isLoading, isError, error, refetch } = useListings({
        search: search || undefined,
    })

    // Use actual data if available, fallback to mock data
    const listings = data?.listings || mockListings
    const usesMockData = !data

    const handleDelete = (id: string, title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
            deleteListing(id, {
                onSuccess: () => {
                    toast.success("Listing deleted successfully")
                },
                onError: (error) => {
                    toast.error(error.message || "Failed to delete listing")
                },
            })
        }
    }

    const columns: ColumnDef<Listing>[] = [
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <div className="font-medium">{row.getValue("title")}</div>
            ),
        },
        {
            accessorKey: "category",
            header: "Category",
        },
        {
            accessorKey: "price",
            header: () => <div className="text-right">Price</div>,
            cell: ({ row }) => {
                const price = parseFloat(row.getValue("price"))
                return <div className="text-right font-medium">{formatPrice(price)}</div>
            },
        },
        {
            accessorKey: "stock",
            header: () => <div className="text-right">Stock</div>,
            cell: ({ row }) => {
                const stock = parseInt(row.getValue("stock"))
                return (
                    <div className="text-right">
                        <span className={stock === 0 ? "text-red-500" : ""}>
                            {stock}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string
                return (
                    <Badge
                        variant={
                            status === "active"
                                ? "default"
                                : status === "draft"
                                    ? "secondary"
                                    : "outline"
                        }
                    >
                        {status}
                    </Badge>
                )
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const listing = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <Link href={`/seller/listings/${listing.id}/edit`}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDelete(listing.id, listing.title)}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Listings</h2>
                    <p className="text-muted-foreground">
                        Manage your tree listings
                        {usesMockData && (
                            <span className="ml-2 text-xs text-yellow-600 dark:text-yellow-400">
                                (Using mock data)
                            </span>
                        )}
                    </p>
                </div>
                <Link href="/seller/listings/new">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add New Tree
                    </Button>
                </Link>
            </div>

            {isError ? (
                <ErrorState
                    title="Failed to load listings"
                    message={error?.message || "Unable to fetch your listings"}
                    onRetry={() => refetch()}
                />
            ) : isLoading ? (
                <div className="rounded-md border">
                    <div className="p-4 space-y-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TableRowSkeleton key={i} columns={6} />
                        ))}
                    </div>
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={listings}
                    searchKey="title"
                    searchPlaceholder="Search listings..."
                />
            )}
        </div>
    )
}
