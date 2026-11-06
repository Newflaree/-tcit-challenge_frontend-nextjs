export interface Post {
  id: number;
  name: string;
  description: string;
}

/**
 * Datos de ejemplo canónicos de la estrategia de testing (HU-03).
 * Reflejan `tcit-test-back/test/fixtures/posts.json`; los `id` los asigna la
 * base en el backend (SERIAL) y aquí quedan fijos para las pruebas de UI.
 */
export const postsFixture: Post[] = [
  {
    id: 1,
    name: "Primer post",
    description: "Descripción del primer post de ejemplo",
  },
  {
    id: 2,
    name: "Segundo post",
    description: "Descripción del segundo post de ejemplo",
  },
  {
    id: 3,
    name: "Tercer post",
    description: "Descripción del tercer post de ejemplo",
  },
];

/** Payload de creación exitosa. */
export const newPostFixture = {
  name: "Post creado",
  description: "Descripción del post creado en pruebas",
};

/** Resultado de crear `newPostFixture` (el id siguiente lo fija el backend). */
export const createdPostFixture: Post = { id: 4, ...newPostFixture };

/** Entrada inválida: nombre en blanco y descripción vacía. */
export const invalidPostFixture = { name: "   ", description: "" };

/** Contrato de error de NestJS: `{ statusCode, message, error }`. */
export const apiErrorFixture = {
  statusCode: 500,
  message: "Error interno de prueba",
  error: "Internal Server Error",
};

export const notFoundErrorFixture = {
  statusCode: 404,
  message: "Post no encontrado",
  error: "Not Found",
};
