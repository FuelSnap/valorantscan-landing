import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Tactical Brutalism design system
        val: {
          red: '#FF4655',
          'red-hover': '#E63E4C',
          'red-accent': '#BD3944',
          'red-muted': 'rgba(255,70,85,0.12)',
          'bg-primary': '#0F1923',
          'bg-darker': '#0A141D',
          'bg-secondary': '#1A2634',
          'bg-tertiary': '#243042',
          'bg-surface': '#1E2D3D',
          'bg-gray': '#1F2937',
          'text-primary': '#ECE8E1',
          'text-secondary': '#8B978F',
          'text-muted': '#5A6B5F',
          'accent-gold': '#F9D849',
          'accent-teal': '#2DD4BF',
          'accent-blue': '#3B82F6',
          'accent-purple': '#B042FF',
          'rank-iron': '#3E3E3E',
          'rank-bronze': '#A5855D',
          'rank-silver': '#B3B3B3',
          'rank-gold': '#F1C232',
          'rank-platinum': '#31A5A5',
          'rank-diamond': '#E39CFF',
          'rank-ascendant': '#2DCD70',
          'rank-immortal': '#FF4655',
          'rank-radiant': '#FFFFAA',
          'stat-positive': '#2DD4BF',
          'stat-negative': '#FF4655',
          'stat-neutral': '#8B978F',
        },
      },
      fontFamily: {
        // Font variable bridge: --font-display maps to Orbitron via layout.tsx
        display: ['var(--font-display)', 'system-ui'],
        body: ['var(--font-body)', 'system-ui'],
        mono: ['var(--font-mono)', 'monospace'],
        // Tactical Brutalism fonts
        oswald: ['var(--font-oswald)', 'sans-serif'],
        barlow: ['var(--font-barlow)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        jetbrains: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        float: 'float 6s ease-in-out infinite',
        counter: 'counter 0.3s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        shake: 'shake 0.3s ease-in-out',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'btn-pulse': 'btn-pulse 2s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        'marquee-slow': 'marquee 60s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 70, 85, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 70, 85, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        counter: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-6px)' },
          '40%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
        'glow-pulse': {
          '0%, 100%': { textShadow: '0 0 20px rgba(255,70,85,0.4)' },
          '50%': { textShadow: '0 0 40px rgba(255,70,85,0.8), 0 0 60px rgba(255,70,85,0.3)' },
        },
        'btn-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,70,85,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(255,70,85,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'valorant-gradient': 'linear-gradient(135deg, #FF4655 0%, #BD3944 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0F1923 0%, #0A141D 100%)',
      },
    },
  },
  plugins: [],
}

export default config
