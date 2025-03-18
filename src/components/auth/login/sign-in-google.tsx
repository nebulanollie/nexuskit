"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Loader2, Google } from "@/components/ui/icons";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function SignIn() {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn("google", {
        callbackUrl,
        redirect: true,
      });
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("Sign in failed");
      setIsGoogleLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      variant="outline"
      size="lg"
      className="w-full transition-colors duration-200"
      disabled={isGoogleLoading}
    >
      <span className="flex items-center justify-center gap-2 font-medium">
        {isGoogleLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Google className="h-5 w-5" />
        )}
        {isGoogleLoading ? "Connecting..." : "Continue with Google"}
      </span>
    </Button>
  );
}
