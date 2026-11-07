"use client";

import { Button } from "@/components/ui/Button";
import { TextareaField, TextField } from "@/components/ui/FormField";
import { Alert } from "@/components/ui/Alert";
import { usePostForm } from "@/hooks/usePostForm";

export function PostForm() {
  const form = usePostForm();

  return (
    <section className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
      <header className="mb-4">
        <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Nuevo post
        </h2>
        <p className="mt-0.5 text-xs leading-relaxed text-zinc-400 dark:text-zinc-500">
          Nombre y descripción. Se publica al instante, sin recargar la página.
        </p>
      </header>
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
        className="flex flex-col gap-4"
      >
        {form.isError ? (
          <Alert variant="error">
            No pudimos crear el post. Revisa los datos e inténtalo de nuevo.
          </Alert>
        ) : null}
        {form.isSuccess ? (
          <Alert variant="success">
            Post publicado. Ya lo ves en la lista de la derecha.
          </Alert>
        ) : null}
        <TextField
          label="Nombre"
          value={form.name}
          onChange={(e) => form.setName(e.target.value)}
          placeholder="P. ej.: Rediseño del onboarding"
          error={form.errors.name}
          hint={`${form.name.trim().length}/120 caracteres`}
          required
        />
        <TextareaField
          label="Descripción"
          value={form.description}
          onChange={(e) => form.setDescription(e.target.value)}
          placeholder="Cuenta en pocas palabras de qué trata este post…"
          error={form.errors.description}
          hint={`${form.description.trim().length}/1000 caracteres`}
          required
        />
        <Button
          type="submit"
          className="w-full"
          loading={form.isPending}
          onClick={() => void form.submit()}
        >
          Crear post
        </Button>
      </form>
    </section>
  );
}
