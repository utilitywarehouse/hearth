import type { ComponentPropsWithRef, ReactNode } from 'react';
import { MarginProps } from '../../props/margin.props';
import { Responsive } from '../../types/responsive';

export interface SectionHeaderProps
  extends Omit<ComponentPropsWithRef<'div'>, 'color'>, MarginProps {
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
  /**
   * Optional trailing content element
   */
  trailingContent?: ReactNode;
  /**
   * Indicates the validation state
   */
  validationStatus?: 'invalid';
  /**
   * Text to display when the `validationStatus` is set.
   */
  validationText?: string;
  /**
   * Responsive direction of the section header content. By default, the content is laid out in a row.
   */
  direction?: Responsive<['row', 'column'][number]>;
}
