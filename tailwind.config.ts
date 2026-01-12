import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        'surface-dark': '#111111',
        'surface-light': '#1a1a1a',
        glass: 'rgba(26, 26, 26, 0.4)',
        'glass-strong': 'rgba(26, 26, 26, 0.6)',
        border: 'rgba(255, 255, 255, 0.1)',
        'glass-border': 'rgba(255, 255, 255, 0.08)',
        'primary': '#ffffff',
        'primary-light': '#f5f5f5',
        'secondary': '#e5e5e5',
        'secondary-light': '#f0f0f0',
        'accent': '#d4d4d4',
        'accent-light': '#e5e5e5',
        'neutral': '#6b7280',
        'neutral-light': '#9ca3af',
        'dark-gray': '#171717',
        'medium-gray': '#404040',
        'light-gray': '#a3a3a3',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': 'clamp(3rem, 10vw, 7rem)',
        'heading-xl': 'clamp(2.5rem, 8vw, 5rem)',
        'heading-lg': 'clamp(2rem, 6vw, 3.5rem)',
        'heading-md': 'clamp(1.5rem, 4vw, 2.5rem)',
        'heading-sm': 'clamp(1.25rem, 3vw, 1.875rem)',
      },
      spacing: {
        'section': 'clamp(4rem, 12vw, 8rem)',
        'container-gap': 'clamp(2rem, 6vw, 4rem)',
        'element-gap': 'clamp(1rem, 3vw, 2rem)',
        'micro-gap': 'clamp(0.5rem, 2vw, 1rem)',
      },
      backdropBlur: {
        'glass': '24px',
      },
      animation: {
        'gradient-shift': 'gradient-shift 12s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee2': 'marquee2 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'slide-up': 'slide-up 0.8s ease-out',
        'fade-in': 'fade-in 1s ease-out',
        'scale-in': 'scale-in 0.6s ease-out',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'wave': 'wave 2s ease-in-out infinite',
        'loading-spin': 'loading-spin 1s linear infinite',
        'loading-pulse': 'loading-pulse 1.5s ease-in-out infinite',
        'scroll-left': 'scroll-left 30s linear infinite',
        'scroll-right': 'scroll-right 30s linear infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { 
            background: 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)'
          },
          '33%': { 
            background: 'radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.06) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.04) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)'
          },
          '66%': { 
            background: 'radial-gradient(circle at 60% 60%, rgba(255, 255, 255, 0.07) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.02) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.04) 0%, transparent 50%)'
          },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee2': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(1deg)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(255, 255, 255, 0.2)',
            transform: 'scale(1.02)'
          },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'bounce-slow': {
          '0%, 100%': { 
            transform: 'translateY(0px)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': { 
            transform: 'translateY(-25px)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          },
        },
        'wave': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(5deg)' },
          '75%': { transform: 'rotate(-5deg)' },
        },
        'loading-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'loading-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'scroll-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'scroll-right': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.glass': {
          'background': 'rgba(24, 24, 27, 0.4)',
          'backdrop-filter': 'blur(24px)',
          'border': '1px solid rgba(255, 255, 255, 0.08)',
          'box-shadow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        },
        '.glass-subtle': {
          'background': 'rgba(24, 24, 27, 0.2)',
          'backdrop-filter': 'blur(16px)',
          'border': '1px solid rgba(255, 255, 255, 0.05)',
        },
        '.cinematic-gradient': {
          'background': 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)',
        },
        '.glass-premium': {
          'background': 'rgba(24, 24, 27, 0.3)',
          'backdrop-filter': 'blur(32px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
          'box-shadow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0, 0, 0, 0.3)',
        },
        '.glass-card': {
          'background': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          'backdrop-filter': 'blur(20px)',
          'border': '1px solid rgba(255, 255, 255, 0.08)',
          'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
        '.text-shimmer': {
          'background': 'linear-gradient(90deg, #ffffff 0%, #e5e7eb 50%, #ffffff 100%)',
          'background-size': '200% 100%',
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'animation': 'shimmer 3s ease-in-out infinite',
        },
        '.bg-gradient-radial': {
          'background': 'radial-gradient(var(--tw-gradient-stops))',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

export default config