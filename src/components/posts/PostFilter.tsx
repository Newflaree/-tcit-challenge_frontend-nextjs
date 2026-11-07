"use client";

import { TextField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { SearchIcon, XMarkIcon } from "@/components/ui/icons";

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
        label="Buscar por nombre"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Filtrar por nombre..."
        id="post-filter"
        type="search"
        icon={<SearchIcon className="h-4 w-4" />}
      />
      {hasValue ? (
        <Button
          type="button"
          variant="ghost"
          onClick={() => (onClear ? onClear() : onChange(""))}
          aria-label="Limpiar filtro"
          className="mt-2 px-2 py-1 text-xs"
        >
          <XMarkIcon className="h-3.5 w-3.5" />
          Limpiar filtro
        </Button>
      ) : null}
    </div>
  );
}
