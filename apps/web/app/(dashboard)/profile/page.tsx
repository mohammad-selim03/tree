"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

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
import { useAuthStore } from "@/lib/stores/authStore"

const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    currentPassword: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal("")),
    newPassword: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal("")),
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function ProfilePage() {
    const { user } = useAuthStore()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
        },
    })

    const onSubmit = async (data: ProfileFormData) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        toast.success("Profile updated successfully")
    }

    return (
        <div className="container py-10 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                            Update your personal details and password
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" {...register("name")} />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" {...register("email")} />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        <div className="pt-4 border-t mt-4">
                            <h3 className="text-sm font-medium mb-4">Change Password</h3>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword">Current Password</Label>
                                    <Input id="currentPassword" type="password" {...register("currentPassword")} />
                                    {errors.currentPassword && <p className="text-sm text-red-500">{errors.currentPassword.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input id="newPassword" type="password" {...register("newPassword")} />
                                    {errors.newPassword && <p className="text-sm text-red-500">{errors.newPassword.message}</p>}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}
