import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

/**
 * Geist Sans font configuration
 * Modern, clean sans-serif font for UI elements
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Geist Mono font configuration
 * Monospace font for code blocks and technical content
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Metadata for the application
 * Customize these values for your project
 */
export const metadata: Metadata = {
  title: "Next.js Starter Template",
  description: "A modern, feature-rich starter template for Next.js applications with authentication, UI components, and database integration.",
  keywords: ["next.js", "react", "typescript", "tailwind", "prisma", "authentication"],
  authors: [
    {
      name: "Next.js Starter Contributors",
    },
  ],
  creator: "Next.js Starter Team",
};

/**
 * Root layout component that wraps all pages
 * Provides theme support, font loading, and toast notifications
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
