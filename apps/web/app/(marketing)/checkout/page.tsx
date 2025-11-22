"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useCartStore } from "@/lib/stores/cartStore"
import { formatPrice } from "@/lib/utils"

const checkoutSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    zipCode: z.string().min(5, "Zip code is required"),
    cardNumber: z.string().min(16, "Invalid card number"),
    expiryDate: z.string().min(5, "Invalid expiry date"),
    cvv: z.string().min(3, "Invalid CVV"),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
    const router = useRouter()
    const { items, getTotalPrice, clearCart } = useCartStore()
    const [isProcessing, setIsProcessing] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const totalPrice = getTotalPrice()
    const shippingEstimate = 0
    const taxEstimate = totalPrice * 0.08
    const finalTotal = totalPrice + shippingEstimate + taxEstimate

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
    })

    const onSubmit = async (data: CheckoutFormData) => {
        setIsProcessing(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        setIsProcessing(false)
        setIsSuccess(true)
        clearCart()
    }

    if (isSuccess) {
        return (
            <div className="container max-w-md py-24 text-center animate-in fade-in zoom-in duration-500">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-12 w-12" />
                </div>
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-green-700">Order Confirmed!</h1>
                <p className="mb-8 text-muted-foreground text-lg">
                    Thank you for your purchase. Your trees are on their way!
                </p>
                <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={() => router.push("/")}>
                    Return Home
                </Button>
            </div>
        )
    }

    if (items.length === 0) {
        router.push("/cart")
        return null
    }

    return (
        <div className="container py-12">
            <h1 className="mb-8 text-3xl font-bold tracking-tight">Checkout</h1>

            <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle>Shipping Information</CardTitle>
                                <CardDescription>Where should we send your trees?</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" {...register("firstName")} />
                                        {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" {...register("lastName")} />
                                        {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" {...register("email")} />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" {...register("address")} />
                                    {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" {...register("city")} />
                                        {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="zipCode">Zip Code</Label>
                                        <Input id="zipCode" {...register("zipCode")} />
                                        {errors.zipCode && <p className="text-sm text-red-500">{errors.zipCode.message}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Details</CardTitle>
                                <CardDescription>Secure payment processing</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cardNumber">Card Number</Label>
                                    <Input id="cardNumber" placeholder="0000 0000 0000 0000" {...register("cardNumber")} />
                                    {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber.message}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiryDate">Expiry Date</Label>
                                        <Input id="expiryDate" placeholder="MM/YY" {...register("expiryDate")} />
                                        {errors.expiryDate && <p className="text-sm text-red-500">{errors.expiryDate.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvv">CVV</Label>
                                        <Input id="cvv" placeholder="123" {...register("cvv")} />
                                        {errors.cvv && <p className="text-sm text-red-500">{errors.cvv.message}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </div>

                <div className="lg:col-span-4">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        {item.quantity}x {item.title}
                                    </span>
                                    <span>{formatPrice(item.price * item.quantity)}</span>
                                </div>
                            ))}
                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>{formatPrice(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>{shippingEstimate === 0 ? "Free" : formatPrice(shippingEstimate)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax</span>
                                    <span>{formatPrice(taxEstimate)}</span>
                                </div>
                                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>{formatPrice(finalTotal)}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full bg-green-600 hover:bg-green-700 py-6"
                                type="submit"
                                form="checkout-form"
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    `Pay ${formatPrice(finalTotal)}`
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
