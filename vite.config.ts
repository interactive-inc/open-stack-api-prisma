import { defineConfig } from "vite-plus"

export default defineConfig({
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
