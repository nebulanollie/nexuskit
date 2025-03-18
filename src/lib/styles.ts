/**
 * Consistent styling utilities and patterns for components
 */

export const componentStyles = {
  // Define standard sizing for all components
  size: {
    xs: "h-6 px-2 text-xs",
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg",
    xl: "h-14 px-8 text-xl"
  },
  
  // Define standard padding options
  padding: {
    none: "p-0",
    xs: "p-1",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
    xl: "p-8"
  },
  
  // Define standard margin options
  margin: {
    none: "m-0",
    xs: "m-1",
    sm: "m-2",
    md: "m-4",
    lg: "m-6",
    xl: "m-8"
  },
  
  // Define standard gap options
  gap: {
    none: "gap-0",
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8"
  },
  
  // Define standard spacing between items
  spacing: {
    none: "space-x-0 space-y-0",
    xs: "space-x-1 space-y-1",
    sm: "space-x-2 space-y-2",
    md: "space-x-4 space-y-4",
    lg: "space-x-6 space-y-6",
    xl: "space-x-8 space-y-8"
  },
  
  // Common layout patterns
  layout: {
    container: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",
    section: "py-12 md:py-16 lg:py-20",
    card: "bg-card text-card-foreground rounded-lg shadow-sm p-6",
    panel: "bg-background border border-border rounded-lg p-4",
    flexRow: "flex flex-row items-center",
    flexCol: "flex flex-col",
    flexCenter: "flex items-center justify-center",
    grid: {
      default: "grid grid-cols-1 gap-4",
      sm: "grid grid-cols-2 gap-4",
      md: "grid grid-cols-3 gap-6",
      lg: "grid grid-cols-4 gap-8",
    }
  }
};

// Font size utility
export const fontSize = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl"
};

// Font weight utility
export const fontWeight = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold"
};

// Shadow utility
export const shadow = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl"
};

// Common theme variations
export const themeVariations = {
  default: "",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
  muted: "bg-muted text-muted-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  success: "bg-[--color-success] text-[--color-success-foreground]",
  warning: "bg-[--color-warning] text-[--color-warning-foreground]",
  info: "bg-[--color-info] text-[--color-info-foreground]",
  error: "bg-[--color-error] text-[--color-error-foreground]"
};

// Local storage keys for design system
export const storageKeys = {
  theme: "app-theme",
  radius: "app-radius",
  colorPreset: "app-color-preset"
}; 