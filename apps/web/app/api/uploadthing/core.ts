// TreeVerse UploadThing File Router Configuration
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// Authentication check (you'll need to implement your auth method)
const auth = async (req: Request) => {
  // TODO: Replace with your actual authentication
  // For now, return a mock user ID
  // In production, use: const session = await getServerSession();
  
  // Example with NextAuth:
  // const session = await getServerSession();
  // if (!session?.user) throw new UploadThingError("Unauthorized");
  // return { userId: session.user.id };
  
  // Temporary mock - REMOVE THIS IN PRODUCTION
  return { userId: "temp-user-id" };
};

/**
 * This is your Uploadthing file router
 * Define file upload endpoints here
 */
export const ourFileRouter = {
  /**
   * Listing Image Uploader
   * Max 6 images per listing, 4MB each
   */
  listingImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 6,
    },
  })
    .middleware(async ({ req }) => {
      // Authenticate user
      const user = await auth(req);

      // Pass metadata to onUploadComplete
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs on your server after upload completes
      console.log("Upload complete!");
      console.log("Uploaded by user:", metadata.userId);
      console.log("File URL:", file.url);
      console.log("File name:", file.name);
      console.log("File key:", file.key);

      // TODO: Save to database
      // await prisma.listingImage.create({
      //   data: {
      //     url: file.url,
      //     key: file.key,
      //     listingId: "get-from-metadata",
      //   }
      // });

      // Return data to the client
      return {
        uploadedBy: metadata.userId,
        url: file.url,
        key: file.key,
        name: file.name,
      };
    }),

  /**
   * Profile Avatar Uploader
   * Single image, 2MB max
   */
  profileAvatar: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Avatar uploaded by:", metadata.userId);
      console.log("Avatar URL:", file.url);

      // TODO: Update user profile with new avatar
      // await prisma.user.update({
      //   where: { id: metadata.userId },
      //   data: { avatarUrl: file.url }
      // });

      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
