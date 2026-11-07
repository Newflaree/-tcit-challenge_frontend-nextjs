"use client";

import { useMemo } from "react";

import { useAppSelector } from "@/store/hooks";
import { selectFilterName } from "@/features/posts/postsFilterSlice";
import { usePostsQuery } from "@/hooks/usePostsQuery";
import type { Post } from "@/types/post";

export function useFilteredPosts() {
  const filterName = useAppSelector(selectFilterName);
  const { data: posts } = usePostsQuery();

  const filtered = useMemo(() => {
    const list = posts ?? [];
    const term = filterName.trim().toLowerCase();
    if (!term) return list;
    return list.filter((post: Post) => post.name.toLowerCase().includes(term));
  }, [posts, filterName]);

  return { posts: filtered, filterName };
}
