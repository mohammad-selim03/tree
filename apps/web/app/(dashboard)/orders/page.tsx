"use client"

import Link from "next/link"
import { formatPrice } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TableRowSkeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/ErrorBoundary"
import { useOrders, mockOrders, type Order } from "@/lib/hooks/queries/useOrders"

function getStatusVariant(status: Order['status']) {
    switch (status) {
        case 'delivered':
            return 'default' as const
        case 'processing':
        case 'shipped':
            return 'secondary' as const
        case 'cancelled':
            return 'destructive' as const
        default:
            return 'outline' as const
    }
}

function getStatusColor(status: Order['status']) {
    switch (status) {
        case 'delivered':
            return 'text-green-600'
        case 'processing':
            return 'text-blue-600'
        case 'shipped':
            return 'text-purple-600'
        case 'pending':
            return 'text-yellow-600'
        case 'cancelled':
            return 'text-red-600'
        default:
            return 'text-gray-600'
    }
}

export default function OrdersPage() {
    const { data, isLoading, isError, error, refetch } = useOrders()

    // Use actual data if available, fallback to mock data
    const orders = data?.orders || mockOrders
    const usesMockData = !data

    return (
        <div className="container py-10 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Order History</h1>
                <p className="text-muted-foreground">
                    View and track your orders
                    {usesMockData && (
                        <span className="ml-2 text-xs text-yellow-600 dark:text-yellow-400">
                            (Using mock data - backend not connected)
                        </span>
                    )}
                </p>
            </div>

            {isError ? (
                <ErrorState
                    title="Failed to load orders"
                    message={error?.message || "Unable to fetch your order history"}
                    onRetry={() => refetch()}
                />
            ) : isLoading ? (
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Card key={i}>
                            <CardContent className="p-6">
                                <TableRowSkeleton columns={4} />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : orders.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <div className="text-4xl mb-4">📦</div>
                        <h3 className="text-lg font-medium">No orders yet</h3>
                        <p className="text-muted-foreground text-center mb-4">
                            You haven't placed any orders yet
                        </p>
                        <Link
                            href="/trees"
                            className="text-green-600 hover:text-green-500 font-medium"
                        >
                            Start shopping
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <Card key={order.id} className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-lg">
                                            Order #{order.orderNumber}
                                        </CardTitle>
                                        <CardDescription>
                                            Placed on {new Date(order.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </CardDescription>
                                    </div>
                                    <Badge variant={getStatusVariant(order.status)}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {/* Order Items */}
                                    <div className="space-y-2">
                                        {order.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center justify-between text-sm"
                                            >
                                                <div>
                                                    <span className="font-medium">{item.productName}</span>
                                                    <span className="text-muted-foreground ml-2">
                                                        × {item.quantity}
                                                    </span>
                                                </div>
                                                <span>{formatPrice(item.price)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Shipping Address */}
                                    <div className="pt-3 border-t text-sm">
                                        <p className="text-muted-foreground">Shipping to:</p>
                                        <p className="font-medium">
                                            {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
                                            {order.shippingAddress.state} {order.shippingAddress.zip}
                                        </p>
                                    </div>

                                    {/* Total */}
                                    <div className="flex items-center justify-between pt-3 border-t font-semibold">
                                        <span>Total</span>
                                        <span className="text-lg">{formatPrice(order.total)}</span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 pt-2">
                                        <Link
                                            href={`/orders/${order.id}`}
                                            className="text-sm text-green-600 hover:text-green-500 font-medium"
                                        >
                                            View Details →
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
