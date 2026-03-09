import type { ComponentPropsWithRef } from 'react';
import { MarginProps } from '../../props/margin.props';
import { TextTransformProps } from '../../props/text-transform.props';

export interface LinkProps extends ComponentPropsWithRef<'a'>, MarginProps, TextTransformProps {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean;
  /** Inverts the component colours, for use on darker surface colours. */
  inverted?: boolean;
  /** Hides the "open in new tab" icon when `target="_blank"` is set. */
  hideOpenIcon?: boolean;
}
