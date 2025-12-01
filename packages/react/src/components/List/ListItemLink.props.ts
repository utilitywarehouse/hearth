import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { ListItemContentProps } from './ListItemContent.props';

export interface ListItemLinkProps
  extends ComponentPropsWithout<'a', RemovedProps>,
    Omit<ListItemContentProps, keyof ComponentPropsWithout<'a', RemovedProps>> {}
