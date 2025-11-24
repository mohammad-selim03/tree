// TreeVerse UploadThing API Route Handler
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

/**
 * This creates the GET and POST handlers for UploadThing
 * Do not modify unless you know what you're doing!
 */
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Optional: Add custom configuration
  config: {
    // uploadthingId: process.env.UPLOADTHING_APP_ID,
    // uploadthingSecret: process.env.UPLOADTHING_SECRET,
  },
});
