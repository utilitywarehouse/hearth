import { CardActionContentProps } from './CardActionContent.props';

export interface CardActionButtonProps
  extends
    React.ComponentPropsWithRef<'button'>,
    Omit<CardActionContentProps, keyof React.ComponentPropsWithRef<'button'>> {}
