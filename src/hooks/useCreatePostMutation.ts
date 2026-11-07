"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPost } from "@/lib/api/posts";
import { postKeys } from "@/lib/query-keys";
import type { CreatePostInput, Post } from "@/types/post";

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePostInput) => createPost(input),
    onSuccess: (newPost) => {
      queryClient.setQueryData<Post[]>(postKeys.all, (old) => {
        if (!old) return [newPost];
        return [newPost, ...old];
      });
    },
  });
}
