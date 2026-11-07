"use client";

import { usePostsQuery } from "@/hooks/usePostsQuery";
import { useFilteredPosts } from "@/hooks/useFilteredPosts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setFilterName,
  clearFilter,
  selectHasActiveFilter,
} from "@/features/posts/postsSlice";
import { PageHeader } from "@/components/ui/ConfirmDialog";
import { PostForm } from "@/components/posts/PostForm";
import { PostFilter } from "@/components/posts/PostFilter";
import { PostList } from "@/components/posts/PostList";

export function PostsView() {
  const dispatch = useAppDispatch();
  const { data: posts, isLoading, isError, error, refetch } = usePostsQuery();
  const { posts: filteredPosts, filterName } = useFilteredPosts();
  const hasActiveFilter = useAppSelector(selectHasActiveFilter);

  const totalCount = posts?.length ?? 0;
  const filteredCount = filteredPosts.length;
  const isFilteringWithNoResults =
    hasActiveFilter && filteredCount === 0 && totalCount > 0;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8">
      <PageHeader
        title="Posts"
        description="Gestiona los posts del challenge."
      />
      <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="flex flex-col gap-4">
          <PostForm />
          <PostFilter
            value={filterName}
            onChange={(value) => dispatch(setFilterName(value))}
            onClear={() => dispatch(clearFilter())}
          />
          {hasActiveFilter ? (
            <p className="text-sm text-zinc-600" aria-live="polite">
              {filteredCount} resultados (de {totalCount})
            </p>
          ) : (
            <p className="text-sm text-zinc-600" aria-live="polite">
              {totalCount} posts
            </p>
          )}
        </div>
        <PostList
          posts={filteredPosts}
          loading={isLoading}
          error={
            isError
              ? ((error as Error)?.message ?? "Error al cargar")
              : undefined
          }
          onRetry={() => refetch()}
          emptyTitle={
            isFilteringWithNoResults ? "Sin resultados" : "No hay posts"
          }
          emptyDescription={
            isFilteringWithNoResults
              ? "No hay posts que coincidan con el filtro."
              : "Crea el primero para empezar."
          }
        />
      </section>
      <span className="sr-only">{posts?.length ?? 0} posts cargados</span>
    </main>
  );
}
