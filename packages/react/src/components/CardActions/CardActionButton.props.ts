import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { CardActionContentProps } from './CardActionContent.props';

export interface CardActionButtonProps
  extends ComponentPropsWithout<'button', RemovedProps>,
    Omit<CardActionContentProps, keyof ComponentPropsWithout<'button', RemovedProps>> {}
