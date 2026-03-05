import type { ComponentPropsWithRef } from 'react';
import { MarginProps } from '../../props/margin.props';
import { TextTransformProps } from '../../props/text-transform.props';

export interface InlineLinkProps
  extends ComponentPropsWithRef<'a'>, MarginProps, TextTransformProps {
  /**
   * Sets the color scheme for the InlineLink.
   * - 'default': Uses the standard link color.
   * - 'inverted': Uses a color suitable for dark backgrounds.
   * - 'inherit': Inherits the color from its parent element.
   * Use 'inverted' when placing the link on a dark or colored background for better contrast.
   * Use 'inherit' to match the surrounding text color.
   */
  color?: 'default' | 'inverted' | 'inherit';
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean;
  /** Hides the "open in new tab" icon when `target="_blank"` is set. */
  hideOpenIcon?: boolean;
}
