import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface DatePickerTriggerProps extends ComponentPropsWithout<'button', RemovedProps> {
  value?: string;
  placeholder?: string;
}
