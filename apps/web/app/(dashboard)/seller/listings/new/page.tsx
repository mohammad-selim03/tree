"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, ChevronLeft, Upload } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { listingSchema, ListingFormData } from "@/lib/validations/listing"
import { useCreateListing } from "@/lib/hooks/queries/useListings"
import { ImageUpload } from "@/components/ImageUpload"

export default function CreateListingPage() {
    const router = useRouter()
    const { mutate: createListing, isPending } = useCreateListing()
    const [images, setImages] = useState<string[]>([])

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ListingFormData>({
        resolver: zodResolver(listingSchema),
        defaultValues: {
            stock: 1,
        },
    })

    const onSubmit = (data: ListingFormData) => {
        // Validate images
        if (images.length === 0) {
            toast.error("Pleas upload at least one image")
            return
        }

        // Create payload with images
        const payload = {
            ...data,
            images,
        }

        createListing(payload as any, {
            onSuccess: () => {
                toast.success("Listing created successfully!")
                router.push("/seller/listings")
            },
            onError: (error) => {
                toast.error(error.message || "Failed to create listing")
            },
        })
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="flex items-center gap-4">
                <Link href="/seller/listings">
                    <Button variant="ghost" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Create Listing</h2>
                    <p className="text-muted-foreground">
                        Add a new tree to your inventory
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                                <CardDescription>
                                    The core details of your tree
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Product Title</Label>
                                    <Input id="title" placeholder="e.g. Japanese Maple" {...register("title")} />
                                    {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="scientificName">Scientific Name</Label>
                                        <Input id="scientificName" placeholder="e.g. Acer palmatum" {...register("scientificName")} />
                                        {errors.scientificName && <p className="text-sm text-red-500">{errors.scientificName.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select onValueChange={(val) => setValue("category", val)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ornamental">Ornamental</SelectItem>
                                                <SelectItem value="fruit">Fruit</SelectItem>
                                                <SelectItem value="shade">Shade</SelectItem>
                                                <SelectItem value="evergreen">Evergreen</SelectItem>
                                                <SelectItem value="flowering">Flowering</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Describe your tree..."
                                        className="min-h-[120px]"
                                        {...register("description")}
                                    />
                                    {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Specifications</CardTitle>
                                <CardDescription>
                                    Detailed specs for informed buyers
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="height">Current Height</Label>
                                    <Input id="height" placeholder="e.g. 4-5 feet" {...register("height")} />
                                    {errors.height && <p className="text-sm text-red-500">{errors.height.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="containerSize">Container Size</Label>
                                    <Input id="containerSize" placeholder="e.g. 5 gallon" {...register("containerSize")} />
                                    {errors.containerSize && <p className="text-sm text-red-500">{errors.containerSize.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="growthRate">Growth Rate</Label>
                                    <Select onValueChange={(val) => setValue("growthRate", val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select rate" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="slow">Slow</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="fast">Fast</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.growthRate && <p className="text-sm text-red-500">{errors.growthRate.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sunExposure">Sun Exposure</Label>
                                    <Select onValueChange={(val) => setValue("sunExposure", val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select exposure" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="full_sun">Full Sun</SelectItem>
                                            <SelectItem value="partial_shade">Partial Shade</SelectItem>
                                            <SelectItem value="full_shade">Full Shade</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.sunExposure && <p className="text-sm text-red-500">{errors.sunExposure.message}</p>}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pricing & Inventory</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price ($)</Label>
                                    <Input id="price" type="number" step="0.01" {...register("price")} />
                                    {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="originalPrice">Original Price ($) (Optional)</Label>
                                    <Input id="originalPrice" type="number" step="0.01" {...register("originalPrice")} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="stock">Stock Quantity</Label>
                                    <Input id="stock" type="number" {...register("stock")} />
                                    {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Images</CardTitle>
                                <CardDescription>Upload up to 6 product images</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ImageUpload
                                    value={images}
                                    onChange={setImages}
                                    maxImages={6}
                                    disabled={isPending}
                                />
                            </CardContent>
                        </Card>

                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => router.back()}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    "Create Listing"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
