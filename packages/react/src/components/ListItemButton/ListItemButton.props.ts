import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { ListItemContentProps } from '../ListItemContent/ListItemContent.props';

export interface ListItemButtonProps
  extends ComponentPropsWithout<'button', RemovedProps>,
    Omit<ListItemContentProps, keyof ComponentPropsWithout<'button', RemovedProps>> {}
