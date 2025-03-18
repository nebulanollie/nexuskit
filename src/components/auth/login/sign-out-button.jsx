"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Check, LogOut } from "@/components/ui/icons";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    toast({
      title: (
        <div className="flex items-center">
          <Check className="mr-2 h-5 w-5 text-green-500" />
          <span>Logout successful!</span>
        </div>
      ),
      description: "You have successfully logged out from the app",
    });
    router.push("/");
  };

  return (
    <DropdownMenuItem
      onSelect={handleSignOut}
      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
    >
      <LogOut className="mr-2 h-5 w-5 text-gray-600" />
      <span className="font-medium">Logout</span>
    </DropdownMenuItem>
  );
};

export default SignOutButton;
