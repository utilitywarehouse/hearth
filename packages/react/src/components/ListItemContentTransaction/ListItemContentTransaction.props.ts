import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface ListItemContentTransactionProps
  extends ComponentPropsWithout<'div', RemovedProps | 'children'> {
  debitValue: string;
  creditValue: string;
  topUpValue: string;
  cashbackValue: string;
  declinedValue: string;
}
