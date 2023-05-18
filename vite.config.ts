import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://UlisesOrnelasR.github.io/Frontend-washingMachine-history",
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
