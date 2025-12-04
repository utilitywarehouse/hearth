import { MarginProps } from '../../props/margin.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type TableProps = ComponentPropsWithout<'table', RemovedProps> & MarginProps;
export type TableBodyProps = ComponentPropsWithout<'tbody', RemovedProps>;
export type TableHeaderProps = ComponentPropsWithout<'thead', RemovedProps>;
export interface TableHeaderCellProps extends ComponentPropsWithout<'th', RemovedProps> {
  row?: boolean;
}
export type TableRowProps = ComponentPropsWithout<'tr', RemovedProps>;
export type TableCellProps = ComponentPropsWithout<'td', RemovedProps>;
