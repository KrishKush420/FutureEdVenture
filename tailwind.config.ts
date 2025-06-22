import preset from './design-system/tailwind.preset';
import type { Config } from 'tailwindcss';

export default {
  presets: [preset],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './design-system/**/*.{js,ts,jsx,tsx}'
  ]
} satisfies Config;