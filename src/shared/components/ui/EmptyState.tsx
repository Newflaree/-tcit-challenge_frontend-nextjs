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
        "flex flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-800",
        className,
      )}
    >
      <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-500">
        <InboxIcon className="h-5 w-5" />
      </span>
      <p className="text-[15px] font-semibold tracking-tight text-zinc-800 dark:text-zinc-200">
        {title}
      </p>
      {description ? (
        <p className="mt-1 max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
