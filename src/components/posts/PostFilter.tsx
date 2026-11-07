"use client";

interface PostFilterProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function PostFilter({ value, onChange, className }: PostFilterProps) {
  return (
    <div className={className}>
      <label htmlFor="post-filter" className="sr-only">
        Filtrar posts por nombre
      </label>
      <input
        id="post-filter"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Filtrar por nombre..."
        className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
      />
    </div>
  );
}
