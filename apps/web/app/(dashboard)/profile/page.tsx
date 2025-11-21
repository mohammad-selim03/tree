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
import { useUpdateProfile, useChangePassword } from "@/lib/hooks/queries/useProfile"
import { useMe } from "@/lib/hooks/queries/useAuth"

const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
})

const passwordSchema = z.object({
    currentPassword: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

type ProfileFormData = z.infer<typeof profileSchema>
type PasswordFormData = z.infer<typeof passwordSchema>

export default function ProfilePage() {
    const { user } = useAuthStore()
    const { data: currentUser } = useMe()
    const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateProfile()
    const { mutate: changePassword, isPending: isChangingPassword } = useChangePassword()

    // Profile form
    const profileForm = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: currentUser?.name || user?.name || "",
            email: currentUser?.email || user?.email || "",
        },
    })

    // Password form
    const passwordForm = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    const onProfileSubmit = (data: ProfileFormData) => {
        updateProfile(data, {
            onSuccess: () => {
                toast.success("Profile updated successfully")
            },
            onError: (error) => {
                toast.error(error.message || "Failed to update profile")
            },
        })
    }

    const onPasswordSubmit = (data: PasswordFormData) => {
        changePassword(data, {
            onSuccess: () => {
                toast.success("Password changed successfully")
                passwordForm.reset()
            },
            onError: (error) => {
                toast.error(error.message || "Failed to change password")
            },
        })
    }

    return (
        <div className="container py-10 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

            <div className="space-y-6">
                {/* Profile Information */}
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>
                                Update your personal details
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" {...profileForm.register("name")} />
                                {profileForm.formState.errors.name && (
                                    <p className="text-sm text-red-500">
                                        {profileForm.formState.errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" {...profileForm.register("email")} />
                                {profileForm.formState.errors.email && (
                                    <p className="text-sm text-red-500">
                                        {profileForm.formState.errors.email.message}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={isUpdatingProfile}>
                                {isUpdatingProfile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </CardFooter>
                    </Card>
                </form>

                {/* Change Password */}
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>
                                Update your account password
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    {...passwordForm.register("currentPassword")}
                                />
                                {passwordForm.formState.errors.currentPassword && (
                                    <p className="text-sm text-red-500">
                                        {passwordForm.formState.errors.currentPassword.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    {...passwordForm.register("newPassword")}
                                />
                                {passwordForm.formState.errors.newPassword && (
                                    <p className="text-sm text-red-500">
                                        {passwordForm.formState.errors.newPassword.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    {...passwordForm.register("confirmPassword")}
                                />
                                {passwordForm.formState.errors.confirmPassword && (
                                    <p className="text-sm text-red-500">
                                        {passwordForm.formState.errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={isChangingPassword}>
                                {isChangingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Change Password
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    )
}
