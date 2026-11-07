"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/Button";
import { TextareaField, TextField } from "@/components/ui/FormField";
import { usePostForm } from "@/hooks/usePostForm";

export function PostForm() {
  const form = usePostForm();
  const submittingRef = useRef(false);

  async function handleSubmit() {
    if (submittingRef.current) return;
    submittingRef.current = true;
    try {
      await form.submit();
    } finally {
      submittingRef.current = false;
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit();
      }}
      className="flex flex-col gap-4"
    >
      {form.isError ? (
        <p role="alert" className="text-sm text-red-600">
          No se pudo crear el post. Inténtalo de nuevo.
        </p>
      ) : null}
      <TextField
        label="Nombre"
        value={form.name}
        onChange={(e) => form.setName(e.target.value)}
        error={form.errors.name}
        required
      />
      <TextareaField
        label="Descripción"
        value={form.description}
        onChange={(e) => form.setDescription(e.target.value)}
        error={form.errors.description}
        required
      />
      <Button
        type="submit"
        loading={form.isPending}
        onClick={() => void handleSubmit()}
      >
        Crear post
      </Button>
    </form>
  );
}
