import { cn } from "@/lib/cn";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  InboxIcon,
} from "@/components/ui/icons";

type AlertVariant = "info" | "success" | "error";

const alertClasses: Record<AlertVariant, string> = {
  info: "border-zinc-200 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300",
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300",
  error:
    "border-red-200 bg-red-50 text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300",
};

const alertIconClasses: Record<AlertVariant, string> = {
  info: "text-zinc-400",
  success: "text-emerald-500",
  error: "text-red-500",
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
  const Icon = variant === "error" ? AlertTriangleIcon : CheckCircleIcon;
  return (
    <div
      role={role}
      aria-live={variant === "error" ? "assertive" : "polite"}
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-xs",
        alertClasses[variant],
        className,
      )}
    >
      <Icon
        className={cn("mt-0.5 h-4 w-4 shrink-0", alertIconClasses[variant])}
      />
      <div>
        {title ? <p className="font-semibold">{title}</p> : null}
        <div className={title ? "mt-0.5" : undefined}>{children}</div>
      </div>
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
