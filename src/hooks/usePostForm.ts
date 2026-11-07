"use client";

import { useState } from "react";

import { useCreatePostMutation } from "@/hooks/useCreatePostMutation";

export interface PostFormState {
  name: string;
  description: string;
  errors: { name?: string; description?: string };
}

export function usePostForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<PostFormState["errors"]>({});
  const mutation = useCreatePostMutation();

  function validate(): boolean {
    const newErrors: PostFormState["errors"] = {};
    if (!name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    } else if (name.trim().length > 120) {
      newErrors.name = "El nombre no debe exceder 120 caracteres";
    }
    if (!description.trim()) {
      newErrors.description = "La descripción es obligatoria";
    } else if (description.trim().length > 1000) {
      newErrors.description = "La descripción no debe exceder 1000 caracteres";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function submit() {
    if (!validate()) return false;
    try {
      await mutation.mutateAsync({
        name: name.trim(),
        description: description.trim(),
      });
      setName("");
      setDescription("");
      setErrors({});
      return true;
    } catch {
      return false;
    }
  }

  return {
    name,
    setName,
    description,
    setDescription,
    errors,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    submit,
    reset: () => {
      setName("");
      setDescription("");
      setErrors({});
    },
  };
}
