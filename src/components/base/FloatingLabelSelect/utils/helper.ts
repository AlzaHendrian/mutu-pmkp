import type { SelectOption } from '@/types';

export const getSelectedLabel = <O>(
  selected: O | O[] | null | undefined,
  multi: boolean | undefined,
  getOptionLabel: (option: O) => string,
): string => {
  if (!selected) return '';
  if (multi && Array.isArray(selected)) {
    return selected.map(getOptionLabel).join(', ');
  }
  return getOptionLabel(selected as O);
};

export function getSelectedValue(
  selected: SelectOption | SelectOption[] | undefined,
  isMulti?: boolean,
): string | string[] {
  if (!selected) return isMulti ? [] : '';
  if (isMulti) {
    return Array.isArray(selected) ? selected.map((o) => String(o.value)) : [];
  }
  return Array.isArray(selected) ? '' : String(selected.value);
}

export const hasValue = <O>(selected: O | O[] | null | undefined, multi?: boolean): boolean => {
  if (!selected) return false;

  if (multi) {
    return Array.isArray(selected) && selected.length > 0;
  }

  return selected != null; // single value exists
};
