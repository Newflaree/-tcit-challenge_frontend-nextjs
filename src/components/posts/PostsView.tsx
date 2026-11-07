"use client";

import { useState } from "react";

import { usePostsQuery } from "@/hooks/usePostsQuery";
import { useFilteredPosts } from "@/hooks/useFilteredPosts";
import { useDeletePostMutation } from "@/hooks/useDeletePostMutation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setFilterName,
  clearFilter,
  selectHasActiveFilter,
  selectPostToDeleteId,
  requestDelete,
  cancelDelete,
} from "@/features/posts/postsSlice";
import { PageHeader, ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Alert } from "@/components/ui/Alert";
import { PostForm } from "@/components/posts/PostForm";
import { PostFilter } from "@/components/posts/PostFilter";
import { PostList } from "@/components/posts/PostList";

export function PostsView() {
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

  const postToDelete = posts?.find((p) => p.id === postToDeleteId) ?? null;

  const counterText = hasActiveFilter
    ? `${filteredCount} de ${totalCount} ${totalCount === 1 ? "post" : "posts"} coinciden`
    : `${totalCount} ${totalCount === 1 ? "post publicado" : "posts publicados"}`;

  function handleDelete(id: number) {
    setDeleteError(null);
    dispatch(requestDelete(id));
  }

  function handleConfirmDelete() {
    if (postToDeleteId === null) return;
    deleteMutation.mutate(postToDeleteId, {
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
            "Ese post ya no existía en el servidor; actualizamos la lista.",
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

  function handleCancelDelete() {
    if (deleteMutation.isPending) return;
    dispatch(cancelDelete());
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-zinc-50/80 backdrop-blur-md dark:border-zinc-800/70 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 text-[11px] font-bold text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
            >
              T
            </span>
            <p className="text-sm tracking-tight">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                TCIT
              </span>{" "}
              <span className="font-normal text-zinc-400">Posts</span>
            </p>
          </div>
          <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            demo full-stack
          </span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6">
        <PageHeader
          title="Tus posts"
          description="Crea publicaciones, encuentra lo que buscas mientras escribes y elimina lo que ya no va. Todo se refleja al instante, sin una sola recarga."
        />

        {deleteError ? (
          <Alert variant="error" title="No pudimos completar la acción">
            {deleteError}
          </Alert>
        ) : null}

        <section className="grid items-start gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-8">
          <div className="flex flex-col gap-6">
            <PostForm />
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                Buscar en el muro
              </h2>
              <p className="mt-0.5 text-xs leading-relaxed text-zinc-400 dark:text-zinc-500">
                El filtro por nombre actúa sobre lo que ya cargaste: ninguna
                petición viaja al servidor.
              </p>
              <PostFilter
                className="mt-4"
                value={filterName}
                onChange={(value) => dispatch(setFilterName(value))}
                onClear={() => dispatch(clearFilter())}
              />
              <p
                aria-live="polite"
                className="mt-3 text-xs font-medium tabular-nums text-zinc-500 dark:text-zinc-400"
              >
                {counterText}
              </p>
            </div>
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
            onDelete={handleDelete}
            emptyTitle={
              isFilteringWithNoResults ? "Sin coincidencias" : undefined
            }
            emptyDescription={
              isFilteringWithNoResults
                ? `Ningún post lleva «${trimmedFilter}» en su nombre. Prueba con otra palabra o limpia el filtro para verlos todos.`
                : undefined
            }
          />
        </section>
      </main>

      <footer className="border-t border-zinc-200/70 py-6 dark:border-zinc-800/70">
        <p className="mx-auto w-full max-w-6xl px-4 text-xs text-zinc-400 sm:px-6 dark:text-zinc-500">
          Next.js · Redux Toolkit · TanStack Query — sobre una API NestJS ·
          TypeORM · PostgreSQL
        </p>
      </footer>

      <ConfirmDialog
        open={postToDeleteId !== null}
        title="Eliminar post"
        description={
          postToDelete
            ? `«${postToDelete.name}» desaparecerá de la lista al instante. Esta acción no se puede deshacer.`
            : "El post desaparecerá de la lista al instante. Esta acción no se puede deshacer."
        }
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmDisabled={deleteMutation.isPending}
        confirmLoading={deleteMutation.isPending}
      />
    </div>
  );
}
