import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brandPurple: "#5F259F",
        brandGreen: "#3AAA89"
      }
    }
  },
  plugins: []
} satisfies Config;
