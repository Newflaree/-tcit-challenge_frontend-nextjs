"use client";

import { Button } from "@/shared/components/ui/Button";
import { TextareaField, TextField } from "@/shared/components/ui/FormField";
import { Alert } from "@/shared/components/ui/Alert";
import { PencilIcon } from "@/shared/components/ui/icons";
import { usePostForm } from "@/posts/presentation/hooks/usePostForm";

export function PostForm() {
  const form = usePostForm();

  return (
    <section className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm transition focus-within:border-zinc-300 focus-within:shadow-md sm:p-5 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-within:border-zinc-700">
      {form.isError ? (
        <div className="mb-4">
          <Alert variant="error">
            No pudimos crear el post. Revisa los datos e inténtalo de nuevo.
          </Alert>
        </div>
      ) : null}
      {form.isSuccess ? (
        <div className="mb-4">
          <Alert variant="success">
            Post publicado. Ya lo ves en el hilo, arriba del todo.
          </Alert>
        </div>
      ) : null}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            (e.target as HTMLElement).tagName !== "TEXTAREA"
          ) {
            e.preventDefault();
            void form.submit();
          }
        }}
        className="flex gap-3"
      >
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
        >
          <PencilIcon className="h-4 w-4" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <TextField
            label="Nombre"
            srLabel
            value={form.name}
            onChange={(e) => form.setName(e.target.value)}
            placeholder="Tu nombre o el título del post"
            error={form.errors.name}
            required
          />
          <TextareaField
            label="Descripción"
            srLabel
            value={form.description}
            onChange={(e) => form.setDescription(e.target.value)}
            placeholder="Escribe tu post… ¿qué quieres contar hoy?"
            error={form.errors.description}
            required
            className="min-h-[84px]"
          />
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs tabular-nums text-zinc-400 dark:text-zinc-500">
              {form.name.trim().length}/120 · {form.description.trim().length}
              /1000
            </p>
            <Button
              type="submit"
              loading={form.isPending}
              onClick={() => void form.submit()}
            >
              Crear post
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
