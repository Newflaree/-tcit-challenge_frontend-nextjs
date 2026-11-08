"use client";

import { cn } from "@/shared/lib/cn";
import { TextField } from "@/shared/components/ui/FormField";
import { Button } from "@/shared/components/ui/Button";
import { SearchIcon, XMarkIcon } from "@/shared/components/ui/icons";

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
    <div className={cn("flex items-center gap-2", className)}>
      <TextField
        label="Buscar por nombre"
        srLabel
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Filtrar por nombre..."
        id="post-filter"
        type="search"
        icon={<SearchIcon className="h-4 w-4" />}
        className="flex-1"
      />
      {hasValue ? (
        <Button
          type="button"
          variant="ghost"
          onClick={() => (onClear ? onClear() : onChange(""))}
          aria-label="Limpiar filtro"
          className="shrink-0 px-2"
        >
          <XMarkIcon className="h-4 w-4" />
        </Button>
      ) : null}
    </div>
  );
}
