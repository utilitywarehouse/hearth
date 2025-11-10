import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type TableHeaderCellProps = ComponentPropsWithout<'th', RemovedProps> & {
  /**
   * Whether the column is sortable
   */
  sortable?: boolean;
  /**
   * Unique identifier for this column (required when sortable is true)
   */
  sortKey?: string;
};
