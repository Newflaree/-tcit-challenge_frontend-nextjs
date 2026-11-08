import { forwardRef } from "react";

import { cn } from "@/shared/lib/cn";
import { FormField } from "./FormField";
import { controlBase, controlTone } from "./form-control";

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
