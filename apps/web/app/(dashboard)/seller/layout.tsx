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
            <div className="flex h-screen items-center justify-center bg-gradient-to-br from-[#0f1f0f] via-[#1a2f1a] to-[#0f1f0f]">
                <div className="relative">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
                    <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full border-4 border-green-500/20" />
                </div>
            </div>
        )
    }

    if (!isAuthenticated || user?.role !== "SELLER") {
        return null
    }

    return (
        <div className="relative flex h-screen overflow-hidden bg-gradient-to-br from-[#0f1f0f] via-[#1a2f1a] to-[#0f1f0f]">
            {/* Animated Background Gradients */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-[#4a7c2d]/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-[#2d5016]/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#4a7c2d]/5 rounded-full blur-[150px]" />
            </div>

            {/* Sidebar */}
            <div className="relative z-10">
                <SellerSidebar />
            </div>

            {/* Main Content */}
            <main className="relative z-10 flex-1 overflow-y-auto p-8">
                <div className="mx-auto max-w-7xl space-y-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
