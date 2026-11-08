import { cn } from "@/shared/lib/cn";
import { InboxIcon } from "@/shared/components/ui/icons";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700",
        className,
      )}
    >
      <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 bg-[#fdfdfc] text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-500">
        <InboxIcon className="h-5 w-5" />
      </span>
      <p className="font-serif text-lg font-semibold tracking-tight text-zinc-800 dark:text-zinc-200">
        {title}
      </p>
      {description ? (
        <p className="mt-1 max-w-sm font-serif text-sm italic leading-relaxed text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
