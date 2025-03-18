import React from "react"
import { cn } from "@/lib/utils"
import { componentStyles } from "@/lib/styles"

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  variant?: "default" | "tight" | "loose"
  children: React.ReactNode
}

export function Section({
  as: Component = "section",
  variant = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(
        {
          "py-8 md:py-12": variant === "default",
          "py-4 md:py-6": variant === "tight",
          "py-16 md:py-24": variant === "loose",
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
} 