"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function DesignSystem() {
  return (
    <div className="container mx-auto py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Design System</h1>
        <p className="text-muted-foreground">
          A showcase of all components and styling variables.
        </p>
      </div>

      <Tabs defaultValue="colors">
        <TabsList>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="spacing">Spacing</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Colors</CardTitle>
              <CardDescription>
                Primary, secondary, accent and other theme colors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EnhancedColorPalette />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Semantic Colors</CardTitle>
              <CardDescription>
                Success, warning, info, error colors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Color Swatches</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <ColorSwatch name="Success" variable="--color-success" foreground="--color-success-foreground" />
                    <ColorSwatch name="Warning" variable="--color-warning" foreground="--color-warning-foreground" />
                    <ColorSwatch name="Info" variable="--color-info" foreground="--color-info-foreground" />
                    <ColorSwatch name="Error" variable="--color-error" foreground="--color-error-foreground" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Alert Examples</h3>
                  <div className="space-y-4">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Information</AlertTitle>
                      <AlertDescription>
                        This is an informational message.
                      </AlertDescription>
                    </Alert>
                    
                    <Alert variant="destructive">
                      <XCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        This is an error message.
                      </AlertDescription>
                    </Alert>
                    
                    <Alert className="bg-[--color-success] text-[--color-success-foreground]">
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertTitle>Success</AlertTitle>
                      <AlertDescription>
                        This is a success message.
                      </AlertDescription>
                    </Alert>
                    
                    <Alert className="bg-[--color-warning] text-[--color-warning-foreground]">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>
                        This is a warning message.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="typography" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>
                Font sizes, weights, and styles.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Font Sizes</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-4xl">Heading 1 (text-4xl)</p>
                    <p className="text-sm text-muted-foreground">--font-size-4xl</p>
                  </div>
                  <div>
                    <p className="text-3xl">Heading 2 (text-3xl)</p>
                    <p className="text-sm text-muted-foreground">--font-size-3xl</p>
                  </div>
                  <div>
                    <p className="text-2xl">Heading 3 (text-2xl)</p>
                    <p className="text-sm text-muted-foreground">--font-size-2xl</p>
                  </div>
                  <div>
                    <p className="text-xl">Heading 4 (text-xl)</p>
                    <p className="text-sm text-muted-foreground">--font-size-xl</p>
                  </div>
                  <div>
                    <p className="text-lg">Heading 5 (text-lg)</p>
                    <p className="text-sm text-muted-foreground">--font-size-lg</p>
                  </div>
                  <div>
                    <p className="text-base">Body (text-base)</p>
                    <p className="text-sm text-muted-foreground">--font-size-base</p>
                  </div>
                  <div>
                    <p className="text-sm">Small (text-sm)</p>
                    <p className="text-sm text-muted-foreground">--font-size-sm</p>
                  </div>
                  <div>
                    <p className="text-xs">Extra Small (text-xs)</p>
                    <p className="text-sm text-muted-foreground">--font-size-xs</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Font Weights</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-light">Light (font-light)</p>
                    <p className="text-sm text-muted-foreground">--font-weight-light</p>
                  </div>
                  <div>
                    <p className="font-normal">Normal (font-normal)</p>
                    <p className="text-sm text-muted-foreground">--font-weight-normal</p>
                  </div>
                  <div>
                    <p className="font-medium">Medium (font-medium)</p>
                    <p className="text-sm text-muted-foreground">--font-weight-medium</p>
                  </div>
                  <div>
                    <p className="font-semibold">Semibold (font-semibold)</p>
                    <p className="text-sm text-muted-foreground">--font-weight-semibold</p>
                  </div>
                  <div>
                    <p className="font-bold">Bold (font-bold)</p>
                    <p className="text-sm text-muted-foreground">--font-weight-bold</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="spacing" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Spacing Scale</CardTitle>
              <CardDescription>
                Consistent spacing values.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((size) => (
                  <div key={size} className="flex items-center gap-4">
                    <div 
                      className="bg-primary" 
                      style={{ 
                        width: `${size * 0.25}rem`, 
                        height: `${size * 0.25}rem` 
                      }}
                    ></div>
                    <div>
                      <p className="font-medium">{size} ({size * 0.25}rem)</p>
                      <p className="text-sm text-muted-foreground">--spacing-{size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Border Radius</CardTitle>
              <CardDescription>
                Border radius values.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="bg-primary w-16 h-16 rounded-sm"></div>
                  <p className="text-sm">rounded-sm</p>
                  <p className="text-xs text-muted-foreground">--radius-sm</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-primary w-16 h-16 rounded-md"></div>
                  <p className="text-sm">rounded-md</p>
                  <p className="text-xs text-muted-foreground">--radius-md</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-primary w-16 h-16 rounded-lg"></div>
                  <p className="text-sm">rounded-lg</p>
                  <p className="text-xs text-muted-foreground">--radius-lg</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-primary w-16 h-16 rounded-xl"></div>
                  <p className="text-sm">rounded-xl</p>
                  <p className="text-xs text-muted-foreground">--radius-xl</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="components" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>
                Button components with different variants and sizes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Variants</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Sizes</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon"><Info className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Form Elements</CardTitle>
              <CardDescription>
                Input, checkbox, switch, and other form components.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Input</h3>
                  <div className="flex flex-col gap-4 max-w-sm">
                    <Input placeholder="Default input" />
                    <Input placeholder="Disabled input" disabled />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Switch</h3>
                  <div className="flex items-center gap-4">
                    <Switch id="switch-1" />
                    <label htmlFor="switch-1">Toggle me</label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>
                Badge components with different variants.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge className="bg-[--color-success]">Success</Badge>
                <Badge className="bg-[--color-warning] text-[--color-warning-foreground]">Warning</Badge>
                <Badge className="bg-[--color-info]">Info</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function EnhancedColorPalette() {
  const { resolvedTheme } = useTheme()
  const [colorValues, setColorValues] = useState<Record<string, string>>({})
  
  // Get CSS variable values
  useEffect(() => {
    const root = document.documentElement
    const style = getComputedStyle(root)
    
    const colors = {
      background: style.getPropertyValue('--background').trim(),
      foreground: style.getPropertyValue('--foreground').trim(),
      primary: style.getPropertyValue('--primary').trim(),
      'primary-foreground': style.getPropertyValue('--primary-foreground').trim(),
      secondary: style.getPropertyValue('--secondary').trim(),
      'secondary-foreground': style.getPropertyValue('--secondary-foreground').trim(),
      muted: style.getPropertyValue('--muted').trim(),
      'muted-foreground': style.getPropertyValue('--muted-foreground').trim(),
      accent: style.getPropertyValue('--accent').trim(),
      'accent-foreground': style.getPropertyValue('--accent-foreground').trim(),
      card: style.getPropertyValue('--card').trim(),
      'card-foreground': style.getPropertyValue('--card-foreground').trim(),
      border: style.getPropertyValue('--border').trim(),
      destructive: style.getPropertyValue('--destructive').trim(),
      'destructive-foreground': style.getPropertyValue('--destructive-foreground').trim(),
    }
    
    setColorValues(colors)
  }, [resolvedTheme])
  
  const colorPairs = [
    { name: 'Primary', bg: 'primary', fg: 'primary-foreground' },
    { name: 'Secondary', bg: 'secondary', fg: 'secondary-foreground' },
    { name: 'Accent', bg: 'accent', fg: 'accent-foreground' },
    { name: 'Muted', bg: 'muted', fg: 'muted-foreground' },
    { name: 'Card', bg: 'card', fg: 'card-foreground' },
    { name: 'Destructive', bg: 'destructive', fg: 'destructive-foreground' },
  ]
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2 md:col-span-3">
          <div className="flex items-center gap-4">
            <div className="bg-background border border-border w-full h-24 rounded-md flex items-center justify-center">
              <div className="text-foreground font-medium">Background & Foreground</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium">Background:</span> {colorValues.background}
            </div>
            <div>
              <span className="font-medium">Foreground:</span> {colorValues.foreground}
            </div>
          </div>
        </div>
        
        {colorPairs.map((pair) => (
          <div key={pair.name} className="space-y-2">
            <div 
              className={cn(`bg-${pair.bg} h-24 rounded-md flex items-center justify-center`)}
            >
              <div className={cn(`text-${pair.fg} font-medium`)}>{pair.name}</div>
            </div>
            <div className="text-xs space-y-1">
              <div>
                <span className="font-medium">Background:</span> {colorValues[pair.bg] || `--${pair.bg}`}
              </div>
              <div>
                <span className="font-medium">Foreground:</span> {colorValues[pair.fg] || `--${pair.fg}`}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Border & Other Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-16 rounded-md border-2 border-border"></div>
            <p className="text-sm font-medium">Border</p>
            <p className="text-xs">{colorValues.border || '--border'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ColorSwatch({ name, variable, foreground }: { name: string, variable: string, foreground: string }) {
  const [colorValue, setColorValue] = useState("")
  const [foregroundValue, setForegroundValue] = useState("")
  
  useEffect(() => {
    const root = document.documentElement
    const style = getComputedStyle(root)
    
    setColorValue(style.getPropertyValue(variable).trim())
    setForegroundValue(style.getPropertyValue(foreground).trim())
  }, [variable, foreground])
  
  return (
    <div className="space-y-2">
      <div 
        className="h-16 rounded-md flex items-center justify-center"
        style={{ backgroundColor: `var(${variable})`, color: `var(${foreground})` }}
      >
        <span className="font-medium">{name}</span>
      </div>
      <div className="text-xs space-y-1">
        <div>
          <span className="font-medium">Color:</span> {colorValue || variable}
        </div>
        <div>
          <span className="font-medium">Text:</span> {foregroundValue || foreground}
        </div>
      </div>
    </div>
  )
} 