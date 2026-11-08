"use client";

import { useQuery } from "@tanstack/react-query";

import { getPosts } from "@/posts/infrastructure/api/posts";
import { postKeys } from "@/posts/infrastructure/query/query-keys";

export function usePostsQuery() {
  return useQuery({
    queryKey: postKeys.all,
    queryFn: ({ signal }) => getPosts(signal),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });
}
