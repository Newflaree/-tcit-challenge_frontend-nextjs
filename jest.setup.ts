// Matchers accesibles de jest-dom (toBeInTheDocument, toHaveValue, etc.).
import "@testing-library/jest-dom";
import { server } from "@/test/mocks/server";

// jest-fixed-jsdom no expone setImmediate (global de Node) y MSW lo usa al
// interceptar peticiones. Polyfill mínimo y determinista.
if (typeof globalThis.setImmediate === "undefined") {
  Object.defineProperty(globalThis, "setImmediate", {
    value: (callback: (...args: unknown[]) => void, ...args: unknown[]) =>
      setTimeout(() => callback(...args), 0),
    writable: true,
    configurable: true,
  });
}

// MSW intercepta todo el HTTP; una petición sin handler falla el test en vez
// de tocar la red real (onUnhandledFrame es la API de MSW 3).
beforeAll(() => server.listen({ onUnhandledFrame: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
