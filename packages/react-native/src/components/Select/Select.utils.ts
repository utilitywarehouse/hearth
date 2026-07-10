import type { SelectOptionItemProps } from './Select.props';

export const filterOptionsByLabel = (options: SelectOptionItemProps[], search: string) =>
  options.filter(option => option.label.toLowerCase().includes(search.toLowerCase()));
