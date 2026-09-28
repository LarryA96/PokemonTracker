import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/PokemonTracker",
  server: {
    proxy: {
      "/users": "https://pokemontracker-b0w1.onrender.com",
      "/userGames": "https://pokemontracker-b0w1.onrender.com",
      "/games": "https://pokemontracker-b0w1.onrender.com",
    },
  },
});
