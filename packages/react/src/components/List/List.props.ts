import { MarginProps } from '../../props/margin.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { CardProps } from '../Card/Card.props';
import { LinkProps } from '../Link/Link.props';

export type ListProps = ComponentPropsWithout<'ul', RemovedProps> &
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
        colorScheme?: 'white' | 'warmWhite';
      }
  ) & {
    /**
     * Shorthand for changing the default rendered element into a semantically appropriate alternative.
     * @default ul
     */
    as?: 'ul' | 'ol';
    /**
     * The heading for the list, describing its purpose.
     */
    heading?: string;
    headingElement?: 'div' | 'h1' | 'h2' | 'h3' | 'h4';
    /**
     * Optional helper text to provide additional context or instructions.
     */
    helperText?: string;
    linkText?: string;
    linkHref?: LinkProps['href'];
  };
