import { MarginProps } from '../../props/margin.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { CardProps } from '../Card/Card.props';
import { SectionHeaderProps } from '../SectionHeader/SectionHeader.props';

export type ListProps = ComponentPropsWithout<'ul', RemovedProps> &
  MarginProps &
  Omit<SectionHeaderProps, keyof MarginProps> &
  (
    | {
        /**
         * Sets the visual variant of the list.
         * @default undefined
         */
        variant: undefined;
        colorScheme: undefined;
      }
    | {
        variant?: CardProps['variant'];
        /**
         * Sets the color scheme of the list.
         */
        colorScheme?: 'neutralStrong' | 'neutralSubtle';
      }
  ) & {
    /**
     * Shorthand for changing the default rendered element into a semantically appropriate alternative.
     * @default ul
     */
    as?: 'ul' | 'ol';
  };
