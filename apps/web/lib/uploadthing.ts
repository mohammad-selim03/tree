// TreeVerse UploadThing React Helpers
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

/**
 * These are the React hooks and utilities for UploadThing
 * Use these in your components to handle file uploads
 */
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
