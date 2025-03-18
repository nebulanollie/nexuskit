"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Icons from "@/components/ui/icons";
import { SignIn } from "@/components/auth/login/sign-in-google";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { EmailSentDialog } from "./email-sent-dialog";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface AdminCheckResponse {
  isAdmin: boolean;
}

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showEmailSentDialog, setShowEmailSentDialog] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const checkAdmin = async (email: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/check-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Admin check failed");
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response received from server");
      }

      const data = (await res.json()) as AdminCheckResponse;
      return data.isAdmin;
    } catch (error) {
      console.error("Admin check error:", error);
      return false;
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const admin = await checkAdmin(formData.email);
      setIsAdmin(admin);

      if (admin && !formData.password) {
        toast.success("Please enter your password.");
        return;
      }

      if (admin) {
        const result = await signIn("credentials", {
          username: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          toast.error(result.error);
          return;
        }

        router.push(callbackUrl);
      } else {
        await signIn("resend", {
          email: formData.email,
          redirect: false,
        });
        setShowEmailSentDialog(true);
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogClose = (): void => {
    setShowEmailSentDialog(false);
  };

  const handleEmailLinkClick = (): void => {
    window.location.href = "mailto:";
    setTimeout(() => {
      setShowEmailSentDialog(false);
    }, 500);
  };

  const handleTryAnotherEmail = (): void => {
    setShowEmailSentDialog(false);
    form.reset();
  };

  const handleResendEmail = async (): Promise<void> => {
    try {
      await signIn("resend", {
        email: form.getValues("email"),
        redirect: false,
      });

      toast.success("We've sent you another magic link.");
    } catch (error) {
      toast.error("Failed to resend email. Please try again.");
    }
  };

  return (
    <div className="grid gap-4 w-full mt-6 sm:mt-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 sm:space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#153A7B] font-medium flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <span className="mb-1 sm:mb-0">
                    Email Address <span className="text-[#FF8000]">*</span>
                  </span>
                  <span className="text-xs text-[#153A7B]/70">
                    We'll send you a secure login link
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@email.com"
                    {...field}
                    className="h-10 sm:h-11 bg-gray-100 border border-[#153A7B]/20 text-[#153A7B] placeholder-[#153A7B]/60
                               focus:border-[#FF8000] focus:ring-[#FF8000] transition duration-200 rounded-md"
                    onBlur={async () => {
                      const isAdminUser = await checkAdmin(field.value);
                      setIsAdmin(isAdminUser);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          {isAdmin && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#153A7B] font-medium flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <span className="mb-1 sm:mb-0">
                      Admin Password <span className="text-[#FF8000]">*</span>
                    </span>
                    <span className="text-xs text-[#153A7B]/70">
                      Required for admin access
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your admin password"
                      {...field}
                      className="h-10 sm:h-11 bg-gray-100 border border-[#153A7B]/20 text-[#153A7B] placeholder-[#153A7B]/60
                               focus:border-[#FF8000] focus:ring-[#FF8000] transition duration-200 rounded-md"
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full text-[15px] sm:text-base px-6 sm:px-8 py-5 sm:py-6 group"
          >
            <span className="flex items-center gap-2 relative z-10">
              {isLoading && <Icons.Loader2 className="h-4 w-4 animate-spin" />}
              {isLoading ? "Logging In..." : "Continue with Email"}
            </span>
          </Button>

          {!isAdmin && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-primary/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background/80 px-2 text-muted-foreground backdrop-blur-sm">
                    or
                  </span>
                </div>
              </div>
              <SignIn />
              <p className="text-xs text-center text-muted-foreground mt-4">
                Fast and secure login with your Google account
              </p>
            </>
          )}
        </form>
      </Form>
      <EmailSentDialog
        isOpen={showEmailSentDialog}
        onClose={handleDialogClose}
        onOpenEmail={handleEmailLinkClick}
        email={form.getValues("email")}
        onTryAnotherEmail={handleTryAnotherEmail}
        onResend={handleResendEmail}
      />
    </div>
  );
};

export default LoginForm;
