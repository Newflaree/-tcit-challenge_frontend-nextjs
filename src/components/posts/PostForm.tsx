"use client";

import { Button } from "@/components/ui/Button";
import { TextareaField, TextField } from "@/components/ui/FormField";
import { usePostForm } from "@/hooks/usePostForm";

export function PostForm() {
  const form = usePostForm();

  return (
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
        <p role="alert" className="text-sm text-red-600">
          No se pudo crear el post. Inténtalo de nuevo.
        </p>
      ) : null}
      {form.isSuccess ? (
        <p role="status" className="text-sm text-green-600">
          Post creado correctamente.
        </p>
      ) : null}
      <TextField
        label="Nombre"
        value={form.name}
        onChange={(e) => form.setName(e.target.value)}
        error={form.errors.name}
        hint={`${form.name.trim().length}/120`}
        required
      />
      <TextareaField
        label="Descripción"
        value={form.description}
        onChange={(e) => form.setDescription(e.target.value)}
        error={form.errors.description}
        hint={`${form.description.trim().length}/1000`}
        required
      />
      <Button
        type="submit"
        loading={form.isPending}
        onClick={() => void form.submit()}
      >
        Crear post
      </Button>
    </form>
  );
}
