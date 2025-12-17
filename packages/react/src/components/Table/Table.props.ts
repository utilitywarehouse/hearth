import { ReactElement } from 'react';
import { MarginProps } from '../../props/margin.props';
import { CardProps } from '../Card/Card.props';
import { TablePaginationProps } from './TablePagination.props';

export type TableProps = React.ComponentPropsWithRef<'table'> &
  MarginProps & {
    /**
     * Sets the visual variant of the table.
     * When undefined, the table is rendered without a Card wrapper.
     */
    variant?: CardProps['variant'];
    pagination?: ReactElement<TablePaginationProps>;
  };
export type TableBodyProps = React.ComponentPropsWithRef<'tbody'>;
export type TableHeaderProps = React.ComponentPropsWithRef<'thead'>;
export interface TableHeaderCellProps extends React.ComponentPropsWithRef<'th'> {
  row?: boolean;
}
export type TableRowProps = React.ComponentPropsWithRef<'tr'>;
export type TableCellProps = React.ComponentPropsWithRef<'td'>;
