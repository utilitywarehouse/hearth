import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface TableRowProps extends ComponentPropsWithout<'tr', RemovedProps> {}
