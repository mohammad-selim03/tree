"use client"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/lib/stores/authStore"
import { useLogout } from "@/lib/hooks/queries/useAuth"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function UserNav() {
    const { user } = useAuthStore()
    const { mutate: logout } = useLogout()
    const router = useRouter()

    if (!user) {
        return (
            <div className="flex items-center gap-4">
                <Link href="/login">
                    <Button variant="ghost" size="sm">
                        Log in
                    </Button>
                </Link>
                <Link href="/register">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Sign up
                    </Button>
                </Link>
            </div>
        )
    }

    const initials = user.profile?.firstName && user.profile?.lastName
        ? `${user.profile.firstName[0]}${user.profile.lastName[0]}`
        : user.email.substring(0, 2).toUpperCase()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.profile?.avatar} alt={user.email} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.profile?.firstName} {user.profile?.lastName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/orders")}>
                        Orders
                    </DropdownMenuItem>
                    {user.role === "SELLER" && (
                        <DropdownMenuItem onClick={() => router.push("/seller/dashboard")}>
                            Seller Dashboard
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
