"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePost } from "@/lib/api/posts";
import { postKeys } from "@/lib/query-keys";
import type { Post } from "@/types/post";

export function useDeletePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: (deleted) => {
      queryClient.setQueryData<Post[]>(postKeys.all, (old) => {
        if (!old) return old;
        return old.filter((post) => post.id !== deleted.id);
      });
    },
    onError: (error: unknown, id: number) => {
      // If the post no longer exists, sync the cache.
      const status =
        typeof error === "object" && error !== null && "status" in error
          ? (error as { status: number }).status
          : undefined;
      if (status === 404) {
        queryClient.setQueryData<Post[]>(postKeys.all, (old) => {
          if (!old) return old;
          return old.filter((post) => post.id !== id);
        });
      }
    },
  });
}
