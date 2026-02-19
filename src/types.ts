import type { Control, FieldPath, FieldValues } from 'react-hook-form';

// Generic Option
export type SelectOption<V = string | number, L extends string = string> = {
  value: V;
  label: L;
};

// Base props for the Floating Select
export type FloatingSelectBaseProps<T extends FieldValues, O = SelectOption> = {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: object;
  options?: O[];
  label: string;
  required?: boolean;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  variant?: 'native' | 'searchable';
  isMulti?: boolean;
  renderOptionExtra?: (option: O, isSelected: boolean) => React.ReactNode;
};
