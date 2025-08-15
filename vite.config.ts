import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    coverage: { all: false },
    // dir: "src",
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          //  dir: "src/services/tests/",
          include: ["src/services/tests/**/*.spec.ts"],
          environment: "node",
        },
      },
      {
        extends: true,
        test: {
          name: "e2e",
          //dir: "src/http/controllers/",
          include: ["src/http/controllers/**/tests/*.spec.ts"],
          environment:
            "./prisma/vitest-environment-prisma/prisma-test-environment.ts",
        },
      },
    ],
  },
});
