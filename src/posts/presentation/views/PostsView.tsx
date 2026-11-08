"use client";

import { PageHeader } from "@/shared/components/ui/ConfirmDialog";
import { Alert } from "@/shared/components/ui/Alert";
import { PostForm } from "@/posts/presentation/components/PostForm";
import { PostFilter } from "@/posts/presentation/components/PostFilter";
import { PostList } from "@/posts/presentation/components/PostList";
import { ConfirmDialog } from "@/shared/components/ui/ConfirmDialog";
import { PostsHeader } from "@/posts/presentation/components/PostsHeader";
import { PostsFooter } from "@/posts/presentation/components/PostsFooter";
import { usePostsView } from "@/posts/presentation/hooks/usePostsView";
import {
  setFilterName,
  clearFilter,
  cancelDelete,
} from "@/posts/presentation/store/postsSlice";

export function PostsView() {
  const v = usePostsView();

  return (
    <div className="flex min-h-screen flex-col bg-[#faf9f6] dark:bg-zinc-950">
      <PostsHeader />

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 pb-10 pt-24 sm:px-6">
        <PageHeader
          title="Tus posts"
          description="Crea publicaciones, encuentra lo que buscas mientras escribes y elimina lo que ya no va. Todo se refleja al instante, sin una sola recarga."
        />

        {v.deleteError ? (
          <Alert variant="error" title="No pudimos completar la acción">
            {v.deleteError}
          </Alert>
        ) : null}

        <PostForm />

        <div className="flex items-center justify-between gap-3">
          <p
            aria-live="polite"
            className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500 tabular-nums dark:text-zinc-400"
          >
            {v.counterText}
          </p>
          <PostFilter
            className="w-full max-w-[220px] sm:max-w-xs"
            value={v.filterName}
            onChange={(value) => v.dispatch(setFilterName(value))}
            onClear={() => v.dispatch(clearFilter())}
          />
        </div>

        <PostList
          posts={v.filteredPosts}
          loading={v.isLoading}
          error={v.isError ? (v.error as Error).message : undefined}
          onRetry={() => v.refetch()}
          onDelete={v.handleDelete}
          emptyTitle={
            v.isFilteringWithNoResults ? "Sin coincidencias" : undefined
          }
          emptyDescription={
            v.isFilteringWithNoResults
              ? `Ningún post lleva «${v.trimmedFilter}» en su nombre. Prueba con otra palabra o limpia el filtro para verlos todos.`
              : undefined
          }
        />
      </main>

      <PostsFooter />

      <ConfirmDialog
        open={v.postToDeleteId !== null}
        title="Eliminar post"
        description={
          v.postToDelete
            ? `«${v.postToDelete.name}» desaparecerá del hilo al instante. Esta acción no se puede deshacer.`
            : "El post desaparecerá del hilo al instante. Esta acción no se puede deshacer."
        }
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        onConfirm={v.handleConfirmDelete}
        onCancel={() => v.dispatch(cancelDelete())}
        confirmDisabled={v.deleteMutation.isPending}
        confirmLoading={v.deleteMutation.isPending}
      />
    </div>
  );
}
