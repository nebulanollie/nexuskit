import { DesignSystem } from "@/components/design-system"
import { ThemeSwitch } from "@/components/ui/theme-switch"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ThemeCustomizer } from "@/components/ui/theme-customizer"
import { SpacingDemo } from "@/components/ui/spacing-demo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-sticky p-4 bg-background/80 backdrop-blur-sm border-b border-border flex justify-between items-center">
        <h1 className="text-xl font-semibold">Design System</h1>
        <ThemeSwitch />
      </div>
      
      <Section>
        <Container>
          <Tabs defaultValue="showcase">
            <TabsList className="mb-8">
              <TabsTrigger value="showcase">Component Showcase</TabsTrigger>
              <TabsTrigger value="customizer">Theme Customizer</TabsTrigger>
              <TabsTrigger value="patterns">Layout Patterns</TabsTrigger>
            </TabsList>
            
            <TabsContent value="showcase">
              <DesignSystem />
            </TabsContent>
            
            <TabsContent value="customizer">
              <div className="grid grid-cols-1 gap-8">
                <ThemeCustomizer />
              </div>
            </TabsContent>
            
            <TabsContent value="patterns">
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Container Sizes</h2>
                  <p className="text-muted-foreground">Containers provide consistent horizontal width and padding.</p>
                  
                  <div className="space-y-4 mt-6">
                    {["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"].map((size) => (
                      <div key={size} className="border border-dashed border-border rounded-lg overflow-hidden bg-muted/20">
                        <Container size={size as any} className="py-3 bg-primary/10 border-b border-t border-primary/20">
                          <p className="text-sm text-center font-medium">Container {size}</p>
                        </Container>
                      </div>
                    ))}
                  </div>
                </div>
                
                <SpacingDemo />
              </div>
            </TabsContent>
          </Tabs>
        </Container>
      </Section>
    </div>
  )
} 