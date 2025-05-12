import type { ReactNode } from 'react';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface ListItemLinkProps extends ComponentPropsWithout<'a', RemovedProps> {
  trailingIcon?: ReactNode;
}
