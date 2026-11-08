"use client";

import { useMemo } from "react";

import { useAppSelector } from "@/shared/store/hooks";
import { selectFilterName } from "@/posts/presentation/store/postsSlice";
import { usePostsQuery } from "@/posts/presentation/hooks/usePostsQuery";
import { filterPostsByName } from "@/posts/application/filter-posts";

export function useFilteredPosts() {
  const filterName = useAppSelector(selectFilterName);
  const { data: posts } = usePostsQuery();

  const filtered = useMemo(() => {
    return filterPostsByName(posts ?? [], filterName);
  }, [posts, filterName]);

  return { posts: filtered, filterName };
}
