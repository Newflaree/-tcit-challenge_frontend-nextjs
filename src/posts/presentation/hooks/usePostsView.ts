"use client";

import { useState } from "react";

import { usePostsQuery } from "@/posts/presentation/hooks/usePostsQuery";
import { useFilteredPosts } from "@/posts/presentation/hooks/useFilteredPosts";
import { useDeletePostMutation } from "@/posts/presentation/hooks/useDeletePostMutation";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import {
  selectHasActiveFilter,
  selectPostToDeleteId,
  requestDelete,
  cancelDelete,
} from "@/posts/presentation/store/postsSlice";
import type { Post } from "@/posts/domain/Post";

export function usePostsView() {
  const dispatch = useAppDispatch();
  const { data: posts, isLoading, isError, error, refetch } = usePostsQuery();
  const { posts: filteredPosts, filterName } = useFilteredPosts();
  const hasActiveFilter = useAppSelector(selectHasActiveFilter);
  const postToDeleteId = useAppSelector(selectPostToDeleteId);
  const deleteMutation = useDeletePostMutation();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const totalCount = posts?.length ?? 0;
  const filteredCount = filteredPosts.length;
  const trimmedFilter = filterName.trim();
  const isFilteringWithNoResults =
    hasActiveFilter && filteredCount === 0 && totalCount > 0;

  const postToDelete: Post | null =
    posts?.find((p) => p.id === postToDeleteId) ?? null;

  const counterText = hasActiveFilter
    ? `${filteredCount} de ${totalCount} ${totalCount === 1 ? "post" : "posts"} coinciden`
    : `${totalCount} ${totalCount === 1 ? "post publicado" : "posts publicados"}`;

  function handleDelete(id: number) {
    setDeleteError(null);
    dispatch(requestDelete(id));
  }

  function handleConfirmDelete() {
    deleteMutation.mutate(postToDeleteId!, {
      onSuccess: () => {
        dispatch(cancelDelete());
        setDeleteError(null);
      },
      onError: (err) => {
        const status =
          typeof err === "object" && err !== null && "status" in err
            ? (err as { status: number }).status
            : undefined;
        if (status === 404) {
          dispatch(cancelDelete());
          setDeleteError(
            "Ese post ya no existía en el servidor; actualizamos el hilo.",
          );
        } else {
          const message =
            err instanceof Error
              ? err.message
              : "No se pudo eliminar el post. Inténtalo de nuevo.";
          setDeleteError(message);
          dispatch(cancelDelete());
        }
      },
    });
  }

  return {
    posts,
    filteredPosts,
    filterName,
    isLoading,
    isError,
    error,
    refetch,
    hasActiveFilter,
    postToDeleteId,
    deleteMutation,
    deleteError,
    totalCount,
    filteredCount,
    trimmedFilter,
    isFilteringWithNoResults,
    postToDelete,
    counterText,
    dispatch,
    handleDelete,
    handleConfirmDelete,
  };
}
