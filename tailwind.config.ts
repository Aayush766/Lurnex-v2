import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#071B3A",
        brand: "#087FF5",
        purple: "#6C3BFF",
        cyan: "#10BBD5",
        orange: "#FFB21A",
        sky: "#EEF8FF"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(7,27,58,.08)",
        card: "0 5px 18px rgba(7,27,58,.08)"
      }
    }
  },
  plugins: []
};

export default config;
