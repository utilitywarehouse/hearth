import { MarginProps } from '../../props/margin.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { FlexProps } from '../Flex/Flex.props';

export type CardActionsProps = ComponentPropsWithout<'ul', RemovedProps> &
  Pick<FlexProps, 'direction'> &
  MarginProps & {
    /**
     * Shorthand for changing the default rendered element into a semantically appropriate alternative.
     * @default ul
     */
    as?: 'ul' | 'ol';
  };
