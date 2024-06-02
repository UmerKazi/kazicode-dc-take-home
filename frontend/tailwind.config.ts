import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        '7.5': '30px',
      },
      borderWidth: {
        '6': '6px',
      },
      height: {
        'full-header': "calc(100vh - 60px)",
        'card': "calc(50% - 25px)"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};

export default config;
