"use client";

import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { X, Upload, ImageIcon, Loader2 } from "lucide-react";
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
    onUploadBegin: () => {
      setIsUploading(true);
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

    // Validate file types
    const invalidTypes = files.filter((f) => !f.type.startsWith("image/"));
    if (invalidTypes.length > 0) {
      toast.error("Only image files are allowed");
      return;
    }

    await startUpload(files);
  };

  const removeImage = (url: string) => {
    onChange(value.filter((img) => img !== url));
    toast.success("Image removed");
  };

  const canUploadMore = value.length < maxImages && !disabled;

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {canUploadMore && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
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
            className={`cursor-pointer flex flex-col items-center gap-3 p-8 ${isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {isUploading ? (
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            ) : (
              <Upload className="h-10 w-10 text-gray-400" />
            )}
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">
                {isUploading
                  ? "Uploading..."
                  : `Click to upload (${value.length}/${maxImages})`}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, WebP up to 4MB each
              </p>
            </div>
          </label>
        </div>
      )}

      {/* Image Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {value.map((url, index) => (
            <div
              key={url}
              className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 group hover:border-primary transition-colors"
            >
              <Image
                src={url}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Primary badge */}
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded font-medium shadow-sm">
                  Primary
                </div>
              )}

              {/* Remove button */}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-sm"
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              {/* Image number */}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {value.length === 0 && !canUploadMore && (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
          <ImageIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p className="text-sm text-gray-500">No images uploaded</p>
        </div>
      )}

      {/* Helper text */}
      {value.length > 0 && (
        <p className="text-xs text-gray-500">
          💡 Tip: The first image will be the primary image shown on listings.
          {canUploadMore && ` You can upload ${maxImages - value.length} more image(s).`}
        </p>
      )}
    </div>
  );
}
