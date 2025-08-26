// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,mdx}",
    "./pages/**/*.{ts,tsx,js,jsx,mdx}", // keep if you still have /pages
  ],
  theme: {
    extend: {
      colors: {
        brandPurple: "#5F259F",
        brandGreen: "#3AAA89",
      },
    },
  },
  // If you ever build Tailwind class names dynamically (e.g. from Airtable),
  // uncomment this to stop purge from removing them:
  // safelist: ["bg-brandPurple", "text-brandGreen", "btn", "btn-green", "btn-outline"],
  plugins: [],
};

export default config;
