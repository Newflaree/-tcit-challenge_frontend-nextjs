import { forwardRef } from "react";

import { cn } from "@/shared/lib/cn";
import { Spinner } from "./Spinner";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#020381] text-[#faf9f6] hover:bg-[#0a182e] active:bg-[#07111f] focus-visible:ring-[#020381] dark:bg-[#00d084] dark:text-[#07111f] dark:hover:bg-[#00d082] dark:focus-visible:ring-[#00d084]",
  secondary:
    "border border-zinc-400 bg-transparent text-zinc-800 hover:border-zinc-600 hover:bg-zinc-100/70 focus-visible:ring-zinc-500 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:bg-zinc-800/60",
  danger:
    "bg-red-700 text-[#faf9f6] hover:bg-red-600 active:bg-red-800 focus-visible:ring-red-700",
  ghost:
    "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-zinc-500 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      loading = false,
      disabled,
      className,
      children,
      type = "button",
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f6] disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-offset-zinc-950",
          variantClasses[variant],
          className,
        )}
        {...rest}
      >
        {loading ? <Spinner size="sm" /> : null}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
