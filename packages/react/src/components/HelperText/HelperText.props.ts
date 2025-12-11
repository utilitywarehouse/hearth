import { MarginProps } from '../../props/margin.props';
import { TextAlignProps } from '../../props/text-align.props';
import { TextTransformProps } from '../../props/text-transform.props';

export interface HelperTextProps
  extends Omit<React.ComponentPropsWithRef<'span'>, 'color'>,
    MarginProps,
    TextAlignProps,
    TextTransformProps {
  /**
   * Set the helper text appearance to disabled.
   * This will be overriden by the validation status.
   */
  disabled?: boolean;
  /** Make the text unselectable, for use when associated with input elements. */
  disableUserSelect?: boolean;
}
