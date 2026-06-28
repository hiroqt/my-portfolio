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
      colors: {
        "on-tertiary-container": "#ffe0cd",
        "on-tertiary-fixed": "#301400",
        "inverse-primary": "#732ee4",
        "on-error": "#690005",
        "primary-fixed-dim": "#d2bbff",
        "on-surface": "#dee2f3",
        "tertiary-fixed-dim": "#ffb784",
        "inverse-surface": "#dee2f3",
        "tertiary": "#ffb784",
        "text-secondary": "#A1A1AA",
        "outline-variant": "#4a4455",
        "error": "#ffb4ab",
        "surface-elevated": "#18181B",
        "secondary-container": "#00a572",
        "on-background": "#dee2f3",
        "on-tertiary": "#4f2500",
        "on-surface-variant": "#ccc3d8",
        "on-tertiary-fixed-variant": "#713700",
        "on-primary-fixed": "#25005a",
        "surface-container-low": "#161b28",
        "outline": "#958da1",
        "secondary-fixed": "#6ffbbe",
        "on-primary-fixed-variant": "#5a00c6",
        "on-secondary-fixed-variant": "#005236",
        "surface-tint": "#d2bbff",
        "surface-bright": "#343946",
        "surface-variant": "#303542",
        "on-error-container": "#ffdad6",
        "surface-container-high": "#252a37",
        "background": "#0e131f",
        "primary": "#d2bbff",
        "surface-container-highest": "#303542",
        "secondary-fixed-dim": "#4edea3",
        "surface-container-lowest": "#090e1a",
        "tertiary-container": "#a15100",
        "primary-container": "#7c3aed",
        "tertiary-fixed": "#ffdcc6",
        "text-primary": "#FFFFFF",
        "surface": "#0e131f",
        "void-black": "#09090B",
        "border-subtle": "#27272A",
        "on-secondary-container": "#00311f",
        "surface-container": "#1a1f2c",
        "inverse-on-surface": "#2b303d",
        "on-secondary-fixed": "#002113",
        "secondary": "#4edea3",
        "surface-dim": "#0e131f",
        "primary-fixed": "#eaddff",
        "on-primary": "#3f008e",
        "error-container": "#93000a",
        "on-secondary": "#003824",
        "on-primary-container": "#ede0ff"
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
        "headline-sm": ["var(--font-sora)", "sans-serif"],
        "display-lg-mobile": ["var(--font-sora)", "sans-serif"],
        "display-lg": ["var(--font-sora)", "sans-serif"],
        "headline-md": ["var(--font-sora)", "sans-serif"],
        "body-lg": ["var(--font-sora)", "sans-serif"],
        "label-md": ["var(--font-sora)", "sans-serif"],
        "body-md": ["var(--font-sora)", "sans-serif"],
        "code-inline": ["var(--font-sora)", "sans-serif"]
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