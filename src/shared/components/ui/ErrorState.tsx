import { cn } from "@/shared/lib/cn";
import { AlertTriangleIcon } from "@/shared/components/ui/icons";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  title = "No pudimos cargar los posts",
  message,
  onRetry,
  retryLabel = "Reintentar",
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-1 rounded-2xl border border-red-200/70 bg-red-50/50 px-6 py-16 text-center dark:border-red-900/50 dark:bg-red-950/20",
        className,
      )}
    >
      <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-500 dark:bg-red-950 dark:text-red-400">
        <AlertTriangleIcon className="h-5 w-5" />
      </span>
      <p className="text-[15px] font-semibold tracking-tight text-red-900 dark:text-red-200">
        {title}
      </p>
      <p className="mt-1 max-w-sm text-sm leading-relaxed text-red-700/80 dark:text-red-300/80">
        {message}
      </p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
        >
          {retryLabel}
        </button>
      ) : null}
    </div>
  );
}
