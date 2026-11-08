import { cn } from "@/shared/lib/cn";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
} from "@/shared/components/ui/icons";

type AlertVariant = "info" | "success" | "error";

const alertClasses: Record<AlertVariant, string> = {
  info: "border-zinc-300 bg-[#fdfdfc] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300",
  success:
    "border-emerald-300/70 bg-emerald-50/70 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200",
  error:
    "border-red-300/70 bg-red-50/70 text-red-900 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200",
};

const alertIconClasses: Record<AlertVariant, string> = {
  info: "text-zinc-400",
  success: "text-emerald-600 dark:text-emerald-400",
  error: "text-red-600 dark:text-red-400",
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
        "flex items-start gap-3 rounded-md border-l-4 px-4 py-3 font-sans text-sm shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
        alertClasses[variant],
        className,
      )}
    >
      <Icon
        className={cn("mt-0.5 h-4 w-4 shrink-0", alertIconClasses[variant])}
      />
      <div>
        {title ? <p className="font-serif font-semibold">{title}</p> : null}
        <div className={cn("font-serif leading-relaxed", title && "mt-0.5")}>
          {children}
        </div>
      </div>
    </div>
  );
}

export { EmptyState } from "./EmptyState";
export { ErrorState } from "./ErrorState";
