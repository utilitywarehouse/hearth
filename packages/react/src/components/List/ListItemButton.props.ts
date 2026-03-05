import type { ComponentPropsWithRef } from 'react';
import { ListItemContentProps } from './ListItemContent.props';

type ElementProps = ComponentPropsWithRef<'button'>;
export interface ListItemButtonProps
  extends ElementProps, Omit<ListItemContentProps, keyof ElementProps> {}
