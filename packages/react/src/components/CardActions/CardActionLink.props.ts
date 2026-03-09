import type { ComponentPropsWithRef } from 'react';
import { CardActionContentProps } from './CardActionContent.props';

export interface CardActionLinkProps
  extends
    ComponentPropsWithRef<'a'>,
    Omit<CardActionContentProps, keyof ComponentPropsWithRef<'a'>> {
  asChild?: boolean;
}
