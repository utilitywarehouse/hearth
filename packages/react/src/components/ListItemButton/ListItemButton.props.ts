import type { ReactNode } from 'react';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface ListItemButtonProps extends ComponentPropsWithout<'button', RemovedProps> {
  trailingIcon?: ReactNode;
}
