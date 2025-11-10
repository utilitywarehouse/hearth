import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface TableCellProps extends ComponentPropsWithout<'td', RemovedProps> {}
