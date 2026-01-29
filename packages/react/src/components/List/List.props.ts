import { MarginProps } from '../../props/margin.props';
import { CardProps } from '../Card/Card.props';
import { SectionHeaderProps } from '../SectionHeader/SectionHeader.props';

export type ListProps = React.ComponentPropsWithRef<'ol'> &
  SectionHeaderProps &
  MarginProps &
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
    /**
     * Remove the inline padding for better alignment with other elements.
     */
    paddingNone?: boolean;
  };
