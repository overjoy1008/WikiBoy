import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'fade': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { transform: 'translateY(0)', opacity: '1' },
          '90%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-100%)', opacity: '0' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'scan-line': {
          '0%': { transform: 'translateY(0px)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(55px)', opacity: '0' }
        },
        'line-grow': {
          '0%': { width: '0' },
          '100%': { width: '75%' }  // 첫째줄
        },
        'line-grow-full': {
          '0%': { width: '0' },
          '100%': { width: '100%' }  // 둘째줄
        },
        'line-grow-partial': {
          '0%': { width: '0' },
          '100%': { width: '66%' }   // 셋째줄
        },
      },
      animation: {
        'slide-in': 'slide-in 0.3s ease-out',
        'fade': 'fade 2s ease-in-out',
        'spin': 'spin 1s linear infinite',
        'scan-line': 'scan-line 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'line-grow': 'line-grow 1.1s forwards infinite',
        'line-grow-full': 'line-grow-full 1.1s forwards infinite',
        'line-grow-partial': 'line-grow-partial 1.1s forwards infinite',
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;