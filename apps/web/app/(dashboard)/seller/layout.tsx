"use client"

import { SellerSidebar } from "@/components/features/seller/Sidebar"
import { useAuthStore } from "@/lib/stores/authStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SellerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user, isAuthenticated, isLoading } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && (!isAuthenticated || user?.role !== "SELLER")) {
            router.push("/login?redirect=/seller/dashboard")
        }
    }, [isAuthenticated, isLoading, user, router])

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
            </div>
        )
    }

    if (!isAuthenticated || user?.role !== "SELLER") {
        return null
    }

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <SellerSidebar />
            <main className="flex-1 overflow-y-auto bg-muted/10 p-8">
                <div className="mx-auto max-w-6xl space-y-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
