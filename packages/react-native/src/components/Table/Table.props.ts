import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';
import type PaginationProps from '../Pagination/Pagination.props';

export interface TableFlexibleColumnWidth {
  flex: number;
}

export type TableColumnWidth = number | `${number}fr` | TableFlexibleColumnWidth;

export interface TableProps extends ViewProps {
  /**
   * Controls whether the table is wrapped in a card container.
   * @default 'none'
   */
  container?: 'emphasis' | 'subtle' | 'none';
  /**
   * Optional per-column sizing using fixed pixel widths or flexible fractions.
   * Use numbers for fixed widths and values like `'2fr'` for flexible columns.
   * Objects like `{ flex: 2 }` are also supported internally.
   * Unspecified columns default to `1fr`.
   */
  columnWidths?: TableColumnWidth[];
  /**
   * Optional pagination controls rendered beneath the rows.
   */
  pagination?: React.ReactElement<PaginationProps> | ReactNode;
}

export interface TableBodyProps extends ViewProps {
  children: ReactNode;
}

export interface TableHeaderProps extends ViewProps {
  children: ReactNode;
  /**
   * Visual style for header cells.
   * @default 'purple'
   */
  color?: 'purple' | 'white';
}

export interface TableRowProps extends ViewProps {
  children: ReactNode;
}

export interface TableCellProps extends ViewProps {
  children?: ReactNode;
}

export interface TableHeaderCellProps extends ViewProps {
  children?: ReactNode;
  color?: 'purple' | 'white';
  /**
   * Renders the header cell as a row header within the body.
   * @default false
   */
  row?: boolean;
  /**
   * Optional content aligned to the end of a header cell.
   */
  trailingContent?: ReactNode;
}

export type TablePaginationProps = PaginationProps;
