import { MarginProps } from '../../props/margin.props';
import { TextTransformProps } from '../../props/text-transform.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface InlineLinkProps
  extends ComponentPropsWithout<'a', RemovedProps>,
    MarginProps,
    TextTransformProps {
  /**
   * Sets the color scheme for the InlineLink.
   * - 'default': Uses the standard link color.
   * - 'inverted': Uses a color suitable for dark backgrounds.
   * - 'inherit': Inherits the color from its parent element.
   * Use 'inverted' when placing the link on a dark or colored background for better contrast.
   * Use 'inherit' to match the surrounding text color.
   */
  color?: 'default' | 'inverted' | 'inherit';
