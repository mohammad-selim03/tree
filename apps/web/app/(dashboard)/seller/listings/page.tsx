"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Plus, Pencil, Trash } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/ui/data-table"
import { formatPrice, formatDate } from "@/lib/utils"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Listing = {
    id: string
    title: string
    price: number
    stock: number
    status: "active" | "draft" | "archived"
    createdAt: string
    image: string
}

const data: Listing[] = [
    {
        id: "1",
        title: "Japanese Maple",
        price: 149.99,
        stock: 23,
        status: "active",
        createdAt: "2023-11-15T10:00:00Z",
        image: "🍁",
    },
    {
        id: "2",
        title: "Blue Spruce",
        price: 89.99,
        stock: 45,
        status: "active",
        createdAt: "2023-11-10T14:30:00Z",
        image: "🌲",
    },
    {
        id: "3",
        title: "Apple Tree",
        price: 129.99,
        stock: 0,
        status: "archived",
        createdAt: "2023-10-05T09:15:00Z",
        image: "🍎",
    },
    {
        id: "4",
        title: "Red Oak",
        price: 199.99,
        stock: 18,
        status: "draft",
        createdAt: "2023-11-18T16:45:00Z",
        image: "🌳",
    },
]

export const columns: ColumnDef<Listing>[] = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => (
            <div className="flex h-10 w-10 items-center justify-center rounded bg-muted text-xl">
                {row.getValue("image")}
            </div>
        ),
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : status === "draft"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400"
                        }`}
                >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
            )
        },
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            return <div className="font-medium">{formatPrice(price)}</div>
        },
    },
    {
        accessorKey: "stock",
        header: "Stock",
    },
    {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => {
            return <div>{formatDate(row.getValue("createdAt"))}</div>
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
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(listing.id)}
                        >
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export default function ListingsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Listings</h2>
                    <p className="text-muted-foreground">
                        Manage your tree listings and inventory
                    </p>
                </div>
                <Link href="/seller/listings/new">
                    <Button className="bg-green-600 hover:bg-green-700">
                        <Plus className="mr-2 h-4 w-4" /> Add New Tree
                    </Button>
                </Link>
            </div>

            <DataTable columns={columns} data={data} searchKey="title" />
        </div>
    )
}
