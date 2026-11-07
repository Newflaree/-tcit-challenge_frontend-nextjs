import { forwardRef } from "react";

import { cn } from "@/lib/cn";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, htmlFor, error, hint, required, children, className }, ref) => {
    const errorId = error && htmlFor ? `${htmlFor}-error` : undefined;
    const hintId = hint && htmlFor ? `${htmlFor}-hint` : undefined;

    return (
      <div ref={ref} className={cn("flex flex-col gap-1.5", className)}>
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {label}
          {required ? <span className="ml-0.5 text-red-600">*</span> : null}
        </label>
        {children}
        {hint && !error ? (
          <p id={hintId} className="text-xs text-zinc-500">
            {hint}
          </p>
        ) : null}
        {error ? (
          <p
            id={errorId}
            role="alert"
            aria-live="polite"
            className="text-xs text-red-600"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

FormField.displayName = "FormField";

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, hint, id, className, ...rest }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <FormField
        label={label}
        htmlFor={inputId}
        error={error}
        hint={hint}
        required={rest.required}
      >
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
            "rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100",
            error ? "border-red-500 focus:ring-red-200" : "",
            className,
          )}
          {...rest}
        />
      </FormField>
    );
  },
);

TextField.displayName = "TextField";

export interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const TextareaField = forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(({ label, error, hint, id, className, ...rest }, ref) => {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <FormField
      label={label}
      htmlFor={inputId}
      error={error}
      hint={hint}
      required={rest.required}
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
          "min-h-[96px] rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100",
          error ? "border-red-500 focus:ring-red-200" : "",
          className,
        )}
        {...rest}
      />
    </FormField>
  );
});

TextareaField.displayName = "TextareaField";
