"use client"

import Link from "next/link"
import { ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartItem } from "@/components/features/cart/CartItem"
import { CartSummary } from "@/components/features/cart/CartSummary"
import { useCartStore } from "@/lib/stores/cartStore"

export default function CartPage() {
    const items = useCartStore((state) => state.items)
    const hasItems = useCartStore((state) => state.hasItems())

    if (!hasItems) {
        return (
            <div className="container max-w-4xl py-24 text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
                <h1 className="mb-4 text-3xl font-bold tracking-tight">Your cart is empty</h1>
                <p className="mb-8 text-muted-foreground text-lg">
                    Looks like you haven&apos;t added any trees to your cart yet.
                </p>
                <Link href="/trees">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700">
                        Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container py-12">
            <h1 className="mb-8 text-3xl font-bold tracking-tight">Shopping Cart</h1>

            <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="p-6">
                            {items.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4">
                    <CartSummary />
                </div>
            </div>
        </div>
    )
}
