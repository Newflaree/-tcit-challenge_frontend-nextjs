import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Carga next.config.ts y los .env en el entorno de tests.
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  // jest-fixed-jsdom: entorno jsdom con los globales de Node (fetch, etc.) y
  // las export conditions que MSW necesita (recomendado por la docs de MSW).
  testEnvironment: "jest-fixed-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/e2e/",
  ],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/posts/presentation/types/**",
    "!src/**/index.ts",
    "!src/app/**",
    "!src/posts/infrastructure/query/query-keys.ts",
    "!src/test/**",
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
    "./src/shared/config/": {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
    "./src/posts/": {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
    "./src/shared/": {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
    "./src/shared/components/ui/": {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

// createJestConfig se exporta así para que next/jest cargue la configuración
// async de Next.js (guía oficial de Next 16).
export default createJestConfig(config);
