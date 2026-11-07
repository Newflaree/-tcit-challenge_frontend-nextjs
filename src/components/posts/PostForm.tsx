"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { TextareaField, TextField } from "@/components/ui/FormField";

export interface PostFormValues {
  name: string;
  description: string;
}

export interface PostFormProps {
  onSubmit: (values: PostFormValues) => void;
  loading?: boolean;
  error?: string;
}

export function PostForm({ onSubmit, loading = false, error }: PostFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState<string | undefined>();
  const [descriptionError, setDescriptionError] = useState<
    string | undefined
  >();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    let valid = true;
    if (!name.trim()) {
      setNameError("El nombre es obligatorio");
      valid = false;
    } else if (name.trim().length > 120) {
      setNameError("El nombre no debe exceder 120 caracteres");
      valid = false;
    } else {
      setNameError(undefined);
    }
    if (!description.trim()) {
      setDescriptionError("La descripción es obligatoria");
      valid = false;
    } else if (description.trim().length > 1000) {
      setDescriptionError("La descripción no debe exceder 1000 caracteres");
      valid = false;
    } else {
      setDescriptionError(undefined);
    }
    if (!valid) return;
    onSubmit({ name: name.trim(), description: description.trim() });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error ? (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
      <TextField
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={nameError}
        required
      />
      <TextareaField
        label="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={descriptionError}
        required
      />
      <Button type="submit" loading={loading}>
        Crear post
      </Button>
    </form>
  );
}
