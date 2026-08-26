import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  // https://vite.dev/config/shared-options#resolve-tsconfigpaths
  resolve: { tsconfigPaths: true },

  plugins: [
    react(),
    tailwindcss(),
  ],
})
