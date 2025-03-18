"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { themeVariations } from "@/lib/styles"
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react"

interface StatData {
  title: string
  value: string | number
  description?: string
  change?: number
  icon?: React.ReactNode
  variant?: keyof typeof themeVariations
}

interface CardWithStatsProps {
  title: string
  description?: string
  stats: StatData[]
  variant?: keyof typeof themeVariations
  className?: string
  footer?: React.ReactNode
}

export function CardWithStats({
  title,
  description,
  stats,
  variant = "default",
  className,
  footer,
}: CardWithStatsProps) {
  return (
    <Card className={cn(
      className,
      variant !== "default" && themeVariations[variant]
    )}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className={cn(
          "grid gap-4",
          stats.length === 1 ? "grid-cols-1" :
          stats.length === 2 ? "grid-cols-1 md:grid-cols-2" :
          stats.length === 3 ? "grid-cols-1 md:grid-cols-3" :
          "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        )}>
          {stats.map((stat, index) => (
            <Stat key={index} {...stat} />
          ))}
        </div>
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}

function Stat({ title, value, description, change, icon, variant }: StatData) {
  return (
    <div className={cn(
      "space-y-2",
      variant !== "default" && variant && themeVariations[variant]
    )}>
      <div className="flex items-center space-x-2">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <p className="text-sm font-medium">{title}</p>
      </div>
      <div className="flex items-baseline space-x-2">
        <p className="text-3xl font-bold">{value}</p>
        {change !== undefined && (
          <div className={cn(
            "text-xs font-medium flex items-center",
            change > 0 
              ? "text-[--color-success]" 
              : change < 0 
                ? "text-[--color-error]" 
                : "text-muted-foreground"
          )}>
            {change === 0 ? (
              <ArrowRightIcon className="h-3 w-3 mr-1" />
            ) : change > 0 ? (
              <ArrowUpIcon className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDownIcon className="h-3 w-3 mr-1" />
            )}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  )
} 