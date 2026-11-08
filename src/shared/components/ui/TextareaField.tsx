import { forwardRef } from "react";

import { cn } from "@/shared/lib/cn";
import { FormField } from "./FormField";
import { controlBase, controlTone } from "./form-control";

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
