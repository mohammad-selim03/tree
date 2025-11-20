"use client"

import Link from "next/link"
import { Package, ChevronRight } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatPrice, formatDate } from "@/lib/utils"

// Mock data
const orders = [
    {
        id: "ORD-1234",
        date: "2023-11-15T10:00:00Z",
        total: 239.98,
        status: "delivered",
        items: [
            { name: "Japanese Maple", quantity: 1 },
            { name: "Blue Spruce", quantity: 1 },
        ],
    },
    {
        id: "ORD-5678",
        date: "2023-11-18T14:30:00Z",
        total: 129.99,
        status: "processing",
        items: [
            { name: "Apple Tree", quantity: 1 },
        ],
    },
]

export default function OrdersPage() {
    return (
        <div className="container py-10 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Order History</h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <Card key={order.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="space-y-1">
                                <CardTitle className="text-base">Order #{order.id}</CardTitle>
                                <CardDescription>{formatDate(order.date)}</CardDescription>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="font-bold text-lg">{formatPrice(order.total)}</div>
                                <Badge
                                    variant={order.status === 'delivered' ? 'default' : 'secondary'}
                                    className={order.status === 'delivered' ? 'bg-green-600 hover:bg-green-700' : ''}
                                >
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="mt-4 space-y-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 text-sm">
                                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                                            <Package className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium">{item.name}</div>
                                            <div className="text-muted-foreground">Qty: {item.quantity}</div>
                                        </div>
                                    </div>
                                ))}
                                <div className="pt-4 flex justify-end">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/orders/${order.id}`}>
                                            View Details <ChevronRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {orders.length === 0 && (
                    <div className="text-center py-12">
                        <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No orders yet</h3>
                        <p className="text-muted-foreground mb-4">
                            Start shopping to see your orders here
                        </p>
                        <Button asChild>
                            <Link href="/trees">Browse Trees</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
