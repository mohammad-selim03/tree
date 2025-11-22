"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/lib/stores/cartStore"
import { useRouter } from "next/navigation"

export function CartSummary() {
    const router = useRouter()
    const totalPrice = useCartStore((state) => state.getTotalPrice())
    const itemCount = useCartStore((state) => state.getItemCount())

    const shippingEstimate = 0 // To be calculated
    const taxEstimate = totalPrice * 0.08 // Estimated 8% tax

    return (
        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                    <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping estimate</span>
                    <span>{shippingEstimate === 0 ? "Free" : formatPrice(shippingEstimate)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax estimate</span>
                    <span>{formatPrice(taxEstimate)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-medium text-lg">
                    <span>Order total</span>
                    <span>{formatPrice(totalPrice + shippingEstimate + taxEstimate)}</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                    onClick={() => router.push("/checkout")}
                    disabled={itemCount === 0}
                >
                    Proceed to Checkout
                </Button>
            </CardFooter>
        </Card>
    )
}
