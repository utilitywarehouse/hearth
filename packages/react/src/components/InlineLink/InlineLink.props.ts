import { MarginProps } from '../../props/margin.props';
import { TextTransformProps } from '../../props/text-transform.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface InlineLinkProps
  extends ComponentPropsWithout<'a', RemovedProps>,
    MarginProps,
    TextTransformProps {
  /** Inverts the component colours, for use on darker surface colours. */
  inverted?: boolean;
}
