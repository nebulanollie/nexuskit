"use client"

import { useState, useEffect, useCallback } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { storageKeys } from "@/lib/styles"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RotateCcw } from "lucide-react"

// Define color presets for both light and dark modes
const colorPresets = [
  {
    name: "Default",
    colors: {
      light: {
        primary: "oklch(0.205 0 0)",
        accent: "oklch(0.97 0 0)",
        secondary: "oklch(0.97 0 0)",
      },
      dark: {
        primary: "oklch(0.922 0 0)",
        accent: "oklch(0.269 0 0)",
        secondary: "oklch(0.269 0 0)",
      }
    },
  },
  {
    name: "Violet",
    colors: {
      light: {
        primary: "oklch(0.488 0.243 264.376)",
        accent: "oklch(0.77 0.143 280)",
        secondary: "oklch(0.89 0.07 280)",
      },
      dark: {
        primary: "oklch(0.77 0.143 280)",
        accent: "oklch(0.3 0.1 280)",
        secondary: "oklch(0.3 0.1 280)",
      }
    },
  },
  {
    name: "Blue",
    colors: {
      light: {
        primary: "oklch(0.5 0.2 240)",
        accent: "oklch(0.8 0.15 240)",
        secondary: "oklch(0.92 0.05 240)",
      },
      dark: {
        primary: "oklch(0.8 0.15 240)",
        accent: "oklch(0.3 0.1 240)",
        secondary: "oklch(0.3 0.1 240)",
      }
    },
  },
  {
    name: "Green",
    colors: {
      light: {
        primary: "oklch(0.5 0.2 145)", 
        accent: "oklch(0.8 0.15 145)",
        secondary: "oklch(0.92 0.05 145)",
      },
      dark: {
        primary: "oklch(0.7 0.15 145)", 
        accent: "oklch(0.3 0.1 145)",
        secondary: "oklch(0.3 0.1 145)",
      }
    },
  },
  {
    name: "Orange",
    colors: {
      light: {
        primary: "oklch(0.6 0.24 45)",
        accent: "oklch(0.8 0.15 45)",
        secondary: "oklch(0.92 0.05 45)",
      },
      dark: {
        primary: "oklch(0.7 0.2 45)",
        accent: "oklch(0.3 0.1 45)",
        secondary: "oklch(0.3 0.1 45)",
      }
    },
  },
]

