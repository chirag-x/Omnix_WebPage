/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Space Grotesk",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      colors: {
        ink: {
          50: "#f6f7f8",
          100: "#e9ecef",
          200: "#c8ced4",
          300: "#9ba4ad",
          400: "#6c7682",
          500: "#475160",
          600: "#2c333d",
          700: "#1a1f27",
          800: "#0f1218",
          900: "#080a0e",
          950: "#04060a",
        },
        accent: {
          50: "#eafff5",
          100: "#cdffea",
          200: "#9bffd6",
          300: "#5dffba",
          400: "#27f39c",
          500: "#0be084",
          600: "#02b66a",
          700: "#038e55",
          800: "#086f45",
          900: "#0a5939",
        },
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
        },
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "grid-move": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "60px 60px" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out both",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        "grid-move": "grid-move 24s linear infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "scan": "scan 3.5s linear infinite",
      },
      boxShadow: {
        "glow-sm": "0 0 24px -8px rgba(43, 227, 158, 0.45)",
        "glow-md": "0 0 48px -12px rgba(43, 227, 158, 0.55)",
        "glow-lg": "0 0 96px -24px rgba(43, 227, 158, 0.6)",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};
