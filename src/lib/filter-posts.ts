import type { Post } from "@/types/post";

/**
 * Filtra posts por nombre (case-insensitive, tolera espacios al inicio/fin).
 * Función pura y testeable.
 */
export function filterPostsByName(
  posts: readonly Post[],
  filterName: string,
): Post[] {
  const term = filterName.trim().toLowerCase();
  if (!term) return [...posts];
  return posts.filter((post) => post.name.toLowerCase().includes(term));
}
