import { cn } from "@/lib/utils"
import { componentStyles } from "@/lib/styles"
import React from "react"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"
  className?: string
}

export function Container({
  as: Component = "div",
  size = "5xl",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component 
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        {
          "max-w-xs": size === "xs",
          "max-w-sm": size === "sm",
          "max-w-md": size === "md",
          "max-w-lg": size === "lg", 
          "max-w-xl": size === "xl",
          "max-w-2xl": size === "2xl",
          "max-w-3xl": size === "3xl", 
          "max-w-4xl": size === "4xl",
          "max-w-5xl": size === "5xl",
          "max-w-6xl": size === "6xl",
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
} 