import { MarginProps } from '../../props/margin.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { CardProps } from '../Card/Card.props';

export type TableContainerProps = ComponentPropsWithout<'div', RemovedProps> &
  MarginProps & {
    /**
     * Sets the visual variant of the table.
     * When undefined, the table is rendered without a Card wrapper.
     */
    variant?: CardProps['variant'];
  };
