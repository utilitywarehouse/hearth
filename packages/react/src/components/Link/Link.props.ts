import { MarginProps } from '../../props/margin.props';
import { TextTransformProps } from '../../props/text-transform.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface LinkProps
  extends ComponentPropsWithout<'a', RemovedProps>,
    MarginProps,
    TextTransformProps {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean;
  /** Inverts the component colours, for use on darker surface colours. */
  inverted?: boolean;
}
