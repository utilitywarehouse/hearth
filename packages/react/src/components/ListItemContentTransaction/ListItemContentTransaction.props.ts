import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface ListItemContentTransactionProps
  extends ComponentPropsWithout<'div', RemovedProps | 'children'> {
  debit: string;
  credit: string;
}
