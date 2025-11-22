"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/lib/stores/cartStore"
import type { CartItem as CartItemType } from "@/types/models"

interface CartItemProps {
    item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
    const updateQuantity = useCartStore((state) => state.updateQuantity)
    const removeItem = useCartStore((state) => state.removeItem)

    return (
        <div className="flex py-6 border-b last:border-0">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                {item.imageUrl ? (
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover object-center"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-secondary text-secondary-foreground">
                        No Image
                    </div>
                )}
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium">
                        <h3>
                            <Link href={`/trees/${item.listingId}`} className="hover:underline">
                                {item.title}
                            </Link>
                        </h3>
                        <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Sold by {item.sellerName}
                    </p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase quantity</span>
                        </Button>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                        onClick={() => removeItem(item.id)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    )
}
