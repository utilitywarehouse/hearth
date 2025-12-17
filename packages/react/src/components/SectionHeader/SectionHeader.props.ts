import { MarginProps } from '../../props/margin.props';

export interface SectionHeaderProps extends React.ComponentPropsWithRef<'div'>, MarginProps {
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
  trailingContent?: React.ReactNode;
  /**
   * Indicates the validation state
   */
  validationStatus?: 'invalid';
  /**
   * Text to display when the `validationStatus` is set.
   */
  validationText?: string;
}
