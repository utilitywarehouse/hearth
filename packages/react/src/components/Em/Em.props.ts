import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface EmProps extends ComponentPropsWithout<'em', RemovedProps> {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean;
  /**
   * If true, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   * Note that text overflow can only happen with block or inline-block level elements (the element needs to have a width in order to overflow).
   */
  truncate?: boolean | undefined;
}
