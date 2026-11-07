"use client";

import { TextField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

export interface PostFilterProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  className?: string;
}

export function PostFilter({
  value,
  onChange,
  onClear,
  className,
}: PostFilterProps) {
  const hasValue = value.trim().length > 0;

  return (
    <div className={className}>
      <TextField
        label="Filtrar posts por nombre"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Filtrar por nombre..."
        id="post-filter"
      />
      {hasValue ? (
        <Button
          type="button"
          variant="secondary"
          onClick={() => (onClear ? onClear() : onChange(""))}
          aria-label="Limpiar filtro"
        >
          Limpiar filtro
        </Button>
      ) : null}
    </div>
  );
}
