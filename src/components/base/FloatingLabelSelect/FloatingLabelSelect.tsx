import {
  useEffect,
  useRef,
  useState,
} from 'react';
import type {
  ButtonHTMLAttributes,
  ClassAttributes,
  ReactNode,
} from 'react';
import { Controller } from 'react-hook-form';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { Check, ChevronDown } from 'lucide-react';
import type { FloatingSelectBaseProps } from '@/types';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { mergeRefs } from '@/components/helper';
import { cn } from '@/lib/utils';

import { getSelectedLabel, hasValue } from './utils/helper';

type FloatingLabelSelectProps<
  T extends FieldValues,
  O = { label: string; value: string | number },
> = Omit<FloatingSelectBaseProps<T, O>, 'multiple'> & {
  renderOptionExtra?: (option: O, isSelected: boolean) => ReactNode;
  getOptionLabel?: (option: O) => string;
  getOptionValue?: (option: O) => string | number;

  onValueChange?: (value: O | O[] | null) => void;
  onSearchChange?: (value: string) => void;
  isLoading?: boolean;
} & ClassAttributes<HTMLButtonElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * FloatingLabelSelectInput
 *
 * A select input with floating label.
 * Supports native select and searchable (Command) variant.
 *
 * @example
 * ```tsx
 * <FloatingLabelSelect<
 *   FormValues,
 *   undefined,
 *   ProductOption
 * >
 *   name="product"
 *   control={methods.control}
 *   label="Select Product"
 *   variant="searchable"
 *   isMulti
 *   options={products}
 *   getOptionLabel={(o) => o.label}
 *   getOptionValue={(o) => String(o.value)}
 *   renderOptionExtra={(option, isSelected) => (
 *     <div className="text-xs text-gray-500 group-hover:block">
 *       <div>SKU: {option.sku}</div>
 *       {isSelected && <div className="text-cyan-600 font-medium">Selected</div>}
 *     </div>
 *   )}
 * />
 * ```
 */

export function FloatingLabelSelect<
  T extends FieldValues,
  O extends Record<string, any> = { label: string; value: string | number },
