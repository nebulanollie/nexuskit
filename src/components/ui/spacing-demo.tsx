"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { componentStyles } from "@/lib/styles"

export function SpacingDemo() {
  // Create array of size variants
  const sizes = ["xs", "sm", "md", "lg", "xl"] as const
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Spacing Patterns</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="padding">
          <TabsList className="mb-4">
            <TabsTrigger value="padding">Padding</TabsTrigger>
            <TabsTrigger value="margin">Margin</TabsTrigger>
            <TabsTrigger value="gap">Gap</TabsTrigger>
            <TabsTrigger value="spacing">Space Between</TabsTrigger>
          </TabsList>
          
          <TabsContent value="padding" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sizes.map((size) => (
                <div key={size} className="flex flex-col items-center">
                  <div 
                    className={cn(
                      "border border-dashed border-border w-full bg-muted/20 flex items-center justify-center",
                      componentStyles.padding[size]
                    )}
                  >
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs">
                      Content
                    </div>
                  </div>
                  <p className="text-xs mt-2">padding-{size}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="margin" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sizes.map((size) => (
                <div key={size} className="border border-dashed border-border bg-muted/20 flex items-center justify-center">
                  <div 
                    className={cn(
                      "bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs",
                      componentStyles.margin[size]
                    )}
                  >
                    margin-{size}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="gap" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sizes.map((size) => (
                <div 
                  key={size} 
                  className={cn(
                    "border border-dashed border-border p-4 bg-muted/20 flex flex-wrap",
                    componentStyles.gap[size]
                  )}
                >
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs">
                      Item
                    </div>
                  ))}
                  <p className="w-full text-xs mt-2">gap-{size}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="spacing" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sizes.map((size) => (
                <div key={size} className="space-y-4">
                  <div 
                    className={cn(
                      "border border-dashed border-border p-4 bg-muted/20 flex flex-col",
                      componentStyles.spacing[size]
                    )}
                  >
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs">
                        Vertical
                      </div>
                    ))}
                  </div>
                  
                  <div 
                    className={cn(
                      "border border-dashed border-border p-4 bg-muted/20 flex flex-row items-start",
                      componentStyles.spacing[size]
                    )}
                  >
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs">
                        Horizontal
                      </div>
                    ))}
                  </div>
                  <p className="text-xs">spacing-{size}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 