import type { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type SortDirection = 'asc' | 'desc' | 'none';

export type TableHeaderProps = ComponentPropsWithout<'thead', RemovedProps> & {
  /**
   * The currently sorted column key
   */
  sortColumn?: string | null;
  /**
   * The current sort direction
   */
  sortDirection?: SortDirection;
  /**
   * Callback fired when a sortable column header is clicked
   */
  onSort?: (sortKey: string) => void;
};
