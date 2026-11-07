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
  });
}
