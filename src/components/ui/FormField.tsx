import { forwardRef } from "react";

import { cn } from "@/lib/cn";

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

const controlBase =
  "w-full rounded-lg border bg-white px-3 py-2 text-sm text-zinc-900 shadow-xs outline-none transition placeholder:text-zinc-400 focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500";

const controlTone = (error?: string) =>
  error
    ? "border-red-300 focus:border-red-500 focus:ring-red-500/10 dark:border-red-900 dark:focus:border-red-700 dark:focus:ring-red-500/10"
    : "border-zinc-200 focus:border-zinc-400 focus:ring-zinc-900/[0.06] dark:border-zinc-800 dark:focus:border-zinc-600 dark:focus:ring-zinc-100/[0.08]";

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  srLabel?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, hint, icon, id, className, srLabel, ...rest }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    const input = (
      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={
          [error ? `${inputId}-error` : null, hint ? `${inputId}-hint` : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={cn(
          controlBase,
          controlTone(error),
          icon ? "pl-9" : "",
          className,
        )}
        {...rest}
      />
    );

    return (
      <FormField
        label={label}
        htmlFor={inputId}
        error={error}
        hint={hint}
        required={rest.required}
        srLabel={srLabel}
      >
        {icon ? (
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
              {icon}
            </span>
            {input}
          </div>
        ) : (
          input
        )}
      </FormField>
    );
  },
);

TextField.displayName = "TextField";

export interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
  srLabel?: boolean;
}

export const TextareaField = forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(({ label, error, hint, id, className, srLabel, ...rest }, ref) => {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <FormField
      label={label}
      htmlFor={inputId}
      error={error}
      hint={hint}
      required={rest.required}
      srLabel={srLabel}
    >
      <textarea
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={
          [error ? `${inputId}-error` : null, hint ? `${inputId}-hint` : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={cn(
          controlBase,
          controlTone(error),
          "min-h-[110px] resize-y leading-relaxed",
          className,
        )}
        {...rest}
      />
    </FormField>
  );
});

TextareaField.displayName = "TextareaField";
