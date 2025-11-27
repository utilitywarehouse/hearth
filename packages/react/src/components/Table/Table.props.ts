import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { CardProps } from '../Card/Card.props';
import type { ReactNode } from 'react';

export type TableProps = ComponentPropsWithout<'table', RemovedProps> & {
  /**
   * Sets the visual variant of the table.
   * When undefined, the table is rendered without a Card wrapper.
   */
  variant?: CardProps['variant'];
  /**
   * Optional footer content to render below the table.
   * Typically used for pagination controls.
   */
  footer?: ReactNode;
};
