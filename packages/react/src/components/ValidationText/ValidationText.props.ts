import type { ComponentPropsWithRef } from 'react';
import { MarginProps } from '../../props/margin.props';
import { TextAlignProps } from '../../props/text-align.props';
import { TextTransformProps } from '../../props/text-transform.props';

export interface ValidationTextProps
  extends
    Omit<ComponentPropsWithRef<'span'>, 'color'>,
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
