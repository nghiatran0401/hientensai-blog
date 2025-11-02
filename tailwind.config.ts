import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#1a1a1a",
            fontSize: "18px",
            lineHeight: "1.8",
            a: {
              color: "#2c5aa0",
              textDecoration: "underline",
              textDecorationThickness: "1px",
              textUnderlineOffset: "2px",
              "&:hover": {
                color: "#1e3f6e",
              },
            },
            img: {
              marginTop: "2em",
              marginBottom: "2em",
              borderRadius: "0.5rem",
            },
            h1: {
              fontSize: "2.5rem",
              fontWeight: "700",
              lineHeight: "1.2",
              marginTop: "2rem",
              marginBottom: "1.5rem",
              color: "#1a1a1a",
            },
            h2: {
              fontSize: "2rem",
              fontWeight: "700",
              lineHeight: "1.3",
              marginTop: "2rem",
              marginBottom: "1.25rem",
              color: "#1a1a1a",
            },
            h3: {
              fontSize: "1.5rem",
              fontWeight: "600",
              lineHeight: "1.4",
              marginTop: "1.75rem",
              marginBottom: "1rem",
              color: "#1a1a1a",
            },
            strong: {
              fontWeight: "600",
              color: "#1a1a1a",
            },
            blockquote: {
              borderLeftWidth: "4px",
              borderLeftColor: "#e5e5e5",
              paddingLeft: "1.5rem",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
              fontStyle: "italic",
              color: "#666666",
            },
          },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
export default config;
