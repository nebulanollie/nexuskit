import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  error?: string | null;
}

export const AuthLayout = ({
  children,
  title,
  subtitle,
  showBackButton = true,
  error,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02]" />
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background" />

      {/* Animated gradient orbs */}
      <div className="absolute -top-20 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#FF8000]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute -top-20 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#153A7B]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-20 left-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#153A7B]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <div className="relative flex min-h-screen items-center justify-center p-4">
        {showBackButton && (
          <Link
            href="/"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "default",
                className:
                  "absolute left-2 top-2 md:left-8 md:top-8 text-muted-foreground hover:text-foreground",
              })
            )}
          >
            <span className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Mağazaya Dön</span>
            </span>
          </Link>
        )}

        <div className="w-full max-w-[380px] sm:max-w-md relative">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#153A7B]/10 via-[#FF8000]/10 to-[#153A7B]/10 rounded-2xl blur opacity-50" />

            <div
              className="relative bg-background/80 backdrop-blur-xl p-4 sm:p-8 
                          border border-[#FF8000]/10 rounded-xl
                          shadow-2xl shadow-[#FF8000]/5"
            >
              <div className="flex flex-col space-y-4 sm:space-y-6 text-center items-center">
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="/siner-logo.png"
                    alt="Sinerteknik Logo"
                    className="h-12 w-auto"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#153A7B]">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="text-sm sm:text-base text-[#153A7B]/60 max-w-sm mx-auto">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="mt-4 mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {children}
            </div>
          </div>

          {/* Spot gradients */}
          <div
            className="absolute -z-10 blur-[100px] opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] 
                        from-[#153A7B]/40 via-[#153A7B]/10 to-transparent w-full h-24 sm:h-32 rounded-full -top-10"
          />
          <div
            className="absolute -z-10 blur-[100px] opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] 
                        from-[#FF8000]/40 via-[#FF8000]/10 to-transparent w-full h-24 sm:h-32 rounded-full -bottom-10"
          />
        </div>
      </div>
    </div>
  );
};
