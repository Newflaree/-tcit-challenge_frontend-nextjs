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
    "!src/**/index.ts",
    "!src/app/**",
    "!src/test/**",
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 70,
      lines: 85,
      statements: 85,
    },
    "./src/config/": {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
    "./src/features/posts/": {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
    "./src/lib/": {
      branches: 70,
      functions: 0,
      lines: 90,
      statements: 90,
    },
    "./src/hooks/": {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    "./src/components/ui/": {
      branches: 80,
      functions: 90,
      lines: 95,
      statements: 95,
    },
    "./src/components/posts/": {
      branches: 60,
      functions: 50,
      lines: 80,
      statements: 80,
    },
  },
};

// createJestConfig se exporta así para que next/jest cargue la configuración
// async de Next.js (guía oficial de Next 16).
export default createJestConfig(config);
