import { MarginProps } from '../../props/margin.props';
import type { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

interface CommonSupportingTextProps extends MarginProps {
  /**
   * Set the helper text appearance to disabled.
   * This will be overriden by the validation status.
   */
  disabled?: boolean;
  /** Make the text unselectable, for use when associated with input elements. */
  disableUserSelect?: boolean;
}
export interface SupportingTextProps
  extends CommonSupportingTextProps,
    ComponentPropsWithout<'span', RemovedProps> {}
