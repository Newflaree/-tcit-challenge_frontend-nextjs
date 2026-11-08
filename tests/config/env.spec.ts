const DEFAULT_API_URL = "http://localhost:3000/api";
const ORIGINAL_ENV = process.env.NEXT_PUBLIC_API_URL;

async function loadApiUrl(value: string | undefined): Promise<string> {
  if (value === undefined) {
    delete process.env.NEXT_PUBLIC_API_URL;
  } else {
    process.env.NEXT_PUBLIC_API_URL = value;
  }

  jest.resetModules();
  const { API_URL } = await import("@/shared/config/env");

  return API_URL;
}

afterAll(() => {
  if (ORIGINAL_ENV === undefined) {
    delete process.env.NEXT_PUBLIC_API_URL;
  } else {
    process.env.NEXT_PUBLIC_API_URL = ORIGINAL_ENV;
  }
});

describe("API_URL", () => {
  it("usa el backend local por defecto", async () => {
    await expect(loadApiUrl(undefined)).resolves.toBe(DEFAULT_API_URL);
  });

  it("respeta NEXT_PUBLIC_API_URL", async () => {
    await expect(loadApiUrl("https://api.example.com/base")).resolves.toBe(
      "https://api.example.com/base",
    );
  });

  it("ignora valores vacíos o con espacios", async () => {
    await expect(loadApiUrl("   ")).resolves.toBe(DEFAULT_API_URL);
  });

  it("elimina las barras finales", async () => {
    await expect(loadApiUrl("https://api.example.com/api//")).resolves.toBe(
      "https://api.example.com/api",
    );
  });
});
