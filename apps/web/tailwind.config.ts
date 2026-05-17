import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08111f",
        mist: "#f4f7fb",
        cyan: "#7dd3fc",
        ocean: "#0f766e",
        lime: "#b8f34b",
        slateglass: "rgba(8, 17, 31, 0.58)"
      },
      boxShadow: {
        panel: "0 20px 60px rgba(8, 17, 31, 0.16)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(8,17,31,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(8,17,31,0.05) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
} satisfies Config;
