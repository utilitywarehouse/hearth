import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { CardProps } from '../Card/Card.props';

export type TableProps = ComponentPropsWithout<'div', RemovedProps> & {
  /**
   * Sets the visual variant of the table.
   * @default 'subtle'
   */
  variant?: CardProps['variant'] | 'none';
};
