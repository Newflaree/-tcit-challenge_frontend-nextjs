"use client";

import { useMemo } from "react";

import { useAppSelector } from "@/store/hooks";
import { selectFilterName } from "@/features/posts/postsSlice";
import { usePostsQuery } from "@/hooks/usePostsQuery";
import { filterPostsByName } from "@/lib/filter-posts";

export function useFilteredPosts() {
  const filterName = useAppSelector(selectFilterName);
  const { data: posts } = usePostsQuery();

  const filtered = useMemo(() => {
    return filterPostsByName(posts ?? [], filterName);
  }, [posts, filterName]);

  return { posts: filtered, filterName };
}
