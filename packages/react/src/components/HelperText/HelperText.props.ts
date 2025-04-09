import { MarginProps } from '../../props/margin.props';
import type { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface HelperTextProps extends ComponentPropsWithout<'span', RemovedProps>, MarginProps {
  /**
   * Set the helper text appearance to disabled.
   * This will be overriden by the validation status.
   */
  disabled?: boolean;
  /** Make the text unselectable, for use when associated with input elements. */
  disableUserSelect?: boolean;
}
