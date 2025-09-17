import { MarginProps } from '../../props/margin.props';
import type { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface SectionHeaderProps extends ComponentPropsWithout<'div', RemovedProps>, MarginProps {
  /**
   * Actual string to display as section header
   */
  heading?: string;
  /**
   * @default h2
   */
  headingElement?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  /**
   * Optional helper text to provide additional context or instructions.
   */
  helperText?: string;
  helperTextId?: string;
}
