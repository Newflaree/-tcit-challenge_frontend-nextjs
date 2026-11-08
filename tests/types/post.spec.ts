import { ApiError } from "@/posts/domain/Post";

describe("ApiError", () => {
  it("conserva status y mensaje", () => {
    const error = new ApiError(404, "Post no encontrado");
    expect(error.status).toBe(404);
    expect(error.message).toBe("Post no encontrado");
    expect(error.name).toBe("ApiError");
    expect(error).toBeInstanceOf(Error);
  });
});
