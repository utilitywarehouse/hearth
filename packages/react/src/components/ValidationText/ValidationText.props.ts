import { MarginProps } from '../../props/margin.props';
import { TextAlignProps } from '../../props/text-align.props';
import { TextTransformProps } from '../../props/text-transform.props';
import type { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface ValidationTextProps
  extends ComponentPropsWithout<'span', RemovedProps>,
    MarginProps,
    TextAlignProps,
    TextTransformProps {
  /**
   * The validation status
   * @default 'valid'
   */
  status?: 'valid' | 'invalid';
  /** Make the text unselectable, for use when associated with input elements. */
  disableUserSelect?: boolean;
}
