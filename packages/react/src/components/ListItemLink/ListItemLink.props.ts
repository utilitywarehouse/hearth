import type { ReactNode } from 'react';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { ListItemTextProps } from '../ListItemText/ListItemText.props';

export interface ListItemLinkProps extends ComponentPropsWithout<'a', RemovedProps> {
  helperText?: ListItemTextProps['helperText'];
  leadingIcon?: ListItemTextProps['leadingIcon'];
  trailingIcon?: ReactNode;
}
