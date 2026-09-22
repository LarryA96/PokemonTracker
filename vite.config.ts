import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/PokemonTracker",
  server: {
    proxy: {
      "/users": "http://localhost:3000",
      "/userGames": "http://localhost:3000",
      "/games": "http://localhost:3000",
    },
  },
});
