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
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-md border border-zinc-300 bg-[#fdfdfc] pl-3 pr-1.5 py-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] focus-within:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900",
        className,
      )}
    >
      <SearchIcon className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
      <TextField
        label="Buscar por nombre"
        srLabel
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Filtrar por nombre..."
        id="post-filter"
        type="search"
        className="flex-1 border-0 bg-transparent shadow-none px-0 py-1 focus:ring-0"
      />
      {hasValue ? (
        <Button
          type="button"
          variant="ghost"
          onClick={() => (onClear ? onClear() : onChange(""))}
          aria-label="Limpiar filtro"
          className="shrink-0 px-2 py-1"
        >
          <XMarkIcon className="h-4 w-4" />
        </Button>
      ) : null}
    </div>
  );
}
