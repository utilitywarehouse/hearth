import type { ComponentPropsWithRef } from 'react';

export interface InputSlotProps extends ComponentPropsWithRef<'div'> {
  placement?: 'prefix' | 'suffix';
  asChild?: boolean;
}
