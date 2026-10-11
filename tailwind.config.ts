import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0d0d0d",
        panel: "#000000",
        surface: "#161616",
        tile: "#212425",
        border: "#262626",
        muted: "#a6a6a6",
        accent: "#2f80ed",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "var(--font-noto-sans-kr)", "system-ui", "sans-serif"],
        serif: ["var(--font-roboto-slab)", "var(--font-noto-serif-kr)", "serif"],
      },
    },
  },
  plugins: [typography],
};

export default config;
