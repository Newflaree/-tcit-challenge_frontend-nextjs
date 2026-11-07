import { cn } from "@/lib/cn";

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
        "rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900",
        className,
      )}
    >
      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
        {name}
      </h3>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
        {description}
      </p>
      <div className="mt-3 flex gap-2">
        {onEdit ? (
          <button
            type="button"
            onClick={onEdit}
            className="text-xs font-medium text-zinc-600 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
          >
            Editar
          </button>
        ) : null}
        {onDelete ? (
          <button
            type="button"
            onClick={onDelete}
            className="text-xs font-medium text-red-600 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            Eliminar
          </button>
        ) : null}
      </div>
      <span className="sr-only">Post {id}</span>
    </article>
  );
}
