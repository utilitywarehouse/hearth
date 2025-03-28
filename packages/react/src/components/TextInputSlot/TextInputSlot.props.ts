import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface TextInputSlotProps extends ComponentPropsWithout<'div', RemovedProps> {
  placement?: 'prefix' | 'suffix';
}
