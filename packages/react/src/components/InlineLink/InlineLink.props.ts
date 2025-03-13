import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface InlineLinkProps extends ComponentPropsWithout<'a', RemovedProps> {
  /** Inverts the component colours, for use on darker surface colours. */
  inverted?: boolean;
}
