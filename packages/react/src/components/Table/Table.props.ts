import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { CardProps } from '../Card/Card.props';

export type TableProps = ComponentPropsWithout<'table', RemovedProps> & {
  /**
   * Sets the visual variant of the table.
   * When undefined, the table is rendered without a Card wrapper.
   */
  variant?: CardProps['variant'];
};
