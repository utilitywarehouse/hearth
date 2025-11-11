import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { CardActionContentProps } from './CardActionContent.props';

export interface CardActionLinkProps
  extends ComponentPropsWithout<'a', RemovedProps>,
    Omit<CardActionContentProps, keyof ComponentPropsWithout<'a', RemovedProps>> {}
