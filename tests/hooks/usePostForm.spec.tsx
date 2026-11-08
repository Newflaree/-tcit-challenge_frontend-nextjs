import { renderHook, act } from "@testing-library/react";

import { usePostForm } from "@/hooks/usePostForm";

const mutateAsync = jest.fn().mockResolvedValue({
  id: 1,
  name: "Test",
  description: "Desc",
});

jest.mock("../../src/hooks/useCreatePostMutation", () => ({
  useCreatePostMutation: () => ({
    mutateAsync,
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

  it("valida descripción mayor a 1000 caracteres", async () => {
    const { result } = renderHook(() => usePostForm());
    act(() => {
      result.current.setName("Nombre");
      result.current.setDescription("a".repeat(1001));
    });
    let success: boolean;
    await act(async () => {
      success = await result.current.submit();
    });
    expect(success!).toBe(false);
    expect(result.current.errors.description).toBe(
      "La descripción no debe exceder 1000 caracteres",
    );
  });

  it("mantiene datos y marca error cuando la mutación falla", async () => {
    mutateAsync.mockRejectedValueOnce(new Error("boom"));
    const { result } = renderHook(() => usePostForm());
    act(() => {
      result.current.setName("Nombre");
      result.current.setDescription("Desc");
    });
    let success: boolean;
    await act(async () => {
      success = await result.current.submit();
    });
    expect(success!).toBe(false);
    expect(result.current.name).toBe("Nombre");
    expect(result.current.description).toBe("Desc");
  });

  it("reset limpia el estado", () => {
    const { result } = renderHook(() => usePostForm());
    act(() => {
      result.current.setName("Nombre");
      result.current.setDescription("Desc");
      result.current.reset();
    });
    expect(result.current.name).toBe("");
    expect(result.current.description).toBe("");
    expect(result.current.errors).toEqual({});
    expect(result.current.isSuccess).toBe(false);
  });
});
