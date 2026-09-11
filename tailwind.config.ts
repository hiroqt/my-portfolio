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
        background: "color-mix(in srgb, var(--background) calc(<alpha-value> * 100%), transparent)",
        foreground: "color-mix(in srgb, var(--foreground) calc(<alpha-value> * 100%), transparent)",
        card: {
          DEFAULT: "color-mix(in srgb, var(--card) calc(<alpha-value> * 100%), transparent)",
          foreground: "var(--card-foreground)",
        },
        muted: {
          DEFAULT: "color-mix(in srgb, var(--muted) calc(<alpha-value> * 100%), transparent)",
          foreground: "var(--muted-foreground)",
        },
        "muted-foreground": "color-mix(in srgb, var(--muted-foreground) calc(<alpha-value> * 100%), transparent)",
        border: "var(--border)",
        accent: {
          DEFAULT: "color-mix(in srgb, var(--accent) calc(<alpha-value> * 100%), transparent)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Helvetica", "Arial", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "'Times New Roman'", "serif"],
        display: ["'Supreme'", "var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        supreme: ["'Supreme'", "var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        pacifico: ["'Pacifico'", "cursive"],
        handwriting: ["var(--font-handwriting)", "'Caveat'", "cursive"],
        sharetech: ["'Share Tech'", "sans-serif"],
        apoc: ["'Apoc Revelations'", "serif"],
        instrument: ["'Instrument Serif'", "Georgia", "'Times New Roman'", "serif"],
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}

export default config