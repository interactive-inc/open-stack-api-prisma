import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite-plus"

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  fmt: {
    semi: false,
  },
  lint: {
    ignorePatterns: [".wrangler/**", "prisma/**", "src/generated/**", "worker-configuration.d.ts"],
  },
  test: {
    passWithNoTests: true,
  },
})
