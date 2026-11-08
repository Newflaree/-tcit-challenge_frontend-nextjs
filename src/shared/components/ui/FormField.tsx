import { forwardRef } from "react";

import { cn } from "@/shared/lib/cn";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  /** Oculta el label visualmente pero lo mantiene para lectores de pantalla. */
  srLabel?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      htmlFor,
      error,
      hint,
      required,
      srLabel = false,
      children,
      className,
    },
    ref,
  ) => {
    const errorId = error && htmlFor ? `${htmlFor}-error` : undefined;
    const hintId = hint && htmlFor ? `${htmlFor}-hint` : undefined;

    return (
      <div ref={ref} className={cn("flex flex-col gap-1.5", className)}>
        <label
          htmlFor={htmlFor}
          className={cn(
            "text-[13px] font-medium text-zinc-700 dark:text-zinc-300",
            srLabel && "sr-only",
          )}
        >
          {label}
          {required ? (
            <span className="ml-0.5 text-red-500" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
        {children}
        {hint && !error ? (
          <p
            id={hintId}
            className="text-xs tabular-nums text-zinc-400 dark:text-zinc-500"
          >
            {hint}
          </p>
        ) : null}
        {error ? (
          <p
            id={errorId}
            role="alert"
            aria-live="polite"
            className="text-xs font-medium text-red-600 dark:text-red-400"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

FormField.displayName = "FormField";

export { TextField } from "./TextField";
export { TextareaField } from "./TextareaField";
