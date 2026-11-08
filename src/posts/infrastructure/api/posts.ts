import { API_URL } from "@/shared/config/env";
import { ApiError, type CreatePostInput, type Post } from "@/posts/domain/Post";

const BASE_URL = API_URL;

async function parseError(response: Response): Promise<ApiError> {
  let message = `Error ${response.status}`;
  try {
    const body = (await response.json()) as { message?: string | string[] };
    if (Array.isArray(body.message)) {
      message = body.message.join(", ");
    } else if (typeof body.message === "string") {
      message = body.message;
    }
  } catch {
    // El cuerpo no es JSON; se conserva el mensaje por defecto.
  }
  return new ApiError(response.status, message);
}

export async function getPosts(signal?: AbortSignal): Promise<Post[]> {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    signal,
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  return (await response.json()) as Post[];
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  return (await response.json()) as Post;
}

export async function deletePost(id: number): Promise<Post> {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  if (response.status === 204) {
    return { id } as Post;
  }

  return (await response.json()) as Post;
}
