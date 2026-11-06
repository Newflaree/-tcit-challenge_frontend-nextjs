import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Carga next.config.ts y los .env en el entorno de tests.
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

// createJestConfig se exporta así para que next/jest cargue la configuración
// async de Next.js (guía oficial de Next 16).
export default createJestConfig(config);
