import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#FFFFFF",
        surface: {
          DEFAULT: "#000000",
          muted: "#16181C",
        },
        primary: {
          DEFAULT: "#FFFFFF",
        },
        dark: {
          DEFAULT: "#000000",
          light: "#16181C",
          lighter: "#202327",
          card: "#16181C",
        },
        muted: "#71767A",
        accent: {
          link: "#FFFFFF",
        },
        border: {
          DEFAULT: "#1F2937",
        },
        neon: {
          purple: "#FFFFFF",
          "purple-light": "#E7E9EA",
          blue: "#FFFFFF",
          "blue-light": "#E7E9EA",
          pink: "#FFFFFF",
          "pink-light": "#E7E9EA",
          cyan: "#FFFFFF",
          "cyan-light": "#E7E9EA",
        },
      },

      boxShadow: {
        "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.5)",
        "DEFAULT": "0 1px 3px 0 rgba(0, 0, 0, 0.6), 0 1px 2px -1px rgba(0, 0, 0, 0.5)",
        "md": "0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -2px rgba(0, 0, 0, 0.5)",
        "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -4px rgba(0, 0, 0, 0.6)",
        "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.6)",
        "focus": "0 0 0 2px rgba(255, 255, 255, 0.1)",
        "hover": "0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -2px rgba(0, 0, 0, 0.5)",
        "glow-purple": "0 1px 3px 0 rgba(0, 0, 0, 0.6)",
        "glow-blue": "0 1px 3px 0 rgba(0, 0, 0, 0.6)",
        "glow-pink": "0 1px 3px 0 rgba(0, 0, 0, 0.6)",
        "glow-cyan": "0 1px 3px 0 rgba(0, 0, 0, 0.6)",
        "glow-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.5)",
        "glow-lg": "0 4px 6px -1px rgba(0, 0, 0, 0.6)",
        "neon-purple": "0 1px 3px 0 rgba(0, 0, 0, 0.6)",
        "neon-blue": "0 1px 3px 0 rgba(0, 0, 0, 0.6)",
        "neon-pink": "0 1px 3px 0 rgba(0, 0, 0, 0.6)",
        "neon-cyan": "0 1px 3px 0 rgba(0, 0, 0, 0.6)",
        "neon-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.5)",
        "neon-lg": "0 4px 6px -1px rgba(0, 0, 0, 0.6)",
      },

      animation: {
        "spin-slow": "spin 3s linear infinite",
        "fade-in": "fade-in 0.3s ease-in-out",
        "slide-up": "slide-up 0.3s ease-out",
        "shimmer": "shimmer 2s linear infinite",
      },

      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },

      aspectRatio: {
        "9/16": "9 / 16",
      },
    },
  },
  plugins: [],
};

export default config;
