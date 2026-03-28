/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          'cyber-purple': '#8b5cf6',
          'cyber-pink': '#ec489a',
          'cyber-blue': '#3b82f6',
          'cyber-dark': '#0a0a0a',
          'cyber-darker': '#050505',
          'cyber-gray': '#1a1a1a',
        },
        animation: {
          'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
          'glow': 'glow 2s ease-in-out infinite',
          'float': 'float 3s ease-in-out infinite',
          'pulse-slow': 'pulseSlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'shimmer': 'shimmer 2s infinite',
          'spin-slow': 'spin-slow 3s linear infinite',
          'border-glow': 'borderGlow 2s ease-in-out infinite',
          'gradient': 'gradientShift 3s ease infinite',
        },
        keyframes: {
          fadeInUp: {
            from: {
              opacity: '0',
              transform: 'translateY(20px)',
            },
            to: {
              opacity: '1',
              transform: 'translateY(0)',
            },
          },
          glow: {
            '0%, 100%': {
              opacity: '0.5',
              filter: 'blur(4px)',
            },
            '50%': {
              opacity: '1',
              filter: 'blur(8px)',
            },
          },
          float: {
            '0%, 100%': {
              transform: 'translateY(0px)',
            },
            '50%': {
              transform: 'translateY(-10px)',
            },
          },
          pulseSlow: {
            '0%, 100%': {
              opacity: '0.3',
            },
            '50%': {
              opacity: '0.6',
            },
          },
          shimmer: {
            '0%': {
              backgroundPosition: '-1000px 0',
            },
            '100%': {
              backgroundPosition: '1000px 0',
            },
          },
          'spin-slow': {
            from: {
              transform: 'rotate(0deg)',
            },
            to: {
              transform: 'rotate(360deg)',
            },
          },
          borderGlow: {
            '0%, 100%': {
              borderColor: 'rgba(139, 92, 246, 0.3)',
              boxShadow: '0 0 0px 0px rgba(139, 92, 246, 0)',
            },
            '50%': {
              borderColor: 'rgba(139, 92, 246, 0.8)',
              boxShadow: '0 0 20px 0px rgba(139, 92, 246, 0.3)',
            },
          },
          gradientShift: {
            '0%': {
              backgroundPosition: '0% 50%',
            },
            '50%': {
              backgroundPosition: '100% 50%',
            },
            '100%': {
              backgroundPosition: '0% 50%',
            },
          },
        },
        backgroundSize: {
          '200%': '200% 200%',
        },
      },
    },
    plugins: [],
  }