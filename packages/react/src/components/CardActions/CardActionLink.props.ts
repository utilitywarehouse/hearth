import { CardActionContentProps } from './CardActionContent.props';

export interface CardActionLinkProps
  extends
    React.ComponentPropsWithRef<'a'>,
    Omit<CardActionContentProps, keyof React.ComponentPropsWithRef<'a'>> {}
