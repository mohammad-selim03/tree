import { z } from "zod"

export const listingSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    scientificName: z.string().min(2, "Scientific name is required"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    category: z.string().min(1, "Category is required"),
    price: z.coerce.number().min(0.01, "Price must be greater than 0"),
    originalPrice: z.coerce.number().optional(),
    stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
    features: z.string().optional(), // We'll parse this from a textarea or list
    careInstructions: z.string().optional(),
    height: z.string().min(1, "Height is required"),
    containerSize: z.string().min(1, "Container size is required"),
    growthRate: z.string().min(1, "Growth rate is required"),
    sunExposure: z.string().min(1, "Sun exposure is required"),
})

export type ListingFormData = z.infer<typeof listingSchema>
