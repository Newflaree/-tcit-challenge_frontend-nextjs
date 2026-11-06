const DEFAULT_API_URL = "http://localhost:3000/api";

function normalizeApiUrl(value: string | undefined): string {
  return (value?.trim() || DEFAULT_API_URL).replace(/\/+$/, "");
}

/**
 * URL base de la API.
 *
 * Se lee de NEXT_PUBLIC_API_URL y, si no está definida, usa el backend local
 * en http://localhost:3000/api.
 */
export const API_URL = normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL);
