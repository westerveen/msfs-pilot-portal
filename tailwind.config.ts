import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        aviation: {
          dark: "#0a0f1a",
          navy: "#0f172a",
          slate: "#1e293b",
          card: "rgba(255,255,255,0.06)",
          border: "rgba(255,255,255,0.08)",
        },
        primary: {
          DEFAULT: "#06b6d4",
          hover: "#22d3ee",
          muted: "rgba(6, 182, 212, 0.15)",
        },
        warning: {
          DEFAULT: "#f59e0b",
          muted: "rgba(245, 158, 11, 0.15)",
        },
      },
      backgroundImage: {
        glass:
          "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
      },
      backdropBlur: {
        glass: "12px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0,0,0,0.37)",
        "glass-cyan": "0 0 24px rgba(6, 182, 212, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
