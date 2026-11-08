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
        "flex flex-col items-center justify-center gap-2 border border-red-300/70 bg-red-50/60 px-6 py-16 text-center rounded-md dark:border-red-800 dark:bg-red-950/30",
        className,
      )}
    >
      <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-red-300 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
        <AlertTriangleIcon className="h-5 w-5" />
      </span>
      <p className="font-serif text-lg font-semibold tracking-tight text-red-900 dark:text-red-200">
        {title}
      </p>
      <p className="mt-1 max-w-sm font-serif text-sm italic leading-relaxed text-red-700/90 dark:text-red-300/80">
        {message}
      </p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-red-700 px-4 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.08em] text-[#faf9f6] transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2"
        >
          {retryLabel}
        </button>
      ) : null}
    </div>
  );
}
