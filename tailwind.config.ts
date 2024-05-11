import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--foreground-rgb))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--foreground-rgb))',
        'gradient-opacity': 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))'
      },
    },
  },
  plugins: [],
}
export default config
