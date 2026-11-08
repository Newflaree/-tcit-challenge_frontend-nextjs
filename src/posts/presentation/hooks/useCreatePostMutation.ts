"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPost } from "@/posts/infrastructure/api/posts";
import { postKeys } from "@/posts/infrastructure/query/query-keys";
import type { CreatePostInput, Post } from "@/posts/domain/Post";

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
