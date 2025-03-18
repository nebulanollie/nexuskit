"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  MailIcon,
  ArrowRight,
  Loader2,
  Clock,
  Inbox,
  RotateCw,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface EmailSentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEmail: () => void;
  email: string;
  onTryAnotherEmail: () => void;
  onResend: () => Promise<void>;
}

const emailClients = [
  {
    name: "Default email application",
    url: "mailto:",
    icon: <MailIcon className="h-4 w-4" />,
    primary: true,
  },
  {
    name: "Gmail",
    url: "https://mail.google.com/mail",
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25c-.25-.16-.4-.43-.4-.72 0-.67.73-1.07 1.3-.72L12 11l6.7-4.19c.57-.35 1.3.05 1.3.72 0 .29-.15.56-.4.72z" />
      </svg>
    ),
  },
];

export const EmailSentDialog = ({
  isOpen,
  onClose,
  email,
  onTryAnotherEmail,
  onResend,
}: EmailSentDialogProps) => {
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    try {
      await onResend();
    } catch (error) {
      console.error("Failed to resend email:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-h-[85vh] overflow-y-auto border border-gray-200 shadow-lg rounded-2xl p-0 bg-white backdrop-blur-md"
      >
        <DialogTitle className="sr-only">Email Sent</DialogTitle>
        <div className="flex flex-col items-center justify-center space-y-5 p-6">
          {/* Animated Email Icon */}
          <div className="relative w-16 h-16 mx-auto mb-2">
            <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl animate-pulse" />
            <div className="relative rounded-full bg-gradient-to-b from-blue-100 via-blue-50 to-transparent p-4 backdrop-blur-sm ring-1 ring-blue-200">
              <MailIcon className="h-8 w-8 text-blue-500 animate-bounce" />
            </div>
          </div>

          {/* Title and Email */}
          <div className="space-y-2 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Check your inbox
            </h2>
            <p className="text-sm text-gray-600">
              We've sent the magic link to
            </p>
            <p className="text-sm font-medium text-gray-800 px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg max-w-[250px] truncate">
              {email}
            </p>
          </div>

          {/* Instructions */}
          <div className="w-full space-y-3">
            {/* Main instruction */}
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 rounded-full bg-blue-100 p-1.5">
                  <ArrowRight className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-sm text-gray-700">
                  Click the link in the email to sign in.
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-2">
              {/* Delivery Time */}
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 mt-0.5">
                  <Clock className="h-4 w-4 text-gray-500" />
                </div>
                <span className="text-xs text-gray-500">
                  The email will arrive within 1 minute.
                </span>
              </div>

              {/* Spam Check */}
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 mt-0.5">
                  <Inbox className="h-4 w-4 text-gray-500" />
                </div>
                <span className="text-xs text-gray-500">
                  Can't find the email? Check your spam folder or make sure you entered the correct email address.
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center gap-3 w-full pt-2">
            {/* Email Clients */}
            <div className="flex items-center justify-center gap-2 w-full">
              {emailClients.map((client) => (
                <Button
                  key={client.name}
                  variant={client.primary ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    window.open(client.url, "_blank");
                    setTimeout(() => onClose(), 500);
                  }}
                  className={cn(
                    "text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200",
                    client.primary ? "w-4/5 py-3" : "w-1/5 px-2",
                    client.primary && "shine glow",
                    !client.primary &&
                      "text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 hover:bg-blue-50 hover:scale-105"
                  )}
                  title={!client.primary ? `Open in ${client.name}` : undefined}
                >
                  <span
                    className={cn(
                      "relative z-10 flex items-center gap-2",
                      !client.primary &&
                        "hover:scale-110 transition-transform duration-200"
                    )}
                  >
                    {client.icon}
                    {client.primary && "Open email application"}
                  </span>
                </Button>
              ))}
            </div>

            <div className="w-full pt-2 space-y-2 border-t border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResend}
                disabled={isResending}
                className="w-full text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors group relative overflow-hidden py-3"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isResending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Resending...
                    </>
                  ) : (
                    <>
                      <RotateCw className="h-5 w-5" />
                      Resend email
                    </>
                  )}
                </span>
              </Button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onTryAnotherEmail();
                }}
                className="w-full text-xs text-gray-500 hover:text-gray-600 transition-colors py-2"
              >
                Try another email address
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
