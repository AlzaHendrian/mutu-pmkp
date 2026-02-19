/**
 * ui/field.tsx
 *
 * Lightweight Field, FieldLabel, and FieldError primitives used by
 * FloatingLabelSelect and similar form components.
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Field — wraps a single form field group, provides data-invalid context
// ---------------------------------------------------------------------------
const Field = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col gap-1.5 w-full', className)}
    {...props}
  />
));
Field.displayName = 'Field';

// ---------------------------------------------------------------------------
// FieldLabel — <label> element, turns red when aria-invalid="true"
// ---------------------------------------------------------------------------
const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none text-foreground',
      'aria-invalid:text-destructive',
      className,
    )}
    {...props}
  />
));
FieldLabel.displayName = 'FieldLabel';

// ---------------------------------------------------------------------------
// FieldError — renders a list of validation error messages
// ---------------------------------------------------------------------------
interface FieldErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  errors?: Array<{ message?: string } | undefined>;
}

const FieldError = React.forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ className, errors, ...props }, ref) => {
    const messages = errors
      ?.filter(Boolean)
      .map((e) => e?.message)
      .filter(Boolean);

    if (!messages || messages.length === 0) return null;

    return (
      <p
        ref={ref}
        role="alert"
        className={cn('text-xs font-medium text-destructive', className)}
        {...props}
      >
        {messages[0]}
      </p>
    );
  },
);
FieldError.displayName = 'FieldError';

export { Field, FieldLabel, FieldError };
