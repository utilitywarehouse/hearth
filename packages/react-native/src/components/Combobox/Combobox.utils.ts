import type { ComboboxOptionItemProps } from './Combobox.props';

export const defaultFilterOption = (option: ComboboxOptionItemProps, query: string) => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  const haystack = [option.label, ...(option.keywords ?? [])].map(term => term.toLowerCase());

  return haystack.some(term => term.includes(normalizedQuery));
};
