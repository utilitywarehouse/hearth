import type { ComponentPropsWithRef, ReactElement } from 'react';
import { MarginProps } from '../../props/margin.props';
import { CardProps } from '../Card/Card.props';
import { TablePaginationProps } from './TablePagination.props';
import { TextAlignProps } from '../../props/text-align.props';

export type TableProps = ComponentPropsWithRef<'table'> &
  MarginProps & {
    /**
     * Sets the visual variant of the table.
     * When undefined, the table is rendered without a Card wrapper.
     */
    variant?: CardProps['variant'];
    pagination?: ReactElement<TablePaginationProps>;
  };
export type TableBodyProps = ComponentPropsWithRef<'tbody'>;
export type TableHeaderProps = ComponentPropsWithRef<'thead'>;
export interface TableHeaderCellProps extends ComponentPropsWithRef<'th'>, TextAlignProps {
  row?: boolean;
}
export type TableRowProps = ComponentPropsWithRef<'tr'>;
export interface TableCellProps extends ComponentPropsWithRef<'td'>, TextAlignProps {}
