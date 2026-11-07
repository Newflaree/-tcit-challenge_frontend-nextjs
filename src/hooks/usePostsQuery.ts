"use client";

import { useQuery } from "@tanstack/react-query";

import { getPosts } from "@/lib/api/posts";
import { postKeys } from "@/lib/query-keys";

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
