import { forwardRef } from "react";

import { cn } from "@/shared/lib/cn";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
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
            "font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-600 dark:text-zinc-400",
            srLabel && "sr-only",
          )}
        >
          {label}
          {required ? (
            <span className="ml-0.5 text-red-600" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
        {children}
        {hint && !error ? (
          <p
            id={hintId}
            className="font-serif text-xs italic text-zinc-500 dark:text-zinc-400"
          >
            {hint}
          </p>
        ) : null}
        {error ? (
          <p
            id={errorId}
            role="alert"
            aria-live="polite"
            className="font-sans text-xs font-medium text-red-700 dark:text-red-400"
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
