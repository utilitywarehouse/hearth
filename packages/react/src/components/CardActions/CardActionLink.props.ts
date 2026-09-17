import type { ComponentPropsWithRef } from 'react';
import { CardActionContentProps } from './CardActionContent.props';

export interface CardActionLinkProps
  extends
    ComponentPropsWithRef<'a'>,
    Omit<CardActionContentProps, keyof ComponentPropsWithRef<'a'>> {
  /**
   * Merges the component's props onto its immediate child instead of
   * rendering its own `a` element, so the child determines the rendered tag.
   */
  asChild?: boolean;
}
