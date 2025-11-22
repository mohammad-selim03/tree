"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, AlertCircle } from "lucide-react"

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
import { useLogin } from "@/lib/hooks/queries/useAuth"
import { loginSchema, type LoginFormData } from "@/lib/validations/auth"

export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirect = searchParams.get("redirect") || "/"
    const [error, setError] = useState<string | null>(null)

    const { mutate: login, isPending } = useLogin()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    })

    const onSubmit = (data: LoginFormData) => {
        setError(null)
        login(data, {
            onSuccess: () => {
                router.push(redirect)
            },
            onError: (err) => {
                setError(err.message || "Invalid email or password")
            },
        })
    }

    return (
        <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm dark:bg-zinc-900/90">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center text-green-800 dark:text-green-400">
                    Welcome back
                </CardTitle>
                <CardDescription className="text-center">
                    Enter your email to sign in to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 dark:bg-red-900/20 dark:border-red-900">
                            <AlertCircle className="h-4 w-4" />
                            {error}
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            {...register("email")}
                            disabled={isPending}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                href="/forgot-password"
                                className="text-sm text-green-600 hover:text-green-500 dark:text-green-400"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            {...register("password")}
                            disabled={isPending}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700" type="submit" disabled={isPending} loading={isPending}>
                        Sign In
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
                <div>
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="text-green-600 hover:text-green-500 font-medium dark:text-green-400"
                    >
                        Sign up
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
