import { cn } from "@/lib/cn";
import { TrashIcon } from "@/components/ui/icons";

export interface PostCardProps {
  id: number;
  name: string;
  description: string;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  return letters || "#";
}

export function PostCard({
  id,
  name,
  description,
  onEdit,
  onDelete,
  className,
}: PostCardProps) {
  return (
    <article
      className={cn(
        "group flex gap-3.5 px-1 py-5 first:pt-2 last:pb-2 transition-colors",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-800 to-zinc-600 text-xs font-semibold text-zinc-50 ring-1 ring-inset ring-zinc-900/10 dark:from-zinc-100 dark:to-zinc-300 dark:text-zinc-900 dark:ring-white/10"
      >
        {initials(name)}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[14px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {name}
            </h3>
            <p className="mt-0.5 inline-flex items-center gap-1.5 text-[11px] tabular-nums text-zinc-400 dark:text-zinc-500">
              <span className="font-mono">#{id}</span>
              <span
                aria-hidden="true"
                className="text-zinc-300 dark:text-zinc-700"
              >
                ·
              </span>
              <span>en el muro</span>
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1 opacity-70 transition-opacity group-hover:opacity-100">
            {onEdit ? (
              <button
                type="button"
                onClick={onEdit}
                className="rounded-md px-2 py-1 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                Editar
              </button>
            ) : null}
            {onDelete ? (
              <button
                type="button"
                onClick={onDelete}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 dark:hover:bg-red-950/50 dark:hover:text-red-400"
              >
                <TrashIcon className="h-3.5 w-3.5" />
                Eliminar
              </button>
            ) : null}
          </div>
        </div>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {description}
        </p>
      </div>
      <span className="sr-only">Post {id}</span>
    </article>
  );
}
