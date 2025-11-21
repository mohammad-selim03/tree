import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "TreeVerse - Premium Tree Marketplace",
    template: "%s | TreeVerse",
  },
  description: "Discover and purchase premium trees from verified sellers. Browse our extensive catalog of ornamental, fruit, and shade trees for your garden.",
  keywords: ["trees", "plants", "marketplace", "nursery", "gardening", "landscaping"],
  authors: [{ name: "TreeVerse" }],
  openGraph: {
    title: "TreeVerse - Premium Tree Marketplace",
    description: "Discover and purchase premium trees from verified sellers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <Navbar />
          <SmoothScroll />
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
