import { MarginProps } from '../../props/margin.props';
import { FlexProps } from '../Flex/Flex.props';

export interface CardActionsProps
  extends React.ComponentPropsWithRef<'ol'>, Pick<FlexProps, 'direction'>, MarginProps {
  /**
   * Shorthand for changing the default rendered element into a semantically appropriate alternative.
   * @default ul
   */
  as?: 'ul' | 'ol';
}
