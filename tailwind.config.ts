import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Extended container sizes
      maxWidth: {
        'xs': 'var(--container-xs)',
        'sm': 'var(--container-sm)',
        'md': 'var(--container-md)',
        'lg': 'var(--container-lg)',
        'xl': 'var(--container-xl)',
        '2xl': 'var(--container-2xl)',
        '3xl': 'var(--container-3xl)',
        '4xl': 'var(--container-4xl)',
        '5xl': 'var(--container-5xl)',
        '6xl': 'var(--container-6xl)',
      },
      // Z-index scale
      zIndex: {
        'behind': 'var(--z-behind)',
        'default': 'var(--z-default)',
        'dropdown': 'var(--z-dropdown)',
        'sticky': 'var(--z-sticky)',
        'modal': 'var(--z-modal)',
        'tooltip': 'var(--z-tooltip)',
        'toast': 'var(--z-toast)',
      },
    },
  },
  plugins: [],
}

export default config 