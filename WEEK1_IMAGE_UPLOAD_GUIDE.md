# 📸 Week 1: Image Upload Implementation Guide

**Goal:** Set up image upload infrastructure for all AI features  
**Timeline:** 5-7 days  
**Difficulty:** Medium  
**Prerequisites:** None - this is the foundation!

---

## 🎯 What We're Building

By the end of Week 1, sellers will be able to:
- ✅ Upload images when creating listings
- ✅ Upload multiple images per listing
- ✅ Preview images before submission
- ✅ Delete/reorder images
- ✅ Have images stored securely in the cloud
- ✅ See images on product pages

---

## 🛠️ Option 1: UploadThing (RECOMMENDED - Easiest)

**Why UploadThing:**
- ✅ Easiest setup (5 minutes)
- ✅ Built for Next.js
- ✅ Free tier: 2GB storage + 2GB bandwidth/month
- ✅ No AWS configuration needed
- ✅ Great DX with React hooks

### **Step 1: Sign Up & Get API Keys** (5 minutes)

1. Go to https://uploadthing.com/
2. Sign in with GitHub
3. Create new app: "TreeVerse"
4. Copy your API keys

```env
# apps/web/.env.local
UPLOADTHING_SECRET=sk_live_xxxxxxxxxxxxx
UPLOADTHING_APP_ID=xxxxxxxxxxxxx
```

### **Step 2: Install Dependencies** (2 minutes)

```bash
cd apps/web
pnpm add uploadthing @uploadthing/react
```

### **Step 3: Create Upload Route** (10 minutes)

```typescript
// apps/web/app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth"; // or your auth method

const f = createUploadthing();

export const ourFileRouter = {
  // Listing images uploader
  listingImage: f({ image: { maxFileSize: "4MB", maxFileCount: 6 } })
    .middleware(async ({ req }) => {
      // Authenticate user
      const session = await getServerSession();
      if (!session) throw new Error("Unauthorized");

      // Pass user ID to onUploadComplete
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      // You can save to database here if needed
      // await prisma.image.create({ data: { url: file.url } });

      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
```

```typescript
// apps/web/app/api/uploadthing/route.ts
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
```

### **Step 4: Create React Component** (30 minutes)

```typescript
// apps/web/lib/uploadthing.ts
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
```

```typescript
// apps/web/components/ImageUpload.tsx
"use client";

import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
  disabled?: boolean;
}

export function ImageUpload({
  value = [],
  onChange,
  maxImages = 6,
  disabled = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { startUpload } = useUploadThing("listingImage", {
    onClientUploadComplete: (res) => {
      const newUrls = res?.map((file) => file.url) || [];
      onChange([...value, ...newUrls]);
      toast.success(`${newUrls.length} image(s) uploaded successfully!`);
      setIsUploading(false);
    },
    onUploadError: (error) => {
      toast.error(`Upload failed: ${error.message}`);
      setIsUploading(false);
    },
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    // Validate max images
    if (value.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    // Validate file sizes (4MB each)
    const oversized = files.filter((f) => f.size > 4 * 1024 * 1024);
    if (oversized.length > 0) {
      toast.error("Some files exceed 4MB size limit");
      return;
    }

    setIsUploading(true);
    await startUpload(files);
  };

  const removeImage = (url: string) => {
    onChange(value.filter((img) => img !== url));
  };

  const canUploadMore = value.length < maxImages;

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {canUploadMore && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            id="image-upload"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={disabled || isUploading}
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            {isUploading ? (
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
            ) : (
              <Upload className="h-10 w-10 text-gray-400" />
            )}
            <p className="text-sm text-gray-600">
              {isUploading
                ? "Uploading..."
                : `Click to upload (${value.length}/${maxImages})`}
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG up to 4MB each
            </p>
          </label>
        </div>
      )}

      {/* Image Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {value.map((url, index) => (
            <div
              key={url}
              className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 group"
            >
              <Image
                src={url}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover"
              />
              {/* Primary badge */}
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                  Primary
                </div>
              )}
              {/* Remove button */}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {value.length === 0 && !canUploadMore && (
        <div className="text-center py-8 text-gray-400">
          <ImageIcon className="h-12 w-12 mx-auto mb-2" />
          <p>No images uploaded</p>
        </div>
      )}
    </div>
  );
}
```

### **Step 5: Update Prisma Schema** (5 minutes)

```prisma
// packages/database/prisma/schema.prisma

model Listing {
  id          String   @id @default(uuid())
  // ... existing fields ...
  images      Image[]  // Add this relation
}

model Image {
  id        String   @id @default(uuid())
  listingId String
  listing   Listing  @relation(fields: [listingId], references: [id], onDelete: Cascade)
  url       String
  key       String   // UploadThing file key for deletion
  order     Int      @default(0)
  createdAt DateTime @default(now())

  @@index([listingId])
  @@map("images")
}
```

Run migration:
```bash
cd packages/database
npx prisma db push
```

### **Step 6: Update Create Listing Form** (30 minutes)