// Simple functions to convert between color formats
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (c: number) => {
    const hex = Math.round(c).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

// Function to approximate oklch to rgb - not perfect but works for UI preview
function approximateOklchToRgb(oklchStr: string): string {
  // Default fallback colors for different variables to ensure UI is usable
  if (oklchStr.includes('--primary')) return '#000000'
  if (oklchStr.includes('--secondary')) return '#f5f5f5'
  if (oklchStr.includes('--accent')) return '#f5f5f5'
  if (oklchStr.includes('--muted')) return '#f5f5f5'
  if (oklchStr.includes('--background')) return '#ffffff'
  if (oklchStr.includes('--foreground')) return '#000000'
  if (oklchStr.includes('--success')) return '#4caf50'
  if (oklchStr.includes('--warning')) return '#ff9800'
  if (oklchStr.includes('--info')) return '#2196f3'
  if (oklchStr.includes('--error')) return '#f44336'
  
  try {
    // Parse oklch value
    const matches = oklchStr.match(/oklch\(([0-9.]+) ([0-9.]+) ([0-9.]+)\)/)
    if (!matches) return '#000000'
    
    // Very basic approximation (not accurate but works for preview)
    const l = parseFloat(matches[1]) // lightness 0-1
    const c = parseFloat(matches[2]) // chroma
    const h = parseFloat(matches[3]) // hue angle 0-360
    
    // Map lightness directly to grayscale if no chroma
    if (c < 0.01) {
      const value = Math.round(l * 255)
      return rgbToHex(value, value, value)
    }
    
    // Very simple hue-to-rgb mapping (not accurate but visual indication)
    const hueSector = Math.floor(h / 60) % 6
    const saturation = Math.min(c * 2, 1) // scale chroma to 0-1 range
    
    // Adapt brightness based on lightness
    const brightness = l * 255
    
    // Generate an RGB approximation based on hue sector
    switch (hueSector) {
      case 0: // Red to Yellow
        return rgbToHex(brightness, brightness * (1 - saturation), brightness * (1 - saturation))
      case 1: // Yellow to Green
        return rgbToHex(brightness * (1 - saturation), brightness, brightness * (1 - saturation))
      case 2: // Green to Cyan
        return rgbToHex(brightness * (1 - saturation), brightness, brightness * (1 - saturation * 0.5))
      case 3: // Cyan to Blue
        return rgbToHex(brightness * (1 - saturation), brightness * (1 - saturation * 0.5), brightness)
      case 4: // Blue to Magenta
        return rgbToHex(brightness * (1 - saturation * 0.5), brightness * (1 - saturation), brightness)
      case 5: // Magenta to Red
        return rgbToHex(brightness, brightness * (1 - saturation), brightness * (1 - saturation * 0.5))
      default:
        return rgbToHex(brightness, brightness, brightness)
    }
  } catch (e) {
    console.error("Error converting oklch to hex:", e)
    return "#000000"
  }
}

// Type for CSS variables
type ThemeVar = {
  name: string
  variable: string
  value: string
  defaultValue: string
  type: 'color' | 'spacing' | 'radius' | 'shadow'
  category: string
}

export function ThemeCustomizer() {
  const { theme } = useTheme()
  const [radius, setRadius] = useState(10)
  const [selectedPreset, setSelectedPreset] = useState(0)
  const [themeVars, setThemeVars] = useState<ThemeVar[]>([])
  const [activeColor, setActiveColor] = useState<ThemeVar | null>(null)
  const [showExport, setShowExport] = useState(false)
  const [exportText, setExportText] = useState("")
  
  // Load all CSS variables from root
  const loadThemeVariables = useCallback(() => {
    const root = document.documentElement
    const style = getComputedStyle(root)
    const cssVars: ThemeVar[] = []
    
    // Color variables
    const colorVars = [
      'background', 'foreground', 'primary', 'primary-foreground', 
      'secondary', 'secondary-foreground', 'accent', 'accent-foreground',
      'muted', 'muted-foreground', 'card', 'card-foreground',
      'destructive', 'destructive-foreground', 'border', 'input', 'ring'
    ]
    
    colorVars.forEach(varName => {
      const value = style.getPropertyValue(`--${varName}`).trim()
      cssVars.push({
        name: varName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        variable: `--${varName}`,
        value,
        defaultValue: value,
        type: 'color',
        category: 'Theme Colors'
      })
    })
    
    // Semantic colors
    const semanticVars = [
      'color-success', 'color-success-foreground',
      'color-warning', 'color-warning-foreground',
      'color-info', 'color-info-foreground',
      'color-error', 'color-error-foreground'
    ]
    
    semanticVars.forEach(varName => {
      const value = style.getPropertyValue(`--${varName}`).trim()
      cssVars.push({
        name: varName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).replace('Color ', ''),
        variable: `--${varName}`,
        value,
        defaultValue: value,
        type: 'color',
        category: 'Semantic Colors'
      })
    })
    
    // Radius variables
    const radiusVars = ['radius-sm', 'radius-md', 'radius-lg', 'radius-xl']
    radiusVars.forEach(varName => {
      const value = style.getPropertyValue(`--${varName}`).trim()
      cssVars.push({
        name: varName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        variable: `--${varName}`,
        value,
        defaultValue: value,
        type: 'radius',
        category: 'Radius'
      })
    })
    
    // Spacing variables
    const spacingVars = [
      'spacing-1', 'spacing-2', 'spacing-3', 'spacing-4', 'spacing-5',
      'spacing-6', 'spacing-8', 'spacing-10', 'spacing-12', 'spacing-16'
    ]
    spacingVars.forEach(varName => {
      const value = style.getPropertyValue(`--${varName}`).trim()
      cssVars.push({
        name: varName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        variable: `--${varName}`,
        value,
        defaultValue: value,
        type: 'spacing',
        category: 'Spacing'
      })
    })
    
    setThemeVars(cssVars)
  }, [])
  
  // Load saved settings on mount
  useEffect(() => {
    // Get radius from localStorage or CSS
    const savedRadius = localStorage.getItem(storageKeys.radius)
    if (savedRadius) {
      setRadius(parseFloat(savedRadius))
      applyRadius(parseFloat(savedRadius))
    } else {
      // Fallback to CSS value
      const root = document.documentElement
      const radiusValue = getComputedStyle(root).getPropertyValue('--radius').trim()
      if (radiusValue) {
        const radiusPx = parseFloat(radiusValue) * 16
        setRadius(radiusPx)
      }
    }
    
    // Get color preset
    const savedPreset = localStorage.getItem(storageKeys.colorPreset)
    if (savedPreset) {
      const presetIndex = parseInt(savedPreset)
      setSelectedPreset(presetIndex)
      applyColorPreset(presetIndex, theme || 'light')
    }
    
    // Load all CSS variables
    loadThemeVariables()
  }, [theme, loadThemeVariables])
  
  // Apply radius change
  const handleRadiusChange = (value: number[]) => {
    const newRadius = value[0]
    setRadius(newRadius)
    applyRadius(newRadius)
    localStorage.setItem(storageKeys.radius, newRadius.toString())
  }
  
  const applyRadius = (newRadius: number) => {
    const root = document.documentElement
    root.style.setProperty('--radius', `${newRadius / 16}rem`)
    
    // Update theme vars state
    loadThemeVariables()
  }
  
  // Apply color preset
  const applyColorPreset = (presetIndex: number, themeMode = theme) => {
    setSelectedPreset(presetIndex)
    localStorage.setItem(storageKeys.colorPreset, presetIndex.toString())
    
    const preset = colorPresets[presetIndex]
    const root = document.documentElement
    
    // Apply to current theme (light or dark)
    const currentMode = themeMode === 'dark' ? 'dark' : 'light'
    const colors = preset.colors[currentMode]
    
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
    
    // Update semantic colors based on primary
    if (presetIndex > 0) {
      // For non-default presets, derive semantic colors from primary
      const baseColor = preset.colors[currentMode].primary
      const baseChroma = baseColor.match(/oklch\([0-9.]+ ([0-9.]+) [0-9.]+\)/)?.[1] || "0.2"
      const baseLightness = parseFloat(baseColor.match(/oklch\(([0-9.]+)/)?.[1] || "0.5")
      
      // Set semantic colors
      root.style.setProperty('--color-success', `oklch(${baseLightness} ${baseChroma} 145)`)
      root.style.setProperty('--color-warning', `oklch(${baseLightness} ${baseChroma} 80)`)
      root.style.setProperty('--color-info', `oklch(${baseLightness} ${baseChroma} 250)`)
      root.style.setProperty('--color-error', `oklch(${baseLightness} ${baseChroma} 27)`)
    }
    
    // Update theme vars state
    loadThemeVariables()
  }
  
  // Handle opening color picker
  const handleOpenColorPicker = (themeVar: ThemeVar) => {
    setActiveColor(themeVar)
  }
  
  // Apply color change from input
  const handleNativeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!activeColor) return
    
    const hex = e.target.value
    
    // Generate an approximation of oklch value from the hex
    // For simplicity, we'll use a simple heuristic for the conversion
    let oklchValue = ""
    
    // Different heuristics for different color types
    if (activeColor.variable.includes('primary')) {
      oklchValue = `oklch(0.5 0.2 ${parseInt(hex.slice(1, 3), 16)})`
    } else if (activeColor.variable.includes('secondary') || activeColor.variable.includes('accent')) {
      oklchValue = `oklch(0.9 0.05 ${parseInt(hex.slice(3, 5), 16)})`
    } else if (activeColor.variable.includes('background')) {
      // For background, we use lightness based on the hex brightness
      const r = parseInt(hex.slice(1, 3), 16) / 255
      const g = parseInt(hex.slice(3, 5), 16) / 255
      const b = parseInt(hex.slice(5, 7), 16) / 255
      const lightness = (r + g + b) / 3
      oklchValue = `oklch(${lightness.toFixed(3)} 0 0)`
    } else if (activeColor.variable.includes('foreground')) {
      // For foreground, invert the background logic
      const r = parseInt(hex.slice(1, 3), 16) / 255
      const g = parseInt(hex.slice(3, 5), 16) / 255
      const b = parseInt(hex.slice(5, 7), 16) / 255
      const lightness = 1 - (r + g + b) / 3
      oklchValue = `oklch(${lightness.toFixed(3)} 0 0)`
    } else if (activeColor.variable.includes('success')) {
      oklchValue = `oklch(0.5 0.2 145)`
    } else if (activeColor.variable.includes('warning')) {
      oklchValue = `oklch(0.6 0.2 80)`
    } else if (activeColor.variable.includes('info')) {
      oklchValue = `oklch(0.5 0.15 250)`
    } else if (activeColor.variable.includes('error') || activeColor.variable.includes('destructive')) {
      oklchValue = `oklch(0.6 0.2 27)`
    } else {
      // Default conversion
      oklchValue = `oklch(0.5 0.1 ${parseInt(hex.slice(1, 3), 16)})`
    }
    
    // Update CSS variable
    const root = document.documentElement
    root.style.setProperty(activeColor.variable, oklchValue)
    
    // Update theme vars state WITHOUT triggering another render cycle
    setThemeVars(prev => 
      prev.map(v => 
        v.variable === activeColor.variable 
          ? { ...v, value: oklchValue }
          : v
      )
    )
  }
  
  // Reset a variable to default
  const resetVariable = (variable: string) => {
    const themeVar = themeVars.find(v => v.variable === variable)
    if (!themeVar) return
    
    const root = document.documentElement
    root.style.setProperty(variable, themeVar.defaultValue)
    
    // Update theme vars state
    setThemeVars(prev => 
      prev.map(v => 
        v.variable === variable 
          ? { ...v, value: v.defaultValue }
          : v
      )
    )
  }
  
  // Export theme as CSS
  const exportTheme = () => {
    let css = ":root {\n"
    
    themeVars.forEach(v => {
      css += `  ${v.variable}: ${v.value};\n`
    })
    
    css += "}"
    
    setExportText(css)
    setShowExport(true)
  }
  
  // Group variables by category
  const groupedVars = themeVars.reduce((acc, v) => {
    if (!acc[v.category]) {
      acc[v.category] = []
    }
    acc[v.category].push(v)
    return acc
  }, {} as Record<string, ThemeVar[]>)
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Theme Customizer</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="radius">
          <TabsList className="mb-4">
            <TabsTrigger value="radius">Radius</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="presets">Presets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="radius" className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Border Radius</Label>
                <span className="text-sm text-muted-foreground">{radius}px</span>
              </div>
              <Slider 
                value={[radius]} 
                min={0} 
                max={20} 
                step={1}
                onValueChange={handleRadiusChange} 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col items-center gap-2">
                <div className={cn("bg-primary w-16 h-16 rounded-sm")}></div>
                <span className="text-xs">Rounded Small</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className={cn("bg-primary w-16 h-16 rounded-md")}></div>
                <span className="text-xs">Rounded Medium</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className={cn("bg-primary w-16 h-16 rounded-lg")}></div>
                <span className="text-xs">Rounded Large</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className={cn("bg-primary w-16 h-16 rounded-xl")}></div>
                <span className="text-xs">Rounded Extra Large</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="colors" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {themeVars
                .filter(v => v.type === 'color' && v.category === 'Theme Colors')
                .map((variable) => (
                  <div key={variable.variable} className="space-y-2">
                    <button 
                      className="w-full h-12 rounded-md border border-border transition-all hover:scale-105"
                      style={{ backgroundColor: `var(${variable.variable})` }}
                      onClick={() => handleOpenColorPicker(variable)}
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-xs">{variable.name}</p>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6" 
                        onClick={() => resetVariable(variable.variable)}
                      >
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              }
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Semantic Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {themeVars
                  .filter(v => v.type === 'color' && v.category === 'Semantic Colors')
                  .map((variable) => (
                    <div key={variable.variable} className="space-y-2">
                      <button 
                        className="w-full h-12 rounded-md border border-border transition-all hover:scale-105"
                        style={{ backgroundColor: `var(${variable.variable})` }}
                        onClick={() => handleOpenColorPicker(variable)}
                      />
                      <div className="flex justify-between items-center">
                        <p className="text-xs">{variable.name}</p>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => resetVariable(variable.variable)}
                        >
                          <RotateCcw className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            
            {activeColor && (
              <div className="mt-6 p-4 border border-border rounded-lg">
                <h3 className="text-sm font-medium mb-3">Color Picker: {activeColor.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="h-32 rounded-lg border border-border flex items-center justify-center" style={{ backgroundColor: `var(${activeColor.variable})` }}>
                      <div className="bg-muted p-2 rounded-md text-sm">
                        {activeColor.variable}: {activeColor.value}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Color</Label>
                      <input 
                        type="color" 
                        className="w-full h-10 mt-1 cursor-pointer rounded-md overflow-hidden"
                        value={approximateOklchToRgb(activeColor.value)}
                        onChange={handleNativeColorChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>OKLCH Value</Label>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <div>
                          <Label className="text-xs">Lightness</Label>
                          <Slider 
                            value={[parseFloat(activeColor.value.match(/oklch\(([0-9.]+)/)?.[1] || "0.5") * 100]} 
                            min={0} 
                            max={100} 
                            step={1}
                            onValueChange={(values) => {
                              const value = values[0] / 100
                              const currentValue = activeColor.value
                              const newValue = currentValue.replace(/oklch\([0-9.]+/, `oklch(${value.toFixed(3)}`)
                              
                              const root = document.documentElement
                              root.style.setProperty(activeColor.variable, newValue)
                              
                              setThemeVars(prev => 
                                prev.map(v => 
                                  v.variable === activeColor.variable 
                                    ? { ...v, value: newValue }
                                    : v
                                )
                              )
                            }}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Chroma</Label>
                          <Slider 
                            value={[parseFloat(activeColor.value.match(/oklch\([0-9.]+ ([0-9.]+)/)?.[1] || "0") * 100]}
                            min={0} 
                            max={30} 
                            step={1}
                            onValueChange={(values) => {
                              const value = values[0] / 100
                              const currentValue = activeColor.value
                              const newValue = currentValue.replace(/oklch\([0-9.]+ [0-9.]+/, `oklch(${currentValue.match(/oklch\(([0-9.]+)/)?.[1] || "0.5"} ${value.toFixed(3)}`)
                              
                              const root = document.documentElement
                              root.style.setProperty(activeColor.variable, newValue)
                              
                              setThemeVars(prev => 
                                prev.map(v => 
                                  v.variable === activeColor.variable 
                                    ? { ...v, value: newValue }
                                    : v
                                )
                              )
                            }}
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Hue</Label>
                          <Slider 
                            value={[parseFloat(activeColor.value.match(/oklch\([0-9.]+ [0-9.]+ ([0-9.]+)/)?.[1] || "0")]}
                            min={0} 
                            max={360} 
                            step={1}
                            onValueChange={(values) => {
                              const value = values[0]
                              const currentValue = activeColor.value
                              const newValue = currentValue.replace(/oklch\([0-9.]+ [0-9.]+ [0-9.]+/, `oklch(${currentValue.match(/oklch\(([0-9.]+)/)?.[1] || "0.5"} ${currentValue.match(/oklch\([0-9.]+ ([0-9.]+)/)?.[1] || "0"} ${value.toFixed(3)}`)
                              
                              const root = document.documentElement
                              root.style.setProperty(activeColor.variable, newValue)
                              
                              setThemeVars(prev => 
                                prev.map(v => 
                                  v.variable === activeColor.variable 
                                    ? { ...v, value: newValue }
                                    : v
                                )
                              )
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label>OKLCH String</Label>
                      <Input 
                        value={activeColor.value} 
                        readOnly 
                        className="mt-1 font-mono text-xs"
                      />
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => resetVariable(activeColor.variable)}
                      >
                        Reset
                      </Button>
                      <Button onClick={() => setActiveColor(null)}>
                        Done
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-4">
              <Button onClick={exportTheme}>Export Theme</Button>
            </div>
            
            {showExport && (
              <div className="mt-4 p-4 border border-border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <Label>CSS Variables</Label>
                  <Button variant="ghost" size="sm" onClick={() => setShowExport(false)}>Close</Button>
                </div>
                <div className="mt-2 relative">
                  <pre className="p-4 bg-muted rounded-md text-xs overflow-auto max-h-[300px] whitespace-pre-wrap">
                    {exportText}
                  </pre>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="absolute top-2 right-2"
                    onClick={() => {
                      navigator.clipboard.writeText(exportText)
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {Object.entries(groupedVars).map(([category, vars]) => (
                <AccordionItem key={category} value={category}>
                  <AccordionTrigger>{category}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {vars.map(variable => (
                        <div key={variable.variable} className="grid grid-cols-[1fr,auto] gap-4 items-center">
                          <div>
                            <p className="text-sm font-medium">{variable.name}</p>
                            <p className="text-xs text-muted-foreground">{variable.variable}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {variable.type === 'color' ? (
                              <button 
                                className="w-8 h-8 rounded-md border border-border"
                                style={{ backgroundColor: `var(${variable.variable})` }}
                                onClick={() => handleOpenColorPicker(variable)}
                              />
                            ) : (
                              <Input 
                                value={variable.value} 
                                className="w-[120px]" 
                                readOnly 
                                onClick={() => {
                                  // Future enhancement: Add direct editing for non-color values
                                }} 
                              />
                            )}
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={() => resetVariable(variable.variable)}
                            >
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          
          <TabsContent value="presets" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {colorPresets.map((preset, index) => (
                <Button 
                  key={preset.name}
                  variant={selectedPreset === index ? "default" : "outline"}
                  className="h-auto py-4 flex flex-col items-center"
                  onClick={() => applyColorPreset(index)}
                >
                  <div className="flex gap-2 mb-2">
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: approximateOklchToRgb(preset.colors.light.primary) }}
                    />
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: approximateOklchToRgb(preset.colors.light.accent) }}
                    />
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: approximateOklchToRgb(preset.colors.light.secondary) }}
                    />
                  </div>
                  <span>{preset.name}</span>
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 