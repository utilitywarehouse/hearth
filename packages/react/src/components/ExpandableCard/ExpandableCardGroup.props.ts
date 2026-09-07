import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { MarginProps } from '../../props/margin.props';
import type { SectionHeaderProps } from '../SectionHeader/SectionHeader.props';

export interface ExpandableCardGroupProps
  extends
    Omit<ComponentPropsWithRef<'div'>, 'color'>,
    Pick<SectionHeaderProps, 'heading' | 'helperText' | 'trailingContent'>,
    MarginProps {
  /**
   * Sets the heading element rendered for the group's `heading`.
   */
  headingElement?: 'h1' | 'h2' | 'h3' | 'h4';
  children?: ReactNode;
}
