"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Settings,
    LogOut,
    Leaf
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLogout } from "@/lib/hooks/queries/useAuth"

const sidebarItems = [
    {
        title: "Overview",
        href: "/seller/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Listings",
        href: "/seller/listings",
        icon: Leaf,
    },
    {
        title: "Orders",
        href: "/seller/orders",
        icon: ShoppingBag,
    },
    {
        title: "Settings",
        href: "/seller/settings",
        icon: Settings,
    },
]

export function SellerSidebar() {
    const pathname = usePathname()
    const { mutate: logout } = useLogout()

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-card">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-green-600">
                    <Package className="h-6 w-6" />
                    <span>Seller Hub</span>
                </Link>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="grid gap-1 px-2">
                    {sidebarItems.map((item, index) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-100"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="border-t p-4">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20"
                    onClick={() => logout()}
                >
                    <LogOut className="h-4 w-4" />
                    Log out
                </Button>
            </div>
        </div>
    )
}
