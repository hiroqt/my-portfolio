import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '52': 'repeat(52, minmax(0, 1fr))',
      },
      colors: {
        // Terminal Black & White Monochrome Theme
        "terminal-bg": "#000000",
        "terminal-fg": "#FFFFFF",
        "terminal-gray": "#808080",
        "terminal-border": "#333333",
        "terminal-hover": "#FFFFFF",
        
        // Legacy mapping for compatibility
        "on-tertiary-container": "#FFFFFF",
        "on-tertiary-fixed": "#FFFFFF",
        "inverse-primary": "#FFFFFF",
        "on-error": "#FFFFFF",
        "primary-fixed-dim": "#FFFFFF",
        "on-surface": "#FFFFFF",
        "tertiary-fixed-dim": "#FFFFFF",
        "inverse-surface": "#000000",
        "tertiary": "#FFFFFF",
        "text-secondary": "#808080",
        "outline-variant": "#333333",
        "error": "#FFFFFF",
        "surface-elevated": "#000000",
        "secondary-container": "#FFFFFF",
        "on-background": "#FFFFFF",
        "on-tertiary": "#000000",
        "on-surface-variant": "#808080",
        "on-tertiary-fixed-variant": "#000000",
        "on-primary-fixed": "#000000",
        "surface-container-low": "#000000",
        "outline": "#333333",
        "secondary-fixed": "#FFFFFF",
        "on-primary-fixed-variant": "#000000",
        "on-secondary-fixed-variant": "#000000",
        "surface-tint": "#FFFFFF",
        "surface-bright": "#1a1a1a",
        "surface-variant": "#1a1a1a",
        "on-error-container": "#FFFFFF",
        "surface-container-high": "#0a0a0a",
        "background": "#000000",
        "primary": "#FFFFFF",
        "surface-container-highest": "#1a1a1a",
        "secondary-fixed-dim": "#FFFFFF",
        "surface-container-lowest": "#000000",
        "tertiary-container": "#FFFFFF",
        "primary-container": "#FFFFFF",
        "tertiary-fixed": "#FFFFFF",
        "text-primary": "#FFFFFF",
        "surface": "#000000",
        "void-black": "#000000",
        "border-subtle": "#333333",
        "on-secondary-container": "#000000",
        "surface-container": "#0a0a0a",
        "inverse-on-surface": "#000000",
        "on-secondary-fixed": "#000000",
        "secondary": "#FFFFFF",
        "surface-dim": "#000000",
        "primary-fixed": "#FFFFFF",
        "on-primary": "#000000",
        "error-container": "#FFFFFF",
        "on-secondary": "#000000",
        "on-primary-container": "#000000"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "gutter": "24px",
        "section-gap-desktop": "128px",
        "section-gap-mobile": "64px",
        "margin-mobile": "16px",
        "container-max": "1200px",
        "unit": "4px"
      },
      fontFamily: {
        "mono": ["'Courier New'", "Courier", "monospace"],
        "headline-sm": ["'Courier New'", "Courier", "monospace"],
        "display-lg-mobile": ["'Courier New'", "Courier", "monospace"],
        "display-lg": ["'Courier New'", "Courier", "monospace"],
        "headline-md": ["'Courier New'", "Courier", "monospace"],
        "body-lg": ["'Courier New'", "Courier", "monospace"],
        "label-md": ["'Courier New'", "Courier", "monospace"],
        "body-md": ["'Courier New'", "Courier", "monospace"],
        "code-inline": ["'Courier New'", "Courier", "monospace"]
      },
      fontSize: {
        "headline-sm": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
        "display-lg-mobile": ["40px", {"lineHeight": "48px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "display-lg": ["64px", {"lineHeight": "72px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "headline-md": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
        "label-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "500"}],
        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
        "code-inline": ["14px", {"lineHeight": "20px", "fontWeight": "400"}]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}

export default config