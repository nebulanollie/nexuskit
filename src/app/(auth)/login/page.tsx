import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/login/login-form";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import * as Icons from "@/components/ui/icons";
import { auth } from "@/lib/auth";

async function Login() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50">
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <Link
          href={`/`}
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "default",
              className:
                "absolute left-4 top-4 md:left-8 md:top-8 text-gray-600 hover:text-gray-800 transition-colors",
            })
          )}
        >
          <span className="flex items-center gap-2">
            <Icons.ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </span>
        </Link>

        <div className="w-full max-w-md mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 opacity-50 blur-lg" />
            <div className="relative z-10 bg-gray-100/70 backdrop-blur-sm p-8 border border-gray-200 rounded-2xl shadow-lg">
              <div className="flex flex-col space-y-4 sm:space-y-6 text-center items-center">
                <div className="transform hover:scale-105 transition-transform duration-300">
starter                 </div>
                <div className="space-y-2">
                  <h1
                    className="text-2xl sm:text-3xl font-bold tracking-tight bg-clip-text text-transparent" 
                  >
welcome to starter app                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-sm mx-auto">
login to your account to continue                  </p>
                </div>
              </div>

              <LoginForm />

              <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-center text-gray-500">
                By logging in, you agree to the{" "}
                <Link
                  href="/terms"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Privacy Policy
                </Link>
                &apos;nı accept.
              </p>
            </div>
          </div>

          <div className="absolute -z-10 top-[-50px] left-0 w-full h-32 bg-gradient-to-r from-primary to-transparent opacity-20 blur-3xl" />
          <div className="absolute -z-10 bottom-[-50px] left-0 w-full h-32 bg-gradient-to-r from-secondary to-transparent opacity-20 blur-3xl" />
        </div>
      </div>
    </div>
  );
}

export default Login;
