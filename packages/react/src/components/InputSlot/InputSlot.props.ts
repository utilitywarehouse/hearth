import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface InputSlotProps extends ComponentPropsWithout<'div', RemovedProps> {
  placement?: 'prefix' | 'suffix';
}
