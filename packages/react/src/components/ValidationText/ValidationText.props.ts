import { MarginProps } from '../../props/margin.props';
import type { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface ValidationTextProps
  extends ComponentPropsWithout<'span', RemovedProps>,
    MarginProps {
  /**
   * The validation status
   * @default 'valid'
   */
  status?: 'valid' | 'invalid';
  /** Make the text unselectable, for use when associated with input elements. */
  disableUserSelect?: boolean;
}
