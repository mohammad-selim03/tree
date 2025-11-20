"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { UserNav } from "@/components/features/auth/UserNav"
import { Leaf, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartItemCount } from "@/lib/stores/cartStore"

export function Navbar() {
    const pathname = usePathname()
    const cartItemCount = useCartItemCount()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Leaf className="h-6 w-6 text-green-600" />
                    <span className="hidden font-bold sm:inline-block">
                        TreeVerse
                    </span>
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                    <Link
                        href="/trees"
                        className={cn(
                            "transition-colors hover:text-foreground/80",
                            pathname === "/trees" ? "text-foreground" : "text-foreground/60"
                        )}
                    >
                        Trees
                    </Link>
                    <Link
                        href="/sellers"
                        className={cn(
                            "transition-colors hover:text-foreground/80",
                            pathname === "/sellers" ? "text-foreground" : "text-foreground/60"
                        )}
                    >
                        Sellers
                    </Link>
                    <Link
                        href="/about"
                        className={cn(
                            "transition-colors hover:text-foreground/80",
                            pathname === "/about" ? "text-foreground" : "text-foreground/60"
                        )}
                    >
                        About
                    </Link>
                </nav>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-2">
                        <Link href="/cart">
                            <Button variant="ghost" size="icon" className="relative">
                                <ShoppingCart className="h-5 w-5" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-600 text-[10px] font-bold text-white flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                                <span className="sr-only">Shopping Cart</span>
                            </Button>
                        </Link>
                        <UserNav />
                    </nav>
                </div>
            </div>
        </header>
    )
}
