"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { useRegister } from "@/lib/hooks/queries/useAuth"
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth"

export default function RegisterPage() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)

    const { mutate: registerUser, isPending } = useRegister()

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            role: "BUYER",
            agreedToTerms: false,
        },
    })

    const selectedRole = watch("role")

    const onSubmit = (data: RegisterFormData) => {
        setError(null)
        registerUser(data, {
            onSuccess: () => {
                router.push("/")
            },
            onError: (err) => {
                setError(err.message || "Something went wrong. Please try again.")
            },
        })
    }

    return (
        <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm dark:bg-zinc-900/90">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center text-green-800 dark:text-green-400">
                    Create an account
                </CardTitle>
                <CardDescription className="text-center">
                    Join TreeVerse to buy and sell unique trees
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

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div
                            className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${selectedRole === "BUYER"
                                    ? "border-green-600 bg-green-50 dark:bg-green-900/20"
                                    : "border-transparent bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800"
                                }`}
                            onClick={() => setValue("role", "BUYER")}
                        >
                            <div className="font-semibold">Buyer</div>
                            <div className="text-xs text-muted-foreground">I want to buy trees</div>
                        </div>
                        <div
                            className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${selectedRole === "SELLER"
                                    ? "border-green-600 bg-green-50 dark:bg-green-900/20"
                                    : "border-transparent bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800"
                                }`}
                            onClick={() => setValue("role", "SELLER")}
                        >
                            <div className="font-semibold">Seller</div>
                            <div className="text-xs text-muted-foreground">I want to sell trees</div>
                        </div>
                    </div>

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
                        <Label htmlFor="password">Password</Label>
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

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            {...register("confirmPassword")}
                            disabled={isPending}
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="terms"
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                            {...register("agreedToTerms")}
                            disabled={isPending}
                        />
                        <label
                            htmlFor="terms"
                            className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I agree to the{" "}
                            <Link href="/terms" className="text-green-600 hover:underline">
                                terms and conditions
                            </Link>
                        </label>
                    </div>
                    {errors.agreedToTerms && (
                        <p className="text-sm text-red-500">{errors.agreedToTerms.message}</p>
                    )}

                    <Button className="w-full bg-green-600 hover:bg-green-700" type="submit" disabled={isPending} loading={isPending}>
                        Create Account
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
                <div>
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-green-600 hover:text-green-500 font-medium dark:text-green-400"
                    >
                        Sign in
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
