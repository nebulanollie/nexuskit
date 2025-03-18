"use client";

import { BoxIcon } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export function Logo({ size = "md" }: LogoProps) {
  const iconSize = {
    sm: 18,
    md: 24,
    lg: 32,
  };
  
  const fontSize = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };
  
  return (
    <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
      <div className="relative">
        <BoxIcon
          size={iconSize[size]}
          className="text-primary"
        />
        <div className="absolute inset-0 bg-primary opacity-20 blur-sm rounded-full" />
      </div>
      <span className={`font-bold tracking-tight ${fontSize[size]}`}>
        <span className="text-primary">Nexus</span>
        <span>Kit</span>
      </span>
    </Link>
  );
} 