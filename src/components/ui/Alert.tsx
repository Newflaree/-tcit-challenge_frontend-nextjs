import { cn } from "@/lib/cn";

type AlertVariant = "info" | "success" | "error";

const alertClasses: Record<AlertVariant, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200",
  success:
    "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200",
  error:
    "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200",
};

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Alert({
  variant = "info",
  title,
  children,
  className,
}: AlertProps) {
  const role = variant === "error" ? "alert" : "status";
  return (
    <div
      role={role}
      aria-live={variant === "error" ? "assertive" : "polite"}
      className={cn(
        "rounded-md border px-4 py-3 text-sm",
        alertClasses[variant],
        className,
      )}
    >
      {title ? <p className="mb-1 font-semibold">{title}</p> : null}
      <div>{children}</div>
    </div>
  );
}

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
        "flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-zinc-300 px-6 py-12 text-center dark:border-zinc-700",
        className,
      )}
    >
      <p className="text-base font-medium text-zinc-700 dark:text-zinc-200">
        {title}
      </p>
      {description ? (
        <p className="max-w-md text-sm text-zinc-500">{description}</p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  title = "Ocurrió un error",
  message,
  onRetry,
  retryLabel = "Reintentar",
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-md border border-red-200 bg-red-50 px-6 py-12 text-center dark:border-red-900 dark:bg-red-950",
        className,
      )}
    >
      <p className="text-base font-medium text-red-800 dark:text-red-200">
        {title}
      </p>
      <p className="max-w-md text-sm text-red-700 dark:text-red-300">
        {message}
      </p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
        >
          {retryLabel}
        </button>
      ) : null}
    </div>
  );
}
