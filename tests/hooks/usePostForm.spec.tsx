import { renderHook, act } from "@testing-library/react";

import { usePostForm } from "@/hooks/usePostForm";

jest.mock("../../src/hooks/useCreatePostMutation", () => ({
  useCreatePostMutation: () => ({
    mutateAsync: jest
      .fn()
      .mockResolvedValue({ id: 1, name: "Test", description: "Desc" }),
    isPending: false,
    isError: false,
    error: null,
  }),
}));

describe("usePostForm", () => {
  it("valida nombre vacío", async () => {
    const { result } = renderHook(() => usePostForm());
    act(() => {
      result.current.setName("");
      result.current.setDescription("Desc");
    });
    let success: boolean;
    await act(async () => {
      success = await result.current.submit();
    });
    expect(success!).toBe(false);
    expect(result.current.errors.name).toBe("El nombre es obligatorio");
  });

  it("valida descripción vacía", async () => {
    const { result } = renderHook(() => usePostForm());
    act(() => {
      result.current.setName("Nombre");
      result.current.setDescription("");
    });
    let success: boolean;
    await act(async () => {
      success = await result.current.submit();
    });
    expect(success!).toBe(false);
    expect(result.current.errors.description).toBe(
      "La descripción es obligatoria",
    );
  });

  it("valida nombre mayor a 120 caracteres", async () => {
    const { result } = renderHook(() => usePostForm());
    act(() => {
      result.current.setName("a".repeat(121));
      result.current.setDescription("Desc");
    });
    let success: boolean;
    await act(async () => {
      success = await result.current.submit();
    });
    expect(success!).toBe(false);
    expect(result.current.errors.name).toBe(
      "El nombre no debe exceder 120 caracteres",
    );
  });

  it("submit exitoso limpia el formulario", async () => {
    const { result } = renderHook(() => usePostForm());
    act(() => {
      result.current.setName("Nuevo post");
      result.current.setDescription("Descripción");
    });
    let success: boolean;
    await act(async () => {
      success = await result.current.submit();
    });
    expect(success!).toBe(true);
    expect(result.current.name).toBe("");
    expect(result.current.description).toBe("");
  });
});