>({
  name,
  control,
  rules,
  options,
  label,
  required,
  className,
  containerClassName,
  labelClassName,
  variant = 'native',
  isMulti,
  renderOptionExtra,
  getOptionLabel = (o: O) => (o as unknown as { label: string }).label,
  getOptionValue = (o: O) => (o as unknown as { value: string | number }).value,
  onValueChange,
  onSearchChange,
  isLoading,
  ...props
}: FloatingLabelSelectProps<T, O>) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [contentWidth, setContentWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (triggerRef.current) setContentWidth(triggerRef.current.offsetWidth);
  }, [open, triggerRef]);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      if (variant === 'searchable') {
        inputRef.current?.focus();
      } else {
        listRef.current?.focus();
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [open, variant]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setOpen(true);
        break;

      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault();
        setOpen(true);
        break;

      default:
        break;
    }
  };

  return (
    <Controller
      name={name as FieldPath<T>}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const selected = field.value;

        const handleSelect = (option: O) => {
          if (isMulti) {
            const next = Array.isArray(selected)
              ? selected.some((v: O) => getOptionValue(v) === getOptionValue(option))
                ? (selected as O[]).filter((v) => getOptionValue(v) !== getOptionValue(option))
                : [...(selected as O[]), option]
              : [option];
            field.onChange(next);
            onValueChange?.(option);
          } else {
            field.onChange(option);
            onValueChange?.(option);
            setOpen(false);
            requestAnimationFrame(() => {
              triggerRef.current?.focus();
            });
          }
        };

        return (
          <Field data-invalid={fieldState.invalid}>
            <div className={cn('relative w-full', containerClassName)}>
              <Popover open={open} onOpenChange={setOpen} modal={false}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    ref={mergeRefs<HTMLButtonElement>(triggerRef, field.ref)}
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-controls={`${name}-listbox`}
                    aria-invalid={fieldState.invalid}
                    onKeyDown={handleTriggerKeyDown}
                    className={cn(
                      'peer w-full min-h-12 h-full px-3 rounded border border-gray-300 bg-white flex flex-wrap items-center gap-1 text-base text-gray-700 outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all hover:bg-primary/0! font-normal',
                      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500 focus-visible:border-none focus-visible:shadow-none',
                      'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
                      className,
                    )}
                    data-has-value={hasValue(selected, isMulti) ? 'true' : 'false'}
                    {...props}
                  >
                    {isMulti && Array.isArray(selected) && selected.length > 0 ? (
                      selected.map((option: O) => (
                        <span
                          key={getOptionValue(option)}
                          className="flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {getOptionLabel(option)}
                          <button
                            type="button"
                            className="h-4 w-4 flex items-center justify-center text-gray-500 hover:text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              const next = (selected as O[]).filter(
                                (v) => getOptionValue(v) !== getOptionValue(option),
                              );
                              field.onChange(next);
                              onValueChange?.(next);
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))
                    ) : (
                      <span className="truncate">
                        {selected ? getSelectedLabel(selected, isMulti, getOptionLabel) : ''}
                      </span>
                    )}
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 ml-auto opacity-50 transition-transform duration-200 ease-in-out',
                        open && 'rotate-180',
                      )}
                    />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  className="w-full p-0 flex flex-col max-h-[200px] overflow-hidden"
                  style={{ width: contentWidth }}
                  onOpenAutoFocus={(e) => e.preventDefault()}
                  onCloseAutoFocus={(e) => e.preventDefault()}
                  onWheel={(e) => e.stopPropagation()}
                >
                  <Command
                    className="flex flex-col flex-1 overflow-hidden"
                    shouldFilter={onSearchChange === undefined}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        e.preventDefault();
                        setOpen(false);
                        triggerRef.current?.focus();
                      }
                    }}
                  >
                    {variant === 'searchable' && (
                      <CommandInput
                        ref={inputRef}
                        placeholder="Cari..."
                        onValueChange={onSearchChange}
                      />
                    )}
                    <CommandList
                      ref={listRef}
                      id={`${name}-listbox`}
                      role="listbox"
                      tabIndex={0}
                      className="flex-1 overflow-y-auto overflow-x-hidden"
                    >
                      {isLoading ? (
                        <div className="p-4 text-sm text-center text-gray-500">Memuat...</div>
                      ) : (
                        <>
                          <CommandEmpty>Tidak ada hasil ditemukan.</CommandEmpty>
                          <CommandGroup>
                            {options?.map((option: O) => {
                              const isSelected = isMulti
                                ? Array.isArray(selected) &&
                                selected.some(
                                  (v: O) => getOptionValue(v) === getOptionValue(option),
                                )
                                : selected != null &&
                                getOptionValue(option) === getOptionValue(selected);

                              return (
                                <CommandItem
                                  role="option"
                                  key={getOptionValue(option)}
                                  value={String(getOptionValue(option))}
                                  tabIndex={-1}
                                  aria-selected={isSelected}
                                  className={cn(
                                    'w-full hover:bg-gray-100 flex justify-between items-center cursor-pointer',
                                    isSelected ? 'border border-cyan-100 text-cyan-500' : '',
                                  )}
                                  onSelect={() => handleSelect(option)}
                                >
                                  <div className="flex w-full justify-between">
                                    <span>{getOptionLabel(option)}</span>
                                    {isSelected && <Check className="h-4 w-4 text-cyan-600" />}
                                  </div>
                                  {renderOptionExtra?.(option, isSelected)}
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        </>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <span className="absolute max-h-1 h-1 text-transparent left-2 top-6 -translate-y-1/2 px-1 text-base bg-transparent pointer-events-none transition-all peer-focus:bg-white peer-focus:top-0 peer-focus:text-xs peer-data-[has-value=true]:bg-white peer-data-[has-value=true]:top-0 peer-data-[has-value=true]:text-xs">
                {label}
                {required && <span className="ml-2">*</span>}
              </span>
              <FieldLabel
                htmlFor={field.name}
                aria-invalid={fieldState.invalid}
                className={cn(
                  'absolute left-2 top-6 -translate-y-1/2 px-1 text-gray-500 text-base font-normal pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-cyan-600 peer-data-[has-value=true]:top-0 peer-data-[has-value=true]:text-xs',
                  'aria-invalid:text-destructive/60',
                  labelClassName,
                )}
              >
                {label}
                {required && <span className="text-red-300">*</span>}
              </FieldLabel>
            </div>

            {fieldState.invalid && (
              <FieldError className="text-xs -mt-3" errors={[fieldState.error]} />
            )}
          </Field>
        );
      }}
    />
  );
}
