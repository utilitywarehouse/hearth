import { ReactElement, ReactNode } from 'react';
import { MarginProps } from '../../props/margin.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { CardProps } from '../Card/Card.props';
import { TablePaginationProps } from './TablePagination.props';

export type TableProps = ComponentPropsWithout<'table', RemovedProps> &
  MarginProps & {
    /**
     * Sets the visual variant of the table.
     * When undefined, the table is rendered without a Card wrapper.
     */
    variant?: CardProps['variant'];
    pagination?: ReactElement<TablePaginationProps>;
  };
export type TableBodyProps = ComponentPropsWithout<'tbody', RemovedProps>;
export type TableHeaderProps = ComponentPropsWithout<'thead', RemovedProps>;
export interface TableHeaderCellProps extends ComponentPropsWithout<'th', RemovedProps> {
  row?: boolean;
}
export type TableRowProps = ComponentPropsWithout<'tr', RemovedProps>;
export type TableCellProps = ComponentPropsWithout<'td', RemovedProps>;
