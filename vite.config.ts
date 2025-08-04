import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],

  test: {
    globals: true,
    coverage: { all: false },
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          root: "./src/services/tests/**/*.spec.ts",
          environment: "test",
        },
      },
      {
        extends: true,
        test: {
          name: "e2e",
          root: "./src/http/controllers/**/*.spec.ts",
          environment:
            "./prisma/vitest-environment-prisma/prisma-test-environment.ts",
        },
      },
    ],
  },
});
