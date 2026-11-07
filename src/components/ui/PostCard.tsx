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
        "group flex flex-col gap-3 rounded-xl border border-zinc-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] font-medium tabular-nums text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          #{id}
        </span>
        <div className="flex items-center gap-1">
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
      <div className="min-w-0">
        <h3 className="truncate text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {name}
        </h3>
        <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>
      <span className="sr-only">Post {id}</span>
    </article>
  );
}
