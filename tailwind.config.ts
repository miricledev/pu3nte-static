import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sora", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        pu3nte: {
          bg: "#050814",
          bg2: "#080B14",
          navy: "#0B1020",
          card: "#111827",
          elevated: "#151C2B",
          text: "#F8FAFC",
          secondary: "#AAB4C5",
          muted: "#6B7280",
          red: "#E5092F",
          gold: "#FFD21E",
          orange: "#FF8A00",
          blue: "#007BFF",
          electric: "#1D7CFF",
          cyan: "#00C8FF",
          success: "#22C55E",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 200, 255, 0.16)",
        warm: "0 0 40px rgba(229, 9, 47, 0.16)",
      },
      backgroundImage: {
        bridge: "linear-gradient(90deg, #E5092F 0%, #FFD21E 35%, #1D7CFF 70%, #00C8FF 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
