import { cn } from "@/shared/lib/cn";
import { TrashIcon } from "@/shared/components/ui/icons";

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
    .map((p) => p.charAt(0).toUpperCase())
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
        "group flex gap-4 border-b border-zinc-200/80 py-5 last:border-b-0 dark:border-zinc-800/80",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-zinc-900 font-serif text-sm font-bold text-[#faf9f6] dark:bg-zinc-100 dark:text-zinc-900"
      >
        {initials(name)}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-serif text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50">
              {name}
            </h3>
            <p className="mt-0.5 font-sans text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Entrada #{id} · en el muro
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
            {onEdit ? (
              <button
                type="button"
                onClick={onEdit}
                className="rounded-sm px-2 py-1 font-sans text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                Editar
              </button>
            ) : null}
            {onDelete ? (
              <button
                type="button"
                onClick={onDelete}
                className="inline-flex items-center gap-1.5 rounded-sm px-2 py-1 font-sans text-xs font-medium text-zinc-500 transition-colors hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 dark:text-zinc-400 dark:hover:bg-red-950/50 dark:hover:text-red-400"
              >
                <TrashIcon className="h-3.5 w-3.5" />
                Eliminar
              </button>
            ) : null}
          </div>
        </div>
        <p className="mt-2 whitespace-pre-wrap font-serif text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          {description}
        </p>
      </div>
      <span className="sr-only">Post {id}</span>
    </article>
  );
}