```typescript
// apps/web/app/(dashboard)/seller/listings/new/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ImageUpload } from "@/components/ImageUpload";
import { useCreateListing } from "@/lib/hooks/queries/useListings";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const createListingSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  species: z.string().min(2, "Species is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  stock: z.number().int().min(1, "Stock must be at least 1"),
  age: z.number().int().optional(),
  height: z.number().optional(),
  images: z.array(z.string()).min(1, "At least one image is required"),
});

type CreateListingInput = z.infer<typeof createListingSchema>;

export default function CreateListingPage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  
  const { mutate: createListing, isPending } = useCreateListing();

  const form = useForm<CreateListingInput>({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      images: [],
      stock: 1,
    },
  });

  const onSubmit = (data: CreateListingInput) => {
    // Add images to form data
    const payload = {
      ...data,
      images,
    };

    createListing(payload, {
      onSuccess: () => {
        toast.success("Listing created successfully!");
        router.push("/seller/listings");
      },
      onError: (error) => {
        toast.error(`Failed to create listing: ${error.message}`);
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Create New Listing</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Images Section */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Product Images *
          </label>
          <ImageUpload
            value={images}
            onChange={(urls) => {
              setImages(urls);
              form.setValue("images", urls, { shouldValidate: true });
            }}
            maxImages={6}
            disabled={isPending}
          />
          {form.formState.errors.images && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.images.message}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Upload up to 6 images. First image will be the primary image.
          </p>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Title *
          </label>
          <input
            {...form.register("title")}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="e.g., Beautiful Japanese Maple - 5 Years Old"
            disabled={isPending}
          />
          {form.formState.errors.title && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>

        {/* Species */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Species *
          </label>
          <input
            {...form.register("species")}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="e.g., Acer palmatum"
            disabled={isPending}
          />
          {form.formState.errors.species && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.species.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Description *
          </label>
          <textarea
            {...form.register("description")}
            className="w-full px-4 py-2 border rounded-lg min-h-[150px]"
            placeholder="Describe your tree in detail..."
            disabled={isPending}
          />
          {form.formState.errors.description && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>

        {/* Price & Stock Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Price ($) *
            </label>
            <input
              type="number"
              step="0.01"
              {...form.register("price", { valueAsNumber: true })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="99.99"
              disabled={isPending}
            />
            {form.formState.errors.price && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Stock *
            </label>
            <input
              type="number"
              {...form.register("stock", { valueAsNumber: true })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="10"
              disabled={isPending}
            />
            {form.formState.errors.stock && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.stock.message}
              </p>
            )}
          </div>
        </div>

        {/* Optional Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Age (years)
            </label>
            <input
              type="number"
              {...form.register("age", { valueAsNumber: true })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="5"
              disabled={isPending}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Height (feet)
            </label>
            <input
              type="number"
              step="0.1"
              {...form.register("height", { valueAsNumber: true })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="6.5"
              disabled={isPending}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Creating..." : "Create Listing"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border rounded-lg hover:bg-gray-50"
            disabled={isPending}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
```

### **Step 7: Update API Endpoint** (15 minutes)

```typescript
// apps/web/app/api/v1/listings/route.ts
export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { images, ...listingData } = body;

    // Create listing
    const listing = await prisma.listing.create({
      data: {
        ...listingData,
        sellerId: session.user.id,
        images: {
          create: images.map((url: string, index: number) => ({
            url,
            order: index,
            key: url.split("/").pop() || "", // Extract UploadThing key
          })),
        },
      },
      include: {
        images: true,
      },
    });

    return Response.json(listing, { status: 201 });
  } catch (error) {
    console.error("Failed to create listing:", error);
    return Response.json(
      { error: "Failed to create listing" },
      { status: 500 }
    );
  }
}
```

### **Step 8: Display Images on Product Cards** (20 minutes)

```typescript
// apps/web/components/ProductCard.tsx
import Image from "next/image";

export function ProductCard({ listing }: { listing: Listing }) {
  const primaryImage = listing.images[0]?.url || "/placeholder.png";

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square">
        <Image
          src={primaryImage}
          alt={listing.title}
          fill
          className="object-cover"
        />
        {listing.images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            +{listing.images.length - 1} more
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold truncate">{listing.title}</h3>
        <p className="text-sm text-gray-600">{listing.species}</p>
        <p className="text-lg font-bold mt-2">${listing.price}</p>
      </div>
    </div>
  );
}
```

---

## 🧪 Testing Checklist

### Manual Testing:
- [ ] Upload single image - works
- [ ] Upload multiple images (up to 6) - works
- [ ] Try to upload 7th image - shows error
- [ ] Try to upload 5MB file - shows error
- [ ] Remove uploaded image - works
- [ ] Create listing with images - saves to DB
- [ ] Images display on product card
- [ ] Images display in correct order
- [ ] First image shows as "Primary"

### Error Scenarios:
- [ ] Not logged in - shows error
- [ ] Network fails during upload - shows error
- [ ] Invalid file type (PDF) - rejected

---

## 📊 What You've Accomplished

After completing Week 1:

✅ **Infrastructure Ready:**
- Image upload fully functional
- Images stored in cloud (UploadThing)
- Database schema updated
- Frontend components built

✅ **User Experience:**
- Drag & drop (or click) upload
- Image preview before submission
- Primary image indicator
- Delete functionality
- Loading states

✅ **Foundation for AI:**
- All AI features need images
- You can now proceed to Week 2 (Species Verification)
- Image URLs ready for AI processing

---

## 🚀 Next Steps

**Week 2 Preview:** Now that image upload is working, we can:
1. Send uploaded images to HuggingFace for classification
2. Auto-verify the species in the background
3. Show verification badges on listings

**Ready to move to Week 2?** Let me know!

---

## 🆘 Troubleshooting

### "Upload failed: Invalid token"
- Check your `UPLOADTHING_SECRET` in `.env.local`
- Make sure you're in `apps/web` directory
- Restart dev server after adding env vars

### Images not showing in database
- Check Prisma schema includes `images` relation
- Run `npx prisma db push` again
- Check API endpoint is creating images

### Upload button not working
- Check browser console for errors
- Verify UploadThing route is accessible: `http://localhost:3000/api/uploadthing`
- Check file size is under 4MB

---

**Estimated Time to Complete Week 1: 5-7 hours**

You now have a production-ready image upload system! 🎉
