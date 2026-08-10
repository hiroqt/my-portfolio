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
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
        serif: ["'Source Serif 4'", "Georgia", "'Times New Roman'", "serif"],
        display: ["'Apoc Revelations'", "serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
        comico: ["var(--font-comico)", "sans-serif"],
        pacifico: ["var(--font-pacifico)", "cursive"],
        sharetech: ["var(--font-sharetech)", "sans-serif"],
        apoc: ["'Apoc Revelations'", "serif"],
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}

export default config