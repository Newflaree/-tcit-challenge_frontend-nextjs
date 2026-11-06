import { setupServer } from "msw/node";
import { handlers } from "./handlers";

/**
 * Servidor MSW de los tests unitarios y de integración: intercepta todo el
 * HTTP del proceso. Ninguna petición llega al backend real.
 */
export const server = setupServer(...handlers);
