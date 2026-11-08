import { cn } from "@/shared/lib/cn";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
} from "@/shared/components/ui/icons";

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

export { EmptyState } from "./EmptyState";
export { ErrorState } from "./ErrorState";
