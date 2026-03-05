import type { ComponentPropsWithRef } from 'react';

export interface DatePickerTriggerProps extends ComponentPropsWithRef<'button'> {
  value?: string;
  placeholder?: string;
}
