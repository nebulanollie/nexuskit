import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon, CodeIcon, DatabaseIcon, LockIcon, PanelTopIcon, ZapIcon } from "lucide-react";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

/**
 * Home page component - the main landing page for NexusKit
 * Showcases key features and provides navigation to documentation
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header with logo and theme toggle */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <Logo />
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
              <Link href="/components" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Components
              </Link>
              <Link href="/examples" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Examples
              </Link>
            </nav>
            <ThemeToggle />
            <Link 
              href="https://github.com/yourusername/nexuskit" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex"
            >
              <Button variant="outline" size="sm">
                GitHub
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {/* Hero section with gradient background */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,transparent,60%,white)]" />
          
          <div className="container relative z-10">
            <div className="flex flex-col items-center text-center">
              <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm font-medium mb-6">
                v1.0.0 Now Available
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block">Build faster with</span>
                <span className="block text-primary mt-2">NexusKit</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
                A powerful, feature-rich Next.js starter library with authentication, UI components, and database integration.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="h-12 px-8 font-medium">
                  <Link href="/docs/getting-started">
                    Get Started <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 font-medium">
                  <Link href="https://github.com/yourusername/nexuskit" target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Code preview */}
            <div className="mt-16 mx-auto max-w-3xl rounded-lg border bg-card/50 shadow-xl">
              <div className="flex items-center border-b px-4 py-2">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="ml-4 text-sm font-medium">Installation</div>
              </div>
              <pre className="overflow-x-auto p-4 text-sm font-mono">
                <code>
                  npx create-nexuskit-app my-app
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* Features section with icons */}
        <section className="bg-muted/40 py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to build modern web apps
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                NexusKit combines the best tools and patterns in the React ecosystem into one cohesive framework.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Authentication Feature */}
              <div className="flex flex-col items-start rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <LockIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Authentication</h3>
                <p className="mt-2 text-muted-foreground">
                  Complete auth solution with NextAuth.js v5, including Google OAuth, email magic links, and secure session management.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Multiple providers</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Secure & persistent sessions</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Type-safe auth helpers</span>
                  </div>
                </div>
              </div>

              {/* UI Components Feature */}
              <div className="flex flex-col items-start rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <PanelTopIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">UI Components</h3>
                <p className="mt-2 text-muted-foreground">
                  Comprehensive UI kit with 50+ accessible components built with Radix UI and styled with Tailwind CSS.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Accessible components</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Dark mode support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Customizable with Tailwind</span>
                  </div>
                </div>
              </div>

              {/* Database Feature */}
              <div className="flex flex-col items-start rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <DatabaseIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Database Integration</h3>
                <p className="mt-2 text-muted-foreground">
                  PostgreSQL with Prisma ORM for type-safe database operations and schema management.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Type-safe queries</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Migrations & schema management</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Optimized for Next.js</span>
                  </div>
                </div>
              </div>

              {/* TypeScript Feature */}
              <div className="flex flex-col items-start rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <CodeIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">TypeScript</h3>
                <p className="mt-2 text-muted-foreground">
                  Full TypeScript support throughout the codebase for better developer experience and code quality.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Type-safe APIs</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Auto-completion</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Reduced runtime errors</span>
                  </div>
                </div>
              </div>

              {/* Form Handling Feature */}
              <div className="flex flex-col items-start rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <div className="h-6 w-6 flex items-center justify-center text-primary font-bold">
                    Z
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Form Handling</h3>
                <p className="mt-2 text-muted-foreground">
                  React Hook Form with Zod validation for type-safe and efficient form handling.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Type-safe validation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Performant forms</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Reusable form components</span>
                  </div>
                </div>
              </div>

              {/* Performance Feature */}
              <div className="flex flex-col items-start rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <ZapIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Performance</h3>
                <p className="mt-2 text-muted-foreground">
                  Optimized for speed with Next.js App Router, Server Components, and smart bundling strategies.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Server Components</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Optimized bundle sizes</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">Image optimization</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started section */}
        <section className="py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-center mb-10">
                Get Started in Minutes
              </h2>
              
              <div className="space-y-8">
                <div className="rounded-lg border shadow-sm">
                  <div className="border-b px-4 py-3 font-medium">
                    1. Create a new NexusKit project
                  </div>
                  <pre className="overflow-x-auto p-4 text-sm font-mono bg-muted/50">
                    <code>
                      npx create-nexuskit-app my-project
                    </code>
                  </pre>
                </div>
                
                <div className="rounded-lg border shadow-sm">
                  <div className="border-b px-4 py-3 font-medium">
                    2. Start the development server
                  </div>
                  <pre className="overflow-x-auto p-4 text-sm font-mono bg-muted/50">
                    <code>
                      cd my-project{"\n"}
                      npm run dev
                    </code>
                  </pre>
                </div>
                
                <div className="rounded-lg border shadow-sm">
                  <div className="border-b px-4 py-3 font-medium">
                    3. Open in your browser
                  </div>
                  <div className="p-4 text-sm">
                    Your app is now running at <code className="rounded bg-muted px-1 py-0.5">http://localhost:3000</code>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <Button asChild size="lg">
                  <Link href="/docs/getting-started">
                    View Full Documentation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/40 py-8">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <Logo size="sm" />
              <p className="text-sm text-muted-foreground">
                A modern Next.js starter library
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-20">
              <div className="flex flex-col items-center gap-2 md:items-start">
                <div className="text-sm font-medium">Resources</div>
                <nav className="flex flex-col items-center gap-2 md:items-start">
                  <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                  <Link href="/examples" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Examples
                  </Link>
                  <Link href="/components" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Components
                  </Link>
                </nav>
              </div>
              
              <div className="flex flex-col items-center gap-2 md:items-start">
                <div className="text-sm font-medium">Community</div>
                <nav className="flex flex-col items-center gap-2 md:items-start">
                  <Link href="https://github.com/yourusername/nexuskit" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    GitHub
                  </Link>
                  <Link href="https://discord.gg/nexuskit" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Discord
                  </Link>
                  <Link href="https://twitter.com/nexuskit" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Twitter
                  </Link>
                </nav>
              </div>
              
              <div className="flex flex-col items-center gap-2 md:items-start col-span-2 sm:col-span-1">
                <div className="text-sm font-medium">Legal</div>
                <nav className="flex flex-col items-center gap-2 md:items-start">
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </nav>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} NexusKit. All rights reserved. Released under the MIT License.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Built with Next.js
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
