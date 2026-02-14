import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aviation: {
          dark: "#0a0a0a",
          card: "rgba(255,255,255,0.06)",
          border: "rgba(255,255,255,0.1)",
        },
      },
      backgroundImage: {
        "glass": "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
      },
      backdropBlur: {
        glass: "12px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0,0,0,0.37)",
      },
    },
  },
  plugins: [],
};

export default config;
